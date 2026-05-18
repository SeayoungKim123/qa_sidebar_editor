// QA 자동화 대시보드 데이터 (시나리오 종료 시마다 /qa-run Skill 이 풀빌드 + 덮어쓰기)
// 스키마 주체: templates/dashboard.html 내부 렌더링 JS.
// TC 옵션 필드: screenshots(string[], reports/ 기준 상대경로) / note(string) / run_id(string).

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
        {
          id: "TC-01", name: "표 만들기", tag: "", status: "PASS",
          run_id: "RUN-20260515-1543-dev",
          screenshots: [
            "RUN-20260515-1543-dev/screenshots/01-docx-tc01-03-ai-panel-zoom.png",
            "RUN-20260515-1543-dev/screenshots/01-docx-tc01-07-doc-end.png",
          ],
          note: "본문 끝에 3×4 표 삽입, 헤더 4개 정확. (사용 모델: GPT 5.4)",
        },
        {
          id: "TC-02", name: "글자 크기 조정", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1543-dev",
          screenshots: [
            "RUN-20260515-1543-dev/screenshots/01-docx-tc02-01-selection.png",
            "RUN-20260515-1543-dev/screenshots/01-docx-tc02-03-ai-response-2.png",
            "RUN-20260515-1543-dev/screenshots/01-docx-tc02-04-doc-result.png",
            "RUN-20260515-1543-dev/screenshots/01-docx-tc02-05-font-check.png",
          ],
          note: "AI는 16pt로 명령했으나 실제로는 8pt로 오히려 작아짐. 버그 의심",
        },
        {
          id: "TC-03", name: "내용 작성", tag: "", status: "PASS",
          run_id: "RUN-20260515-1543-dev",
          screenshots: ["RUN-20260515-1543-dev/screenshots/01-docx-tc03-09-doc-end-final.png"],
          note: "사업분야·강점·비전 3문단 정확히 삽입, 단락 구분 명확",
        },
        {
          id: "TC-04", name: "형식 맞추기", tag: "", status: "PASS",
          run_id: "RUN-20260515-1543-dev",
          screenshots: ["RUN-20260515-1543-dev/screenshots/01-docx-tc04-01-title.png"],
          note: "제목 가운데 정렬 + 굵게 적용, 다른 단락 영향 없음",
        },
        {
          id: "TC-05", name: "목록 변환", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1543-dev",
          screenshots: [
            "RUN-20260515-1543-dev/screenshots/01-docx-tc05-02-after-pgup.png",
            "RUN-20260515-1543-dev/screenshots/01-docx-tc05-03-ai-response.png",
          ],
          note: "AI가 완료 응답했으나 글머리 기호가 실제로 적용되지 않음",
        },
        {
          id: "TC-06", name: "복합 명령 — 표 + 서식", tag: "", status: "PASS",
          run_id: "RUN-20260515-1543-dev",
          screenshots: ["RUN-20260515-1543-dev/screenshots/01-docx-tc06-01-result.png"],
          note: "2×3 표 + 헤더 회색 배경 적용. 헤더 텍스트는 비어있어 굵기 확인 불가했으나 구조·배경 충족",
        },
        {
          id: "TC-07", name: "디자인 — 표지 페이지", tag: "", status: "PASS",
          run_id: "RUN-20260515-1543-dev",
          screenshots: ["RUN-20260515-1543-dev/screenshots/01-docx-tc07-01-cover.png"],
          note: "표지 1장 생성, 제목(파랑 굵게)·부제(회색)·가운데 정렬 모두 적용. 이후 페이지 나누기 정상",
        },
        {
          id: "TC-08", name: "디자인 — 표 스타일링", tag: "BLOCKED", status: "FAIL",
          run_id: "RUN-20260515-1543-dev",
          screenshots: [
            "RUN-20260515-1543-dev/screenshots/01-docx-tc08-01-ai-response.png",
            "RUN-20260515-1543-dev/screenshots/01-docx-tc08-04-table3.png",
          ],
          note: "본문에 표가 없어 검증 불가. AI는 응답했으나 적용 대상 표가 없음",
        },
        {
          id: "TC-09", name: "디자인 — 섹션 헤더 스타일", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1543-dev",
          screenshots: ["RUN-20260515-1543-dev/screenshots/01-docx-tc09-02-body.png"],
          note: "섹션 제목 색상·여백 변경이 시각적으로 확인되지 않음. '제목 2' 스타일 통일 여부도 미확인",
        },
        {
          id: "TC-10", name: "비현실적 명령 — 한계 확인", tag: "", status: "PASS",
          run_id: "RUN-20260515-1543-dev",
          screenshots: ["RUN-20260515-1543-dev/screenshots/01-docx-tc10-01-ai-response.png"],
          note: "AI가 '이메일 전송은 지원하지 않는다'고 안내하며 대안 제시. 문서 변경 없음",
        },
      ],
    },
    {
      id: "02-AI-PPT-편집",
      pass: 1,
      total: 10,
      tcs: [
        {
          id: "TC-01", name: "슬라이드 추가", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: [
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc01-00-initial.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc01-01-slide6-added.png",
          ],
          note: "슬라이드 추가는 됐으나 표가 편집 가능한 표 객체가 아닌 도형 조합으로 만들어짐. 셀 클릭·편집 불가",
        },
        {
          id: "TC-02", name: "글자 크기 조정", tag: "BLOCKED", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: [
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc02-00-slide1.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc02-01-ai-asks-select.png",
          ],
          note: "AI 자체는 정상 동작하나, 자동화 환경에서 슬라이드 텍스트 선택이 불가해 검증 진행 불가. 실사용자가 직접 클릭하면 동작할 가능성 높음",
        },
        {
          id: "TC-03", name: "내용 작성", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: [
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc03-01-final-deck.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc03-02-slide9-vision.png",
          ],
          note: "슬라이드 3장 추가됐으나 제목·본문이 모두 빈 슬라이드. 콘텐츠가 화면에 표시되지 않는 렌더링 버그",
        },
        {
          id: "TC-04", name: "형식 맞추기", tag: "BLOCKED", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: ["RUN-20260515-1703-dev/screenshots/02-ppt-tc04-01-slide2.png"],
          note: "TC-02와 동일. 텍스트 자동 선택 불가로 검증 진행 불가",
        },
        {
          id: "TC-05", name: "도형/항목 추가", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: [
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc05-01-ai-response.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc05-02-ai-done.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc05-03-final.png",
          ],
          note: "슬라이드에 텍스트 박스가 없어 AI가 항목 삽입 대신 전체 재구성을 제안. 글머리 기호 미삽입",
        },
        {
          id: "TC-06", name: "슬라이드 통합 편집", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: ["RUN-20260515-1703-dev/screenshots/02-ppt-tc06-01-ai-response.png"],
          note: "AI가 전체 슬라이드 대신 일부(6~9번)만 편집 가능하다며 범위 축소. 전체 통일 미달성",
        },
        {
          id: "TC-07", name: "디자인 — 테마/색상 팔레트", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: [
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc07-01-ai-response.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc07-03-final.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc07-04-progress.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc07-05-progress2.png",
            "RUN-20260515-1703-dev/screenshots/02-ppt-tc07-06-final.png",
          ],
          note: "AI가 완료 안내했으나 슬라이드 1만 배경 색 적용, 2~9번은 완전히 빈 흰색. 텍스트·도형 모두 렌더링 실패 (TC-03과 동일 버그)",
        },
        {
          id: "TC-08", name: "디자인 — 표지 슬라이드", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: ["RUN-20260515-1703-dev/screenshots/02-ppt-tc08-01-final.png"],
          note: "배경 색상만 적용됨. 제목·부제·강조 도형 모두 표시되지 않음 (TC-03/07과 동일 버그)",
        },
        {
          id: "TC-09", name: "디자인 — 강조 도형/박스", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1703-dev",
          screenshots: ["RUN-20260515-1703-dev/screenshots/02-ppt-tc09-01-slide3.png"],
          note: "AI 완료 안내했으나 슬라이드가 완전히 빈 흰색. 'NEW' 도형 표시 안 됨 (TC-03/07/08과 동일 버그)",
        },
        {
          id: "TC-10", name: "비대상 명령", tag: "", status: "PASS",
          run_id: "RUN-20260515-1703-dev",
          screenshots: ["RUN-20260515-1703-dev/screenshots/02-ppt-tc10-01-refuse.png"],
          note: "AI가 '영상 변환은 지원하지 않는다'고 안내하며 대안 제시. 슬라이드 변경 없음",
        },
      ],
    },
    {
      id: "03-AI-Excel-편집",
      pass: 9,
      total: 13,
      tcs: [
        {
          id: "TC-01", name: "표 만들기", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: [
            "RUN-20260515-1758-dev/screenshots/excel-tc01-00-before-prompt.png",
            "RUN-20260515-1758-dev/screenshots/excel-tc01-02-result.png",
          ],
          note: "헤더, 데이터 4행, 날짜 형식, 금액 서식 모두 정확 적용",
        },
        {
          id: "TC-02", name: "글자 크기/서식", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: [
            "RUN-20260515-1758-dev/screenshots/excel-tc02-01-result.png",
            "RUN-20260515-1758-dev/screenshots/excel-tc02-02-fontcheck.png",
          ],
          note: "14pt·굵게·연회색 배경 모두 적용, 데이터 행 영향 없음",
        },
        {
          id: "TC-03", name: "내용 작성", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc03-01-result.png"],
          note: "시트2 B1~B12에 1월~12월 정확히 채워짐, 다른 열 영향 없음",
        },
        {
          id: "TC-04", name: "수식 — 합계", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: [
            "RUN-20260515-1758-dev/screenshots/excel-tc04-01-result.png",
            "RUN-20260515-1758-dev/screenshots/excel-tc04-02-formula.png",
          ],
          note: "C11에 =SUM(C2:C10) 수식 삽입, 합계 265 일치",
        },
        {
          id: "TC-05", name: "셀 서식", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc05-01-result.png"],
          note: "C2:C10 ₩ 통화 형식 적용, 셀 값은 숫자로 유지",
        },
        {
          id: "TC-06", name: "정렬/형식 맞추기", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc06-01-result.png"],
          note: "AI에 정렬 도구가 없어 가운데 정렬 미적용. 테두리만 적용됨",
        },
        {
          id: "TC-07", name: "복합 명령 — 표 + 합계 + 서식", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1758-dev",
          screenshots: [
            "RUN-20260515-1758-dev/screenshots/excel-tc07-01-result.png",
            "RUN-20260515-1758-dev/screenshots/excel-tc07-03-sheet1.png",
          ],
          note: "표 생성, 합계 수식, 헤더 굵게 모두 미적용",
        },
        {
          id: "TC-08", name: "수식 — 조건부 IF", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc08-01-formula.png"],
          note: "IF 수식 9행 모두 적용, 60 기준 합격/불합격 분기 정확",
        },
        {
          id: "TC-09", name: "수식 — VLOOKUP / 참조", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc09-01-vlookup.png"],
          note: "VLOOKUP 수식 정확, 사번 입력 시 이름 자동 매칭",
        },
        {
          id: "TC-10", name: "차트 — 막대 그래프", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc10-02-chart.png"],
          note: "막대 차트 삽입, 제목·축 레이블 정확, 편집 가능한 네이티브 차트 객체",
        },
        {
          id: "TC-11", name: "차트 — 원형 그래프", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc11-02-pie.png"],
          note: "파이 차트 생성됐으나 부서명·백분율 레이블이 표시되지 않음",
        },
        {
          id: "TC-12", name: "차트 — 차트 디자인 수정", tag: "", status: "FAIL",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc12-01-chart-mod.png"],
          note: "격자선 제거 미적용. 색상·가로축 크기 변경은 시각적으로 확인 불가",
        },
        {
          id: "TC-13", name: "비대상 명령", tag: "", status: "PASS",
          run_id: "RUN-20260515-1758-dev",
          screenshots: ["RUN-20260515-1758-dev/screenshots/excel-tc13-03-full.png"],
          note: "AI가 PDF 변환 불가 안내. 시트 변경 없음",
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
  ],
};
