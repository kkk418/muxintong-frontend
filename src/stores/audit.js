import { defineStore } from 'pinia'

const STORAGE_KEY = 'muxintong-audit-store'

const seedProjects = [
  {
    id: 'hm-02',
    name: '华牧育肥项目-02',
    farm: '育肥二舍',
    manager: '李晓岚',
    auditLead: '王敏',
    warningLevel: '一级预警',
    workpaperVersion: 'WP-2026-Q2-018',
    auditConclusion: '重点异常待复核',
    compareCards: [
      { label: '链上存栏数', value: '1,256 头', desc: '联盟链最新快照' },
      { label: '现场采集数', value: '1,234 头', desc: 'AI 视觉识别结果' },
      { label: '饲料推算数', value: '1,241 头', desc: '按消耗逻辑估算' },
      { label: '估值模型存续数', value: '1,238 头', desc: 'DBAVM 估值口径' },
    ],
    inventoryRows: [
      { name: '育肥一舍', onChain: 412, camera: 410, feed: 411, valuation: 409, diff: '0.5%', state: '正常', level: 'ok' },
      { name: '育肥二舍', onChain: 398, camera: 391, feed: 392, valuation: 389, diff: '1.7%', state: '一级预警', level: 'danger' },
      { name: '育肥三舍', onChain: 446, camera: 443, feed: 438, valuation: 440, diff: '0.9%', state: '待跟踪', level: 'warn' },
    ],
    evidenceList: [
      { code: 'EV-001', title: '链上存栏快照', hash: 'HASH_STOCK_20260423_0900', text: '由链上存证层输出的最新快照，可追溯至牧场与栏舍维度。', type: '链上证据', source: 'Fabric 节点', status: '已校验', integrity: '完整', anchorTime: '2026-04-23 09:00', owner: '系统自动采集', note: '快照与栏舍维度映射正常。' },
      { code: 'EV-002', title: '视频截帧证据', hash: 'HASH_FRAME_20260423_1021', text: '对应 10:21 视频采集帧，已完成链上锚定，支持追溯到设备与时间戳。', type: '影像证据', source: '视觉识别服务', status: '已校验', integrity: '完整', anchorTime: '2026-04-23 10:21', owner: '现场 AI 摄像头', note: '与现场采集结果一致。' },
      { code: 'EV-003', title: 'IoT 饲喂记录', hash: 'HASH_FEED_20260423_0815', text: '对应智能料塔 08:15 上报数据，可追溯至设备 ID FT-09。', type: '设备证据', source: '智能料塔', status: '已校验', integrity: '完整', anchorTime: '2026-04-23 08:15', owner: 'IoT 采集网关', note: '饲喂记录未见异常波动。' },
      { code: 'EV-004', title: '估值快照', hash: 'HASH_VAL_20260423_0900', text: '对应 09:00 DBAVM 快照，已同步到审计底稿中心，当前需复核阈值设定。', type: '估值证据', source: 'DBAVM', status: '待复核', integrity: '需补充说明', anchorTime: '2026-04-23 09:00', owner: '估值引擎', note: '' },
    ],
    workpaperSections: [
      { key: 'inv', title: '一、监盘程序执行情况', content: '系统于 2026-04-23 对华牧育肥项目-02 执行远程监盘程序，已获取链上存栏快照、AI 视频采集结果、IoT 饲喂记录及 DBAVM 估值快照。经四维比对，育肥二舍出现 1.7% 的存栏偏差，高于审计阈值 1.5%，已自动标记为一级预警事项。', reviewerNote: '建议保留重点抽盘复核记录。' },
      { key: 'risk', title: '二、异常事项说明', content: '异常事项编号 RISK-20260423-07，来源于“链上存栏数 vs 现场采集数”不一致。系统已自动附加相关视频截帧编号、IoT 饲喂记录哈希、估值快照哈希，并推送至复核人进行人工判断。', reviewerNote: '待补充现场复盘结论。' },
      { key: 'conclusion', title: '三、阶段性结论', content: '在异常事项完成复核前，本审计程序暂不建议直接出具“监盘结果一致”的结论；建议将该事项列为底稿重点关注事项，并在授信相关程序中追加说明。', reviewerNote: '' },
    ],
    attachments: [
      { name: '链上哈希校验单', type: 'PDF', status: '已归档' },
      { name: '估值快照引用表', type: 'XLSX', status: '已归档' },
      { name: '现场复核待办', type: 'TASK', status: '待处理' },
    ],
    timeline: [
      { time: '08:15', title: 'IoT 记录入链', desc: '饲喂与环境数据完成上报，自动生成哈希锚点。' },
      { time: '09:00', title: '估值快照生成', desc: 'DBAVM 完成滚动重估，并同步至链上与底稿引用池。' },
      { time: '10:21', title: '视觉盘点触发预警', desc: 'AI 视觉识别与链上快照偏差超阈值，系统自动升为一级预警。' },
      { time: '14:30', title: '审计复核待办生成', desc: '异常事项推送给审计负责人，并关联到当前底稿版本。' },
    ],
  },
  {
    id: 'xl-01',
    name: '西岭繁育项目-01',
    farm: '繁育一区',
    manager: '何文君',
    auditLead: '张维',
    warningLevel: '二级预警',
    workpaperVersion: 'WP-2026-Q2-011',
    auditConclusion: '可继续观察',
    compareCards: [
      { label: '链上存栏数', value: '864 头', desc: '联盟链最新快照' },
      { label: '现场采集数', value: '859 头', desc: 'AI 视觉识别结果' },
      { label: '饲料推算数', value: '861 头', desc: '按消耗逻辑估算' },
      { label: '估值模型存续数', value: '858 头', desc: 'DBAVM 估值口径' },
    ],
    inventoryRows: [
      { name: '繁育一区', onChain: 288, camera: 286, feed: 287, valuation: 286, diff: '0.7%', state: '待跟踪', level: 'warn' },
      { name: '繁育二区', onChain: 291, camera: 290, feed: 289, valuation: 288, diff: '0.6%', state: '正常', level: 'ok' },
      { name: '犊牛舍', onChain: 285, camera: 283, feed: 285, valuation: 284, diff: '0.5%', state: '正常', level: 'ok' },
    ],
    evidenceList: [
      { code: 'EV-101', title: '链上存栏快照', hash: 'HASH_XL_STOCK_20260423', text: '西岭项目最新链上快照。', type: '链上证据', source: 'Fabric 节点', status: '已校验', integrity: '完整', anchorTime: '2026-04-23 09:10', owner: '系统自动采集', note: '' },
      { code: 'EV-102', title: '环境监测记录', hash: 'HASH_XL_ENV_20260423', text: '环境数据正常，未触发异常事项。', type: '设备证据', source: '环境感知网关', status: '已校验', integrity: '完整', anchorTime: '2026-04-23 09:12', owner: 'IoT 采集网关', note: '' },
    ],
    workpaperSections: [
      { key: 'inv', title: '一、监盘程序执行情况', content: '西岭繁育项目整体比对偏差均低于 1%，但存在局部数据延迟，建议持续跟踪。', reviewerNote: '' },
      { key: 'risk', title: '二、异常事项说明', content: '当前主要异常为数据同步延迟，并未形成重大错报迹象。', reviewerNote: '' },
      { key: 'conclusion', title: '三、阶段性结论', content: '建议保留现有程序并持续观察，不需提升至一级预警。', reviewerNote: '' },
    ],
    attachments: [
      { name: '同步延迟分析单', type: 'PDF', status: '待补充' },
      { name: '环境监测周报', type: 'XLSX', status: '已归档' },
    ],
    timeline: [
      { time: '09:10', title: '存栏快照同步', desc: '联盟链存证正常。' },
      { time: '11:30', title: '数据延迟提示', desc: '部分视频流晚于预期 12 分钟到达。' },
    ],
  },
  {
    id: 'fy-07',
    name: '丰源养殖项目-07',
    farm: '育成三区',
    manager: '周知远',
    auditLead: '王敏',
    warningLevel: '合约复核中',
    workpaperVersion: 'WP-2026-Q2-025',
    auditConclusion: '需规则复核',
    compareCards: [
      { label: '链上存栏数', value: '1,012 头', desc: '联盟链最新快照' },
      { label: '现场采集数', value: '1,008 头', desc: 'AI 视觉识别结果' },
      { label: '饲料推算数', value: '1,009 头', desc: '按消耗逻辑估算' },
      { label: '估值模型存续数', value: '1,007 头', desc: 'DBAVM 估值口径' },
    ],
    inventoryRows: [
      { name: '育成一区', onChain: 336, camera: 335, feed: 335, valuation: 334, diff: '0.3%', state: '正常', level: 'ok' },
      { name: '育成二区', onChain: 338, camera: 336, feed: 337, valuation: 336, diff: '0.6%', state: '待跟踪', level: 'warn' },
      { name: '育成三区', onChain: 338, camera: 337, feed: 337, valuation: 337, diff: '0.2%', state: '正常', level: 'ok' },
    ],
    evidenceList: [
      { code: 'EV-201', title: '融资合约留痕', hash: 'HASH_CONTRACT_20260423', text: '检测到重复抵押规则需人工复核。', type: '合约证据', source: '合约网关', status: '待复核', integrity: '需复核规则', anchorTime: '2026-04-23 07:44', owner: '智能合约执行器', note: '' },
    ],
    workpaperSections: [
      { key: 'inv', title: '一、监盘程序执行情况', content: '盘点差异整体正常，但授信申请环节触发重复抵押规则检查。', reviewerNote: '' },
      { key: 'risk', title: '二、异常事项说明', content: '合约校验中发现活体身份凭证存在历史融资绑定记录，需进一步核验是否已经结清。', reviewerNote: '' },
      { key: 'conclusion', title: '三、阶段性结论', content: '建议暂停该批次新增授信，并由审计师与业务人员联合复核。', reviewerNote: '' },
    ],
    attachments: [
      { name: '历史授信核验清单', type: 'PDF', status: '待处理' },
    ],
    timeline: [
      { time: '07:44', title: '合约触发复核', desc: '授信申请阶段触发重复抵押规则。' },
      { time: '09:30', title: '审计师接收待办', desc: '系统推送到合约合规审计队列。' },
    ],
  },
]

const seedAlerts = [
  { id: 'ALT-01', level: '一级预警', source: '存栏偏差', projectId: 'hm-02', owner: '王敏', status: '待复核', action: '发起人工复核', createdAt: '2026-04-23 10:21', sla: '3h', priority: 'P1' },
  { id: 'ALT-02', level: '一级预警', source: '重复抵押疑点', projectId: 'fy-07', owner: '王敏', status: '待复核', action: '发起合约核验', createdAt: '2026-04-23 08:44', sla: '4h', priority: 'P1' },
  { id: 'ALT-03', level: '二级预警', source: '数据延迟', projectId: 'xl-01', owner: '张维', status: '处理中', action: '补采视频流', createdAt: '2026-04-23 11:30', sla: '8h', priority: 'P2' },
]

const seedContractRules = [
  { id: 'CR-01', name: '重复抵押限制', desc: '同一活体身份凭证不得绑定多个在途融资合同', status: 'pass', result: '通过', impact: '堵住一畜多贷风险', reviewer: '系统自动校验' },
  { id: 'CR-02', name: '授信阈值校验', desc: '授信金额不得超过最新估值的一定比例', status: 'pass', result: '通过', impact: '保证估值覆盖率', reviewer: '系统自动校验' },
  { id: 'CR-03', name: '异常状态拦截', desc: '一级预警项目应自动限制新的授信申请', status: 'warn', result: '待复核', impact: '避免带病资产继续融资', reviewer: '待人工确认' },
  { id: 'CR-04', name: '链上留痕完整性', desc: '关键动作必须写入链上并产生唯一哈希', status: 'pass', result: '通过', impact: '满足穿透式审计追溯', reviewer: '系统自动校验' },
]

const seedContractTrace = [
  { time: '07:44', actor: '授信合约引擎', action: '发起授信校验', status: '已触发规则扫描' },
  { time: '07:45', actor: '重复抵押规则', action: '命中历史凭证', status: '进入人工复核队列' },
  { time: '08:10', actor: '审计工作台', action: '同步证据链', status: '关联底稿版本 WP-2026-Q2-025' },
  { time: '08:44', actor: '预警中心', action: '升级为一级预警', status: '等待审计负责人处理' },
]

function readPersisted() {
  if (typeof window === 'undefined') return null
  try { return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null') } catch { return null }
}
function persist(state) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
function createDefaultState() {
  return {
    currentProjectId: 'hm-02',
    lastVerifiedAt: '2026-04-23 14:30',
    selectedSectionKey: 'inv',
    selectedEvidenceCode: 'EV-001',
    projects: seedProjects,
    alerts: seedAlerts,
    contractRules: seedContractRules,
    contractTrace: seedContractTrace,
  }
}

export const useAuditStore = defineStore('audit', {
  state: () => ({ ...createDefaultState(), ...readPersisted() }),
  getters: {
    currentProject: (state) => state.projects.find((project) => project.id === state.currentProjectId) || state.projects[0],
    selectedEvidence(state) { return this.currentProject.evidenceList.find((item) => item.code === state.selectedEvidenceCode) || this.currentProject.evidenceList[0] },
    selectedSection(state) { return this.currentProject.workpaperSections.find((item) => item.key === state.selectedSectionKey) || this.currentProject.workpaperSections[0] },
    activeAlerts: (state) => state.alerts.filter((item) => item.status !== '已关闭'),
    projectAlerts(state) { return state.alerts.filter((item) => item.projectId === state.currentProjectId) },
    riskCounters(state) { const map = { p1: 0, p2: 0, closed: 0 }; state.alerts.forEach((item) => { if (item.status === '已关闭') map.closed += 1; else if (item.priority === 'P1') map.p1 += 1; else map.p2 += 1 }); return map },
    dashboardMetrics(state) { return [ { label: '在审项目数', value: `${state.projects.length}`, desc: '已接入链上数据的审计项目' }, { label: '待复核异常', value: `${state.alerts.filter((item) => item.status !== '已关闭').length}`, desc: '需人工复核的重点事项' }, { label: '已生成底稿', value: `${state.projects.reduce((acc, item) => acc + item.workpaperSections.length, 0)}`, desc: '系统已自动沉淀的底稿章节' }, { label: '证据校验通过率', value: '98.6%', desc: '链上哈希与原始记录一致率' } ] },
    contractSummary(state) { return { passed: state.contractRules.filter((item) => item.status === 'pass').length, pending: state.contractRules.filter((item) => item.status !== 'pass').length } },
  },
  actions: {
    sync() { persist({ currentProjectId: this.currentProjectId, lastVerifiedAt: this.lastVerifiedAt, selectedSectionKey: this.selectedSectionKey, selectedEvidenceCode: this.selectedEvidenceCode, projects: this.projects, alerts: this.alerts, contractRules: this.contractRules, contractTrace: this.contractTrace }) },
    switchProject(projectId) { this.currentProjectId = projectId; this.selectedEvidenceCode = this.currentProject.evidenceList[0]?.code || ''; this.selectedSectionKey = this.currentProject.workpaperSections[0]?.key || 'inv'; this.sync() },
    verifyEvidence(code) { const item = this.currentProject.evidenceList.find((row) => row.code === code); if (!item) return; item.status = '已校验'; item.integrity = '完整'; this.lastVerifiedAt = '2026-04-23 15:08'; this.sync() },
    selectEvidence(code) { this.selectedEvidenceCode = code; this.sync() },
    selectSection(key) { this.selectedSectionKey = key; this.sync() },
    updateEvidenceNote(code, note) { const item = this.currentProject.evidenceList.find((row) => row.code === code); if (!item) return; item.note = note; this.sync() },
    updateSectionNote(key, note) { const item = this.currentProject.workpaperSections.find((row) => row.key === key); if (!item) return; item.reviewerNote = note; this.sync() },
    updateAlertStatus(alertId, status) { const target = this.alerts.find((item) => item.id === alertId); if (!target) return; target.status = status; this.sync() },
    claimAlert(alertId, owner) { const target = this.alerts.find((item) => item.id === alertId); if (!target) return; target.owner = owner; if (target.status === '待复核') target.status = '处理中'; this.sync() },
    closeAlert(alertId) { const target = this.alerts.find((item) => item.id === alertId); if (!target) return; target.status = '已关闭'; this.sync() },
    reviewContractRule(ruleId, reviewer) { const target = this.contractRules.find((item) => item.id === ruleId); if (!target) return; target.status = 'pass'; target.result = '已复核'; target.reviewer = reviewer; this.sync() },
  },
})
