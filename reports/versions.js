// 대시보드 버전 매니페스트 — RUN 종료 시 메인 Claude 가 갱신
// 버전 1개 = 완료된 RUN 1개. 스냅샷 본체는 versions/vN.js (window.QA_DATA, data.js 와 동일 스키마).
// 매니페스트가 비어 있으면 dashboard.html 은 버전 선택기를 숨기고 data.js(최신 라이브)만 로드한다.
// (구 문서편집 v1~v4 스냅샷은 폐기. 메일 AI 시대 첫 완료 RUN 동결 시 v1 부터 다시 시작)
window.QA_VERSIONS = {
  current: "v3",
  list: [
    { v: 3, run_id: "RUN-20260610-1058-dev", env: "dev", date: "2026-06-10", file: "versions/v3.js" },
    { v: 2, run_id: "RUN-20260610-0919-dev", env: "dev", date: "2026-06-10", file: "versions/v2.js" },
    { v: 1, run_id: "RUN-20260609-1859-dev", env: "dev", date: "2026-06-09", file: "versions/v1.js" },
  ],
};
