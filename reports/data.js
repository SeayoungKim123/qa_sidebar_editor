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
    total_runs: 6,
    runs_by_env: "dev 6 · stage 0 · prd 0",
    pass_rate: 75,
    pass: 3,
    fail: 1,
    open_issues: 4,
    issues_breakdown: "DOCX객체 1 · 차트서식 1 · 정렬 1 · 드로어 1",
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
    { id: "ISS-006", title: "PPT 열린 덱 실시간 편집 불가", severity: "high", status: "resolved", detail: "원인은 코드 인터프리터(샌드박스) 경로. 채팅 + 메뉴에서 코드 인터프리터를 OFF로 두면 AI가 네이티브 슬라이드 도구(compose/patch_native_slide 등)로 열린 덱을 직접 편집. RUN-1405 재시험에서 03 9/9·04 6/6 PASS로 해소. PPT는 CI OFF 필요(ON이면 샌드박스로 빠짐).", scenarios: "03-PPT-실사용흐름 · 04-PPT-객체삽입" },
    { id: "ISS-007", title: "DOCX 객체·구조 편집 도구 부재", severity: "high", status: "open", detail: "셀 병합·행 추가(unknown_error 간헐 실패)·차트·도형의 네이티브 도구 없음 → 텍스트/표 우회로만 대응(실제 개체 아님). 열 추가는 표 삭제후 재삽입 우회로만 가능.", scenarios: "02-DOCX-객체삽입" },
    { id: "ISS-008", title: "차트 스타일 편집 미지원", severity: "medium", status: "open", detail: "Excel/DOCX 모두 차트 색상·축 글자 크기·격자선 등 스타일 편집 도구 부재. 차트 생성까지만 가능.", scenarios: "05-Excel TC-09 · 06-Excel TC-05" },
    { id: "ISS-009", title: "셀/단락 가운데 정렬 옵션 부재", severity: "medium", status: "open", detail: "Excel 셀 서식 도구에 가운데 정렬 옵션이 없어 정렬 요청 미반영(테두리·병합 등 다른 서식은 정상).", scenarios: "05-Excel TC-07 · 06-Excel TC-06" },
    { id: "ISS-005", title: "AI 채팅 드로어 backdrop 전송 차단", severity: "low", status: "mitigated", detail: "사이드바 토글 시 모바일 드로어 backdrop이 전송 버튼 클릭을 가로막음. 전 시나리오 Enter 전송으로 우회 운영.", scenarios: "전 시나리오 (운영 우회)" },
  ],

  history: [
    { run_id: "RUN-20260518-1148-dev", date: "2026-05-18 02:57", env: "dev", target: "01-AI-DOCX-편집", pass: 5, fail: 5, skip: 0, duration: "~80m", note: "TC-02/05/06/07/09 FAIL; DOCX 네이티브 서식 미적용 패턴 반복 (구 시나리오)" },
    { run_id: "RUN-20260518-1148-dev", date: "2026-05-18 04:50", env: "dev", target: "02-AI-PPT-편집",  pass: 5, fail: 5, skip: 0, duration: "~32m", note: "TC-02/04 선택 자동화 불가, TC-05 빈슬라이드 없음, TC-06/07 일괄 편집 불가 (구 시나리오)" },
    { run_id: "RUN-20260518-1148-dev", date: "2026-05-18 05:25", env: "dev", target: "03-AI-Excel-편집", pass: 6, fail: 7, skip: 0, duration: "~130m", note: "TC-01/04/06/09/11/12/13 FAIL; 날짜타입·시트전환·정렬·VLOOKUP시트명·차트서식 한계 (구 시나리오)" },
    { run_id: "RUN-20260518-1518-dev", date: "2026-05-18 15:18", env: "dev", target: "02-AI-PPT-편집",  pass: 1, fail: 0, skip: 9, duration: "~8m", note: "TC-05 단독 PASS; 기존 슬라이드 본문 bullet 3개 삽입 확인 (구 시나리오)" },
    { run_id: "RUN-20260518-1540-dev", date: "2026-05-18 15:40", env: "dev", target: "02-AI-PPT-편집",  pass: 0, fail: 3, skip: 7, duration: "~30m", note: "TC-02/04 선택 감지 불가, TC-06 제목 도형 구조 읽기 불가 (구 시나리오)" },
    { run_id: "RUN-20260602-1405-dev", date: "2026-06-02 14:08", env: "dev", target: "01-DOCX-실사용흐름", pass: 9, fail: 0, skip: 0, duration: "~25m", note: "전체 풀실행 첫 회차: TC-01~09 전부 PASS. 백지작성·개별수정·일괄재서식 정상 (구 시나리오)" },
    { run_id: "RUN-20260602-1405-dev", date: "2026-06-02 14:53", env: "dev", target: "02-DOCX-객체삽입", pass: 2, fail: 5, skip: 0, duration: "~16m", note: "표생성·열추가(우회)만 PASS. 셀병합·행추가·차트·도형 도구 부재(ISS-007) (구 시나리오)" },
    { run_id: "RUN-20260602-1405-dev", date: "2026-06-02 17:34", env: "dev", target: "03-PPT-실사용흐름", pass: 9, fail: 0, skip: 0, duration: "~36m", note: "코드 인터프리터 OFF+Native 재시험: TC-01~09 전부 PASS (ISS-006 해소) (구 시나리오)" },
    { run_id: "RUN-20260602-1405-dev", date: "2026-06-02 18:04", env: "dev", target: "04-PPT-객체삽입", pass: 6, fail: 0, skip: 0, duration: "~20m", note: "코드 인터프리터 OFF 재시험: TC-01~06 전부 PASS (차트는 도형 기반) (구 시나리오)" },
    { run_id: "RUN-20260602-1405-dev", date: "2026-06-02 15:32", env: "dev", target: "05-Excel-실사용흐름", pass: 7, fail: 2, skip: 0, duration: "~20m", note: "SUM/IF 수식·통화·막대차트 정상. TC-07 정렬(ISS-009)·TC-09 차트서식(ISS-008) FAIL (구 시나리오)" },
    { run_id: "RUN-20260602-1405-dev", date: "2026-06-02 15:56", env: "dev", target: "06-Excel-객체삽입", pass: 6, fail: 1, skip: 0, duration: "~16m", note: "표·SUM·막대/원형/꺾은선·병합+SUM참조 보정·영속 정상. TC-05 차트서식(ISS-008) FAIL (구 시나리오)" },
    { run_id: "RUN-20260609-1536-dev", date: "2026-06-09 15:50", env: "dev", target: "01-메일-백지작성", pass: 3, fail: 1, skip: 0, duration: "~12m", note: "메일 AI 패널 첫 실행: 초안·끝추가·중간삽입 PASS. TC-03 인사말 중복+맺음말 끝문장 깨짐 FAIL. 모델 Claude Sonnet 4.6" },
  ],
};
