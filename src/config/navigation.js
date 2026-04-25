export const roleMetaMap = {
  business: {
    label: 'B端业务工作台',
    title: '链上牧审 · 业务工作台',
    subtitle: '生物资产确权 / 活体估值 / 融资流转 / 风险预警 / 链上存证',
    tagline: '围绕确权、估值、融资、预警与存证构建业务闭环',
  },
  auditor: {
    label: 'A端审计工作台',
    title: '链上牧审 · 审计工作台',
    subtitle: '远程监盘 / 证据链核验 / 审计底稿 / 合约合规 / 预警处置',
    tagline: '围绕证据核验、异常处置与底稿留痕构建审计闭环',
  },
}

export const menuByRole = {
  business: [
  { path: '/b/dashboard', label: '数字牧场' },
  { path: '/b/asset-confirm', label: '资产确权' },
  { path: '/b/valuation', label: '活体估值' },
  { path: '/b/finance', label: '一键融资' },
  { path: '/b/risk-warning', label: '风险预警' },
],
auditor: [
  { path: '/a/dashboard', label: '审计驾驶舱' },
  { path: '/a/inventory-check', label: '远程监盘' },
  { path: '/a/evidence-chain', label: '证据链核验' },
  { path: '/a/workpaper', label: '审计底稿中心' },
  { path: '/a/contract-audit', label: '智能合约审计' },
  { path: '/a/alerts', label: '预警与处置' },
],
}
