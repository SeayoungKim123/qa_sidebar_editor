// QA 자동화 대시보드 데이터 (시나리오 종료 시마다 /qa-run Skill 이 풀빌드 + 덮어쓰기)
// 스키마 주체: templates/dashboard.html 내부 렌더링 JS.
// TC 옵션 필드: prompt(string) / duration(string, "AI 작업 시간" = 프롬프트 전송→편집 완료 실측, 예 "3s") / in_tokens·out_tokens(string, 예 "1.3k") / screenshots(string[], reports/ 기준 상대경로) / note(string) / run_id(string).

window.QA_DATA = {
  meta: {
    env: "dev",
    run_id: "RUN-20260602-1318-dev",
    updated_at: "2026-06-02 13:34",
  },

  kpis: {
    total_runs: 5,
    runs_by_env: "dev 5 · stage 0 · prd 0",
    pass_rate: 100,
    pass: 3,
    fail: 0,
    open_issues: 0,
    issues_breakdown: "",
    scenario_count: 6,
    tc_count: 47,
  },

  scenarios: [
    {
      id: "01-DOCX-실사용흐름",
      pass: 3,
      total: 9,
      tcs: [
        {
          id: "TC-01", name: "개요 단락 작성", status: "PASS",
          prompt: "가비아 2026 사업계획서 개요를 3문단으로 작성해줘. 회사 소개, 올해 방향성, 기대효과 순서로",
          in_tokens: "1.7k", out_tokens: "1.6k",
          run_id: "RUN-20260602-1318-dev",
          screenshots: [
            "RUN-20260602-1318-dev/screenshots/01-docx-tc01-01-before.png",
            "RUN-20260602-1318-dev/screenshots/01-docx-tc01-02-prompt.png",
            "RUN-20260602-1318-dev/screenshots/01-docx-tc01-03-after.png",
          ],
          note: "빈 문서에 3문단(소개·방향성·기대효과) 정확 삽입",
        },
        {
          id: "TC-02", name: "섹션 구조 생성", status: "PASS",
          prompt: "개요 다음에 '1. 시장환경', '2. 사업전략', '3. 추진일정' 세 섹션을 만들어줘. 각 섹션은 제목 한 줄 + 본문 2문단",
          duration: "72s", in_tokens: "3.3k", out_tokens: "1.5k",
          run_id: "RUN-20260602-1318-dev",
          screenshots: [
            "RUN-20260602-1318-dev/screenshots/01-docx-tc02-01-before.png",
            "RUN-20260602-1318-dev/screenshots/01-docx-tc02-02-prompt.png",
            "RUN-20260602-1318-dev/screenshots/01-docx-tc02-03-after.png",
          ],
          note: "제목3개+각 본문2문단 순서대로 삽입, 개요 보존",
        },
        {
          id: "TC-03", name: "표 삽입", status: "PASS",
          prompt: "추진일정 섹션 아래에 분기별 일정표를 만들어줘. 4행 3열, 헤더는 분기/과제/담당, 1Q~3Q 더미 데이터 채워줘",
          duration: "56s", in_tokens: "6.5k", out_tokens: "1.2k",
          run_id: "RUN-20260602-1318-dev",
          screenshots: [
            "RUN-20260602-1318-dev/screenshots/01-docx-tc03-01-before.png",
            "RUN-20260602-1318-dev/screenshots/01-docx-tc03-02-prompt.png",
            "RUN-20260602-1318-dev/screenshots/01-docx-tc03-03-after.png",
          ],
          note: "4행3열 표 삽입, 헤더 분기/과제/담당+1Q~3Q 더미, 헤더 음영 적용",
        },
        { id: "TC-04", name: "특정 단락 강조", status: "—" },
        { id: "TC-05", name: "특정 제목만 서식", status: "—" },
        { id: "TC-06", name: "표 부분 수정", status: "—" },
        { id: "TC-07", name: "섹션 제목 스타일 일괄 통일", status: "—" },
        { id: "TC-08", name: "표지 페이지 추가 + 페이지 나누기", status: "—" },
        { id: "TC-09", name: "본문 단락 일괄 통일", status: "—" },
      ],
    },
    {
      id: "02-DOCX-객체삽입",
      pass: 0,
      total: 7,
      tcs: [
        { id: "TC-01", name: "기준 표 생성", status: "—" },
        { id: "TC-02", name: "행 추가 + 셀 병합", status: "—" },
        { id: "TC-03", name: "열 추가", status: "—" },
        { id: "TC-04", name: "차트 삽입", status: "—" },
        { id: "TC-05", name: "차트 종류 변경", status: "—" },
        { id: "TC-06", name: "강조 도형 삽입", status: "—" },
        { id: "TC-07", name: "로고 자리표시 삽입 + 저장/영속", status: "—" },
      ],
    },
    {
      id: "03-PPT-실사용흐름",
      pass: 0,
      total: 9,
      tcs: [
        { id: "TC-01", name: "표지 슬라이드 작성", status: "—" },
        { id: "TC-02", name: "본문 슬라이드 다수 생성", status: "—" },
        { id: "TC-03", name: "데이터 슬라이드 추가", status: "—" },
        { id: "TC-04", name: "특정 슬라이드 제목 수정", status: "—" },
        { id: "TC-05", name: "특정 본문 서식", status: "—" },
        { id: "TC-06", name: "강조 도형 추가", status: "—" },
        { id: "TC-07", name: "전체 테마/색상 팔레트 변경", status: "—" },
        { id: "TC-08", name: "제목 폰트 일괄 통일", status: "—" },
        { id: "TC-09", name: "표지 슬라이드 디자인", status: "—" },
      ],
    },
    {
      id: "04-PPT-객체삽입",
      pass: 0,
      total: 6,
      tcs: [
        { id: "TC-01", name: "매출표 슬라이드 생성", status: "—" },
        { id: "TC-02", name: "표 셀 병합 + 행 추가", status: "—" },
        { id: "TC-03", name: "차트 슬라이드 삽입", status: "—" },
        { id: "TC-04", name: "차트 종류 변경", status: "—" },
        { id: "TC-05", name: "강조 도형 추가", status: "—" },
        { id: "TC-06", name: "저장/영속 확인", status: "—" },
      ],
    },
    {
      id: "05-Excel-실사용흐름",
      pass: 0,
      total: 9,
      tcs: [
        { id: "TC-01", name: "매출 표 만들기", status: "—" },
        { id: "TC-02", name: "합계 행 추가 (수식)", status: "—" },
        { id: "TC-03", name: "총합 컬럼 추가 (수식)", status: "—" },
        { id: "TC-04", name: "헤더 행 서식", status: "—" },
        { id: "TC-05", name: "통화 형식 적용", status: "—" },
        { id: "TC-06", name: "조건부 IF 수식", status: "—" },
        { id: "TC-07", name: "표 전체 정렬 + 테두리", status: "—" },
        { id: "TC-08", name: "막대 차트 생성", status: "—" },
        { id: "TC-09", name: "차트 디자인 수정", status: "—" },
      ],
    },
    {
      id: "06-Excel-객체삽입",
      pass: 0,
      total: 7,
      tcs: [
        { id: "TC-01", name: "매출표 + 총합 수식 생성", status: "—" },
        { id: "TC-02", name: "막대 차트 생성", status: "—" },
        { id: "TC-03", name: "원형 차트 생성", status: "—" },
        { id: "TC-04", name: "꺾은선 차트 생성", status: "—" },
        { id: "TC-05", name: "차트 디자인 수정", status: "—" },
        { id: "TC-06", name: "행 삽입 + 셀 병합 (수식·차트 참조 보정)", status: "—" },
        { id: "TC-07", name: "저장/영속 확인", status: "—" },
      ],
    },
  ],

  issues: [],

  history: [
    { run_id: "RUN-20260518-1148-dev", date: "2026-05-18 02:57", env: "dev", target: "01-AI-DOCX-편집", pass: 5, fail: 5, skip: 0, duration: "~80m", note: "TC-02/05/06/07/09 FAIL; DOCX 네이티브 서식 미적용 패턴 반복 (구 시나리오)" },
    { run_id: "RUN-20260518-1148-dev", date: "2026-05-18 04:50", env: "dev", target: "02-AI-PPT-편집",  pass: 5, fail: 5, skip: 0, duration: "~32m", note: "TC-02/04 선택 자동화 불가, TC-05 빈슬라이드 없음, TC-06/07 일괄 편집 불가 (구 시나리오)" },
    { run_id: "RUN-20260518-1148-dev", date: "2026-05-18 05:25", env: "dev", target: "03-AI-Excel-편집", pass: 6, fail: 7, skip: 0, duration: "~130m", note: "TC-01/04/06/09/11/12/13 FAIL; 날짜타입·시트전환·정렬·VLOOKUP시트명·차트서식 한계 (구 시나리오)" },
    { run_id: "RUN-20260518-1518-dev", date: "2026-05-18 15:18", env: "dev", target: "02-AI-PPT-편집",  pass: 1, fail: 0, skip: 9, duration: "~8m", note: "TC-05 단독 PASS; 기존 슬라이드 본문 bullet 3개 삽입 확인 (구 시나리오)" },
    { run_id: "RUN-20260518-1540-dev", date: "2026-05-18 15:40", env: "dev", target: "02-AI-PPT-편집",  pass: 0, fail: 3, skip: 7, duration: "~30m", note: "TC-02/04 선택 감지 불가, TC-06 제목 도형 구조 읽기 불가 (구 시나리오)" },
    { run_id: "RUN-20260602-1157-dev", date: "2026-06-02 11:57", env: "dev", target: "01-DOCX-실사용흐름", pass: 3, fail: 0, skip: 0, duration: "~8m", note: "샘플 시험: TC-01~03 PASS (개요·섹션·표 삽입). 첫 로드 CORS 차단→새로고침 복구. 신 시나리오 카탈로그(6개) 첫 회차" },
    { run_id: "RUN-20260602-1318-dev", date: "2026-06-02 13:18", env: "dev", target: "01-DOCX-실사용흐름", pass: 3, fail: 0, skip: 0, duration: "~10m", note: "샘플 재시험: TC-01~03 PASS (개요·섹션·표). CORS 미재현. 신규: 사이드바 드로어 backdrop 전송 차단→Enter 전송 우회(ISS-005). 자동저장 잔존분 빈문서 복원" },
  ],
};
