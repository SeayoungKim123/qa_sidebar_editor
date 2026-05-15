// QA 자동화 대시보드 데이터 (시나리오 종료 시마다 /qa-run Skill 이 풀빌드 + 덮어쓰기)
// 스키마 주체: templates/dashboard.html 내부 렌더링 JS.

window.QA_DATA = {
  meta: {
    env: "dev",
    run_id: "RUN-20260515-1703-dev",
    updated_at: "2026-05-15 17:40",
  },

  kpis: {
    total_runs: 0,
    runs_by_env: "dev 0 · stage 0 · prd 0",
    pass_rate: 41,
    pass: 7,
    fail: 10,
    open_issues: null,
    issues_breakdown: null,
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
      pass: 0,
      total: 13,
      tcs: [
        { id: "TC-01", name: "표 만들기",                          tag: "", status: "—" },
        { id: "TC-02", name: "글자 크기/서식",                     tag: "", status: "—" },
        { id: "TC-03", name: "내용 작성",                          tag: "", status: "—" },
        { id: "TC-04", name: "수식 — 합계",                        tag: "", status: "—" },
        { id: "TC-05", name: "셀 서식",                            tag: "", status: "—" },
        { id: "TC-06", name: "정렬/형식 맞추기",                   tag: "", status: "—" },
        { id: "TC-07", name: "복합 명령 — 표 + 합계 + 서식",       tag: "", status: "—" },
        { id: "TC-08", name: "수식 — 조건부 IF",                   tag: "", status: "—" },
        { id: "TC-09", name: "수식 — VLOOKUP / 참조",              tag: "", status: "—" },
        { id: "TC-10", name: "차트 — 막대 그래프",                 tag: "", status: "—" },
        { id: "TC-11", name: "차트 — 원형 그래프",                 tag: "", status: "—" },
        { id: "TC-12", name: "차트 — 차트 디자인 수정",            tag: "", status: "—" },
        { id: "TC-13", name: "비대상 명령",                        tag: "", status: "—" },
      ],
    },
  ],

  issues: [],
  history: [],
};
