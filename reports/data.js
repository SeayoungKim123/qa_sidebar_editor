// QA 자동화 대시보드 데이터 (시나리오 종료 시마다 /qa-run Skill 이 풀빌드 + 덮어쓰기)
// 스키마 주체: templates/dashboard.html 내부 렌더링 JS.
// TC 옵션 필드: prompt(string) / duration(string, "AI 작업 시간" = 프롬프트 전송→편집 완료 실측, 예 "3s") / in_tokens·out_tokens(string, 예 "1.3k") / screenshots(string[], reports/ 기준 상대경로) / note(string) / run_id(string).

window.QA_DATA = {
  meta: {
    env: "dev",
    run_id: "RUN-20260610-1501-dev",
    updated_at: "2026-06-10 15:18",
    title_suffix: "· SCN-01 TC-01 재검증·정정 (PASS·계정4·23P·0F·100%)",
  },

  kpis: {
    total_runs: 5,
    runs_by_env: "dev 5 · stage 0 · prd 0",
    pass_rate: 100,
    pass: 23,
    fail: 0,
    open_issues: 4,
    issues_breakdown: "칩 연결오류·응답지연 1 · 모델한도·가용성 1 · 직역치환 비문 1 · 인사말중복·끝문장깨짐 1",
    scenario_count: 5,
    tc_count: 23,
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
      pass: 4,
      total: 4,
      tcs: [
        {
          id: "TC-01", name: "전체 톤 변환", status: "PASS",
          prompt: "메일 전체를 가벼운 캐주얼한 톤으로 바꿔줘",
          duration: "72s", in_tokens: "9.3k", out_tokens: "3.2k",
          run_id: "RUN-20260610-1058-dev",
          screenshots: [
            "RUN-20260610-1058-dev/screenshots/bulk-tc01-02-prompt.png",
            "RUN-20260610-1058-dev/screenshots/bulk-tc01-03-after.png",
          ],
          note: "전 4문단 캐주얼 일괄 전환; 일정·준비물 등 정보 누락 0",
        },
        {
          id: "TC-02", name: "글머리 기호 정리", status: "PASS",
          prompt: "본문에서 나열되는 부분을 글머리 기호 목록으로 정리해줘",
          duration: "69s", in_tokens: "8.1k", out_tokens: "1.9k",
          run_id: "RUN-20260610-1058-dev",
          screenshots: [
            "RUN-20260610-1058-dev/screenshots/bulk-tc02-02-prompt.png",
            "RUN-20260610-1058-dev/screenshots/bulk-tc02-03-after.png",
          ],
          note: "행사정보 나열 4항목 불릿화; 일반 문단 미목록화·항목수 보존",
        },
        {
          id: "TC-03", name: "전체 내용 다듬기", status: "PASS",
          prompt: "메일 전체 내용을 매끄럽고 자연스럽게 다듬어줘",
          duration: "139s", in_tokens: "12.1k", out_tokens: "7.6k",
          run_id: "RUN-20260610-1058-dev",
          screenshots: [
            "RUN-20260610-1058-dev/screenshots/bulk-tc03-02-prompt.png",
            "RUN-20260610-1058-dev/screenshots/bulk-tc03-03-after.png",
          ],
          note: "전체 윤문·정보 누락0·글머리 구조 보존; 응답 ~130s로 60s 초과(성능)",
        },
        {
          id: "TC-04", name: "전체 번역", status: "PASS",
          prompt: "메일 전체를 영어로 번역해줘",
          duration: "95s", in_tokens: "9k", out_tokens: "4.1k",
          run_id: "RUN-20260610-1058-dev",
          screenshots: [
            "RUN-20260610-1058-dev/screenshots/bulk-tc04-02-prompt.png",
            "RUN-20260610-1058-dev/screenshots/bulk-tc04-03-after.png",
          ],
          note: "전체 영문 번역·한국어 잔존0·목록4 구조 유지; 응답 ~95s로 60s 초과(성능)",
        },
      ],
    },
    {
      id: "04-메일-고급기능",
      pass: 5,
      total: 5,
      tcs: [
        {
          id: "TC-01", name: "추천기능 칩 클릭 — 내용 요약", status: "PASS",
          prompt: "[칩] 📋 내용 요약",
          duration: "37s", in_tokens: "110.5k", out_tokens: "1.5k",
          run_id: "RUN-20260610-1058-dev",
          screenshots: [
            "RUN-20260610-1058-dev/screenshots/adv-tc01-02-prompt.png",
            "RUN-20260610-1058-dev/screenshots/adv-tc01-03-after.png",
          ],
          note: "내용요약 칩 트리거 정상; 요약 4줄(목적·기간·방법·주의) 상단 삽입·본문 보존 (Haiku·스마트한도소진)",
        },
        {
          id: "TC-02", name: "EMS 메일 템플릿", status: "PASS",
          prompt: "[칩] 📧 EMS 메일 템플릿",
          duration: "40s", in_tokens: "3k", out_tokens: "1.9k",
          run_id: "RUN-20260610-1058-dev",
          screenshots: [
            "RUN-20260610-1058-dev/screenshots/adv-tc02-02-prompt.png",
            "RUN-20260610-1058-dev/screenshots/adv-tc02-03-after.png",
            "RUN-20260610-1058-dev/screenshots/adv-tc02-03b-after.png",
          ],
          note: "EMS 칩 트리거; 기존본문 처리 선택지 제시 후 table형 템플릿(헤더·CTA·푸터) 정상 삽입 (Haiku)",
        },
        {
          id: "TC-03", name: "에디터 내용 유효성 검사", status: "PASS",
          prompt: "[칩] ✅ 에디터 내용 유효성 검사",
          duration: "46s", in_tokens: "2.1k", out_tokens: "685",
          run_id: "RUN-20260610-1058-dev",
          screenshots: [
            "RUN-20260610-1058-dev/screenshots/adv-tc03-02-prompt.png",
            "RUN-20260610-1058-dev/screenshots/adv-tc03-03-after.png",
          ],
          note: "유효성검사 칩→진단리포트(임시URL경고·표정상·체크리스트); 본문 무변경(리포트형) (Haiku)",
        },
        {
          id: "TC-04", name: "맞춤법 검사하기 (전체)", status: "PASS",
          prompt: "[칩] 🔍 맞춤법 검사하기",
          duration: "56s", in_tokens: "4.7k", out_tokens: "2.4k",
          run_id: "RUN-20260610-1058-dev",
          screenshots: [
            "RUN-20260610-1058-dev/screenshots/adv-tc04-02-prompt.png",
            "RUN-20260610-1058-dev/screenshots/adv-tc04-03-after.png",
          ],
          note: "맞춤법 칩→오타 7곳 검출·수정제안(리포트형); 오교정 없음, 단 코멘트 개수표기 불일치(4 vs 7) (Haiku)",
        },
        {
          id: "TC-05", name: "문서 서식 정리", status: "PASS",
          prompt: "[칩] 📝 문서 서식 정리",
          duration: "76s", in_tokens: "13.3k", out_tokens: "3.3k",
          run_id: "RUN-20260610-1058-dev",
          screenshots: [
            "RUN-20260610-1058-dev/screenshots/adv-tc05-02-prompt.png",
            "RUN-20260610-1058-dev/screenshots/adv-tc05-03-after.png",
          ],
          note: "서식정리 칩→제목 h2격상·빈줄 정리·본문 일관서식, 내용 손실0·EMS table 보존; 응답 ~76s(성능) (Haiku)",
        },
      ],
    },
    {
      id: "05-메일-추천기능칩",
      pass: 6,
      total: 6,
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
      ],
    },
  ],

  issues: [
    { id: "ISS-105", title: "추천기능 칩 다중블록 적용 작업의 연결오류 반복 + 응답 지연", severity: "medium", status: "open", detail: "SCN-05(계정4·Sonnet 4.6)에서 적용형 칩 중 톤 변환·EMS 템플릿 두 작업의 **1차 시도가 '연결 오류가 발생했습니다'로 실패**(본문 미적용), 재시도 시 성공. 다중 블록을 순차 교체/삽입하는 작업에서 재현. 또한 적용형 칩(서식정리 139s·톤변환 102s·글머리 89s·EMS 91s)이 60s TC 한도를 초과 — Sonnet 4.6이 '에디터 직접 적용 vs 채팅 출력' 등을 과다 추론하며 출력 토큰·지연 증가. 기능 자체는 정상이나 실사용 시 1회 실패→수동 재시도 부담 + 긴 대기. 적용 작업 타임아웃/재시도 자동화·스트리밍 안정성 점검 권장.", scenarios: "05-메일-추천기능칩 TC-03·05 / 03-메일-일괄변경 TC-03·04" },
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
