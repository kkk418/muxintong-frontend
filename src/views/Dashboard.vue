<template>
  <div class="dashboard">
    <div class="hero">
      <div class="hero-left">
        <div class="hero-tag">链上牧审 · 生物资产数字平台</div>
        <h1 class="title">数字牧场实时概览</h1>
        <p class="sub-title">
          面向畜牧业生物资产的确权、估值、融资与风险预警一体化平台
        </p>
      </div>

      <div class="hero-right">
        <div class="hero-badge">
          <span class="dot"></span>
          系统运行正常
        </div>
        <div class="hero-time">数据更新时间：{{ updateTime }}</div>
      </div>
    </div>
    <div class="system-panel-wrap">
  <SystemPanel />
</div>
    
    <div class="flow-panel">
      <div class="panel-title">业务闭环流程</div>
      <div class="flow-row">
        <div class="flow-step done">资产登记</div>
        <div class="flow-arrow">→</div>
        <div class="flow-step active">资产确权</div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">活体估值</div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">一键融资</div>
        <div class="flow-arrow">→</div>
        <div class="flow-step warn">风险预警</div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">区块链存证</div>
      </div>
    </div>

    <div class="card-row">
      <StatCard
        title="当前确权牲畜数量"
        :value="overview.livestockCount"
        desc="单位：头 / 已完成资产确权"
        type="number"
      />

      <StatCard
        title="活体资产估值总额"
        :value="overview.valuationTotal"
        desc="单位：元 / 当前可计入融资池"
        type="money"
      />

      <StatCard
        title="今日健康状态"
        :value="overview.healthRate"
        desc="核心健康评分比例"
        type="percent"
      />

      <StatCard
        title="融资申请进度"
        :value="overview.financeStatus"
        desc="当前银行审批状态"
        type="text"
      />
    </div>

    <div class="middle-grid">
      <div class="chart-panel">
        <div class="panel-title with-line">存栏 / 出栏趋势</div>
        <TrendChart />
      </div>

      <div class="side-panel">
        <div class="panel-title with-line">今日业务概览</div>

        <div class="data-list">
          <div class="data-item">
            <span>今日新增确权</span>
            <span class="highlight">128 头</span>
          </div>
          <div class="data-item">
            <span>今日新增估值</span>
            <span class="highlight">96 笔</span>
          </div>
          <div class="data-item">
            <span>融资申请处理中</span>
            <span class="warn-text">23 笔</span>
          </div>
          <div class="data-item">
            <span>高风险预警</span>
            <span class="danger-text alert-blink">4 条</span>
          </div>
        </div>

        <div class="mini-summary">
          <div class="summary-box">
            <div class="summary-label">接入牧场</div>
            <div class="summary-value">12</div>
          </div>
          <div class="summary-box">
            <div class="summary-label">IoT设备</div>
            <div class="summary-value">186</div>
          </div>
          <div class="summary-box">
            <div class="summary-label">链上存证</div>
            <div class="summary-value">2356</div>
          </div>
          <div class="summary-box">
            <div class="summary-label">在途融资</div>
            <div class="summary-value">58</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-row">
      <div class="info-panel">
        <div class="panel-title with-line">智能提示</div>
        <div class="tip-card">
          系统检测到育肥2舍健康指标出现轻微波动，建议优先核查耳标号
          A1024、A1038 所属牲畜状态，并在融资审批前完成复检确认。
        </div>
      </div>

      <div class="info-panel">
        <div class="panel-title with-line">平台亮点</div>
        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-dot"></span>
            <span>生物资产确权全流程可追踪</span>
          </div>
          <div class="feature-item">
            <span class="feature-dot"></span>
            <span>活体估值与融资业务联动</span>
          </div>
          <div class="feature-item">
            <span class="feature-dot"></span>
            <span>风险预警与链上存证同步闭环</span>
          </div>
          <div class="feature-item">
            <span class="feature-dot"></span>
            <span>支持养殖、金融、监管多角色协同</span>
          </div>
        </div>
      </div>
    </div>

    <div class="map-panel">
      <div class="panel-title with-line">数字牧场分区概览</div>
      <FarmMap />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TrendChart from '../components/TrendChart.vue'
import StatCard from '../components/StatCard.vue'
import SystemPanel from '../components/SystemPanel.vue'
import FarmMap from '../components/FarmMap.vue'
import { getDashboardData } from '../api/dashboard'


const overview = ref({
  livestockCount: 6235,
  valuationTotal: 3200000,
  healthRate: 98,
  financeStatus: '进行中'
})

onMounted(async () => {
  try {
    const res = await getDashboardData()
    if (res?.data?.data) {
      overview.value = {
        ...overview.value,
        ...res.data.data
      }
    }
  } catch (error) {
    console.error('首页数据获取失败：', error)
  }
})
</script>

<style scoped>
.system-panel-wrap {
  margin: 24px 0;
}
.dashboard {
  color: #16325c;
  min-height: 100%;
  background: #f4f8ff;
}
.title {
  font-size: 40px;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 10px 0;
  padding-left: 14px;
  border-left: 4px solid #2f80ff;
}

.sub-title {
  margin: 0;
  color: #dbe7ff;
  font-size: 14px;
  letter-spacing: 0.5px;
}
.hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  padding: 28px 24px;
  box-sizing: border-box;
  background: #1f4ea3;
  border-bottom: 1px solid #c8d9f6;
}

.hero-left {
  flex: 1;
  min-width: 0;
}

.hero-right {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  flex-shrink: 0;
}

.hero-tag {
  display: inline-block;
  padding: 6px 10px;
  margin-bottom: 14px;
  background: rgba(255,255,255,0.14);
  border: 1px solid rgba(255,255,255,0.18);
  color: #ffffff;
  font-size: 13px;
  letter-spacing: 1px;
}



.hero-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.18);
  color: #ffffff;
  font-size: 14px;
}

.dot {
  width: 8px;
  height: 8px;
  background: #2f80ff;
  box-shadow: 0 0 10px rgba(47, 128, 255, 0.35);
}

 .hero-time {
  color: #dbe7ff;
  font-size: 13px;
}

.flow-panel,
.chart-panel,
.side-panel,
.info-panel,
.map-panel {
  background: #ffffff;
  border: 1px solid #c8d9f6;
  box-sizing: border-box;
  box-shadow: 0 0 0 1px rgba(47, 128, 255, 0.06);
}

.flow-panel,
.map-panel {
  padding: 20px;
}

.chart-panel,
.side-panel,
.info-panel {
  padding: 20px;
}

.flow-panel {
  margin-bottom: 24px;
}

.panel-title {
  font-size: 18px;
  font-weight: 700;
  color: #16325c;
  margin-bottom: 14px;
}

.with-line {
  position: relative;
  padding-left: 12px;
}

.with-line::before {
  content: '';
  position: absolute;
  left: 0;
  top: 3px;
  width: 4px;
  height: 18px;
  background: #2f80ff;
}

.flow-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.flow-step {
  padding: 10px 16px;
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  color: #16325c;
  transition: 0.2s;
}

.flow-step.done {
  color: #2f80ff;
  box-shadow: inset 0 0 0 1px rgba(47, 128, 255, 0.08);
}

.flow-step.active {
  background: #1d6fff;
  color: #ffffff;
  font-weight: 700;
}

.flow-step.warn {
  color: #f5a623;
}

.flow-arrow {
  color: #6f8fb8;
  font-size: 18px;
}

.card-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.middle-grid {
  display: grid;
  grid-template-columns: 1.7fr 0.9fr;
  gap: 20px;
  margin-bottom: 24px;
}

.data-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 18px;
}

.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  padding: 14px 16px;
}

.highlight {
  color: #2f80ff;
  font-weight: 700;
}

.warn-text {
  color: #f5a623;
  font-weight: 700;
}

.danger-text {
  color: #e5484d;
  font-weight: 700;
}

.mini-summary {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.summary-box {
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  padding: 14px;
}

.summary-label {
  font-size: 13px;
  color: #5f7aa3;
  margin-bottom: 8px;
}

.summary-value {
  font-size: 24px;
  font-weight: 700;
  color: #2f80ff;
}

.bottom-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.tip-card {
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  padding: 18px;
  line-height: 1.9;
  color: #16325c;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  padding: 14px 16px;
  color: #16325c;
}

.feature-dot {
  width: 8px;
  height: 8px;
  background: #2f80ff;
}

.map-panel {
  margin-top: 24px;
}

.alert-blink {
  animation: blink 1.8s infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 1200px) {
  .card-row {
    display: grid;
    grid-template-columns: 1fr;
  }

  .middle-grid,
  .bottom-row {
    grid-template-columns: 1fr;
  }

  .hero {
    flex-direction: column;
    gap: 16px;
  }

  .hero-right {
    align-items: flex-start;
  }
}
</style>