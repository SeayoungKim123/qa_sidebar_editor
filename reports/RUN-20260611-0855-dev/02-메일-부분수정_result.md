# 메일 AI 사이드패널 — 선택 요소 스타일 편집 (부분·인라인 서식) — 실행 결과

**RUN-ID**: RUN-20260611-0855-dev
**환경**: dev (계정: seokjoong, 모델: Claude Sonnet 4.6)
**시간**: 08:56 ~ 10:06 (약 70m, 셀렉션 메커니즘 분석 포함)
**결과**: ✅ 4 Pass / ❌ 0 Fail (4/4 · 100%)

## 사용자 흐름
여러 문단으로 채워진 메일을 대상으로, 한 요소씩만 드래그 선택해 인라인 문자 서식을 누적 적용. 본문 fixture 는 AI `insert_editor_blocks` 로 5개 문단(인사·워크숍일정·안건·참석안내·맺음말) 주입 후 진행. 각 TC 는 직전 서식 위에 누적.

## 사전 셋업 / 환경 메모
- PRE-FLIGHT 5종 통과: 모달(보안 재로그인·인앱마케팅) 클리어 · URL 정상 · **메일 LNB 접힘 측정 64(≤100)** · AI 패널 열림('작성 중인 메일 참조 중') · 모델 Claude Sonnet 4.6.
- **에디터 = SmartEditor ONE 구조 발견(중요)**: 본문 문단은 `user-select:none` 의 렌더 iframe 에 있고 contenteditable 이 아님. DOM Selection API 로는 선택이 잡히지 않아, **실제 마우스 드래그(page.mouse)** 로 SmartEditor 내부 선택을 발생시켜야 했다. AI 는 `get_selected_editor_content` 로 그 선택을 정확히 읽어 동작 — 즉 드래그 선택 경로가 정상 작동함을 확인.
- 진행 중 `서버 오류(500)` 다이얼로그 1회 발생(TC-02 직전) → 닫기로 처리, 선택·작업 영향 없음.

## TC-01: 선택 문단 글자 크기 키우기 — ✅ PASS
- 입력: 문단2(워크숍 일정) 드래그 선택 + "선택한 문단의 글자 크기를 더 크게 키워줘"
- 단계별 결과:
  1. AI 가 `get_selected_editor_content` 로 선택 문단 정확히 인식 ✓
  2. `editor_batch_format_commands` 로 해당 문단 span 에 `font-size:16pt` 적용 → 16px(기본)→21.3px 확대 ✓
  3. 나머지 문단 전부 16px 무변동 · 텍스트 내용 불변 ✓
- 검증: 선택 문단만 크기↑ · 번짐0 · 텍스트 불변. 토큰 in 4.6k / out 834.
- 스크린샷: `screenshots/mail-edit-tc01-02-prompt.png`, `screenshots/mail-edit-tc01-03-after.png`

## TC-02: 선택 텍스트 글자색 변경 — ✅ PASS
- 입력: 문단4(참석안내·연락처) 드래그 선택 + "선택한 부분 글자색을 빨간색으로 바꿔줘"
- 단계별 결과:
  1. AI 가 선택 구간 인식 후 `replace_selected_editor_content` 로 동일 텍스트 + 빨강 적용 ✓
  2. 문단4 색 = rgb(255,0,0) · 나머지 문단 rgb(0,0,0) 무변동 ✓
  3. 텍스트 내용 불변(단어 치환·재작성 없음) ✓
- 검증: 선택 구간만 글자색 · 비선택 무변동 · 내용 불변. 토큰 in 6.6k / out 759.
- 스크린샷: `screenshots/mail-edit-tc02-02-prompt.png`, `screenshots/mail-edit-tc02-03-after.png`

## TC-03: 선택 구간 굵게 + 형광펜 강조 — ✅ PASS
- 입력: 문단3(주요 안건) 드래그 선택 + "이 문장을 굵게 하고 노란 형광펜으로 강조해줘"
- 단계별 결과:
  1. 굵게(font-weight 700) + 노란 형광펜(background rgb(255,255,0)) **동시** 적용 ✓
  2. 적용 범위가 선택 문장과 일치 · 타 문단 무변동 ✓
  3. 텍스트 내용 불변 ✓
- 검증: 굵게·하이라이트 둘 다 · 범위 정확 · 내용 불변. 토큰 in 2.2k / out 539.
- 스크린샷: `screenshots/mail-edit-tc03-02-prompt.png`, `screenshots/mail-edit-tc03-03-after.png`

## TC-04: 지정 문장 밑줄·기울임 — ✅ PASS
- 입력: 문단1(인사말) 드래그 선택 + "이 문장에 밑줄을 긋고 기울임체로 만들어줘"
- 단계별 결과:
  1. 밑줄(text-decoration underline, `<u>`) + 기울임(font-style italic, `<i>`) 적용 ✓
  2. 다른 문장 서식 무변동 ✓
  3. 텍스트 내용 불변 ✓
- 검증: 밑줄·기울임 적용 · 타 문장 무변동 · 내용 불변. 토큰 in 2.0k / out 394.
- 스크린샷: `screenshots/mail-edit-tc04-02-prompt.png`, `screenshots/mail-edit-tc04-03-after.png`

## 종합 관찰
- **인라인 문자 서식 4종(크기·색·굵게+형광펜·밑줄+기울임) 전부 정상**. 매 TC 선택 범위에만 정확히 적용, 텍스트 불변, 비선택 영역 번짐0. 누적 적용도 충돌 없이 보존(최종 화면에 4효과 공존).
- **응답 지연(wait_ms)**: 각 작업 send→본문 반영 실측 경과가 대략 30~45초 구간으로 관찰됐으나, 도구(크로스오리진 패널 읽기·스냅샷) 오버헤드와 순수 AI 작업 시간을 깔끔히 분리하기 어려워 `wait_ms` 는 `null` 로 기록. 60초 초과·timeout 은 없었음. (ISS-105 의 Sonnet 과다추론 지연 경향과 방향 일치 — 별도 정밀 측정 권장.)
- 토큰: 인라인 단일 서식 작업은 in 2~6.6k / out 0.4~0.8k 수준으로, 칩·전체생성 대비 경량.

## 정책 참조
- `specs/` — 메일 AI 어시스턴트 인라인 서식(글자 크기·색·굵게·기울임·밑줄·형광펜)
- 시나리오: `scenarios/02-메일-부분수정.md`
