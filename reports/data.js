// QA 자동화 대시보드 데이터 (시나리오 종료 시마다 /qa-run Skill 이 풀빌드 + 덮어쓰기)
// 스키마 주체: templates/dashboard.html 내부 렌더링 JS.

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
        { id: "TC-01", name: "표 만들기",                          tag: "", status: "PASS" },
        { id: "TC-02", name: "글자 크기 조정",                     tag: "", status: "FAIL" },
        { id: "TC-03", name: "내용 작성",                          tag: "", status: "PASS" },
        { id: "TC-04", name: "형식 맞추기",                        tag: "", status: "PASS" },
        { id: "TC-05", name: "목록 변환",                          tag: "", status: "FAIL" },
        { id: "TC-06", name: "복합 명령 — 표 + 서식",              tag: "", status: "PASS" },
        { id: "TC-07", name: "디자인 — 표지 페이지",               tag: "", status: "PASS" },
        { id: "TC-08", name: "디자인 — 표 스타일링",               tag: "BLOCKED", status: "FAIL" },
        { id: "TC-09", name: "디자인 — 섹션 헤더 스타일",          tag: "", status: "FAIL" },
        { id: "TC-10", name: "비현실적 명령 — 한계 확인",          tag: "", status: "PASS" },
      ],
    },
    {
      id: "02-AI-PPT-편집",
      pass: 1,
      total: 10,
      tcs: [
        { id: "TC-01", name: "슬라이드 추가",                      tag: "", status: "FAIL" },
        { id: "TC-02", name: "글자 크기 조정",                     tag: "BLOCKED", status: "FAIL" },
        { id: "TC-03", name: "내용 작성",                          tag: "", status: "FAIL" },
        { id: "TC-04", name: "형식 맞추기",                        tag: "BLOCKED", status: "FAIL" },
        { id: "TC-05", name: "도형/항목 추가",                     tag: "", status: "FAIL" },
        { id: "TC-06", name: "슬라이드 통합 편집",                 tag: "", status: "FAIL" },
        { id: "TC-07", name: "디자인 — 테마/색상 팔레트",          tag: "", status: "FAIL" },
        { id: "TC-08", name: "디자인 — 표지 슬라이드",             tag: "", status: "FAIL" },
        { id: "TC-09", name: "디자인 — 강조 도형/박스",            tag: "", status: "FAIL" },
        { id: "TC-10", name: "비대상 명령",                        tag: "", status: "PASS" },
      ],
    },
    {
      id: "03-AI-Excel-편집",
      pass: 9,
      total: 13,
      tcs: [
        { id: "TC-01", name: "표 만들기",                          tag: "", status: "PASS" },
        { id: "TC-02", name: "글자 크기/서식",                     tag: "", status: "PASS" },
        { id: "TC-03", name: "내용 작성",                          tag: "", status: "PASS" },
        { id: "TC-04", name: "수식 — 합계",                        tag: "", status: "PASS" },
        { id: "TC-05", name: "셀 서식",                            tag: "", status: "PASS" },
        { id: "TC-06", name: "정렬/형식 맞추기",                   tag: "", status: "FAIL" },
        { id: "TC-07", name: "복합 명령 — 표 + 합계 + 서식",       tag: "", status: "FAIL" },
        { id: "TC-08", name: "수식 — 조건부 IF",                   tag: "", status: "PASS" },
        { id: "TC-09", name: "수식 — VLOOKUP / 참조",              tag: "", status: "PASS" },
        { id: "TC-10", name: "차트 — 막대 그래프",                 tag: "", status: "PASS" },
        { id: "TC-11", name: "차트 — 원형 그래프",                 tag: "", status: "FAIL" },
        { id: "TC-12", name: "차트 — 차트 디자인 수정",            tag: "", status: "FAIL" },
        { id: "TC-13", name: "비대상 명령",                        tag: "", status: "PASS" },
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
