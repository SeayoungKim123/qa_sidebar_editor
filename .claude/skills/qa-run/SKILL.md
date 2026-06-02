---
name: qa-run
description: 시나리오 1개를 격리된 컨텍스트에서 실행하는 QA 자동화 Skill. Playwright MCP 로 브라우저를 조작해 시나리오 안의 모든 테스트 케이스를 수행하고, 각 TC 결과를 progress.jsonl 에 즉시 기록한다. 시나리오 종료 시 result.md 를 작성하고 메인 대화로 요약만 반환한다. 호출 예: 사용자가 "회원가입 시나리오 dev에서 실행해줘" 또는 "/qa-run 회원가입 dev" 라고 요청할 때 메인 Claude 가 시나리오마다 한 번씩 invoke 한다.
context: fork
model: sonnet
---

# /qa-run — QA 시나리오 실행 (격리)

당신은 QA 자동화 실행 에이전트입니다. 이 컨텍스트는 메인 대화로부터 격리되어 있으며, 당신의 역할은 **단일 시나리오 실행**과 그 결과를 디스크에 남기는 것입니다.

---

## 입력

호출 시 다음 정보를 받습니다. 누락되면 메인 Claude 에게 정중히 재요청하세요.

- **시나리오**: 파일 경로 또는 시나리오명 (예: `scenarios/01-회원가입.md` 또는 `01-회원가입`)
- **환경**: `dev` / `stage` / `prd`
- **RUN-ID**: 메인이 이미 생성한 ID (예: `RUN-20260502-1430-dev`)

---

## 사전 준비 (시나리오 시작 전)

1. `scenarios/{시나리오}.md` 를 Read 로 읽고 사용자 흐름·TC 목록·검증 포인트 파악
2. `environments/{env}.md` 를 Read 로 읽고 URL·계정·테스트 데이터 확인
3. `reports/{RUN-ID}/` 폴더 존재 확인 (없으면 생성)
4. `reports/{RUN-ID}/progress.jsonl` 존재 확인 (없으면 빈 파일 생성)
5. `reports/{RUN-ID}/screenshots/` 폴더 존재 확인 (없으면 생성)
6. **뷰포트 폭 고정**: `browser_resize({ width: 1440, height: 1440 })` 를 첫 페이지 로드 직후 1회 호출(폭 1440 확보용). **높이는 고정이 아니라 캡처 시점에 본문 길이에 맞춰 동적으로 조정**한다 — 상세는 "캡처 범위 규칙" 의 동적 fit 참조. (높이를 1440 으로 박아두면 본문이 그보다 길 때 아래가 잘린다.)

---

## 실행 절차 (TC 단위 반복)

각 TC 마다 다음을 순서대로 수행하세요.

### 1) 시각 측정 준비 — 브라우저 벽시계만 사용

시간은 **반드시 `browser_evaluate(() => Date.now())` 로 브라우저에서 읽는다.** LLM 의 시간 감각으로 추정하지 말 것 (추정값 금지 — 깔끔한 반올림 숫자가 나오면 그건 측정이 아니다).

- TC 시작 시 `t_tc_start = browser_evaluate(() => Date.now())` 기록 (시나리오 전체 타임아웃 판정용).
- **AI 작업 시간 측정 (= 유저 체감 대기, 핵심 지표)**:
  - **`t_send` 는 전송과 한 묶음 — 필수.** 프롬프트 입력 → `02-prompt` 캡처까지 끝낸 뒤, **전송 직전에 `t_send = browser_evaluate(() => Date.now())` 를 먼저 읽고 → 곧바로 전송 버튼 클릭**. `t_send` 없이 전송 클릭 금지. (이 한 줄을 빼먹으면 wait_ms 가 통째로 `null` 이 된다 — 가장 흔한 누락 지점.)
  - AI 가 편집을 **완료했다고 판단되는 즉시** `t_done = browser_evaluate(() => Date.now())`
  - `wait_ms = t_done - t_send`
  - **"완료" 판단은 블랙박스 근사**: AI 응답 스트리밍이 멈추고 **+** 본문(문서/시트/슬라이드)에 결과가 반영된 시점. 완료 여부 확인에 `browser_snapshot` 이 필요하면, **그 스냅샷으로 완료를 확인한 직후 추가 작업 없이 `t_done` 시계를 곧바로 1회 읽는다** (그 다음 토큰 읽기·검증·스크린샷). 즉 순서는 **완료확인 스냅샷 → `t_done` → 토큰/캡처**.
  - 프롬프트 없는 TC(저장/영속 등)는 동작 시작~완료를 같은 방식으로 재되, 측정할 AI 동작이 없으면 `wait_ms: null`.
  - ⚠️ **오염 방지**: 완료 시점을 놓치고 한꺼번에 길게 대기한 뒤(또는 분석·여러 도구 호출을 끼운 뒤) `Date.now()` 를 읽으면 LLM 지연이 섞여 체감 대기를 부풀린다 — 그 부풀린 값은 적지 말 것. 단 위처럼 **완료확인 스냅샷 1회 직후 곧바로 읽은 `t_done`** 은 오염이 미미하니 정상 기록한다(이걸 null 로 버리지 말 것). 정말 완료 순간을 놓쳐 길게 대기한 경우에만 `null`.
  - **자기점검**: 프롬프트가 있는 TC인데 `wait_ms` 가 `null` 이면 progress 기록 전에 "전송 직전 `t_send` 를 빼먹은 것 아닌가" 를 먼저 의심한다.
- **토큰 소모량 측정 (= 유저 비용 지표)**:
  - AI 응답이 완료되면 사이드패널 **응답 영역 하단에 입력·출력 토큰 수가 표시**된다. **`t_done` 시계를 읽은 직후**(위 순서 참조), `browser_snapshot` 또는 토큰 영역 크롭 스크린샷(`-tokens-zoom`)으로 두 값을 읽는다. 토큰 읽기를 시계보다 먼저 하지 말 것 — 그러면 `wait_ms` 가 오염되거나 null 로 떨어진다.
  - `in_tokens` = 입력(프롬프트) 토큰, `out_tokens` = 출력(응답) 토큰. **정수 그대로** 기록 (예: `1280`).
  - 패널에 토큰이 표시되지 않거나 프롬프트 없는 TC 면 둘 다 `null`.

### 2) Playwright MCP 로 브라우저 조작
시나리오에 적힌 단계대로 다음 도구들을 사용:
- `browser_navigate` — URL 이동
- `browser_click`, `browser_type`, `browser_press_key` — 인터랙션
- `browser_snapshot` — 접근성 트리 기반 화면 검증
- `browser_take_screenshot` — 시각 증거 저장
- `browser_console_messages` — 콘솔 에러 확인

### 3) 검증 포인트 평가
시나리오 명세의 "기대 결과" 와 실제 화면을 비교. 일치하면 `PASS`, 다르면 `FAIL`.

### 4) 스크린샷 저장
`reports/{RUN-ID}/screenshots/` 에 PNG 저장.
**파일명 규칙**: `{scenario-slug}-{tc-id}-{step}-{설명}.png`
예: `signup-tc04-02-prompt.png`

#### 캡처 시점 — 프롬프트 있는 TC 는 기본 2장 (`02-prompt` → `03-after`)

| step | 시점 | 무엇을 담나 | 적용 |
|---|---|---|---|
| `01-before` | 작업 시작 전 | 기준 상태 (편집 전 본문·시트·슬라이드) | **예외 시만** (아래 규칙) |
| `02-prompt` | 프롬프트 입력 직후·전송 전 | 채팅창에 입력된 프롬프트 텍스트 + 편집 전 본문 (전체 뷰포트라 기준선 겸함) | 프롬프트 있는 TC만 |
| `03-after` | 작업 완료 후 | 결과 — 검증 포인트가 보이는 화면 | **항상** |

- **`01-before` 생략 (기본)**: `02-prompt` 를 **전체 뷰포트**로 찍으면 전송 전이라 본문이 편집 전 상태 그대로 담긴다 → `02-prompt` 가 "프롬프트 텍스트 + 기준 본문" 상위집합이므로 `01-before` 는 생략한다. 즉 프롬프트 있는 TC 는 `02-prompt` → `03-after` **2장**이 기본.
- **`01-before` 를 찍어야 하는 예외 2가지**:
  - **(a) 프롬프트 없는 TC** (저장/영속 등): `02-prompt` 가 없으므로 `01-before` 가 유일한 기준선. 이 경우 `01-before` = 동작 직전, `03-after` = 동작 후(영속이면 **재오픈 후**).
  - **(b) `02-prompt` 를 패널만 `-zoom` 크롭한 경우** (LNB 가 안 접혀 폴백): 본문이 안 잡혀 기준선이 소실되므로 `01-before`(전체 뷰포트)를 별도로 찍는다.
- **`03-after` 다장화 (동적 fit 상한 초과·다중 객체)**: 아래 동적 fit 으로 본문을 한 장에 담는 게 1순위. 단 콘텐츠가 상한(4000px)을 넘거나 객체가 화면 단위로 분리될 때(슬라이드 이동 / 시트·차트 전환)는 **화면을 넘길 때마다** 추가 캡처. 파일명은 `03-after`, `03b-after`, `03c-after` … 로 잇는다. **모든 검증 포인트가 적어도 한 장에는 보여야 한다** (예: Excel 차트 3개, PPT 슬라이드 순회, 4000px 넘는 긴 표).
- **FAIL 일 때**: `03-after` 계열 중 **무엇이 어떻게 안 됐는지 보이는 화면 최소 1장**을 반드시 포함.

#### 캡처 범위 규칙
- **기본은 전체 뷰포트** — `browser_take_screenshot` 호출 시 `element` / `ref` 파라미터를 **주지 않는다**. 그래야 본문 + 사이드패널 + 상단 메뉴가 한 장에 잡혀 증거로서 의미가 있다.
- AI 응답 토큰 수, 작은 다이얼로그처럼 **의도적으로 일부만 크롭**해야 검증이 더 명확한 경우에만 `element` 로 스코프. 이 경우 파일명에 `-zoom` 같은 suffix 로 표시 (예: `01-docx-tc01-03-after-ai-panel-zoom.png`).

##### 동적 fit — 캡처 직전 뷰포트 높이 맞추기 (잘림 방지)
OnlyOffice 본문은 iframe 안의 canvas 라 **보이는 스크롤 영역만 픽셀로 그려진다** → `fullPage: true` 는 화면 밖 본문을 못 잡는다. 그래서 높이를 고정하지 말고, **캡처(특히 `03-after`) 직전에 본문 길이에 맞춰 뷰포트를 키운 뒤** 전체 뷰포트로 한 장에 담는다:

1. 본문 길이 가늠. canvas 라 DOM `scrollHeight` 로는 정확히 안 나오므로 **다음 순서로 best-effort**:
   - (a) 상단에 보이는 **페이지 수**(예: `4 / 4`)를 `browser_snapshot` 으로 읽어 `height ≈ 페이지수 × 1100px` 로 추정, 또는
   - (b) 본문을 맨 아래까지 스크롤(`browser_press_key("Control+End")`) 후 스크롤바 위치로 길이 가늠.
   - 가늠이 안 되면 합리적 기본값(2600px ≈ 약 2페이지)으로 잡고 부족하면 다장화로 메운다.
2. `height = min(추정높이, 4000)` 으로 `browser_resize({ width: 1440, height })`. 새 높이만큼 본문이 다시 그려질 때까지 `browser_wait_for` 로 짧게 대기. 캡처 전 스크롤은 맨 위로 돌려 첫 화면부터 담는다.
3. `element` 없이 전체 뷰포트 1장 캡처. 담은 뒤 **하단에 검증 포인트가 잘렸는지 눈으로 확인** — 잘렸으면 4번.
4. **상한(4000px) 초과**거나 추정이 빗나가 한 장에 안 들어오거나, 슬라이드·시트처럼 화면 단위로 분리된 콘텐츠면 위 `03-after` **다장화**(스크롤·전환하며 여러 장)로 폴백. 이게 잘림에 대한 최종 안전망이다.

`01-before` / `02-prompt` 도 같은 fit 을 적용하되, 비교 일관성을 위해 한 TC 안에서는 같은 높이를 쓰는 게 좋다(예: `03-after` 에서 정한 높이 재사용).

### 5) **즉시 기록 — `progress.jsonl` 에 1줄 append**

TC 가 끝나는 즉시 (다음 TC 로 넘어가기 전) 다음 형식의 JSON 한 줄을 파일 끝에 추가:

```json
{"ts":"2026-05-02T14:30:42","run_id":"RUN-20260502-1430-dev","scenario":"01-회원가입","tc":"TC-01","result":"PASS","wait_ms":3214,"in_tokens":1280,"out_tokens":3450,"screenshot":["screenshots/signup-tc01-01-before.png"],"note":""}
```

필드 설명:
- `result`: `"PASS"` / `"FAIL"` / `"SKIP"` / `"BLOCKED"` (선행 TC 결과에 의존해 실행 불가한 경우)
- `wait_ms`: **AI 작업 시간** — 프롬프트 전송→편집 완료 실측(밀리초, `browser_evaluate(Date.now())` 두 번 차이). 측정할 AI 동작이 없으면 `null`
- `in_tokens` / `out_tokens`: **토큰 소모량** — 응답 완료 후 사이드패널 하단에서 읽은 입력·출력 토큰(정수). 표시 없거나 프롬프트 없는 TC 면 각각 `null`
- `note`: 아래 **note 작성 규칙** 참조
- `screenshot`: 관련 스크린샷 상대경로 배열

#### note 작성 규칙

**목적**: 대시보드에서 한눈에 읽히는 문구. 기술 용어·내부 구현 없이 **무엇이 안 됐는지**만 전달.

| 규칙 | 내용 |
|---|---|
| 길이 | **60자 이내**. 초과하면 잘라낸다 |
| 구분자 | 원인과 결과가 둘일 때 **`;`** 로 분리 |
| 언어 | 평이한 한국어. 영문 도구명·API명 최소화 |
| PASS | 주목할 관찰이 없으면 **빈 문자열 `""`**. 특이사항이 있을 때만 한 줄 |
| FAIL | `{무엇}이 {어떻게} 안 됨` 패턴으로 핵심 하나 |
| BLOCKED | `{사전조건} 없어 검증 불가; {AI/시스템} 응답 상태` |

**좋은 예**

```
"정렬 미적용; 테두리는 적용됨"
"파이 차트 생성됐으나 데이터 레이블 미표시"
"본문에 표가 없어 검증 불가; AI는 응답했으나 적용 대상 없음"
"AI 거절 + 대안 제시, 본문 변경 없음"
"14pt·Bold·연회색 배경 모두 적용"
```

**피해야 할 예**

```
"TC-06 결과(AI가 기존 native 슬라이드 modify 회피) 로부터 동일 한계 예상 — 시간 제약으로 미실행"  ← 너무 긺
"format_text_blocks 의 contentIndexes 매핑 또는 fontSize 적용 로직 버그"  ← 내부 구현 노출
"시나리오 사전조건 미달 - 'II. 상반기 실적 검토' 아래 표가 본문에 없음 (글머리 기호 목록 형태). AI 응답 완료했으나 적용 대상 표 부재로 디자인 변화 시각 검증 불가"  ← 길고 반복
```

> ⚠️ **중요**: 이 단계를 건너뛰면 안 됩니다. 중간 중단 시 결과 보존을 위해 반드시 TC마다 즉시 기록하세요.

### 6) 다음 TC 진행
이전 TC 의 dirty state 가 영향을 줄 수 있으면 명시적으로 정리 (로그아웃·캐시 클리어 등).

---

## 시나리오 종료 후

### 1) 정식 결과 마크다운 작성
`reports/{RUN-ID}/{scenario-slug}_result.md` 를 다음 구조로 작성:

```markdown
# {시나리오명} — 실행 결과

**RUN-ID**: ...
**환경**: ...
**시간**: HH:MM:SS ~ HH:MM:SS (Xm Ys)
**결과**: ✅ N Pass / ❌ M Fail

## 사용자 흐름
(시나리오 명세의 흐름 요약)

## TC-XX: {이름} — ✅ PASS / ❌ FAIL
- 입력: ...
- 단계별 결과:
  1. ... ✓
  2. ... ✓
- 스크린샷: `screenshots/...`
- (실패 시) 기대: ... / 실제: ... / 추정 원인: ...

(모든 TC 반복)

## 정책 참조
- `specs/...`
```

### 2) `reports/data.js` 갱신 (대시보드 즉시 반영)

시나리오가 끝날 때마다 다음 절차로 `reports/data.js` 를 **풀 빌드 + 덮어쓰기**. 대표님이 도중에 대시보드를 열어도 직전 시나리오까지의 결과가 보이도록 하기 위함.

알고리즘:
1. **카탈로그 빌드**: `scenarios/*.md` (단, `_template.md` 제외) 전체를 파일명 오름차순으로 스캔. 각 파일에서 시나리오 ID(파일명 stem) · TC 목록(TC-XX + 이름) 추출.
2. **결과 맵 빌드**: `reports/{RUN-ID}/progress.jsonl` 전체 read. `(시나리오, TC)` 키로 최신 result(`PASS`/`FAIL`/`SKIP`/`BLOCKED`) 매핑.
3. **머지**: 카탈로그 위에 결과 맵 오버레이.
   - PASS → `status: "PASS"`
   - FAIL/SKIP/BLOCKED → `status: "FAIL"` (대시보드는 PASS/FAIL/— 3분기만 인식)
   - 결과 없음 → `status: "—"` (미실행)
   - **TC별 옵션 필드 주입** (대시보드 스크린샷 모달용):
     - `screenshots`: progress.jsonl 의 `screenshot` 배열을 `reports/` 기준 상대경로로 변환 (`screenshots/foo.png` → `{RUN-ID}/screenshots/foo.png`). 누락된 `screenshots/` prefix 는 보정.
     - `note`: progress.jsonl 의 `note` 그대로.
     - `run_id`: 결과를 가져온 RUN-ID.
     - `duration`: **AI 작업 시간** — progress.jsonl 의 `wait_ms` 를 `"{round(wait_ms/1000)}s"` 로 변환 (예: `3214` → `"3s"`). `wait_ms` 가 `null`/누락이면 이 필드 생략 (대시보드가 `—` 표시).
     - `in_tokens` / `out_tokens`: **토큰 소모량** — progress.jsonl 의 `in_tokens`·`out_tokens`(정수)를 1000 단위 축약 문자열로 변환 (예: `1280` → `"1.3k"`, `850` → `"850"`). 각각 `null`/누락이면 해당 필드 생략 (대시보드가 `—` 표시).
     - 결과 없음 TC 는 이 필드들 모두 생략.
4. **KPI 재계산** (`kpis` 객체):
   - `pass`: 전체 PASS 개수
   - `fail`: 전체 FAIL 개수
   - `pass_rate`: `round(pass / (pass+fail) * 100)` — pass+fail = 0 이면 `null`
   - `scenario_count`: 카탈로그 시나리오 수
   - `tc_count`: 카탈로그 TC 총수
5. **`meta` 갱신**: `run_id`, `env`, `updated_at`(현재 시각 `YYYY-MM-DD HH:MM`)
6. **유지**: `issues`, `history`, `kpis.total_runs`, `kpis.runs_by_env`, `kpis.open_issues`, `kpis.issues_breakdown` 은 **기존 `data.js` 에서 그대로 read 해서 다시 씀**. 이 영역은 메인 Claude 가 RUN 단위로 마무리에 갱신함.
7. **빈 카탈로그 방어**: `scenarios/` 가 비어 있거나 스캔 실패 시 기존 `data.js` 보존, 메인 반환 요약에 한 줄 경고.

> ⚠️ 동시 실행 금지: 시나리오는 순차 dispatch 가정. 두 Skill 이 동시에 `data.js` 를 쓰면 race 발생.

> ℹ️ 버전 스냅샷(`reports/versions/v{N}.js` · `versions.js`)은 **메인 Claude 가 RUN 종료 시 1회** 처리한다. Skill 은 `data.js`(최신)만 쓰고 버전 파일에는 관여하지 않는다.

### 3) `scenarios/{시나리오}.md` 하단 "최근 실행 결과" 표 갱신

자기 시나리오 파일 하단의 표에 **이번 RUN 1줄 추가** (또는 기존 표가 빈 양식이면 첫 줄로 채움). 형식:

```markdown
| 일시 | 환경 | 결과 | RUN-ID | 비고 |
|---|---|---|---|---|
| 2026-05-02 14:30 | dev | ✅ 4/5 | RUN-20260502-1430-dev | TC-04 인증 메일 fail |
| (이전 행들...) |
```

최신이 위로. 행 5개까지만 유지 (오래된 건 잘라냄).

### 4) 메인에 반환할 요약 (300단어 이내)

다음 구조로만 반환. **불필요한 상세 내용·스크린샷 본문·DOM 덤프 절대 포함 금지**.

```markdown
## 시나리오 실행 결과
- **시나리오**: 01-회원가입
- **RUN-ID**: RUN-20260502-1430-dev
- **환경**: dev
- **결과**: 4/5 Pass (1 Fail)
- **소요시간**: 1m 42s
- **결과 파일**: reports/RUN-20260502-1430-dev/01-회원가입_result.md

### 신규 실패
- TC-04: 인증 메일 재전송 시 메일 미수신 (60s timeout)

### 연속 실패
- 없음

### 권장 액션
- TC-04 메일 발송 큐·SMTP 설정 점검 요청
```

---

## AI 시나리오 전용 규칙 (DOCX / PPT / Excel)

현재 AI 시나리오 6종(`scenarios/01-DOCX-실사용흐름.md`, `02-DOCX-객체삽입.md`, `03-PPT-실사용흐름.md`, `04-PPT-객체삽입.md`, `05-Excel-실사용흐름.md`, `06-Excel-객체삽입.md`)에는 다음 세 규칙이 **추가로** 적용된다.

### 1) 진입 경로 — "미리보기 (MCP ver)" 플라스크 아이콘만 사용

드라이브 파일 행에 호버하면 액션 아이콘이 5개 표시된다.

- **첫 번째 "미리보기"** (`title="미리보기"`, `gi gi-new-window` 아이콘) → AI 채팅이 **없는** 기존 편집기. **사용 금지.**
- **두 번째 "미리보기 (MCP ver)"** (`title="미리보기 (MCP ver)"`, `fal fa-flask` 플라스크 아이콘) → AI 사이드패널이 붙은 신규 편집기 (`feature-connector-develop-document.devoffice.hiworks.com` 호스트). **이걸 클릭한다.**

호버 상태가 잘 안 잡히거나 ref 가 사라지면 `browser_evaluate` 로 우회:

```js
const target = Array.from(document.querySelectorAll('*'))
  .find(el => el.textContent === '<파일명>.docx' && el.children.length === 0);
let row = target;
for (let i = 0; i < 8; i++) {
  row = row.parentElement;
  const buttons = row.querySelectorAll('button, [role="button"]');
  if (buttons.length >= 3) { buttons[1].click(); break; }  // index 1 = 플라스크
}
```

이후 흐름: 새 탭 select → 상단 **문서편집** 클릭 → **Hiworks AI** 탭 → **AI 채팅** 버튼 → 우측 사이드패널 활성화. "AI채팅 Pro로 업그레이드 되었습니다" 안내 다이얼로그가 뜨면 닫기.

### 2) 본문 직접 편집 금지 — AI 가 편집하는지를 검증한다

이 시나리오들의 검증 대상은 **AI 사이드패널 자체**다. Skill 이 본문을 직접 수정해버리면 검증이 무의미해진다.

- **허용 (사용자 사전 준비)**: 커서 위치 클릭, 텍스트 선택(드래그), 표·문단 클릭 등 시나리오의 "조작 순서" 가 명시한 위치/선택 동작.
- **금지 (AI 가 해야 할 작업)**: 본문에 직접 타이핑, Enter 로 빈 줄 만들기, 표 삽입, 서식·정렬·글자 크기 변경, 글머리 기호 적용 등.

진행 패턴:

1. (필요 시) 시나리오가 요구하는 커서 위치 / 텍스트 선택만 본문에서 수행
2. 시나리오의 프롬프트를 AI 사이드패널 채팅창에 **그대로** 입력 → 전송
3. AI 응답 대기, "본문에 삽입" 같은 액션이 있으면 그것만 클릭
4. 본문 결과를 스냅샷·스크린샷으로 캡처해 "기대 결과"·"검증 포인트" 와 비교
5. PASS / FAIL 판정

사전조건 미달(예: 빈 단락이 없어서 커서 위치 잡을 곳이 없음)이면 그 자체로 시나리오 진행 불가다. 다른 파일을 고르거나 시나리오 갱신을 권고할 것 — **빈 줄을 직접 만들어 검증을 위조하지 말 것.**

### 3) OnlyOffice/Hiworks 에디터 조작 실무 (검증된 패턴)

ONLYOFFICE 편집기는 일반 DOM 페이지와 다르게 동작한다. 아래는 실측으로 확인된 패턴이다.

- **첫 로드 시 CORS/PNA 차단 → 새로고침 1회로 복구**: `문서편집` 진입 직후 화면이 **백지**이고 콘솔에 `Error load DocsAPI` + *"Permission was denied for this request to access the `local` address space"*(Chrome Private Network Access) 가 보이면, OnlyOffice `api.js` 가 차단된 것이다. **`/edit` URL 로 한 번 새로고침**(`browser_navigate` 재호출)하면 정상 로드된다. 새로고침 후 에디터 캔버스·툴바가 뜰 때까지 **5~10초 대기**. 이 백지 상태를 FAIL 로 오판하지 말 것 (인프라 이슈이며 메인 반환 요약에 1줄로 보고).
- **2중 iframe 구조**: 에디터 본체는 cross-origin iframe `frameEditor`(스냅샷 ref `f1e*`), 우측 AI 패널은 별도 iframe `#ai-chat-iframe-panel`(ref `f2e*`). parent 의 `browser_evaluate` 로는 내부 DOM 접근 불가하지만, **`browser_snapshot` 은 로드 후 두 iframe 내부까지 들어가** `f1e*`/`f2e*` ref 를 잡는다. 에디터가 덜 떴을 때 스냅샷이 비면 잠시 더 기다린 뒤 재시도.
- **본문은 canvas 렌더 — 텍스트가 접근성 트리에 안 잡힌다**: 문서/시트/슬라이드 본문 글자는 스냅샷에 안 나온다. 내용 검증은 **스크린샷(시각)** 으로 한다. 본문 스크롤은 `#id_main` 클릭(커서 포커스, 위치 지정만) 후 `browser_press_key('Control+End')` 등으로, 전체 문서를 한 장에 크게 보려면 `browser_take_screenshot` 의 `element` 를 editor iframe 의 `#id_main` 으로 스코프(`-zoom` suffix). 표·셀이 실제 표인지(이미지 아님)는 오른쪽 메뉴의 `표 설정` 버튼이 커서 진입 시 활성화되는지로 보조 확인.
- **토큰 읽는 위치**: 각 응답 말미에 `Tokens / input: N | output: M | total: T` 줄이 붙는다. 여기서 `in_tokens`/`out_tokens` 정수를 읽는다.
- **스크린샷 경로는 절대경로**: `browser_take_screenshot` 의 `filename` 은 **프로젝트 루트 안 절대경로**(`C:/Users/.../QA_onlyoffice_v2/reports/{RUN-ID}/screenshots/...png`)로 준다. 상대경로는 MCP 가 다른 베이스로 해석해 `File access denied` 가 난다.
- **AI 채팅 입력 → 전송 (Enter 전송 권장)**: 입력창(`f2e*` textbox)에 `browser_type` 으로 프롬프트 입력 → `02-prompt` 캡처 → **`t_send = browser_evaluate(() => Date.now())` (필수, 빼먹으면 wait_ms 가 null) → 곧바로 입력창 포커스 상태에서 `Enter` 키로 전송**. 모델은 시나리오 지정값(현재 `GPT 5.4`)인지 패널 하단 모델 선택 버튼으로 확인. "AI채팅 Pro로 업그레이드 되었습니다" 다이얼로그는 닫기(X).
- **전송은 무조건 Enter — `전송` 버튼 클릭 금지 (ISS-005)**: AI 채팅 패널의 `전송` 버튼은 LNB 드로어 backdrop(`fixed inset-0 z-50`)이 떠 있으면 클릭이 가로막힌다. 그러니 **버튼을 누르지 말고 입력창 포커스 상태에서 항상 `Enter`** 로 전송한다(위 "AI 채팅 입력 → 전송" 항목과 동일). `t_send` 는 반드시 **Enter 직전**에 읽는다. 혹시 막혀 전송이 밀린 TC 는 그 TC 의 wait_ms 를 `null` 처리.
- **캡처 전 LNB(즐겨찾기·채팅기록 목록) 반드시 접기 — 안 접으면 화면 가림**: AI 채팅 패널은 열리면 **좌측 LNB(`새 대화`·`즐겨찾기`·`채팅기록` 목록)가 기본으로 펼쳐져** 패널의 상당 부분을 차지한다. 이 상태로 `03-after` 등을 캡처하면 AI 응답·토큰 영역이 목록에 가려 **증거로 못 쓴다**. **첫 프롬프트 전송 전에 LNB 를 접고, 접혔는지 스냅샷으로 확인**한 뒤 진행한다.
  - 접는 법: 패널 좌상단 `사이드바 토글` 클릭 → **스냅샷으로 검증**. 아이콘 레일만 남고 `즐겨찾기`/`채팅기록` 목록이 사라졌으면 OK.
  - ⚠️ 토글이 backdrop(`fixed inset-0 z-50`) 딸린 **드로어로 열려버리면**(좁은 패널에서 발생) `Escape` 로 닫는다. backdrop 이 남아 있으면 캡처도 전송 클릭도 막히므로, **캡처는 backdrop·펼친 목록이 모두 사라진 깨끗한 화면에서만** 한다.
  - 토글로 깔끔히 접히지 않으면 폴백: 결과 캡처를 에디터 본문(editor iframe `#id_main`)으로 **스코프(`-zoom` suffix)** 해 LNB 를 프레임 밖으로 뺀다.
  - **자기점검**: `03-after` 캡처를 저장한 직후 그 이미지를 Read 로 열어 **우측이 채팅기록 목록에 가려지지 않았는지 눈으로 확인**한다. 가려졌으면 LNB 를 접고 재캡처.
- **빈 문서 사전조건 복원 (커넥터 자동저장)**: AI 시나리오 1단계(백지 작성)는 빈 DOCX/시트/슬라이드를 전제하나, 커넥터가 **시험 모드에서도 변경분을 자동저장**(상태바 "모든 변경 사항이 저장되었습니다")해 직전 회차 산출물이 그대로 남아 있을 수 있다. 이 경우 본문 클릭 → `Ctrl+A` → `Delete` 로 **백지만 복원**한 뒤 진행한다. 이는 환경 초기화이며 AI 가 해야 할 작업(타이핑·서식·표 삽입) 위조가 아니다 — 결코 본문에 내용을 직접 채우지 말 것. 복원 사실은 result.md 에 1줄 남긴다.

---

## 중요 규칙

- **민감 정보 보호**: `environments/*.md` 의 비밀번호·토큰 등은 `progress.jsonl`, `result.md`, 메인 반환 요약 어디에도 절대 포함 X
- **prd 환경 주의**: 환경이 `prd` 이고 데이터 변경 시나리오면, 실행 전 메인 Claude 에게 한 번 더 명시적 확인 요청
- **실패 처리**: TC 가 실패해도 시나리오 끝까지 계속 진행 (조기 abort 금지). 단, 후속 TC 가 실패한 TC 결과에 의존하면 `BLOCKED` 처리
- **타임아웃**: TC 1개당 최대 **60초**, 시나리오 전체 최대 **5분**. 초과 시 `FAIL` + `note` 에 `"timeout"` 명시
- **브라우저 정리**: 시나리오 끝나면 페이지·컨텍스트 닫음
- **컨텍스트 절약**: 메인에 반환할 때는 요약만. 스크린샷·DOM·콘솔 로그는 디스크에만 남기고 반환값에 포함 X
