# 메일 AI 사이드패널 — 미사용 추천기능·고급 동작 검증 (SCN-04) — 실행 결과

**RUN-ID**: RUN-20260610-1058-dev
**환경**: dev (계정3 changseok@joy1.com)
**모델**: ⚠️ **Claude Haiku 4.5 (패스트)** — 계정3 스마트모델(Sonnet 4.6) 일일 한도 소진(6/15 리셋)으로 패스트 폴백 사용
**시간**: 13:00 ~ 13:14 (약 14m)
**결과**: ✅ 5 Pass / ❌ 0 Fail

## 사용자 흐름
추천기능 칩을 직접 클릭(프롬프트 타이핑 아님)해 동작·결과를 확인. substrate는 "신제품 출시 기념 사은품 이벤트 안내"(제목+4문단, 의도적 오타·띄어쓰기 7곳)를 insert_editor_blocks로 주입.

## TC-01: 추천기능 칩 클릭 — 내용 요약 — ✅ PASS
- 입력: "📋 내용 요약" 칩 클릭
- 결과: 칩이 summarize_document 트리거 → 요약 4줄(목적·기간·참여방법·주의사항)을 📋요약 블록으로 본문 최상단 삽입. 원본 본문 보존.
- 검증: 칩 클릭만으로 트리거 ✓ · 핵심 반영 ✓ · 본문 보존 ✓
- 토큰: in 110,495 / out 1,497 · ~37s
- 스크린샷: `screenshots/adv-tc01-02-prompt.png`, `adv-tc01-03-after.png`

## TC-02: EMS 메일 템플릿 — ✅ PASS
- 입력: "📧 EMS 메일 템플릿" 칩 클릭
- 결과: create_ems_template 트리거 → 기존 본문 감지 후 **전체교체/뒤에추가/취소 선택지 제시**(자동 덮어쓰기 안 함). "뒤에 추가" 선택 시 table 기반 EMS 템플릿(헤더🎁·기간 배너·참여방법·CTA버튼·푸터©) 본문 뒤 삽입. 깨짐 없음. placeholder(CTA URL·브랜드명) 교체 안내 동봉.
- 검증: 템플릿 구조 삽입 ✓ · 깨짐 없음 ✓ · 기존 본문 처리(선택지→뒤에추가) ✓
- 토큰: in 3,049 / out 1,904 (적용 단계) · ~40s
- 스크린샷: `screenshots/adv-tc02-02-prompt.png`, `adv-tc02-03-after.png`, `adv-tc02-03b-after.png`

## TC-03: 에디터 내용 유효성 검사 — ✅ PASS
- 입력: "✅ 에디터 내용 유효성 검사" 칩 클릭
- 결과: diagnose_mail_send_readiness 트리거 → 진단 리포트(⚠️ 임시URL 경고 https://example.com/event, ✅표 3개 정상·빈본문 없음·보호영역 정상, 발송 전 체크리스트). **본문 무변경(LEN 667→667)** = 리포트형.
- 검증: 검사 결과 패널 표시 ✓ · 본문 미변경 ✓ · 항목별 안내 ✓
- 토큰: in 2,107 / out 685 · ~46s
- 스크린샷: `screenshots/adv-tc03-02-prompt.png`, `adv-tc03-03-after.png`

## TC-04: 맞춤법 검사하기 — ✅ PASS
- 입력: "🔍 맞춤법 검사하기" 칩 클릭
- 결과: check_grammer_in_contents 트리거 → 의도한 오타 7곳 전부 검출(마케팅팀임니다→입니다, 예정 입니다→예정입니다, 마는→많은, 까지 입니다→까지입니다, 종료될수→될 수, 참고 하세요→참고하세요, 감사합니당→감사합니다). 원문/수정제안 제시(리포트형, 본문 자동적용 안 함). 정상 문장·EMS 정상부 오교정 없음.
- 검증: 오타 검출 ✓ · 교정 후 의미 유지 ✓ · 오교정 없음 ✓
- 비고: AI 코멘트가 "총 4개"라 적고 실제 7곳 나열 — **개수 표기 불일치(경미)**.
- 토큰: in 4,688 / out 2,398 · ~56s
- 스크린샷: `screenshots/adv-tc04-02-prompt.png`, `adv-tc04-03-after.png`

## TC-05: 문서 서식 정리 — ✅ PASS (⚠️ 응답 지연)
- 입력: "📝 문서 서식 정리" 칩 클릭
- 결과: format_document 트리거 → 제목 h2 격상·빈 p 삭제·본문 4단락 일관 서식 적용. EMS table 보존. 텍스트 내용 손실 없음(LEN 667→662, 빈줄 제거분). 과도한 재작성 없음(오타 텍스트도 그대로 — 서식만 변경).
- 검증: 서식 일관성 향상 ✓ · 내용 손실 없음 ✓ · 과도한 재작성 없음 ✓
- 비고: editor_batch_format_commands의 setHeading 미지원 → replace_editor_block로 자가복구. 응답 ~76s(60s 초과).
- 토큰: in 13,321 / out 3,258 · ~76s
- 스크린샷: `screenshots/adv-tc05-02-prompt.png`, `adv-tc05-03-after.png`

## 핵심 관찰
- **추천기능 칩 5종 전부 정상 동작**: 칩 클릭만으로 해당 스킬(summarize_document·create_ems_template·diagnose_mail_send_readiness·check_grammer_in_contents·format_document) 정확히 트리거. 리포트형(요약/유효성/맞춤법)과 적용형(EMS/서식)이 의도대로 구분 동작.
- **EMS 칩의 안전한 기존본문 처리**: 자동 덮어쓰기 대신 선택지 제시 — 좋은 UX.
- **⚠️ ISS-104 재현·심화**: 계정3 스마트모델(Sonnet 4.6)도 SCN-03 과다추론으로 일일 한도 소진(6/15 리셋). 단 **패스트모델(Haiku 4.5)은 정상 동작**(연결오류 없음) — 패스트 폴백이 이 시나리오에선 실사용 가능. 각 패널 작업이 입력 수만~11만 토큰을 소모(TC-01 110k)하는 구조가 한도 급소진의 근인.
- **경미 결함 2건**: 맞춤법 검출 개수 표기 불일치(4 vs 7), format_document의 setHeading 커맨드 미지원(자가복구됨).

## 정책 참조
- `specs/` — 메일 AI 어시스턴트 추천기능 명세 (칩 동작·EMS 템플릿·유효성 검사)
