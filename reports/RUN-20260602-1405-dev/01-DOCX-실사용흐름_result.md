# 01-DOCX-실사용흐름 — 실행 결과

**RUN-ID**: RUN-20260602-1405-dev
**환경**: dev
**시간**: 14:08 ~ 14:33 (약 25m)
**결과**: ✅ 9 Pass / ❌ 0 Fail
**대상 파일**: `새 문서 (2).docx` (빈 DOCX), 모델 `GPT 5.4`

## 사용자 흐름
빈 문서에서 시작해 ① 백지 작성(개요·섹션·표) → ② 개별 요소 수정(단락/제목/표) → ③ 전체 일괄 재서식(제목 통일·표지·본문 정리)까지 하나의 사업계획서를 단계적으로 완성. 본문 직접 편집 없이 AI 사이드패널 프롬프트만으로 진행. 진입 직후 CORS 백지 미재현, 전송은 전 TC Enter 우회.

## TC-01: 개요 단락 작성 — ✅ PASS
- 입력: 빈 문서 / "가비아 2026 사업계획서 개요를 3문단으로…"
- 결과: `create_document`→`get_document_overview`→`insert_paragraphs_at` 호출, 회사 소개·2026 방향성·기대효과 3단락 정확 삽입 (200자 이상, 단락 구분 명확)
- 스크린샷: `screenshots/01-docx-tc01-03-after.png`

## TC-02: 섹션 구조 생성 — ✅ PASS
- 입력: "개요 다음에 '1. 시장환경','2. 사업전략','3. 추진일정' … 제목 한 줄 + 본문 2문단"
- 결과: `manage_cursor`→`insert_document_blocks`, 3개 섹션(제목 2 스타일 + 각 본문 2문단) 순서대로 삽입, 개요 보존. 문서 2페이지로 확장
- 스크린샷: `screenshots/01-docx-tc02-03-after.png`

## TC-03: 표 삽입 — ✅ PASS
- 입력: "추진일정 섹션 아래에 분기별 일정표 … 4행 3열, 헤더 분기/과제/담당, 1Q~3Q 더미"
- 결과: `table_management`→`get_document_overview`→`insert_table`, 4행 3열 네이티브 표(헤더 분기/과제/담당 + 1Q~3Q 더미) 추진일정 아래 삽입
- 스크린샷: `screenshots/01-docx-tc03-03-after.png`

## TC-04: 특정 단락 강조 — ✅ PASS
- 입력: "개요 첫 문단 글자 크기를 14pt로 키우고 굵게"
- 결과: `format_word_document`→`get_document_overview`→`format_text_blocks`, 개요 첫 문단만 14pt+굵게, 나머지 단락 11pt 일반 유지
- 스크린샷: `screenshots/01-docx-tc04-03-after.png`

## TC-05: 특정 제목만 서식 — ✅ PASS
- 입력: "'2. 사업전략' 제목만 글자색 파랑(#1E66F5) + 가운데 정렬"
- 결과: `get_document_overview`(index 8 식별)→`format_text_blocks`, 해당 제목만 파랑+가운데. 1./3. 제목 변동 없음
- 스크린샷: `screenshots/01-docx-tc05-03-after.png`

## TC-06: 표 부분 수정 — ✅ PASS
- 입력: "일정표 헤더 행만 굵게 + 배경색 회색"
- 결과: `get_document_tables`→`get_table_data`→`format_table`, 헤더 행만 회색 배경+굵게, 데이터 행(1Q~3Q) 무변동
- 스크린샷: `screenshots/01-docx-tc06-03-after.png`

## TC-07: 섹션 제목 스타일 일괄 통일 — ✅ PASS
- 입력: "모든 섹션 제목(1./2./3.)을 '제목 2' 스타일로 통일, 색 짙은 남색"
- 결과: `format_text_blocks`로 블록 5·8·11 일괄 적용. 세 제목 모두 제목2+남색. TC-05의 파랑·가운데가 일괄 색/정렬에 덮임(누락 0/3 없음)
- 스크린샷: `screenshots/01-docx-tc07-03-after.png`

## TC-08: 표지 페이지 추가 + 페이지 나누기 — ✅ PASS
- 입력: "맨 앞에 표지 … 제목 '2026 사업계획서' 36pt 굵게, 부제 '가비아 AI팀', 가운데, 표지/본문 사이 페이지 나누기"
- 결과: `create_document`→`insert_document_blocks`, 표지(36pt 굵게 가운데 제목 + 가운데 부제) 생성, 페이지 나누기로 문서 3페이지화 → 개요가 2페이지로 이동. 기존 내용 손상 없음
- 스크린샷: `screenshots/01-docx-tc08-03-after.png`

## TC-09: 본문 단락 일괄 통일 — ✅ PASS
- 입력: "표지를 제외한 본문 단락 전체를 11pt, 줄간격 1.5로 통일"
- 결과: `format_text_blocks`로 본문 일반 단락에 11pt+줄간격 1.5 적용(표지·제목·표 제외). TC-04에서 14pt였던 개요 첫 문단이 일괄에 11pt로 정규화됨, 표지 36pt 유지
- 스크린샷: `screenshots/01-docx-tc09-03-after.png`

## 관찰 / 비고
- 9개 TC 전부 AI가 적절한 스킬·도구(`insert_paragraphs_at`·`insert_document_blocks`·`insert_table`·`format_text_blocks`·`format_table`)를 정확히 선택·실행. DOCX 네이티브 서식·표·스타일·페이지 나누기 모두 정상 동작.
- 일괄 재서식(TC-07/09)이 선행 개별 서식(TC-05 색, TC-04 크기)을 의도대로 덮어씀 — 정상 동작이며 우선순위 일관.
- ISS-005(드로어 backdrop 전송 차단) 재현 → 전 TC Enter 전송으로 우회. 사이드바 LNB 펼침은 캡처 전 접기로 처리.
- 진입 시 CORS 백지(ISS-004) 미재현.

## 정책 참조
- `specs/` — AI 어시스턴트 사용 가이드, DOCX 서식·표·스타일 정책
