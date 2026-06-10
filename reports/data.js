// QA 자동화 대시보드 데이터 (시나리오 종료 시마다 /qa-run Skill 이 풀빌드 + 덮어쓰기)
// 스키마 주체: templates/dashboard.html 내부 렌더링 JS.
// TC 옵션 필드: prompt(string) / duration(string, "AI 작업 시간" = 프롬프트 전송→편집 완료 실측, 예 "3s") / in_tokens·out_tokens(string, 예 "1.3k") / screenshots(string[], reports/ 기준 상대경로) / note(string) / run_id(string).

window.QA_DATA = {
  meta: {
    env: "dev",
    run_id: "RUN-20260610-1501-dev",
    updated_at: "2026-06-10 15:18",
    title_suffix: "· 시나리오 정비: 서식 02·03·04 재설계 + SCN-05 형식변환(카드뉴스·비즈니스) 신규, 칩→SCN-06 (6시나리오 32TC · 실행분 10P/0F/100% · 미실행 22)",
  },

  kpis: {
    total_runs: 5,
    runs_by_env: "dev 5 · stage 0 · prd 0",
    pass_rate: 100,
    pass: 10,
    fail: 0,
    open_issues: 4,
    issues_breakdown: "칩 연결오류·응답지연 1 · 모델한도·가용성 1 · 직역치환 비문 1 · 인사말중복·끝문장깨짐 1",
    scenario_count: 6,
    tc_count: 32,
  },

  scenarios: [
    {
      id: "01-메일-백지작성",
      pass: 4,
      total: 4,
      tcs: [
        {
          id: "TC-01", name: "메일 초안 작성 (백지)", status: "PASS",
          prompt: "거래처에 신제품 출시를 안내하는 비즈니스 메일 초안을 작성해줘. 출시일과 핵심 가치를 포함해서",
          duration: "76s", in_tokens: "56.2k", out_tokens: "2.1k",
          run_id: "RUN-20260610-1501-dev",
          screenshots: [
            "RUN-20260610-1501-dev/screenshots/mail-blank-tc01-02-prompt.png",
            "RUN-20260610-1501-dev/screenshots/mail-blank-tc01-03-after.png",
          ],
          note: "초안 정상 삽입(인사·출시·핵심가치·맺음말); 미입력 정보는 플레이스홀더 표기+채팅에 교체가이드(정상동작); 가이드메모 본문혼입 해소; 응답 76s(성능)",
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
      pass: 0,
      total: 4,
      tcs: [
        {
          id: "TC-01", name: "선택 문단 글자 크기 키우기", status: "—",
          prompt: "선택한 문단의 글자 크기를 더 크게 키워줘",
          note: "서식 테스트로 재설계 — 신규 정의 기준 미실행. 핵심: 선택 문단만 크기↑·텍스트 불변·번짐0.",
        },
        {
          id: "TC-02", name: "선택 텍스트 글자색 변경", status: "—",
          prompt: "선택한 부분 글자색을 빨간색으로 바꿔줘",
          note: "서식 테스트로 재설계 — 미실행. 핵심: 선택 구간만 글자색·텍스트 불변·비선택 무변동.",
        },
        {
          id: "TC-03", name: "선택 구간 굵게 + 형광펜 강조", status: "—",
          prompt: "이 문장을 굵게 하고 노란 형광펜으로 강조해줘",
          note: "서식 테스트로 재설계 — 미실행. 핵심: 굵게·하이라이트 동시 적용·범위 정확·내용 불변.",
        },
        {
          id: "TC-04", name: "지정 문장 밑줄·기울임", status: "—",
          prompt: "이 문장에 밑줄을 긋고 기울임체로 만들어줘",
          note: "서식 테스트로 재설계 — 미실행. 핵심: 밑줄·기울임 적용·다른 문장 무변동·내용 불변.",
        },
      ],
    },
    {
      id: "03-메일-일괄변경",
      pass: 0,
      total: 4,
      tcs: [
        {
          id: "TC-01", name: "표 삽입 (행·열 지정)", status: "—",
          prompt: "본문에 3행 2열짜리 표를 넣어줘. 첫 행은 제목 행으로 해줘",
          note: "서식 테스트로 재설계 — 미실행. 핵심: 행·열 수 일치(3×2)·표 구조 정상·기존 본문 보존.",
        },
        {
          id: "TC-02", name: "가로선(구분선) 삽입", status: "—",
          prompt: "인사말과 본론 사이에 가로 구분선을 하나 넣어줘",
          note: "서식 테스트로 재설계 — 미실행. 핵심: 가로선 지정 위치 삽입·본문 무변동·1개만.",
        },
        {
          id: "TC-03", name: "제목/소제목 스타일 적용", status: "—",
          prompt: "메일 제일 윗줄을 제목 스타일로, 각 섹션 첫 줄을 소제목 스타일로 만들어줘",
          note: "서식 테스트로 재설계 — 미실행. 핵심: 제목·소제목 스타일 적용·텍스트 불변·일반 문단 미적용.",
        },
        {
          id: "TC-04", name: "문단 정렬", status: "—",
          prompt: "맺음말 단락을 오른쪽 정렬로 바꿔줘",
          note: "서식 테스트로 재설계 — 미실행. 핵심: 지정 문단 정렬·다른 문단 무변동·내용 불변.",
        },
      ],
    },
    {
      id: "04-메일-전체스타일일괄",
      pass: 0,
      total: 8,
      tcs: [
        {
          id: "TC-01", name: "전체 글자 크기 일괄 변경", status: "—",
          prompt: "본문 전체 글자 크기를 한 단계 키워줘",
          note: "신규 시나리오(전역 스타일). 핵심: 전 문단 크기↑·누락0·텍스트 불변·표/목록 텍스트 포함.",
        },
        {
          id: "TC-02", name: "전체 글자색 통일", status: "—",
          prompt: "본문 전체 글자색을 진한 회색으로 통일해줘",
          note: "핵심: 전체 글자색 일관·색 편차0·누락 문단 없음·내용 불변.",
        },
        {
          id: "TC-03", name: "전체 글꼴 변경", status: "—",
          prompt: "본문 전체 글꼴을 돋움체(고딕 계열)로 바꿔줘",
          note: "핵심: 전 문단 글꼴 일괄·잔존0·내용 불변. 글꼴 미지원 시 동작·안내 note.",
        },
        {
          id: "TC-04", name: "역할별 스타일 일괄 적용", status: "—",
          prompt: "제목과 소제목은 남색 굵게 크게, 본문은 검정 기본 크기로 — 메일 전체를 한 번에 정리해줘",
          note: "핵심: 제목/본문 역할 구분 인식·역할별 차등 일괄 적용·본문 오적용 없음·내용 불변.",
        },
        {
          id: "TC-05", name: "전체 정렬 통일", status: "—",
          prompt: "본문 전체를 양쪽 정렬로 맞춰줘",
          note: "핵심: 전 문단 정렬 일괄·누락0·표/목록 구조 유지·내용 불변.",
        },
        {
          id: "TC-06", name: "전체 줄간격(문단 간격) 조정", status: "—",
          prompt: "본문 전체 줄 간격을 넓혀서 읽기 편하게 만들어줘",
          note: "핵심: 전체 간격 일관 적용·내용/구조 보존. 미지원 시 동작·안내 note.",
        },
        {
          id: "TC-07", name: "복합 테마 일괄 적용 (비즈니스 서식)", status: "—",
          prompt: "메일 전체를 깔끔한 비즈니스 서식으로 한 번에 정리해줘 — 제목 강조, 본문 가독성, 정렬·간격 일관되게",
          note: "핵심: 크기·색·정렬·간격 복수 속성 동시 일괄·일관성↑·텍스트 손실0·표/가로선/목록 구조 보존.",
        },
        {
          id: "TC-08", name: "전체 서식 초기화", status: "—",
          prompt: "본문에 적용된 서식을 모두 지우고 기본 서식으로 되돌려줘",
          note: "핵심: 서식 속성 전반 제거·텍스트 내용 보존(글자 삭제 시 FAIL)·표/목록 처리 방식 note.",
        },
      ],
    },
    {
      id: "05-메일-형식변환",
      pass: 0,
      total: 5,
      tcs: [
        {
          id: "TC-01", name: "카드 뉴스 형태로 변환", status: "—",
          prompt: "이 메일 내용을 카드 뉴스 형태로 만들어줘 — 핵심 메시지를 카드 단위로 나누고, 각 카드에 소제목과 짧은 요약, 카드 사이 구분선으로 구성해줘",
          note: "신규 시나리오(형식 변환). 핵심: 카드 단위 분할·각 카드 소제목+요약·시각 구분·핵심 정보 보존(형식 변환이라 재구성 허용).",
        },
        {
          id: "TC-02", name: "비즈니스 정식 메일 형식으로 다듬기", status: "—",
          prompt: "이 메일을 정중한 비즈니스 형식으로 다듬어줘 — 격식 있는 인사말, 명확한 본론, 정중한 맺음말과 서명 구조로 정리해줘",
          note: "핵심: 인사·본론·맺음·서명 4요소·톤 격식↑·핵심 내용 보존·서식 정돈.",
        },
        {
          id: "TC-03", name: "뉴스레터(소식지) 형식으로 변환", status: "—",
          prompt: "이 내용을 뉴스레터 형식으로 바꿔줘 — 헤더 제목, 섹션별 소제목, 핵심 하이라이트 강조, 마지막에 행동 유도(CTA) 문구를 넣어줘",
          note: "핵심: 헤더·섹션 소제목·하이라이트 강조·CTA 포함·내용 보존.",
        },
        {
          id: "TC-04", name: "공지·안내문 형식으로 정리", status: "—",
          prompt: "이 메일을 공식 공지·안내문 형식으로 정리해줘 — 제목, 핵심 요약, 항목별 안내, 주의사항 강조 순으로",
          note: "핵심: 공지 구조(제목·요약·항목·주의)·항목 정리·주의 시각 강조·핵심 정보 보존.",
        },
        {
          id: "TC-05", name: "핵심 정보 표 기반 레이아웃 재구성", status: "—",
          prompt: "메일의 핵심 정보(일정·장소·대상·비용 등)를 한눈에 보이게 표로 정리하고, 나머지 안내는 간결하게 다듬어줘",
          note: "핵심: 핵심 항목 표 정리·표 구조 정상·수치/사실 원본 일치·본문 핵심 보존.",
        },
      ],
    },
    {
      id: "06-메일-추천기능칩",
      pass: 6,
      total: 7,
      tcs: [
        {
          id: "TC-01", name: "칩 — 문서 서식 정리", status: "PASS",
          prompt: "[칩] 📝 문서 서식 정리",
          duration: "139s", in_tokens: "15.3k", out_tokens: "7.2k",
          run_id: "RUN-20260610-1058-dev",
          screenshots: [
            "RUN-20260610-1058-dev/screenshots/chips-tc01-02-prompt.png",
            "RUN-20260610-1058-dev/screenshots/chips-tc01-03-after.png",
          ],
          note: "서식정리 칩→제목 h1·동호회 표·신청 목록 재구조화, 내용 손실0; 다소 적극 재구성·응답 ~139s(성능) (Sonnet)",
        },
        {
          id: "TC-02", name: "칩 — 내용 요약", status: "PASS",
          prompt: "[칩] 📋 내용 요약",
          duration: "45s", in_tokens: "7.1k", out_tokens: "1.6k",
          run_id: "RUN-20260610-1058-dev",
          screenshots: [
            "RUN-20260610-1058-dev/screenshots/chips-tc02-02-prompt.png",
            "RUN-20260610-1058-dev/screenshots/chips-tc02-03-after.png",
          ],
          note: "요약 칩→요약 4줄(동호회3·회비·마감·문의) 상단 블록 삽입(본문삽입형); 핵심 반영 (Sonnet)",
        },
        {
          id: "TC-03", name: "칩 — 톤 변환", status: "PASS",
          prompt: "[칩] 🔄 톤 변환 → 라디오: 부드러운 경어체",
          duration: "102s", in_tokens: "9.3k", out_tokens: "5.7k",
          run_id: "RUN-20260610-1058-dev",
          screenshots: [
            "RUN-20260610-1058-dev/screenshots/chips-tc03-02-prompt.png",
            "RUN-20260610-1058-dev/screenshots/chips-tc03-03-after.png",
          ],
          note: "톤변환 칩→라디오 선택UX(4종) 정상·부드러운경어체 일괄적용·표보존; 1차 연결오류→재시도 성공 (Sonnet)",
        },
        {
          id: "TC-04", name: "칩 — 글머리 기호 정리", status: "PASS",
          prompt: "[칩] 📋 글머리 기호 정리",
          duration: "89s", in_tokens: "10.6k", out_tokens: "3.1k",
          run_id: "RUN-20260610-1058-dev",
          screenshots: [
            "RUN-20260610-1058-dev/screenshots/chips-tc04-02-prompt.png",
            "RUN-20260610-1058-dev/screenshots/chips-tc04-03-after.png",
          ],
          note: "글머리 칩 트리거; 동호회=표·신청=목록 이미 구조화 인식, 일반 문단 미목록화 올바른 판단 (Sonnet)",
        },
        {
          id: "TC-05", name: "칩 — EMS 메일 템플릿", status: "PASS",
          prompt: "[칩] 📧 EMS 메일 템플릿 → 라디오: 뒤에 추가",
          duration: "91s", in_tokens: "6.7k", out_tokens: "5.8k",
          run_id: "RUN-20260610-1058-dev",
          screenshots: [
            "RUN-20260610-1058-dev/screenshots/chips-tc05-02-prompt.png",
            "RUN-20260610-1058-dev/screenshots/chips-tc05-03-after.png",
          ],
          note: "EMS 칩→라디오 처리방식 선택·table형 템플릿(헤더·CTA·푸터) 뒤에추가·본문보존; 1차 연결오류→재시도 성공 (Sonnet)",
        },
        {
          id: "TC-06", name: "칩 — 에디터 내용 유효성 검사", status: "PASS",
          prompt: "[칩] ✅ 에디터 내용 유효성 검사",
          duration: "47s", in_tokens: "37.4k", out_tokens: "1.3k",
          run_id: "RUN-20260610-1058-dev",
          screenshots: [
            "RUN-20260610-1058-dev/screenshots/chips-tc06-02-prompt.png",
            "RUN-20260610-1058-dev/screenshots/chips-tc06-03-after.png",
          ],
          note: "유효성검사 칩→발송 전 점검 리포트(임시URL 1건·본문/태그/placeholder 정상); 본문 무변경(리포트형) (Sonnet)",
        },
        {
          id: "TC-07", name: "칩 — 맞춤법 검사하기", status: "—",
          prompt: "[칩] 🔍 맞춤법 검사하기",
          note: "구 SCN-04에서 칩 트리거 검증됨(오타 검출·리포트형). 칩 통합(현 SCN-06) 후 미실행 — 다음 회차 대상.",
        },
      ],
    },
  ],

  issues: [
    { id: "ISS-105", title: "추천기능 칩 다중블록 적용 작업의 연결오류 반복 + 응답 지연", severity: "medium", status: "open", detail: "SCN-05(계정4·Sonnet 4.6)에서 적용형 칩 중 톤 변환·EMS 템플릿 두 작업의 **1차 시도가 '연결 오류가 발생했습니다'로 실패**(본문 미적용), 재시도 시 성공. 다중 블록을 순차 교체/삽입하는 작업에서 재현. 또한 적용형 칩(서식정리 139s·톤변환 102s·글머리 89s·EMS 91s)이 60s TC 한도를 초과 — Sonnet 4.6이 '에디터 직접 적용 vs 채팅 출력' 등을 과다 추론하며 출력 토큰·지연 증가. 기능 자체는 정상이나 실사용 시 1회 실패→수동 재시도 부담 + 긴 대기. 적용 작업 타임아웃/재시도 자동화·스트리밍 안정성 점검 권장.", scenarios: "06-메일-추천기능칩 TC-03·05 / 03-메일-일괄변경 TC-03·04" },
    { id: "ISS-104", title: "AI 채팅 모델 한도·가용성 — 짧은 세션에 스마트모델 한도 소진, 패스트 연결오류", severity: "medium", status: "open", detail: "단일 QA 세션에서 메일 1건 생성 + 부분편집 3회(AI 약 4회)만에 계정1(hakyoung) 스마트모델(Claude Sonnet 4.6) 일일 한도 소진('스마트 모델 한도 도달, 6/15 리셋' 배너). 폴백한 패스트모델(Claude Haiku 4.5)은 계정1/2에선 '연결 오류' 반복했으나 계정3에선 정상 동작. 짧은 세션에 한도가 빠르게 소진되는 근인은 각 패널 작업이 입력 수만~11만 토큰을 소모하기 때문(SCN-04 TC-01 입력 110k). 계정 1·3 스마트모델 순차 소진 → 계정 2·4로 전환해 진행. 한도 정책·잔여량 표기·작업당 토큰 절감 검토 권장.", scenarios: "02-메일-부분수정 TC-04 / 03-메일-일괄변경 / 04-메일-고급기능" },
    { id: "ISS-103", title: "단어 일괄치환 시 문맥 보정 없이 직역 → 비문 발생", severity: "low", status: "open", detail: "TC-02 '할인'→'특별 혜택' 일괄치환에서 5곳 전부 치환(잔존0)·타문단 무변동은 정상이나, 문맥 보정 없이 직역해 '20% 특별 혜택된', '특별한 특별 혜택 혜택', '특별 혜택 혜택은' 등 비문 발생. AI 가 어색함을 응답에서 능동 고지하고 다듬기를 제안한 점은 긍정. '모두 바꿔줘' 류 리터럴 지시 시 문맥 자동 다듬기/확인 정책 검토 권장.", scenarios: "02-메일-부분수정 TC-02" },
    { id: "ISS-102", title: "백지 초안 시 AI 작성가이드 메모가 본문에 혼입 (해소)", severity: "medium", status: "resolved", detail: "초기(RUN-20260609-1806/1859-dev) TC-01 에서 메일 본문과 분리돼야 할 AI 메타 안내('📋 메일 작성 가이드')가 본문에 통째로 삽입되던 결함. RUN-20260610-1501-dev(계정4·Sonnet 4.6) 재검증에서 가이드 메모가 **채팅 패널로 분리**되어 본문 혼입 해소 확인. 미입력 정보를 '[제품명]·[출시 날짜]' 등 플레이스홀더로 표기하고 채팅에 교체 가이드표를 제시하는 동작은 **정보 미제공 시의 정상·의도된 동작으로 합의**(대표님 판정, 환각 방지 측면에서 바람직) → TC-01 PASS 정정. 잔여 관찰: 응답 76s(성능, ISS-105 계열).", scenarios: "01-메일-백지작성 TC-01" },
    { id: "ISS-101", title: "메일 본문 인사말 중복·맺음말 끝문장 깨짐", severity: "medium", status: "open", detail: "기존 인사말이 있는 본문에 '인사말 추가' 요청 시 기존 인사 블록을 제거·병합하지 않고 새 인사말을 덧붙여 인사 블록 2개가 연달아 생성됨. 맺음말 끝문장은 '…바락니다. 궁평하십시오.' 등 문자 깨짐/생성 오류. RUN-20260609-1859-dev TC-03 에서는 미재현(인사 상보적·맺음말 깨짐 없음) — 비결정적 가능성, 재현성 재확인 필요.", scenarios: "01-메일-백지작성 TC-03" },
  ],

  history: [
    { run_id: "RUN-20260610-1501-dev", date: "2026-06-10 15:18", env: "dev", target: "01-메일-백지작성 TC-01 (1회차 FAIL 단독 재검증)", pass: 1, fail: 0, skip: 0, duration: "~3m", note: "계정4·Sonnet 4.6 재실행. 초안 정상 삽입, 가이드메모 본문혼입 해소(채팅으로 분리), 미입력 정보는 플레이스홀더+채팅 교체가이드. 정보 미제공 시 정상동작으로 합의(대표님 판정)→PASS 정정. ISS-102 resolved. 누적 23P·0F·100%. 응답 76s(성능)." },
    { run_id: "RUN-20260610-1058-dev", date: "2026-06-10 13:48", env: "dev", target: "03-일괄변경(4/4), 04-고급기능(5/5), 05-추천기능칩(6/6)", pass: 15, fail: 0, skip: 0, duration: "~2h", note: "1회차 사이클 완료. SCN-03 일괄명령 4종(톤·글머리·다듬기·번역) 전부 PASS. SCN-04 칩5종(계정3 스마트소진→Haiku). SCN-05 칩6종(계정4 전환·Sonnet). 톤·EMS 적용 1차 연결오류→재시도 성공(ISS-105). 적용형 칩 다수 60s 초과." },
    { run_id: "RUN-20260610-0919-dev", date: "2026-06-10 10:50", env: "dev", target: "02-메일-부분수정(4/4), 03-메일-일괄변경(1/4)", pass: 5, fail: 0, skip: 0, duration: "~90m", note: "SCN-02 4/4 PASS(부분 톤·요약 정밀·번짐0, '할인'5곳 치환 완전·단 직역비문 ISS-103, 맞춤법 4곳 교정). 계정1 스마트모델 한도소진→계정2 전환(ISS-104). SCN-03 TC-01 전체 캐주얼 톤 PASS. TC-02 직전 사용자 중단." },
    { run_id: "RUN-20260609-1859-dev", date: "2026-06-09 19:31", env: "dev", target: "01-메일-백지작성, 02-메일-부분수정(3/4)", pass: 6, fail: 1, skip: 0, duration: "~30m", note: "SCN-01 3/4(TC-01 가이드메모 혼입 FAIL, ISS-101 미재현) + SCN-02 TC-01~03 PASS(부분 톤/요약 정밀·번짐0, '할인' no-match 정상). SCN-02 TC-04 및 SCN-03~05 미실행(사용자 중단)." },
    { run_id: "RUN-20260609-1536-dev", date: "2026-06-09 15:50", env: "dev", target: "01-메일-백지작성", pass: 3, fail: 1, skip: 0, duration: "~12m", note: "메일 AI 패널 첫 회차(SCN-01만): 초안·끝추가·중간삽입 PASS. TC-03 인사말 중복+맺음말 끝문장 깨짐 FAIL. 본문 자동적용·모델 Claude Sonnet 4.6" },
  ],
};
