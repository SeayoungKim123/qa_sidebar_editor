# 메일 AI 사이드패널 — 여러 요소 한번에 변경하기 (SCN-03) — 실행 결과

**RUN-ID**: RUN-20260610-1058-dev
**환경**: dev (계정3 changseok@joy1.com, 모델 Claude Sonnet 4.6)
**시간**: 11:01 ~ 11:12 (약 11m)
**결과**: ✅ 4 Pass / ❌ 0 Fail

## 사용자 흐름
선택 없이 전송하는 전역 명령으로 메일 전체를 한 번에 재가공. 일괄 명령 누적(뒤 명령이 앞 결과 위에 덮임). substrate는 "하반기 전사 워크숍 안내"(제목+4문단, 일정/장소/준비물/점심 나열)를 AI `insert_editor_blocks`로 교정 없이 주입.

## TC-01: 전체 톤 변환 — ✅ PASS
- 입력: `"메일 전체를 가벼운 캐주얼한 톤으로 바꿔줘"`
- 단계별 결과:
  1. convert_tone → get_editor_text → get_editor_blocks → replace_editor_block ×4 ✓
  2. 전 4문단 캐주얼 일괄 전환(~이에요/~할게요/~주세요, 😊) ✓
  3. 일정·장소·준비물·점심·회신일 등 핵심 정보 누락 0 ✓
- 토큰: in 9,330 / out 3,174 · AI작업 ~72s
- 스크린샷: `screenshots/bulk-tc01-02-prompt.png`, `bulk-tc01-03-after.png`

## TC-02: 글머리 기호 정리 — ✅ PASS
- 입력: `"본문에서 나열되는 부분을 글머리 기호 목록으로 정리해줘"`
- 단계별 결과:
  1. organize_list → get_editor_blocks → replace_editor_block(인트로) → create_editor_list ✓
  2. 행사 정보 나열 4항목(일시·장소·준비물·점심)이 불릿 목록(li×4)으로 변환 ✓
  3. 일반 문단(인사말·목적·참석여부)은 목록화되지 않음 ✓ · 항목 수 보존 ✓
- 토큰: in 8,066 / out 1,871 · AI작업 ~69s
- 스크린샷: `screenshots/bulk-tc02-02-prompt.png`, `bulk-tc02-03-after.png`

## TC-03: 전체 내용 다듬기 — ✅ PASS (⚠️ 응답 지연)
- 입력: `"메일 전체 내용을 매끄럽고 자연스럽게 다듬어줘"`
- 단계별 결과:
  1. refine_mail_content → get_editor_text → get_editor_blocks → replace_editor_block ×4 ✓
  2. 4문단 윤문(조사 정리·문장 분리·표현 자연화), 의미 유지 ✓
  3. **TC-02 글머리 구조 보존** ✓ (AI가 "list items already well-written, keep as is"로 명시, li×4 유지)
  4. 핵심 정보 누락 0 ✓
- 토큰: in 12,082 / out 7,644(출력 과다) · AI작업 **~130s (60s 초과 — 성능 이슈)**
- 비고: 스마트모델이 "적용 vs 채팅 표시" 정책을 과도하게 숙고하며 출력 토큰 폭증, 응답 지연.
- 스크린샷: `screenshots/bulk-tc03-02-prompt.png`, `bulk-tc03-03-after.png`

## TC-04: 전체 번역 — ✅ PASS (⚠️ 응답 지연)
- 입력: `"메일 전체를 영어로 번역해줘"`
- 단계별 결과:
  1. translate_mail_content → get_editor_blocks → replace_editor_block ×다수 ✓
  2. 전 본문 영문화 — **한국어 잔존 0건** ✓ · 문단·목록(li×4) 구조 유지 ✓ · 의미 보존 ✓
  3. ul setHTML 1회 실패 후 method="replace"로 자가복구 ✓ (최종 정상)
- 토큰: in 8,952 / out 4,052 · AI작업 **~95s (60s 초과 — 성능 이슈)**
- 스크린샷: `screenshots/bulk-tc04-02-prompt.png`, `bulk-tc04-03-after.png`

## 핵심 관찰
- **일괄(전역) 명령 4종 모두 정상 동작**: 톤변환·글머리정리·다듬기·번역이 본문 전체에 일관 적용되고, 누적 상태(앞 결과 위에 덮기)도 정확. 정보 누락 0.
- **글머리 구조의 명령 간 보존 확인**: TC-02 불릿이 TC-03 다듬기·TC-04 번역을 거치며 4항목 구조 그대로 유지.
- **⚠️ 응답 지연(신규)**: TC-03(~130s)·TC-04(~95s)가 60s TC 한도 초과. 스마트모델(Sonnet 4.6)의 과다 추론(특히 "에디터 적용 vs 채팅 출력" 정책 숙고)이 출력 토큰·지연을 키움. 기능은 정상이나 UX 대기시간 문제.

## 정책 참조
- `specs/` — 메일 AI 어시스턴트 사용 가이드 (톤 변환·글머리 정리·다듬기·번역 범위)
