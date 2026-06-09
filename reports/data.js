// QA 자동화 대시보드 데이터 (시나리오 종료 시마다 /qa-run Skill 이 풀빌드 + 덮어쓰기)
// 스키마 주체: templates/dashboard.html 내부 렌더링 JS.
// TC 옵션 필드: prompt(string) / duration(string, "AI 작업 시간" = 프롬프트 전송→편집 완료 실측, 예 "3s") / in_tokens·out_tokens(string, 예 "1.3k") / screenshots(string[], reports/ 기준 상대경로) / note(string) / run_id(string).

window.QA_DATA = {
  meta: {
    env: "dev",
    run_id: "RUN-20260609-1536-dev",
    updated_at: "2026-06-09 15:50",
  },

  kpis: {
    total_runs: 1,
    runs_by_env: "dev 1 · stage 0 · prd 0",
    pass_rate: 75,
    pass: 3,
    fail: 1,
    open_issues: 1,
    issues_breakdown: "메일 인사말중복·끝문장깨짐 1",
    scenario_count: 5,
    tc_count: 23,
  },

  scenarios: [
    {
      id: "01-메일-백지작성",
      pass: 3,
      total: 4,
      tcs: [
        {
          id: "TC-01", name: "메일 초안 작성 (백지)", status: "PASS",
          prompt: "거래처에 신제품 출시를 안내하는 비즈니스 메일 초안을 작성해줘. 출시일과 핵심 가치를 포함해서",
          in_tokens: "56.4k", out_tokens: "1.8k",
          run_id: "RUN-20260609-1536-dev",
          screenshots: [
            "RUN-20260609-1536-dev/screenshots/mail-tc01-02-prompt.png",
            "RUN-20260609-1536-dev/screenshots/mail-tc01-03-after.png",
            "RUN-20260609-1536-dev/screenshots/mail-tc01-03b-panel-zoom.png",
          ],
          note: "빈 본문에 비즈니스 메일 초안 삽입(568자); 미제공 정보는 플레이스홀더",
        },
        {
          id: "TC-02", name: "단락 추가", status: "PASS",
          prompt: "메일 끝에 담당자 연락처와 문의 안내 단락을 추가해줘",
          duration: "47s", in_tokens: "5.7k", out_tokens: "895",
          run_id: "RUN-20260609-1536-dev",
          screenshots: [
            "RUN-20260609-1536-dev/screenshots/mail-tc02-02-prompt.png",
            "RUN-20260609-1536-dev/screenshots/mail-tc02-03-after.png",
            "RUN-20260609-1536-dev/screenshots/mail-tc02-03b-panel-zoom.png",
          ],
          note: "기존 초안 끝에 담당자 연락처·문의 안내 단락 추가; 본문 보존",
        },
        {
          id: "TC-03", name: "인사말·맺음말 골격", status: "FAIL",
          prompt: "메일 맨 앞에 정중한 비즈니스 인사말, 맨 끝에 맺음말을 넣어줘",
          in_tokens: "8.0k", out_tokens: "2.6k",
          run_id: "RUN-20260609-1536-dev",
          screenshots: [
            "RUN-20260609-1536-dev/screenshots/mail-tc03-02-prompt.png",
            "RUN-20260609-1536-dev/screenshots/mail-tc03-03-after.png",
            "RUN-20260609-1536-dev/screenshots/mail-tc03-03b-panel-zoom.png",
          ],
          note: "인사말·맺음말 추가됐으나 기존 인사와 중복(인사 2개); 맺음말 끝문장 깨짐",
        },
        {
          id: "TC-04", name: "나열 정보 삽입", status: "PASS",
          prompt: "본문 중간에 신제품 주요 특징 3가지를 넣어줘",
          duration: "58s", in_tokens: "9.3k", out_tokens: "2.8k",
          run_id: "RUN-20260609-1536-dev",
          screenshots: [
            "RUN-20260609-1536-dev/screenshots/mail-tc04-02-prompt.png",
            "RUN-20260609-1536-dev/screenshots/mail-tc04-03-after.png",
            "RUN-20260609-1536-dev/screenshots/mail-tc04-03b-panel-zoom.png",
          ],
          note: "핵심가치 섹션 뒤 본문 중간에 신제품 특징 3개 삽입; 기존 단락 보존",
        },
      ],
    },
    {
      id: "02-메일-부분수정",
      pass: 0,
      total: 4,
      tcs: [
        { id: "TC-01", name: "특정 문단 톤 변환", status: "—" },
        { id: "TC-02", name: "특정 표현 일괄 치환", status: "—" },
        { id: "TC-03", name: "한 문단만 요약", status: "—" },
        { id: "TC-04", name: "한 문장 맞춤법 교정", status: "—" },
      ],
    },
    {
      id: "03-메일-일괄변경",
      pass: 0,
      total: 4,
      tcs: [
        { id: "TC-01", name: "전체 톤 변환", status: "—" },
        { id: "TC-02", name: "글머리 기호 정리", status: "—" },
        { id: "TC-03", name: "전체 내용 다듬기", status: "—" },
        { id: "TC-04", name: "전체 번역", status: "—" },
      ],
    },
    {
      id: "04-메일-고급기능",
      pass: 0,
      total: 5,
      tcs: [
        { id: "TC-01", name: "추천기능 칩 클릭 — 내용 요약", status: "—" },
        { id: "TC-02", name: "EMS 메일 템플릿", status: "—" },
        { id: "TC-03", name: "에디터 내용 유효성 검사", status: "—" },
        { id: "TC-04", name: "맞춤법 검사하기 (전체)", status: "—" },
        { id: "TC-05", name: "문서 서식 정리", status: "—" },
      ],
    },
    {
      id: "05-메일-추천기능칩",
      pass: 0,
      total: 6,
      tcs: [
        { id: "TC-01", name: "칩 — 문서 서식 정리", status: "—" },
        { id: "TC-02", name: "칩 — 내용 요약", status: "—" },
        { id: "TC-03", name: "칩 — 톤 변환", status: "—" },
        { id: "TC-04", name: "칩 — 글머리 기호 정리", status: "—" },
        { id: "TC-05", name: "칩 — EMS 메일 템플릿", status: "—" },
        { id: "TC-06", name: "칩 — 에디터 내용 유효성 검사", status: "—" },
      ],
    },
  ],

  issues: [
    { id: "ISS-101", title: "메일 본문 인사말 중복·맺음말 끝문장 깨짐", severity: "medium", status: "open", detail: "기존 인사말이 있는 본문에 '인사말 추가' 요청 시 기존 인사 블록을 제거·병합하지 않고 새 인사말을 덧붙여 인사 블록 2개가 연달아 생성됨. 맺음말 끝문장은 '…바락니다. 궁평하십시오.' 등 문자 깨짐/생성 오류. 재현성·우선순위 확인 필요.", scenarios: "01-메일-백지작성 TC-03" },
  ],

  history: [
    { run_id: "RUN-20260609-1536-dev", date: "2026-06-09 15:50", env: "dev", target: "01-메일-백지작성", pass: 3, fail: 1, skip: 0, duration: "~12m", note: "메일 AI 패널 첫 회차(SCN-01만): 초안·끝추가·중간삽입 PASS. TC-03 인사말 중복+맺음말 끝문장 깨짐 FAIL. 본문 자동적용·모델 Claude Sonnet 4.6" },
  ],
};
