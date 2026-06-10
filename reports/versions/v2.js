// QA 자동화 대시보드 데이터 (시나리오 종료 시마다 /qa-run Skill 이 풀빌드 + 덮어쓰기)
// 스키마 주체: templates/dashboard.html 내부 렌더링 JS.
// TC 옵션 필드: prompt(string) / duration(string, "AI 작업 시간" = 프롬프트 전송→편집 완료 실측, 예 "3s") / in_tokens·out_tokens(string, 예 "1.3k") / screenshots(string[], reports/ 기준 상대경로) / note(string) / run_id(string).

window.QA_DATA = {
  meta: {
    env: "dev",
    run_id: "RUN-20260610-0919-dev",
    updated_at: "2026-06-10 10:50",
  },

  kpis: {
    total_runs: 3,
    runs_by_env: "dev 3 · stage 0 · prd 0",
    pass_rate: 100,
    pass: 5,
    fail: 0,
    open_issues: 4,
    issues_breakdown: "모델한도·가용성 1 · 직역치환 비문 1 · 본문 가이드메모 혼입 1 · 인사말중복·끝문장깨짐 1",
    scenario_count: 5,
    tc_count: 23,
  },

  scenarios: [
    {
      id: "01-메일-백지작성",
      pass: 0,
      total: 4,
      tcs: [
        { id: "TC-01", name: "메일 초안 작성 (백지)", status: "—" },
        { id: "TC-02", name: "단락 추가", status: "—" },
        { id: "TC-03", name: "인사말·맺음말 골격", status: "—" },
        { id: "TC-04", name: "나열 정보 삽입", status: "—" },
      ],
    },
    {
      id: "02-메일-부분수정",
      pass: 4,
      total: 4,
      tcs: [
        {
          id: "TC-01", name: "특정 문단 톤 변환", status: "PASS",
          prompt: "본문에서 '평소 저희 제품을 아끼고 이용해 주시는 고객님께...'로 시작하는 인사 문단만 더 공손하고 정중한 톤으로 바꿔줘. 나머지 문단은 한 글자도 바꾸지 말고 그대로 둬.",
          duration: "138s", in_tokens: "18.6k", out_tokens: "8k",
          run_id: "RUN-20260610-0919-dev",
          screenshots: [
            "RUN-20260610-0919-dev/screenshots/mail-partial-tc01-02-prompt.png",
            "RUN-20260610-0919-dev/screenshots/mail-partial-tc01-03-after.png",
          ],
          note: "인사 문단만 정중한 톤으로 상승; 나머지 3문단 글자 단위 무변동 (replace setHTML 폴백으로 ~138s)",
        },
        {
          id: "TC-02", name: "특정 표현 일괄 치환", status: "PASS",
          prompt: "본문에 있는 '할인'이라는 단어를 모두 '특별 혜택'으로 바꿔줘",
          in_tokens: "32.2k", out_tokens: "1.5k",
          run_id: "RUN-20260610-0919-dev",
          screenshots: [
            "RUN-20260610-0919-dev/screenshots/mail-partial-tc02-02-prompt.png",
            "RUN-20260610-0919-dev/screenshots/mail-partial-tc02-03-after.png",
          ],
          note: "할인 5곳 전부 '특별 혜택' 치환·잔존0·타문단 무변동; 문맥보정 없이 직역치환→일부 비문('특별 혜택된'), AI가 어색함 고지+수정제안",
        },
        {
          id: "TC-03", name: "한 문단만 요약", status: "PASS",
          prompt: "본문에서 '에어핏 프로는 고객님의 일상을 한층 풍요롭게...'로 시작하는 제품 특징 문단만 핵심 의미를 유지한 채 한 문장으로 짧게 줄여줘. 나머지 문단은 그대로 둬.",
          duration: "84s", in_tokens: "10k", out_tokens: "3.5k",
          run_id: "RUN-20260610-0919-dev",
          screenshots: [
            "RUN-20260610-0919-dev/screenshots/mail-partial-tc03-02-prompt.png",
            "RUN-20260610-0919-dev/screenshots/mail-partial-tc03-03-after.png",
          ],
          note: "특징 문단만 한 문장으로 축약(핵심기능 5종 보존); 나머지 3문단 무변동",
        },
        {
          id: "TC-04", name: "한 문장 맞춤법 교정", status: "PASS",
          prompt: "본문에 있는 그 문장의 맞춤법과 띄어쓰기를 고쳐줘. 문장의 의미와 어조는 그대로 유지하고, 새 내용은 추가하지 마.",
          duration: "51s", in_tokens: "55.4k", out_tokens: "1.4k",
          run_id: "RUN-20260610-0919-dev",
          screenshots: [
            "RUN-20260610-0919-dev/screenshots/mail-partial-tc04-02-prompt.png",
            "RUN-20260610-0919-dev/screenshots/mail-partial-tc04-03-after.png",
          ],
          note: "오타·띄어쓰기 4곳 정확 교정·의미/어조 유지·새내용 없음 (계정1 한도소진→계정2 전환 후 완료)",
        },
      ],
    },
    {
      id: "03-메일-일괄변경",
      pass: 1,
      total: 4,
      tcs: [
        {
          id: "TC-01", name: "전체 톤 변환", status: "PASS",
          prompt: "메일 전체를 가벼운 캐주얼한 톤으로 바꿔줘",
          duration: "63s", in_tokens: "9.5k", out_tokens: "3.2k",
          run_id: "RUN-20260610-0919-dev",
          screenshots: [
            "RUN-20260610-0919-dev/screenshots/mail-bulk-tc01-02-prompt.png",
            "RUN-20260610-0919-dev/screenshots/mail-bulk-tc01-03-after.png",
          ],
          note: "4개 문단 모두 캐주얼 톤 일괄 전환; 일정·준비물·신청 내용 누락 없음",
        },
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
    { id: "ISS-104", title: "AI 채팅 모델 한도·가용성 — 짧은 세션에 스마트모델 한도 소진, 패스트 연결오류", severity: "medium", status: "open", detail: "단일 QA 세션에서 메일 1건 생성 + 부분편집 3회(AI 약 4회)만에 계정1(hakyoung) 스마트모델(Claude Sonnet 4.6) 일일 한도 소진('스마트 모델 한도 도달, 6/15 리셋' 배너). 폴백한 패스트모델(Claude Haiku 4.5)은 '연결 오류가 발생했습니다' 반복으로 사용 불가. 계정2(juneyoung) 전환 후 정상 진행. 실사용에서 연속 편집 시 한도/안정성으로 작업 중단 가능 — 한도 정책·잔여량 표기·패스트 폴백 안정성 점검 권장.", scenarios: "02-메일-부분수정 TC-04 / 03-메일-일괄변경" },
    { id: "ISS-103", title: "단어 일괄치환 시 문맥 보정 없이 직역 → 비문 발생", severity: "low", status: "open", detail: "TC-02 '할인'→'특별 혜택' 일괄치환에서 5곳 전부 치환(잔존0)·타문단 무변동은 정상이나, 문맥 보정 없이 직역해 '20% 특별 혜택된', '특별한 특별 혜택 혜택', '특별 혜택 혜택은' 등 비문 발생. AI 가 어색함을 응답에서 능동 고지하고 다듬기를 제안한 점은 긍정. '모두 바꿔줘' 류 리터럴 지시 시 문맥 자동 다듬기/확인 정책 검토 권장.", scenarios: "02-메일-부분수정 TC-02" },
    { id: "ISS-102", title: "백지 초안 시 AI 작성가이드 메모·미치환 플레이스홀더가 본문에 혼입", severity: "medium", status: "open", detail: "TC-01 백지 초안 생성 시 메일 본문 콘텐츠와 분리돼야 할 AI 메타 안내('📋 메일 작성 가이드' — 받는사람/제목 예시/플레이스홀더 교체 안내)가 본문에 통째로 삽입됨. 또한 '[발신자 회사명]' 등 플레이스홀더가 미치환 상태로 본문 잔존. RUN-20260609-1806-dev 에 이어 RUN-20260609-1859-dev TC-01 재현.", scenarios: "01-메일-백지작성 TC-01" },
    { id: "ISS-101", title: "메일 본문 인사말 중복·맺음말 끝문장 깨짐", severity: "medium", status: "open", detail: "기존 인사말이 있는 본문에 '인사말 추가' 요청 시 기존 인사 블록을 제거·병합하지 않고 새 인사말을 덧붙여 인사 블록 2개가 연달아 생성됨. 맺음말 끝문장은 '…바락니다. 궁평하십시오.' 등 문자 깨짐/생성 오류. RUN-20260609-1859-dev TC-03 에서는 미재현(인사 상보적·맺음말 깨짐 없음) — 비결정적 가능성, 재현성 재확인 필요.", scenarios: "01-메일-백지작성 TC-03" },
  ],

  history: [
    { run_id: "RUN-20260610-0919-dev", date: "2026-06-10 10:50", env: "dev", target: "02-메일-부분수정(4/4), 03-메일-일괄변경(1/4)", pass: 5, fail: 0, skip: 0, duration: "~90m", note: "SCN-02 4/4 PASS(부분 톤·요약 정밀·번짐0, '할인'5곳 치환 완전·단 직역비문 ISS-103, 맞춤법 4곳 교정). 계정1 스마트모델 한도소진→계정2 전환(ISS-104). SCN-03 TC-01 전체 캐주얼 톤 PASS. TC-02 직전 사용자 중단." },
    { run_id: "RUN-20260609-1859-dev", date: "2026-06-09 19:31", env: "dev", target: "01-메일-백지작성, 02-메일-부분수정(3/4)", pass: 6, fail: 1, skip: 0, duration: "~30m", note: "SCN-01 3/4(TC-01 가이드메모 혼입 FAIL, ISS-101 미재현) + SCN-02 TC-01~03 PASS(부분 톤/요약 정밀·번짐0, '할인' no-match 정상). SCN-02 TC-04 및 SCN-03~05 미실행(사용자 중단)." },
    { run_id: "RUN-20260609-1536-dev", date: "2026-06-09 15:50", env: "dev", target: "01-메일-백지작성", pass: 3, fail: 1, skip: 0, duration: "~12m", note: "메일 AI 패널 첫 회차(SCN-01만): 초안·끝추가·중간삽입 PASS. TC-03 인사말 중복+맺음말 끝문장 깨짐 FAIL. 본문 자동적용·모델 Claude Sonnet 4.6" },
  ],
};
