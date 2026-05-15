# 02-AI-PPT-편집 — 실행 결과

**RUN-ID**: RUN-20260515-1703-dev
**환경**: dev
**시간**: 17:03 ~ 17:40 (약 37분 — 1차 실행 + BLOCKED 4건 실측 재시도)
**결과**: ✅ 1 PASS / ❌ 7 FAIL / 🚫 2 BLOCKED
**대상 파일**: `HiWorks_AIChat_Intro.pptx` (초기 5슬라이드)
**모델**: GPT 5.4 (시나리오 사전조건은 GPT 4.1, 동일 환경 한계)

> ⚠️ 1차 실행에서 TC-05/07/08/09 를 "AI 동작 패턴 추정" 으로 BLOCKED 처리한 부분이 잘못되어 실측 재시도 진행. 본 리포트는 재시도 결과 반영본.

## 사용자 흐름
1. 로그인 → 드라이브 → PPTX 파일 행 hover → 두 번째 "미리보기 (MCP ver)" 플라스크 아이콘 클릭
2. 새 탭에서 ONLYOFFICE 편집기 진입 → 상단 "문서편집" → "Hiworks AI" 탭 → "AI 채팅" 버튼
3. 우측 AI 사이드패널 활성 → 각 TC 프롬프트 전송

## TC-01: 슬라이드 추가 — ❌ FAIL
- 프롬프트: `"분기별 매출표(1Q~4Q, 매출액) 슬라이드 1장 추가해줘"` → AI 가 Native/HTML 방식 확인 후 "1번"으로 진행
- 결과: 슬라이드 +1 (5→6), 1Q~4Q + 매출액 헤더 OK
- **FAIL 이유**: 표가 PPTX 네이티브 표 객체 아님 — `compose_native_slide` 첫 시도 invalid_rect 실패 → `patch_native_slide` rectangle shape + text 박스 조합으로 표 시뮬레이션
- 스크린샷: `screenshots/02-ppt-tc01-01-slide6-added.png`

## TC-02: 글자 크기 36pt — 🚫 BLOCKED
- 프롬프트: `"1번 슬라이드의 제목 글자 크기를 36pt로 키우고 굵게 해줘"`
- AI 가 `get_selected_text` 호출 후 "제목을 클릭해 선택한 뒤 다시 보내달라" 거절
- 자동화로 cross-origin canvas 텍스트 선택 불가 → 검증 불가
- 스크린샷: `screenshots/02-ppt-tc02-01-ai-asks-select.png`

## TC-03: 회사 소개 슬라이드 3장 — ❌ FAIL
- 프롬프트: `"가비아 IT 회사 소개 슬라이드 3장 만들어줘. 1)표지 2)사업분야 3)비전. 각 슬라이드 본문은 글머리 기호 3개"`
- 결과: 슬라이드 +3 (6→9), 슬라이드 7/8/9 모두 완전히 빈 슬라이드
- **FAIL 이유**: 본문 텍스트·도형 렌더링 0건, 표지/사업분야/비전 제목·글머리 기호 미적용
- 스크린샷: `screenshots/02-ppt-tc03-02-slide9-vision.png`

## TC-04: 본문 가운데 정렬 + 색상 — 🚫 BLOCKED
- 프롬프트: `"2번 슬라이드 본문을 가운데 정렬하고 글자 색을 파랑(#1E66F5)으로 바꿔줘"`
- AI 가 selection 없이는 부분 수정 거절 ("이걸 적용해줘 라고만 보내셔도 됩니다")
- 자동화 한계 동일
- 스크린샷: `screenshots/02-ppt-tc04-01-slide2.png`

## TC-05: 글머리 기호 3개 추가 — ❌ FAIL (재시도)
- 프롬프트: `"7번 슬라이드 본문에 'AI 편집', '협업', '클라우드' 3개 항목을 글머리 기호로 추가해줘"`
- AI 가 `get_native_deck_state` → `get_selected_text` → `드라이브 검색` → `파일 내용 보기` → `get_html_deck_state` 호출까지 진행
- 본문 텍스트 박스 없음·selection 없음 → 안전 보류 후 "슬라이드 7 전체 재구성" 만 제안
- **FAIL 이유**: 글머리 기호 항목 미삽입 — 검증 포인트 'bullet list 스타일' 불만족
- 스크린샷: `screenshots/02-ppt-tc05-01-ai-response.png`, `screenshots/02-ppt-tc05-02-ai-done.png`, `screenshots/02-ppt-tc05-03-final.png`

## TC-06: 전체 슬라이드 제목 폰트 통일 — ❌ FAIL
- 프롬프트: `"모든 슬라이드 제목을 'Pretendard' 폰트, 32pt, 굵게로 통일해줘"`
- AI: "6~9번 슬라이드 제목만 먼저 통일할까요?" — 1~5번 native modify 회피
- **FAIL 이유**: 검증 포인트 "모든 슬라이드" 불만족
- 스크린샷: `screenshots/02-ppt-tc06-01-ai-response.png`

## TC-07: 디자인 테마 변경 — ❌ FAIL (재시도)
- 프롬프트: `"전체 슬라이드 디자인 테마를 모던 비즈니스 스타일로 바꿔줘. 메인 색상은 짙은 남색(#0F2A5F), 강조색은 주황(#FF8A3D), 배경은 흰색, 제목은 굵은 산세리프"`
- 플로우: 방식 ①/② 질문 → "1" → 9장 구성안 제시 → "네 반영해주세요" → AI 가 `set_native_deck_style` + 9장 `patch_native_slide` 순차 실행 → 최종 완료 안내
- 결과:
  - 슬라이드 1: 짙은 남색 배경만 적용. 제목/부제 텍스트·도형 미렌더링
  - 슬라이드 2~9: 모두 완전히 빈 흰색 (wipe 만 됨)
  - 강조색 주황 미반영
- **FAIL 이유**: TC-03 와 동일 invalid_rect 계열 렌더링 버그. AI 도구 호출은 Approved 되었으나 elements 적용 실패
- 스크린샷: `screenshots/02-ppt-tc07-01-ai-response.png` ~ `screenshots/02-ppt-tc07-06-final.png`

## TC-08: 표지 슬라이드 디자인 — ❌ FAIL (재시도)
- 프롬프트: `"1번 표지 슬라이드를 디자인해줘. 제목 'AI 문서 편집 데모', 부제 '가비아 AI팀 2026', 배경은 짙은 남색 그라데이션, 제목은 흰색 굵게 48pt, 좌측 하단에 작은 강조 도형 추가"`
- AI 완료 안내. 슬라이드 1 캔버스: 짙은 남색 배경만 보임. 제목·부제·도형 모두 미렌더링
- **FAIL 이유**: TC-03/07 동일 렌더링 버그
- 스크린샷: `screenshots/02-ppt-tc08-01-final.png`

## TC-09: 강조 도형 추가 — ❌ FAIL (재시도)
- 프롬프트: `"3번 슬라이드 우측 상단에 'NEW' 라벨이 들어간 빨간색 둥근 사각형 강조 도형을 추가해줘"`
- AI 완료 안내. 슬라이드 3 캔버스: 완전히 빈 흰색. NEW 도형 미렌더링
- **FAIL 이유**: TC-03/07/08 동일 렌더링 버그
- 스크린샷: `screenshots/02-ppt-tc09-01-slide3.png`

## TC-10: 비대상 명령 (영상 변환) — ✅ PASS
- 프롬프트: `"이 슬라이드를 영상으로 변환해줘"`
- AI 명시적 거절 + 대안 제시 ("A. PPTX 노트 추가, B. 영상용 대본/나레이션 먼저 작성")
- 슬라이드 변경 0건
- 스크린샷: `screenshots/02-ppt-tc10-01-refuse.png`

## 핵심 발견 사항

1. **PPTX 네이티브 표 객체 생성 불가** (TC-01): AI 가 도형 묶음으로만 표 시뮬레이션, 셀 병합/표 스타일 등 PPT 표 고유 기능 사용 불가
2. **`patch_native_slide` / `compose_native_slide` elements 렌더링 버그** (TC-03/07/08/09): AI 도구 호출은 모두 Approved · 완료 응답까지 돌아오지만 실제 슬라이드는 배경만 적용되고 텍스트·도형 elements 0건 렌더링. invalid_rect 경고가 일관되게 발생
3. **기존 native 슬라이드 modify 회피** (TC-06): AI 가 새로 추가한 슬라이드만 modify 가능, 원본 1~5번은 패치 회피
4. **selection 의존 한계** (TC-02/04): 자동화 검증에 부적합. 사용자가 직접 클릭하면 작동할 가능성 있으나 본 RUN 에서는 미검증
5. **AI 거절 동작 양호** (TC-10): 비대상 명령에 거절 + 대안 제시 정상

## 정책 참조
- `scenarios/02-AI-PPT-편집.md`
