// QA 자동화 대시보드 데이터 (시나리오 종료 시마다 /qa-run Skill 이 풀빌드 + 덮어쓰기)
// 스키마 주체: templates/dashboard.html 내부 렌더링 JS.
// TC 옵션 필드: prompt(string) / duration(string, "AI 작업 시간" = 프롬프트 전송→편집 완료 실측, 예 "3s") / in_tokens·out_tokens(string, 예 "1.3k") / screenshots(string[], reports/ 기준 상대경로) / note(string) / run_id(string).

window.QA_DATA = {
  meta: {
    env: "dev",
    run_id: "RUN-20260609-1859-dev",
    updated_at: "2026-06-09 19:31",
  },

  kpis: {
    total_runs: 2,
    runs_by_env: "dev 2 · stage 0 · prd 0",
    pass_rate: 86,
    pass: 6,
    fail: 1,
    open_issues: 2,
    issues_breakdown: "본문 가이드메모 혼입 1 · 인사말중복·끝문장깨짐 1",
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
          id: "TC-01", name: "메일 초안 작성 (백지)", status: "FAIL",
          prompt: "거래처에 신제품 출시를 안내하는 비즈니스 메일 초안을 작성해줘. 출시일과 핵심 가치를 포함해서",
          duration: "53s", in_tokens: "4.6k", out_tokens: "891",
          run_id: "RUN-20260609-1859-dev",
          screenshots: [
            "RUN-20260609-1859-dev/screenshots/mail-blank-tc01-02-prompt.png",
            "RUN-20260609-1859-dev/screenshots/mail-blank-tc01-02b-form.png",
            "RUN-20260609-1859-dev/screenshots/mail-blank-tc01-03-after.png",
          ],
          note: "초안 삽입됐으나 작성가이드 메모·미치환 플레이스홀더 본문 혼입",
        },
        {
          id: "TC-02", name: "단락 추가", status: "PASS",
          prompt: "메일 끝에 담당자 연락처와 문의 안내 단락을 추가해줘",
          duration: "49s", in_tokens: "5.1k", out_tokens: "769",
          run_id: "RUN-20260609-1859-dev",
          screenshots: [
            "RUN-20260609-1859-dev/screenshots/mail-blank-tc02-02-prompt.png",
            "RUN-20260609-1859-dev/screenshots/mail-blank-tc02-03-after.png",
          ],
          note: "연락처 단락+표 감사말 뒤 자동삽입, 초안 보존",
        },
        {
          id: "TC-03", name: "인사말·맺음말 골격", status: "PASS",
          prompt: "메일 맨 앞에 정중한 비즈니스 인사말, 맨 끝에 맺음말을 넣어줘",
          duration: "90s", in_tokens: "9.8k", out_tokens: "2.7k",
          run_id: "RUN-20260609-1859-dev",
          screenshots: [
            "RUN-20260609-1859-dev/screenshots/mail-blank-tc03-02-prompt.png",
            "RUN-20260609-1859-dev/screenshots/mail-blank-tc03-03-after.png",
          ],
          note: "인사말 최상단·맺음말 끝 정상삽입, 깨짐없음(ISS-101 미재현); 응답 ~90s",
        },
        {
          id: "TC-04", name: "나열 정보 삽입", status: "PASS",
          prompt: "본문 중간에 신제품 주요 특징 3가지를 넣어줘",
          duration: "102s", in_tokens: "9.2k", out_tokens: "5.0k",
          run_id: "RUN-20260609-1859-dev",
          screenshots: [
            "RUN-20260609-1859-dev/screenshots/mail-blank-tc04-02-prompt.png",
            "RUN-20260609-1859-dev/screenshots/mail-blank-tc04-03-after.png",
          ],
          note: "특징 3개 표로 변환·중간삽입, 주변단락·인사말·맺음말 보존; 응답 ~102s",
        },
      ],
    },
    {
      id: "02-메일-부분수정",
      pass: 3,
      total: 4,
      tcs: [
        {
          id: "TC-01", name: "특정 문단 톤 변환", status: "PASS",
          prompt: "본문에서 '직접 제품을 경험해 보실 수 있도록…'로 시작하는 문단만 더 공손하고 정중한 톤으로 바꿔줘. 다른 문단은 그대로 둬.",
          duration: "59s", in_tokens: "9.2k", out_tokens: "2.1k",
          run_id: "RUN-20260609-1859-dev",
          screenshots: [
            "RUN-20260609-1859-dev/screenshots/mail-partial-tc01-02-prompt.png",
            "RUN-20260609-1859-dev/screenshots/mail-partial-tc01-03-after.png",
          ],
          note: "지정 문단만 정중 톤 재작성, 나머지 본문 무변동",
        },
        {
          id: "TC-02", name: "특정 표현 일괄 치환", status: "PASS",
          prompt: "본문에 있는 '할인'이라는 단어를 모두 '특별 혜택'으로 바꿔줘",
          in_tokens: "4.4k", out_tokens: "287",
          run_id: "RUN-20260609-1859-dev",
          screenshots: [
            "RUN-20260609-1859-dev/screenshots/mail-partial-tc02-02-prompt.png",
            "RUN-20260609-1859-dev/screenshots/mail-partial-tc02-03-after.png",
          ],
          note: "본문에 '할인' 없어 치환대상 0; AI 정확히 무변경·환각없음(치환동작 자체는 미검증)",
        },
        {
          id: "TC-03", name: "한 문단만 요약", status: "PASS",
          prompt: "본문에서 '부장님께서 직접 제품을 경험해'로 시작하는 가장 긴 문단만 핵심 의미 유지한 채 한 문장으로 짧게 줄여줘. 다른 문단은 그대로 둬.",
          duration: "51s", in_tokens: "5.2k", out_tokens: "1.1k",
          run_id: "RUN-20260609-1859-dev",
          screenshots: [
            "RUN-20260609-1859-dev/screenshots/mail-partial-tc03-02-prompt.png",
            "RUN-20260609-1859-dev/screenshots/mail-partial-tc03-03-after.png",
          ],
          note: "지정 문단만 1문장 요약, 핵심 보존·나머지 무변동",
        },
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
    { id: "ISS-102", title: "백지 초안 시 AI 작성가이드 메모·미치환 플레이스홀더가 본문에 혼입", severity: "medium", status: "open", detail: "TC-01 백지 초안 생성 시 메일 본문 콘텐츠와 분리돼야 할 AI 메타 안내('📋 메일 작성 가이드' — 받는사람/제목 예시/플레이스홀더 교체 안내)가 본문에 통째로 삽입됨. 또한 '[발신자 회사명]' 등 플레이스홀더가 미치환 상태로 본문 잔존. RUN-20260609-1806-dev 에 이어 RUN-20260609-1859-dev TC-01 재현.", scenarios: "01-메일-백지작성 TC-01" },
    { id: "ISS-101", title: "메일 본문 인사말 중복·맺음말 끝문장 깨짐", severity: "medium", status: "open", detail: "기존 인사말이 있는 본문에 '인사말 추가' 요청 시 기존 인사 블록을 제거·병합하지 않고 새 인사말을 덧붙여 인사 블록 2개가 연달아 생성됨. 맺음말 끝문장은 '…바락니다. 궁평하십시오.' 등 문자 깨짐/생성 오류. RUN-20260609-1859-dev TC-03 에서는 미재현(인사 상보적·맺음말 깨짐 없음) — 비결정적 가능성, 재현성 재확인 필요.", scenarios: "01-메일-백지작성 TC-03" },
  ],

  history: [
    { run_id: "RUN-20260609-1859-dev", date: "2026-06-09 19:31", env: "dev", target: "01-메일-백지작성, 02-메일-부분수정(3/4)", pass: 6, fail: 1, skip: 0, duration: "~30m", note: "SCN-01 3/4(TC-01 가이드메모 혼입 FAIL, ISS-101 미재현) + SCN-02 TC-01~03 PASS(부분 톤/요약 정밀·번짐0, '할인' no-match 정상). SCN-02 TC-04 및 SCN-03~05 미실행(사용자 중단)." },
    { run_id: "RUN-20260609-1536-dev", date: "2026-06-09 15:50", env: "dev", target: "01-메일-백지작성", pass: 3, fail: 1, skip: 0, duration: "~12m", note: "메일 AI 패널 첫 회차(SCN-01만): 초안·끝추가·중간삽입 PASS. TC-03 인사말 중복+맺음말 끝문장 깨짐 FAIL. 본문 자동적용·모델 Claude Sonnet 4.6" },
  ],
};
