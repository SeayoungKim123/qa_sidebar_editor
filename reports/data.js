// QA 자동화 대시보드 데이터 (시나리오 종료 시마다 /qa-run Skill 이 풀빌드 + 덮어쓰기)
// 스키마 주체: templates/dashboard.html 내부 렌더링 JS.
// TC 옵션 필드: screenshots(string[], reports/ 기준 상대경로) / note(string) / run_id(string).

window.QA_DATA = {
  meta: {
    env: "dev",
    run_id: "RUN-20260518-1148-dev",
    updated_at: "2026-05-18 07:35",
  },

  kpis: {
    total_runs: 4,
    runs_by_env: "dev 4 · stage 0 · prd 0",
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
      pass: 5,
      total: 10,
      tcs: [
        {
          id: "TC-01", name: "표 만들기", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: [
            "RUN-20260518-1148-dev/screenshots/01-docx-tc01-02-table-inserted.png",
            "RUN-20260518-1148-dev/screenshots/01-docx-tc01-03-table-verify.png",
          ],
          note: "",
        },
        {
          id: "TC-02", name: "글자 크기 조정", tag: "", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: [
            "RUN-20260518-1148-dev/screenshots/01-docx-tc02-04-fontsize-check.png",
          ],
          note: "16pt 요청했으나 8pt 적용; 이전 회차와 동일 버그",
        },
        {
          id: "TC-03", name: "내용 작성", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/01-docx-tc03-03-paragraphs.png"],
          note: "사업분야·강점·비전 3문단 삽입 완료",
        },
        {
          id: "TC-04", name: "형식 맞추기", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/01-docx-tc04-02-bold-center-pass.png"],
          note: "Bold·가운데 정렬 모두 적용",
        },
        {
          id: "TC-05", name: "목록 변환", tag: "", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: [
            "RUN-20260518-1148-dev/screenshots/01-docx-tc05-04-bullets-notpressed.png",
          ],
          note: "글머리 버튼 미활성; 텍스트 • 삽입으로 네이티브 목록 미적용",
        },
        {
          id: "TC-06", name: "복합 명령 — 표 + 서식", tag: "", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/01-docx-tc06-01-table-result.png"],
          note: "표 삽입·회색 배경 적용됨; 헤더 굵게 툴바 미반영 (응답 98s)",
        },
        {
          id: "TC-07", name: "디자인 — 표지 페이지", tag: "", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/01-docx-tc07-01-cover-page.png"],
          note: "제목 파랑 시각 확인됨; 부제 회색 아닌 파랑; 툴바 폰트 미반영 (응답 82s)",
        },
        {
          id: "TC-08", name: "디자인 — 표 스타일링", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/01-docx-tc08-01-table-styled.png"],
          note: "헤더 진한 파랑·흰 글자 시각 확인; 테두리 적용됨 (응답 90s)",
        },
        {
          id: "TC-09", name: "디자인 — 섹션 헤더 스타일", tag: "", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/01-docx-tc09-04-nav-panel.png"],
          note: "탐색창에 섹션 제목 미인식; 색상 변경만 적용 (응답 78s)",
        },
        {
          id: "TC-10", name: "비현실적 명령 — 한계 확인", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/01-docx-tc10-01-impossible-cmd.png"],
          note: "이메일 첨부 불가 안내 + 대안 제시; 본문 변경 없음 (응답 78s)",
        },
      ],
    },
    {
      id: "02-AI-PPT-편집",
      pass: 5,
      total: 10,
      tcs: [
        {
          id: "TC-01", name: "슬라이드 추가", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: [
            "RUN-20260518-1148-dev/screenshots/02-ppt-tc01-01-slide7-progress.png",
            "RUN-20260518-1148-dev/screenshots/02-ppt-tc01-03-slide7-final.png",
          ],
          note: "슬라이드 7 추가, 2열 5행 표·더미 수치 생성; 응답 약 10분",
        },
        {
          id: "TC-02", name: "글자 크기 조정", tag: "BLOCKED", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: [
            "RUN-20260518-1148-dev/screenshots/02-ppt-tc02-01-slide1.png",
          ],
          note: "제목 텍스트박스 선택 불가; 캔버스 렌더링으로 클릭 자동화 불가",
        },
        {
          id: "TC-03", name: "내용 작성", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: [
            "RUN-20260518-1148-dev/screenshots/02-ppt-tc03-05-slides-final.png",
            "RUN-20260518-1148-dev/screenshots/02-ppt-tc03-06-slide8.png",
            "RUN-20260518-1148-dev/screenshots/02-ppt-tc03-07-slide9.png",
          ],
          note: "슬라이드 3장(표지·사업분야·비전) 추가, 각 글머리 기호 포함; 응답 약 2분",
        },
        {
          id: "TC-04", name: "형식 맞추기", tag: "BLOCKED", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: [],
          note: "본문 텍스트박스 선택 불가; TC-02와 동일 캔버스 자동화 한계",
        },
        {
          id: "TC-05", name: "도형/항목 추가", tag: "BLOCKED", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: [
            "RUN-20260518-1148-dev/screenshots/02-ppt-tc05-01-slide2.png",
          ],
          note: "빈 본문 슬라이드 없음; 모든 슬라이드에 이미 내용 있어 사전조건 미달",
        },
        {
          id: "TC-06", name: "슬라이드 통합 편집", tag: "", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/02-ppt-tc06-02-ai-decline.png"],
          note: "전체 폰트 통일 불가; 기존 슬라이드 교체 방식으로 내용 손상 우려",
        },
        {
          id: "TC-07", name: "디자인 — 테마/색상 팔레트", tag: "", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: [
            "RUN-20260518-1148-dev/screenshots/02-ppt-tc07-01-result.png",
          ],
          note: "전체 테마 변경 불가; 기존 슬라이드 내용 읽기 불가로 손상 위험 (응답 90s)",
        },
        {
          id: "TC-08", name: "디자인 — 표지 슬라이드", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/02-ppt-tc08-02-slide8-cover.png"],
          note: "남색 배경·흰색 제목·주황 도형 적용; 슬라이드8 대상 (응답 90s)",
        },
        {
          id: "TC-09", name: "디자인 — 강조 도형/박스", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/02-ppt-tc09-02-slide8-new-badge.png"],
          note: "빨간 둥근 사각형 NEW 배지 우측 상단 추가; 슬라이드8 대상 (응답 60s)",
        },
        {
          id: "TC-10", name: "비대상 명령", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/02-ppt-tc10-01-video-decline.png"],
          note: "영상 변환 불가 명시 안내 + 대안 제시, 슬라이드 변경 없음",
        },
      ],
    },
    {
      id: "03-AI-Excel-편집",
      pass: 6,
      total: 13,
      tcs: [
        {
          id: "TC-01", name: "표 만들기", tag: "", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: [
            "RUN-20260518-1148-dev/screenshots/03-excel-tc01-02-result.png",
            "RUN-20260518-1148-dev/screenshots/03-excel-tc01-03-date-check.png",
          ],
          note: "헤더·4행·금액 숫자 확인; 날짜 컬럼이 텍스트로 입력됨 (응답 50s)",
        },
        {
          id: "TC-02", name: "글자 크기/서식", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: [
            "RUN-20260518-1148-dev/screenshots/03-excel-tc02-01-result.png",
            "RUN-20260518-1148-dev/screenshots/03-excel-tc02-03-toolbar-A1.png",
          ],
          note: "A1:C1 굵게·14pt·#E5E5E5 적용; 툴바 Bold 확인 불가 (캔버스 렌더링)",
        },
        {
          id: "TC-03", name: "내용 작성", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/03-excel-tc03-01-months-result.png"],
          note: "B1:B12에 1월~12월 순서대로 입력; B13 비어있음 확인 (응답 약 50s)",
        },
        {
          id: "TC-04", name: "수식 — 합계", tag: "", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/03-excel-tc04-01-b11-formula.png"],
          note: "시트2 전환 불가; 시트1 B11에 =SUM(B2:B10) 삽입됨 (응답 약 40s)",
        },
        {
          id: "TC-05", name: "셀 서식", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/03-excel-tc05-01-currency-result.png"],
          note: "시트2 C1:C12에 ₩#,##0 서식 적용; 수식줄 숫자값 유지 확인 (응답 약 50s)",
        },
        {
          id: "TC-06", name: "정렬/형식 맞추기", tag: "", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/03-excel-tc06-01-borders-no-align.png"],
          note: "가운데 정렬 미지원; 테두리(A1:D12)만 적용됨 (응답 약 60s)",
        },
        {
          id: "TC-07", name: "복합 명령 — 표 + 합계 + 서식", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/03-excel-tc07-01-table-sum-bold.png"],
          note: "표·SUM수식(=SUM(B2:B6))·헤더굵게 모두 적용; 2명 구성(3명 요청했으나 3열 한계) (응답 약 120s)",
        },
        {
          id: "TC-08", name: "수식 — 조건부 IF", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/03-excel-tc08-01-if-formula-d2.png"],
          note: "D2 수식줄 =IF(C2>=60,\"합격\",\"불합격\") 확인; D2:D10 9행 모두 삽입 (응답 약 120s)",
        },
        {
          id: "TC-09", name: "수식 — VLOOKUP / 참조", tag: "", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/03-excel-tc09-01-vlookup-fail.png"],
          note: "Sheet2 영문 시트명 참조 오류; B2 수식 미적용, 경고 팝업 (응답 약 90s)",
        },
        {
          id: "TC-10", name: "차트 — 막대 그래프", tag: "", status: "PASS",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/03-excel-tc10-01-chart-result.png"],
          note: "막대 차트·제목 \"상반기 매출\" 생성; A1:B7 구조 불일치로 B1:C5 적응 사용 (응답 약 150s)",
        },
        {
          id: "TC-11", name: "차트 — 원형 그래프", tag: "", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/03-excel-tc11-01-pie-no-data.png"],
          note: "A10:B14 숫자·부서명 없음; 파이 차트 미생성, AI가 범위 재요청 (응답 약 150s)",
        },
        {
          id: "TC-12", name: "차트 — 차트 디자인 수정", tag: "", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/03-excel-tc12-01-chart-design.png"],
          note: "차트 서식 변경 도구 없음; 색상·축크기·격자선 3항목 미지원 (응답 약 90s)",
        },
        {
          id: "TC-13", name: "비대상 명령", tag: "", status: "FAIL",
          run_id: "RUN-20260518-1148-dev",
          screenshots: ["RUN-20260518-1148-dev/screenshots/03-excel-tc13-01-pdf-created.png"],
          note: "거절 없이 PDF 파일 생성(시트1_PDF.pdf); 불가 안내 미노출; 셀 변경 없음 (응답 약 70s)",
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
      note: "정렬, 차트 격자선, 데이터 레이블 등 일부 편집 기능이 AI에서 지원되지 않거나 동작하지 않음",
    },
    {
      id: "ISS-002",
      title: "복합/다단계 명령에서 도구 호출 없이 응답 종료",
      severity: "high",
      scenarios: ["03-AI-Excel-편집"],
      note: "Excel TC-07 — 빈 시트에서 복합 명령 시 AI가 실제 편집 없이 텍스트 응답만 하고 종료",
    },
    {
      id: "ISS-003",
      title: "모델 라인업 불일치 — GPT 4.1 미존재",
      severity: "low",
      scenarios: ["01-AI-DOCX-편집", "02-AI-PPT-편집", "03-AI-Excel-편집"],
      note: "시나리오에 명시된 GPT 4.1이 현재 없음. 실제 라인업: Claude 4.6 / GPT 5.4 / Gemini 3.1. 시나리오 사전조건 갱신 필요",
    },
  ],

  history: [
    { run_id: "RUN-20260515-1543-dev", date: "2026-05-15 15:43", env: "dev", target: "01-AI-DOCX-편집", pass: 6, fail: 3, skip: 1, duration: "~50m", note: "TC-02/05/09 FAIL, TC-08 BLOCKED" },
    { run_id: "RUN-20260515-1703-dev", date: "2026-05-15 17:03", env: "dev", target: "02-AI-PPT-편집",  pass: 1, fail: 7, skip: 2, duration: "~37m", note: "TC-10만 PASS, TC-02/04 BLOCKED" },
    { run_id: "RUN-20260515-1758-dev", date: "2026-05-15 17:58", env: "dev", target: "03-AI-Excel-편집", pass: 9, fail: 4, skip: 0, duration: "~30m", note: "TC-06/07/11/12 FAIL (AI 도구 한계)" },
    { run_id: "RUN-20260518-1148-dev", date: "2026-05-18 02:57", env: "dev", target: "01-AI-DOCX-편집", pass: 5, fail: 5, skip: 0, duration: "~80m", note: "TC-02/05/06/07/09 FAIL; DOCX 네이티브 서식 미적용 패턴 반복" },
    { run_id: "RUN-20260518-1148-dev", date: "2026-05-18 04:50", env: "dev", target: "02-AI-PPT-편집",  pass: 5, fail: 5, skip: 0, duration: "~32m", note: "TC-02/04 선택 자동화 불가, TC-05 빈슬라이드 없음, TC-06/07 일괄 편집 불가" },
    { run_id: "RUN-20260518-1148-dev", date: "2026-05-18 05:25", env: "dev", target: "03-AI-Excel-편집", pass: 6, fail: 7, skip: 0, duration: "~130m", note: "TC-01/04/06/09/11/12/13 FAIL; 날짜타입·시트전환·정렬·VLOOKUP시트명·차트서식 한계" },
  ],
};
