<template>
  <div class="page">
    <div class="page-header">
      <div class="page-header-left">
        <div class="page-tag">链上牧审 · 生物资产数字平台</div>
        <h1 class="page-title">风险预警中心</h1>
        <p class="page-desc">面向养殖过程、资产状态与链上数据的一体化风险监测与事件处置中心</p>
      </div>

      <div class="page-header-right">
        <div class="page-badge">
          <span class="header-dot"></span>
          风险规则引擎运行正常
        </div>
        <div class="page-time">数据更新时间：2026-04-15 09:30</div>
      </div>
    </div>

    <div class="page-body">
      <div class="panel">
        <div class="panel-title">风险概览</div>

        <div class="overview-grid">
          <div class="overview-card">
            <div class="overview-label">今日预警总数</div>
            <div class="overview-value">12</div>
          </div>

          <div class="overview-card">
            <div class="overview-label">高风险事件</div>
            <div class="overview-value danger">3</div>
          </div>

          <div class="overview-card">
            <div class="overview-label">中风险事件</div>
            <div class="overview-value warn">5</div>
          </div>

          <div class="overview-card">
            <div class="overview-label">已处理事件</div>
            <div class="overview-value ok">4</div>
          </div>
        </div>
      </div>

      <div class="risk-grid">
        <div class="panel">
          <div class="panel-title">风险事件列表</div>

          <div class="risk-list">
            <div
              v-for="item in riskEvents"
              :key="item.id"
              class="risk-item"
              :class="[item.level, { active: selectedId === item.id }]"
              @click="selectRisk(item.id)"
            >
              <div class="risk-item-top">
                <span class="risk-name">{{ item.title }}</span>
                <span class="risk-level" :class="item.level">
                  {{ levelText(item.level) }}
                </span>
              </div>

              <div class="risk-meta">
                <span>耳标 {{ item.tagId }}</span>
                <span>{{ item.time }}</span>
              </div>

              <div class="risk-status">
                当前状态：{{ item.status }}
              </div>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-title">风险详情</div>

          <div class="detail-card">
            <div class="detail-row">
              <span class="detail-label">风险编号</span>
              <span class="detail-value">{{ selectedRisk.id }}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">风险标题</span>
              <span class="detail-value">{{ selectedRisk.title }}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">关联耳标</span>
              <span class="detail-value">{{ selectedRisk.tagId }}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">风险来源</span>
              <span class="detail-value">{{ selectedRisk.source }}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">风险等级</span>
              <span class="detail-value" :class="selectedRisk.level">
                {{ levelText(selectedRisk.level) }}
              </span>
            </div>

            <div class="detail-row">
              <span class="detail-label">发生时间</span>
              <span class="detail-value">{{ selectedRisk.time }}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">当前状态</span>
              <span class="detail-value">{{ selectedRisk.status }}</span>
            </div>

            <div class="detail-block">
              <div class="detail-block-title">触发原因</div>
              <div class="detail-block-content">{{ selectedRisk.reason }}</div>
            </div>

            <div class="detail-block">
              <div class="detail-block-title">建议处置</div>
              <div class="detail-block-content">{{ selectedRisk.action }}</div>
            </div>

            <div class="detail-block">
              <div class="detail-block-title">对融资影响</div>
              <div class="detail-block-content">{{ selectedRisk.financeImpact }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">实时风险监测日志</div>

        <div class="log-box">
          <div
            v-for="(log, index) in logs"
            :key="index"
            class="log-item"
            :class="log.level"
          >
            <span class="time">[{{ log.time }}]</span>
            <span class="log-level-tag" :class="log.level">{{ levelText(log.level) }}</span>
            <span class="msg">{{ log.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const riskEvents = ref([
  {
    id: 'RW-20260415-01',
    title: '育肥2舍体温波动异常',
    tagId: 'A1038',
    source: 'IoT体温监测',
    level: 'high',
    time: '2026-04-15 09:28',
    status: '待复检',
    reason: '连续3次体温高于阈值，且活动轨迹异常，系统判定为高风险健康事件。',
    action: '建议立即安排人工复检，并暂缓该个体进入融资审批流程。',
    financeImpact: '该个体相关资产暂不建议纳入本轮融资池。'
  },
  {
    id: 'RW-20260415-02',
    title: '耳标 A1024 健康评分下降',
    tagId: 'A1024',
    source: 'AI健康评分模型',
    level: 'medium',
    time: '2026-04-15 09:20',
    status: '待观察',
    reason: '近48小时健康评分下降 6%，低于平台预警阈值。',
    action: '建议继续观察，并在24小时内补充一次健康复核。',
    financeImpact: '短期不影响授信，但会降低估值可信度。'
  },
  {
    id: 'RW-20260415-03',
    title: '链上数据同步延迟',
    tagId: 'B2011',
    source: '区块链存证服务',
    level: 'low',
    time: '2026-04-15 09:12',
    status: '处理中',
    reason: '最近一笔确权记录未在预期时间内完成链上确认。',
    action: '建议核查链上同步服务状态并重新提交哈希校验。',
    financeImpact: '若延迟持续，可能影响该资产确权有效性。'
  }
])

const selectedId = ref('RW-20260415-01')

const selectedRisk = computed(() => {
  return riskEvents.value.find(item => item.id === selectedId.value) || riskEvents.value[0]
})

function selectRisk(id) {
  selectedId.value = id
}

function levelText(level) {
  if (level === 'low') return '低风险'
  if (level === 'medium') return '中风险'
  return '高风险'
}

const logs = ref([])
let timer = null

function randomLog() {
  const levels = ['low', 'medium', 'high']
  const texts = [
    'IoT设备正常采集数据',
    '体重波动异常',
    '健康评分下降',
    '链上数据校验通过',
    '资产存在轻微风险',
    '检测到潜在高风险行为'
  ]

  const level = levels[Math.floor(Math.random() * 3)]

  return {
    time: new Date().toLocaleTimeString(),
    text: texts[Math.floor(Math.random() * texts.length)],
    level
  }
}

onMounted(() => {
  logs.value.unshift(randomLog())

  timer = setInterval(() => {
    logs.value.unshift(randomLog())

    if (logs.value.length > 12) {
      logs.value.pop()
    }
  }, 1800)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<style scoped>
.page {
  min-height: 100%;
  background: #f4f8ff;
  color: #16325c;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  padding: 28px 24px;
  background: #1f4ea3;
  border-bottom: 1px solid #c8d9f6;
  margin-bottom: 24px;
}

.page-header-left {
  flex: 1;
  min-width: 0;
}

.page-header-right {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  flex-shrink: 0;
}

.page-tag {
  display: inline-block;
  padding: 6px 10px;
  margin-bottom: 14px;
  background: rgba(255,255,255,0.14);
  border: 1px solid rgba(255,255,255,0.2);
  color: #ffffff;
  font-size: 13px;
  letter-spacing: 1px;
}

.page-title {
  font-size: 40px;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 10px 0;
  padding-left: 14px;
  border-left: 4px solid #2f80ff;
  color: #ffffff;
}

.page-desc {
  margin: 0;
  color: #567399;
  font-size: 14px;
  letter-spacing: 0.5px;
}

.page-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.2);
  color: #ffffff;
  font-size: 14px;
}

.page-time {
  color: #5f7aa3;
  font-size: 13px;
}

.header-dot {
  width: 8px;
  height: 8px;
  background: #2f80ff;
  box-shadow: 0 0 10px rgba(57, 255, 210, 0.7);
}

.page-body {
  padding: 0 24px 24px;
}

.panel {
  background: #ffffff;
  border: 1px solid #c8d9f6;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  box-shadow: 0 0 0 1px rgba(47, 128, 255, 0.06);
}

.panel-title {
  font-size: 18px;
  font-weight: 700;
  color: #16325c;
  margin-bottom: 14px;
  position: relative;
  padding-left: 12px;
}

.panel-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 3px;
  width: 4px;
  height: 18px;
  background: #2f80ff;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.overview-card {
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  padding: 18px;
  box-sizing: border-box;
}

.overview-label {
  font-size: 14px;
  color: #5f7aa3;
  margin-bottom: 8px;
}

.overview-value {
  font-size: 24px;
  font-weight: 700;
  color: #2f80ff;
}

.ok {
  color: #2f80ff;
}

.warn {
  color: #f5a623;
}

.danger {
  color: #e5484d;
}

.risk-grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 20px;
}

.risk-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.risk-item {
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  padding: 14px 16px;
  cursor: pointer;
  transition: 0.2s ease;
}

.risk-item:hover {
  border-color: #2f80ff;
}

.risk-item.active {
  box-shadow: inset 0 0 0 1px rgba(57, 255, 210, 0.25);
}

.risk-item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.risk-name {
  font-size: 15px;
  font-weight: 700;
  color: #16325c;
}

.risk-level {
  font-size: 12px;
  padding: 2px 8px;
  border: 1px solid currentColor;
}

.risk-level.low {
  color: #2f80ff;
}

.risk-level.medium {
  color: #f5a623;
}

.risk-level.high {
  color: #e5484d;
}

.risk-meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: #5f7aa3;
  font-size: 13px;
  margin-bottom: 6px;
}

.risk-status {
  color: #16325c;
  font-size: 13px;
}

.detail-card {
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  padding: 16px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid #c8d9f6;
}

.detail-label {
  color: #5f7aa3;
  font-size: 14px;
}

.detail-value {
  color: #16325c;
  font-size: 14px;
  text-align: right;
}

.detail-value.low {
  color: #2f80ff;
}

.detail-value.medium {
  color: #f5a623;
}

.detail-value.high {
  color: #e5484d;
}

.detail-block {
  margin-top: 16px;
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  padding: 14px;
}

.detail-block-title {
  font-size: 14px;
  font-weight: 700;
  color: #2f80ff;
  margin-bottom: 8px;
}

.detail-block-content {
  color: #16325c;
  line-height: 1.8;
  font-size: 14px;
}

.log-box {
  max-height: 360px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.log-item {
  padding: 10px 12px;
  font-size: 14px;
  background: #f7fbff;
  border-left: 4px solid;
  color: #16325c;
  display: flex;
  align-items: center;
  gap: 10px;
}

.log-item.low {
  border-color: #2f80ff;
}

.log-item.medium {
  border-color: #f5a623;
}

.log-item.high {
  border-color: #ff4d4f;
}

.time {
  color: #5f7aa3;
  flex-shrink: 0;
}

.log-level-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  height: 20px;
  padding: 0 6px;
  font-size: 12px;
  border: 1px solid currentColor;
  flex-shrink: 0;
}

.log-level-tag.low {
  color: #2f80ff;
}

.log-level-tag.medium {
  color: #f5a623;
}

.log-level-tag.high {
  color: #e5484d;
}

.msg {
  flex: 1;
  min-width: 0;
}

@media (max-width: 1400px) {
  .overview-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .risk-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .overview-grid {
    grid-template-columns: 1fr;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .page-header-right {
    align-items: flex-start;
  }

  .risk-item-top,
  .risk-meta,
  .detail-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .detail-value {
    text-align: left;
  }

  .log-item {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>