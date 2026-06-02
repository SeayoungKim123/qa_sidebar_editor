# DOCX 실사용 흐름 — 백지에서 작성하고 다듬기 — 실행 결과

**RUN-ID**: RUN-20260602-1157-dev
**환경**: dev
**대상 파일**: `새 문서.docx` (빈 DOCX, `/Daniel/2차 테스트_20260602`)
**시간**: 12:03 ~ 12:11 (약 8m, 샘플 시험 실행)
**범위**: TC-01 ~ TC-03 (앞 3개 TC만, 파이프라인 검증용 트라이얼)
**결과**: ✅ 3 Pass / ❌ 0 Fail

## 사용자 흐름
빈 DOCX 1개를 열어 우측 AI 사이드패널(GPT 5.4)에 프롬프트만 전송하며, 1단계(백지 작성) TC-01~03을 순서대로 수행. 본문 직접 편집 없이 AI가 문서를 편집하는지 관찰·검증.

## 진입 경로
로그인 → 드라이브(`feature-browser-mcp-files...`) → `새 문서.docx` 행 호버 → **미리보기 (MCP ver) 플라스크 아이콘** 클릭 → 새 탭 문서편집 → Hiworks AI 탭 → AI 채팅 → 사이드패널(GPT 5.4) → 업그레이드 안내 닫기.

> ⚠️ **진입 중 발견한 이슈 2건** (아래 "관찰된 이슈" 참조)

## TC-01: 개요 단락 작성 — ✅ PASS
- 입력: 빈 문서 맨 위, 프롬프트 `"가비아 2026 사업계획서 개요를 3문단으로 작성해줘. 회사 소개, 올해 방향성, 기대효과 순서로"`
- 단계별 결과:
  1. AI가 `create_document` → `get_document_overview`(빈 문서 확인) → `insert_document_blocks` 호출 ✓
  2. 커서 위치에 한국어 3개 단락 삽입 ✓
- 검증:
  - 1문단 회사 소개(클라우드·도메인·호스팅·보안 IT 전문기업) ✓
  - 2문단 2026 방향성(AI·클라우드 중심 고도화, 중소·중견 맞춤) ✓
  - 3문단 기대효과(고객 충성도·신규 유입·매출 성장) ✓
  - 총 글자 수 수백 자(200자 이상), 단락 구분 명확, 깨짐 없음 ✓
- 토큰: input 22,826 / output 1,036
- 스크린샷: `screenshots/01-docx-tc01-01-before.png`, `...-02-prompt.png`, `...-03-after.png`, `...-03b-after-body-zoom.png`

## TC-02: 섹션 구조 생성 — ✅ PASS
- 입력: 개요 아래, 프롬프트 `"개요 다음에 '1. 시장환경', '2. 사업전략', '3. 추진일정' 세 섹션을 만들어줘. 각 섹션은 제목 한 줄 + 본문 2문단"`
- 단계별 결과:
  1. AI가 `manage_cursor`(문서 끝 이동) → `insert_document_blocks` 호출 ✓
  2. 제목 3개(1./2./3.) + 각 본문 2문단 삽입 ✓
- 검증:
  - 제목과 본문 시각적 구분(파란 제목 스타일 vs 본문) ✓
  - 섹션 순서 정확(시장환경 → 사업전략 → 추진일정) ✓
  - TC-01 개요 단락 변형 없음 ✓
- 토큰: input 3,046 / output 1,408
- 스크린샷: `screenshots/01-docx-tc02-01-before.png`, `...-02-prompt.png`, `...-04-after-body.png`, `...-05-after-end.png`, `...-06-after-section3-zoom.png`

## TC-03: 표 삽입 — ✅ PASS
- 입력: 추진일정 아래, 프롬프트 `"추진일정 섹션 아래에 분기별 일정표를 만들어줘. 4행 3열, 헤더는 분기/과제/담당, 1Q~3Q 더미 데이터 채워줘"`
- 단계별 결과:
  1. AI가 `table_management` → `get_document_overview` → `insert_table` 호출 ✓
  2. 4행 3열 표 삽입 ✓

| 분기 | 과제 | 담당 |
|---|---|---|
| 1Q | 시장 분석 및 핵심 과제 도출 | 전략기획팀 |
| 2Q | 서비스 개편 및 신규 기능 출시 | 플랫폼사업팀 |
| 3Q | 성과 점검 및 전략 보완 | 경영기획팀 |

- 검증:
  - 4행 3열, 첫 행 헤더(분기/과제/담당) ✓
  - 아래 3행 1Q~3Q 더미 데이터 ✓
  - 그리드 테두리로 렌더된 실제 표(이미지 아님) ✓
  - 다른 섹션 변형 없음(개요·1·2·3 모두 유지) ✓
  - ※ "표 셀 클릭 편집 가능"은 캔버스 좌표 클릭 제약으로 정밀 미실행 / "저장→재오픈 영속"은 이번 3-TC 샘플 범위에서 미실행
- 토큰: input 5,853 / output 852
- 스크린샷: `screenshots/01-docx-tc03-01-before.png`, `...-02-prompt.png`, `...-04-after-table.png`, `...-05-after-table-zoom.png`

## 관찰된 이슈 (인프라/측정)
1. **에디터 첫 로드 시 OnlyOffice api.js CORS 차단** — `onlyoffice-docs-server.devoffice.hiworks.com/.../api.js` 가 `"Permission was denied for this request to access the local address space"`(Chrome Private Network Access)로 blocked → `Error load DocsAPI`, 화면 백지. **새로고침 1회로 정상 로드**. 첫 진입 사용자 체감에 영향 가능 — 재현성/원인(PNA 프리플라이트) 점검 권고.
2. **드라이브 URL 변경** — `environments/dev.md` 의 드라이브 호스트가 `files...` → `feature-browser-mcp-files...` 로 갱신됨(사용자 수정 반영).
3. **AI 작업 시간(wait_ms) 미측정** — 본 하네스에서 응답 완료를 시각 폴링으로 판정하다 보니 스냅샷·분석 지연이 측정값을 오염시켜, 3개 TC 모두 `wait_ms: null` 로 기록. 정확 측정에는 응답 완료 프로그래매틱 훅(완료 시점 즉시 시계 읽기)이 필요 — 측정 절차 개선 권고.

## 정책 참조
- `scenarios/01-DOCX-실사용흐름.md` (TC 명세)
- `specs/` (AI 어시스턴트 사용 가이드, DOCX 서식·표 정책)
