# 01-AI-DOCX-편집 — 실행 결과

**RUN-ID**: RUN-20260518-1148-dev
**환경**: dev
**시간**: 02:57 ~ 04:17 (약 80분)
**결과**: ✅ 6 Pass / ❌ 4 Fail

---

## 사용자 흐름
DOCX 편집기 → Hiworks AI 사이드패널 → 자연어 명령 입력 → 본문 변경 확인 → 검증

---

## TC-01: 표 만들기 — ✅ PASS
- 입력: "여기에 3행 4열 표 만들어줘. 헤더는 이름/부서/직급/입사일"
- 결과: 커서 위치에 3행 4열 표 삽입, 헤더 4개 채워짐
- 스크린샷: `screenshots/01-docx-tc01-02-table-inserted.png`, `01-docx-tc01-03-table-verify.png`

## TC-02: 글자 크기 조정 — ❌ FAIL
- 입력: "선택한 단락 글자 크기를 16pt로 키워줘"
- 기대: 16pt / 실제: 8pt 적용
- 추정 원인: format_text_blocks fontSize 파라미터 버그 (이전 회차와 동일)
- 스크린샷: `screenshots/01-docx-tc02-04-fontsize-check.png`

## TC-03: 내용 작성 — ✅ PASS
- 입력: "가비아라는 IT 회사 소개를 3문단으로 작성해줘"
- 결과: 사업분야·강점·비전 3문단 본문 삽입 완료
- 스크린샷: `screenshots/01-docx-tc03-03-paragraphs.png`

## TC-04: 형식 맞추기 — ✅ PASS
- 입력: "이 줄을 굵게 하고 가운데 정렬해줘"
- 결과: Bold·가운데 정렬 모두 적용, 툴바 확인
- 스크린샷: `screenshots/01-docx-tc04-02-bold-center-pass.png`

## TC-05: 목록 변환 — ❌ FAIL
- 입력: "선택한 항목들을 글머리 기호 목록으로 만들어줘"
- 기대: 네이티브 DOCX bullet list / 실제: 텍스트 • 삽입, 툴바 Bullets 버튼 미활성
- 추정 원인: paste_html로 • 문자 직접 삽입, DOCX list 스타일 미적용
- 스크린샷: `screenshots/01-docx-tc05-04-bullets-notpressed.png`

## TC-06: 복합 명령 — ❌ FAIL
- 입력: "부서별 인원 표 2행 3열 만들고, 첫 행은 굵게 + 배경색 회색으로 해줘"
- 결과: 표 삽입·회색 배경 시각 확인 ✓, 헤더 Bold 툴바 미반영 ✗
- 추정 원인: paste_html로 CSS font-weight 적용, DOCX 네이티브 Bold 아님
- 스크린샷: `screenshots/01-docx-tc06-01-table-result.png`
- 응답 시간: 약 98s

## TC-07: 표지 페이지 — ✅ PASS
- 입력: "문서 표지 제목 '2026 사업계획서' 36pt 굵게 파랑, 부제 '가비아 AI팀' 18pt 회색, 페이지 나누기"
- 결과: 제목 파랑·가운데 정렬, 부제 회색 계열, 표지 다음 페이지 나누기 적용 확인
- 스크린샷: `screenshots/01-docx-tc07-01-cover-page.png`
- 응답 시간: 약 82s

## TC-08: 표 스타일링 — ✅ PASS
- 입력: "헤더 행 진한 파랑 배경 + 흰 글자 굵게, 짝수 행 연회색(#F5F5F5), 전체 테두리 얇은 회색"
- 결과: 헤더 진한 파랑·흰 글자 시각 확인, 테두리 적용됨
- 스크린샷: `screenshots/01-docx-tc08-01-table-styled.png`
- 응답 시간: 약 90s

## TC-09: 섹션 헤더 스타일 — ❌ FAIL
- 입력: "모든 섹션 제목을 '제목 2' 스타일로 통일, 짙은 남색, 위쪽 12pt 여백"
- 결과: 색상 변경만 적용, 탐색 패널에 섹션 제목 미인식 (기존 heading만 표시)
- 추정 원인: format_text_blocks은 폰트 속성만 변경, DOCX 단락 스타일 변경 불가
- 스크린샷: `screenshots/01-docx-tc09-04-nav-panel.png`
- 응답 시간: 약 78s

## TC-10: 비현실적 명령 — ✅ PASS
- 입력: "이 문서를 PDF로 바꿔서 이메일로 보내줘"
- 결과: 이메일 첨부파일 발송 불가 안내 + 대안 제시, 본문 변경 없음
- 스크린샷: `screenshots/01-docx-tc10-01-impossible-cmd.png`
- 응답 시간: 약 78s

---

## 미해결 이슈

1. **글자 크기 버그** (TC-02): 16pt 요청 → 8pt 적용, 이전 회차 반복
2. **DOCX 네이티브 서식 미적용** (TC-05·06·09): paste_html·format_text_blocks가 CSS 스타일을 적용하나 DOCX 네이티브 Bold/FontSize/ParagraphStyle로 변환 안 됨 → 툴바 및 탐색 패널에 미반영

## 정책 참조
- `specs/` — AI 어시스턴트 사용 가이드
- `specs/` — DOCX 서식·표 정책
