// 대시보드 버전 매니페스트 — RUN 종료 시 메인 Claude 가 갱신
// 버전 1개 = 완료된 RUN 1개. 스냅샷 본체는 versions/vN.js (window.QA_DATA, data.js 와 동일 스키마).
window.QA_VERSIONS = {
  current: "v1",
  list: [
    { v: "v1", run_id: "RUN-20260518-1540-dev", env: "dev", date: "2026-05-18", file: "versions/v1.js" },
  ],
};
