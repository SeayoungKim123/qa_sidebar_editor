// QA 자동화 대시보드 데이터 (시나리오 종료 시마다 /qa-run Skill 이 풀빌드 + 덮어쓰기)
// 스키마 주체: templates/dashboard.html 내부 렌더링 JS.
// TC 옵션 필드: screenshots(string[], reports/ 기준 상대경로) / note(string) / run_id(string).

window.QA_DATA = {
  meta: {
    env: "dev",
    run_id: "RUN-20260515-1758-dev",
    updated_at: "2026-05-15 18:28",
  },

  kpis: {
    total_runs: 3,
    runs_by_env: "dev 3 · stage 0 · prd 0",
    pass_rate: 48,
    pass: 16,
    fail: 17,
    open_issues: 3,
    issues_breakdown: "도구셋 부재 1 · 복합명령 미동작 1 · 모델 라인업 불일치 1",
    scenario_count: 3,
    tc_count: 33,
  },

  scenarios: [
    {
      id: "01-AI-DOCX-편집",
      pass: 6,
      total: 10,
      tcs: [
        {
          id: "TC-01", name: "표 만들기", tag: "", status: "PASS",
          run_id: "RUN-20260515-1543-dev",
          screenshots: [
            "RUN-20260515-1543-dev/screenshots/01-docx-tc01-03-ai-panel-zoom.png",
            "RUN-20260515-1543-dev/screenshots/01-docx-tc01-07-doc-end.png",
          ],
          note: "insert_table 도구 호출 후 본문 끝에 3행 4열 표 삽입. 헤더 이름/부서/직급/입사일 정확. 모델 GPT 5.4 (시나리오 사전조건은 GPT 4.1)",
        },
        {
          id: "TC-02", name: "글자 크기 조정", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1543-dev",
          screenshots: [
            "RUN-20260515-1543-dev/screenshots/01-docx-tc02-01-selection.png",
            "RUN-20260515-1543-dev/screenshots/01-docx-tc02-03-ai-response-2.png",
            "RUN-20260515-1543-dev/screenshots/01-docx-tc02-04-doc-result.png",
            "RUN-20260515-1543-dev/screenshots/01-docx-tc02-05-font-check.png",
          ],
          note: "AI 응답·도구 인자는 fontSize:16 정상이지만 단락 적용 결과는 8pt. 홈 탭 글꼴 크기 콤보 8 표시. 시각적으로 본문이 다른 단락보다 작아짐. 추정: format_text_blocks 의 contentIndexes 매핑 또는 fontSize 적용 로직 버그",
        },
        {
          id: "TC-03", name: "내용 작성", tag: "", status: "PASS",
          run_id: "RUN-20260515-1543-dev",
          screenshots: ["RUN-20260515-1543-dev/screenshots/01-docx-tc03-09-doc-end-final.png"],
          note: "insert_document_blocks 도구 호출 (paragraph x3). 본문 끝에 사업분야/강점/비전 3문단 정확히 삽입. 단락 구분 명확. 모델 GPT 5.4",
        },
        {
          id: "TC-04", name: "형식 맞추기", tag: "", status: "PASS",
          run_id: "RUN-20260515-1543-dev",
          screenshots: ["RUN-20260515-1543-dev/screenshots/01-docx-tc04-01-title.png"],
          note: "제목 줄 가운데 정렬 + 굵게 적용. 다른 단락 영향 없음. 모델 GPT 5.4",
        },
        {
          id: "TC-05", name: "목록 변환", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1543-dev",
          screenshots: [
            "RUN-20260515-1543-dev/screenshots/01-docx-tc05-02-after-pgup.png",
            "RUN-20260515-1543-dev/screenshots/01-docx-tc05-03-ai-response.png",
          ],
          note: "AI 응답 완료(Tokens 표시) 했으나 본문 3문단 앞에 글머리 기호 미적용. 평문 단락 유지. 변환 도구 호출 실패 또는 적용 누락 의심",
        },
        {
          id: "TC-06", name: "복합 명령 — 표 + 서식", tag: "", status: "PASS",
          run_id: "RUN-20260515-1543-dev",
          screenshots: ["RUN-20260515-1543-dev/screenshots/01-docx-tc06-01-result.png"],
          note: "2행 3열 표 + 첫 행 회색 배경 적용. 헤더 텍스트(부서/인원)는 빈 셀로 미입력. 빈 셀이라 굵게 적용 시각 검증 불가. 구조+배경 OK",
        },
        {
          id: "TC-07", name: "디자인 — 표지 페이지", tag: "", status: "PASS",
          run_id: "RUN-20260515-1543-dev",
          screenshots: ["RUN-20260515-1543-dev/screenshots/01-docx-tc07-01-cover.png"],
          note: "표지 페이지 1장 생성: 제목 파랑 굵은 큰 폰트, 부제 회색 작은 폰트, 가운데 정렬. 표지 다음 페이지 나누기로 본문이 페이지 2부터 시작. 5페이지 구성",
        },
        {
          id: "TC-08", name: "디자인 — 표 스타일링", tag: "BLOCKED", status: "FAIL",
          run_id: "RUN-20260515-1543-dev",
          screenshots: [
            "RUN-20260515-1543-dev/screenshots/01-docx-tc08-01-ai-response.png",
            "RUN-20260515-1543-dev/screenshots/01-docx-tc08-04-table3.png",
          ],
          note: "시나리오 사전조건 미달 - 'II. 상반기 실적 검토' 아래 표가 본문에 없음 (글머리 기호 목록 형태). AI 응답 완료했으나 적용 대상 표 부재로 디자인 변화 시각 검증 불가",
        },
        {
          id: "TC-09", name: "디자인 — 섹션 헤더 스타일", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1543-dev",
          screenshots: ["RUN-20260515-1543-dev/screenshots/01-docx-tc09-02-body.png"],
          note: "AI 응답 완료. I/II 등 섹션 제목 위쪽 12pt 여백·짙은 남색 적용 시각적 변화 미확인. 제목 2 스타일 통일 여부 탐색창 확인 필요(시간 제약)",
        },
        {
          id: "TC-10", name: "비현실적 명령 — 한계 확인", tag: "", status: "PASS",
          run_id: "RUN-20260515-1543-dev",
          screenshots: ["RUN-20260515-1543-dev/screenshots/01-docx-tc10-01-ai-response.png"],
          note: "AI 명시 안내: '메일 첨부는 지원되지 않으므로...본문 메일 발송 방식만 안내' - 한계 인지 + 대안 제시. 본문 변경 0건",
        },
      ],
    },
    {
      id: "02-AI-PPT-편집",
      pass: 1,
      total: 10,
      tcs: [
        {
          id: "TC-01", name: "슬라이드 추가", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: [
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc01-00-initial.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc01-01-slide6-added.png",
          ],
          note: "슬라이드 1장 추가됨(5→6), 1Q~4Q+매출액 행/열 구조 OK. 그러나 검증 포인트 '표가 PPTX 네이티브 표 객체' 불만족 — AI는 compose_native_slide/patch_native_slide 로 rectangle shape + text 박스 조합으로 표를 시각적으로만 시뮬레이션. 첫 compose 시도는 invalid_rect 경고로 실패 후 patch로 rect 기반 재작성. 모델 GPT 5.4(시나리오는 GPT 4.1).",
        },
        {
          id: "TC-02", name: "글자 크기 조정", tag: "BLOCKED", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: [
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc02-00-slide1.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc02-01-ai-asks-select.png",
          ],
          note: "AI 가 get_selected_text 로 선택 텍스트 확인 후 '제목을 클릭해서 선택한 뒤 다시 요청해 달라'며 안전하게 거절. 동작 자체는 정상이지만 cross-origin canvas iframe 내부 텍스트 선택을 자동화로 수행 불가 → 검증 진행 불가. 실제 사용자가 클릭하면 동작할 가능성 높음",
        },
        {
          id: "TC-03", name: "내용 작성", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: [
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc03-01-final-deck.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc03-02-slide9-vision.png",
          ],
          note: "슬라이드 3장 추가 (6→9 슬라이드 개수만 +3). 그러나 7,8,9 모두 본문 텍스트·도형 렌더링 0 — 완전히 빈 슬라이드. AI는 추가 완료 안내했으나 표지/사업분야/비전 제목·글머리 기호 모두 미적용. compose_native_slide 가 슬라이드 생성은 했으나 콘텐츠 미렌더링 추정",
        },
        {
          id: "TC-04", name: "형식 맞추기", tag: "BLOCKED", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: ["RUN-20260515-1703-dev/screenshots/02-ppt-tc04-01-slide2.png"],
          note: "TC-02 와 동일 — AI 가 selection 없이는 안전하게 부분 편집 거절 ('이걸 적용해줘 라고만 보내셔도 됩니다'). cross-origin canvas 자동 선택 불가로 검증 불가",
        },
        {
          id: "TC-05", name: "도형/항목 추가", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: [
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc05-01-ai-response.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc05-02-ai-done.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc05-03-final.png",
          ],
          note: "실측 재시도(TC-05-RETRY). AI 가 get_native_deck_state·get_selected_text·드라이브 검색·드라이브 파일 내용 보기·get_html_deck_state 호출까지 진행. 본문 텍스트 박스 자체가 슬라이드 7에 없고 선택도 없어 안전하게 보류 후 '슬라이드 7 전체 재구성' 만 제안. 글머리 기호 항목 미삽입 — 검증 포인트 'bullet list 스타일' 불만족",
        },
        {
          id: "TC-06", name: "슬라이드 통합 편집", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: ["RUN-20260515-1703-dev/screenshots/02-ppt-tc06-01-ai-response.png"],
          note: "AI 가 '모든 슬라이드' 통일 요청에 대해 '6~9번 슬라이드 제목만 먼저 통일할까요?' 로 범위 축소 제안 — 기존 1~5번 슬라이드는 native 편집 가능 영역이 아닌 것으로 인식하여 회피. 검증 포인트 '모든 슬라이드 제목 동일 폰트/크기/굵기' 불만족",
        },
        {
          id: "TC-07", name: "디자인 — 테마/색상 팔레트", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: [
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc07-01-ai-response.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc07-03-final.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc07-04-progress.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc07-05-progress2.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc07-06-final.png",
          ],
          note: "실측 재시도(TC-07-RETRY). AI 가 set_native_deck_style + 9장 patch_native_slide 모두 시도, 최종 완료 안내. 그러나: (1) 슬라이드 1만 짙은 남색 배경 적용, 제목/부제 텍스트 렌더링 0, (2) 슬라이드 2~9 모두 완전히 빈 흰색으로 wipe만 됨, (3) 강조색 주황 미반영, (4) TC-03 과 동일 invalid_rect 계열 렌더링 버그. AI 도구 호출은 Approved 되었으나 elements 적용 실패",
        },
        {
          id: "TC-08", name: "디자인 — 표지 슬라이드", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: ["RUN-20260515-1703-dev/screenshots/02-ppt-tc08-01-final.png"],
          note: "실측 재시도(TC-08-RETRY). AI 표지 디자인 완료 안내 ('나머지 슬라이드도 이 표지 스타일에 맞춰 통일해 드릴게요'). 그러나 슬라이드 1: 짙은 남색 배경만 보임. 제목 'AI 문서 편집 데모', 부제 '가비아 AI팀 2026', 좌측 하단 강조 도형 모두 미렌더링. TC-03/07 동일 invalid_rect 계열 버그",
        },
        {
          id: "TC-09", name: "디자인 — 강조 도형/박스", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: ["RUN-20260515-1703-dev/screenshots/02-ppt-tc09-01-slide3.png"],
          note: "실측 재시도(TC-09-RETRY). AI 완료 안내('테두리/그림자 느낌을 추가해 더 눈에 띄게 만들 수 있습니다'). 슬라이드 3 캔버스 검사: 완전히 빈 흰색. 우측 상단 'NEW' 빨간색 둥근 사각형 도형 미렌더링. TC-03/07/08 와 동일 invalid_rect 계열 버그",
        },
        {
          id: "TC-10", name: "비대상 명령", tag: "", status: "PASS",
          run_id: "RUN-20260515-1703-dev",
          screenshots: ["RUN-20260515-1703-dev/screenshots/02-ppt-tc10-01-refuse.png"],
          note: "AI 명시적 거절 + 대안 제시 (A. PPTX 노트 추가, B. 영상용 대본/나레이션 작성). 슬라이드 변경 0건. 모델 GPT 5.4",
        },
      ],
    },
    {
      id: "03-AI-Excel-편집",
      pass: 9,
      total: 13,
      tcs: [
        {
          id: "TC-01", name: "표 만들기", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: [
            "RUN-20260515-1758-dev/screenshots/excel-tc01-00-before-prompt.png",
            "RUN-20260515-1758-dev/screenshots/excel-tc01-02-result.png",
          ],
          note: "헤더/데이터4행/날짜yyyy-mm-dd/금액 천단위 서식 모두 적용",
        },
        {
          id: "TC-02", name: "글자 크기/서식", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: [
            "RUN-20260515-1758-dev/screenshots/excel-tc02-01-result.png",
            "RUN-20260515-1758-dev/screenshots/excel-tc02-02-fontcheck.png",
          ],
          note: "14pt+Bold+연회색 배경 모두 적용, 데이터 행 영향 없음",
        },
        {
          id: "TC-03", name: "내용 작성", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc03-01-result.png"],
          note: "시트2 B1~B12 1월~12월 정확히 채움, 다른 열 영향 없음. note: 시트1 B1은 TC-01 데이터가 있어 시트2에서 검증",
        },
        {
          id: "TC-04", name: "수식 — 합계", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: [
            "RUN-20260515-1758-dev/screenshots/excel-tc04-01-result.png",
            "RUN-20260515-1758-dev/screenshots/excel-tc04-02-formula.png",
          ],
          note: "=SUM(C2:C10) 수식 삽입, 값 265 일치. 시나리오의 B열이 TC-03 텍스트와 충돌하여 C열에서 수행",
        },
        {
          id: "TC-05", name: "셀 서식", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc05-01-result.png"],
          note: "C2:C10 ₩ 통화 형식, 수식 입력줄 숫자값만, 상태바 합계 ₩265",
        },
        {
          id: "TC-06", name: "정렬/형식 맞추기", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc06-01-result.png"],
          note: "AI가 가운데 정렬 도구가 없다며 정렬 미적용. 테두리는 적용. 검증 두 항목 중 하나만 충족",
        },
        {
          id: "TC-07", name: "복합 명령 — 표 + 합계 + 서식", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1758-dev",
          screenshots: [
            "RUN-20260515-1758-dev/screenshots/excel-tc07-01-result.png",
            "RUN-20260515-1758-dev/screenshots/excel-tc07-03-sheet1.png",
          ],
          note: "AI가 시트3·시트1 모두에 표 생성하지 않음. 합계/헤더 굵게 셋 다 미적용",
        },
        {
          id: "TC-08", name: "수식 — 조건부 IF", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc08-01-formula.png"],
          note: "D2=IF(C2>=60,합격,불합격), 9행 모두 상대참조로 채워지고 60 기준 분기 정확",
        },
        {
          id: "TC-09", name: "수식 — VLOOKUP / 참조", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc09-01-vlookup.png"],
          note: "VLOOKUP(A2,F2:G10,2,FALSE) 수식, A2=1003->B2=박지훈 정확 매칭",
        },
        {
          id: "TC-10", name: "차트 — 막대 그래프", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc10-02-chart.png"],
          note: "막대 차트 삽입, 제목 상반기 매출, 가로축 1~6월, 세로축 매출액, 네이티브 차트 객체",
        },
        {
          id: "TC-11", name: "차트 — 원형 그래프", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc11-02-pie.png"],
          note: "파이 차트는 5조각으로 생성됐으나 부서명+백분율 데이터 레이블이 차트에 표시되지 않음",
        },
        {
          id: "TC-12", name: "차트 — 차트 디자인 수정", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc12-01-chart-mod.png"],
          note: "격자선이 여전히 표시됨, 색상은 원래 파랑이라 변화 불명, 가로축 12pt 변경 시각적 확인 어려움. 세 항목 중 격자선 제거 미적용 확실",
        },
        {
          id: "TC-13", name: "비대상 명령", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc13-03-full.png"],
          note: "시트 셀 변경 0건, AI 응답(683 tokens)으로 종료. 비대상 명령에 시트 변경 없이 안내성 응답",
        },
      ],
    },
  ],

  issues: [
    {
      id: "ISS-001",
      title: "AI 편집 도구 셋 누락 — 정렬·차트 격자선/레이블 등",
      severity: "high",
      scenarios: ["01-AI-DOCX-편집", "02-AI-PPT-편집", "03-AI-Excel-편집"],
      note: "셀 가운데 정렬, 차트 격자선 토글, 데이터 레이블, 슬라이드 추가 등 핵심 편집 도구가 AI MCP 도구 셋에 없거나 동작하지 않음.",
    },
    {
      id: "ISS-002",
      title: "복합/다단계 명령에서 도구 호출 없이 응답 종료",
      severity: "high",
      scenarios: ["03-AI-Excel-편집"],
      note: "Excel TC-07 — 빈 시트 + 다단계 요청에서 AI가 도구 호출 없이 텍스트만 응답하고 종료(output 713 tokens).",
    },
    {
      id: "ISS-003",
      title: "모델 라인업 불일치 — GPT 4.1 미존재",
      severity: "low",
      scenarios: ["01-AI-DOCX-편집", "02-AI-PPT-편집", "03-AI-Excel-편집"],
      note: "시나리오 사전조건의 `GPT 4.1`이 현재 라인업에 없음. 현 라인업: Claude 4.6 / GPT 5.4 / Gemini 3.1. 세 시나리오 사전조건 갱신 필요.",
    },
  ],

  history: [
    { run_id: "RUN-20260515-1543-dev", date: "2026-05-15 15:43", env: "dev", target: "01-AI-DOCX-편집", pass: 6, fail: 3, skip: 1, duration: "~50m", note: "TC-02/05/09 FAIL, TC-08 BLOCKED" },
    { run_id: "RUN-20260515-1703-dev", date: "2026-05-15 17:03", env: "dev", target: "02-AI-PPT-편집",  pass: 1, fail: 7, skip: 2, duration: "~37m", note: "TC-10만 PASS, TC-02/04 BLOCKED" },
    { run_id: "RUN-20260515-1758-dev", date: "2026-05-15 17:58", env: "dev", target: "03-AI-Excel-편집", pass: 9, fail: 4, skip: 0, duration: "~30m", note: "TC-06/07/11/12 FAIL (AI 도구 한계)" },
  ],
};
