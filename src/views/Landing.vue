<template>
  <div class="landing">
    <div class="bg-grid"></div>
    <div class="bg-glow glow-1"></div>
    <div class="bg-glow glow-2"></div>
    <div class="scan-line"></div>

    <header class="top-bar">
      <div class="brand">
        <img src="../assets/images/logo.png" class="logo" alt="牧信通logo" />
      </div>
      <div class="top-actions">
      </div>
    </header>
    <div class="hero-actions">
  
</div>
    <section class="hero">
      <div class="hero-left">
        <div class="tag-row">
          <span class="tag">区块链存证</span>
          <span class="tag">AI估值</span>
          <span class="tag">IoT采集</span>
          <span class="tag">金融协同</span>
        </div>

        <h1 class="main-title">链上牧审 · 生物资产审计与可信流转平台</h1>
        <p class="sub-title">
          通过区块链、人工智能与物联网技术，构建生物资产"可确权、可估值、可融资、可监管"的数字化闭环，
          让每一头牲畜都拥有可信的金融身份。
        </p>

        <div class="hero-actions">
          <button class="btn primary large" @click="goPortal">立即体验系统</button>
          <button class="btn ghost large" @click="scrollToFlow">查看项目流程</button>
        </div>

        <div class="summary-row">
          <div class="summary-card">
            <div class="summary-label">链上存证</div>
            <div class="summary-value">2356</div>
          </div>
          <div class="summary-card">
            <div class="summary-label">AI估值调用</div>
            <div class="summary-value">896</div>
          </div>
          <div class="summary-card">
            <div class="summary-label">IoT在线率</div>
            <div class="summary-value">98%</div>
          </div>
          <div class="summary-card">
            <div class="summary-label">风险预警</div>
            <div class="summary-value">4</div>
          </div>
        </div>
      </div>

      <div class="hero-right">
        <div class="chain-panel">
          <div class="panel-title">可信数据链路</div>

          <div class="chain-flow">
            <div class="chain-node">
              <div class="node-dot pulse"></div>
              <div class="node-box">
                <div class="node-title">耳标识别</div>
                <div class="node-text">活体身份采集</div>
              </div>
            </div>

            <div class="chain-line flow-line"></div>

            <div class="chain-node">
              <div class="node-dot pulse delay-1"></div>
              <div class="node-box">
                <div class="node-title">IoT上报</div>
                <div class="node-text">体重 / 健康数据</div>
              </div>
            </div>

            <div class="chain-line flow-line delay-1"></div>

            <div class="chain-node">
              <div class="node-dot pulse delay-2"></div>
              <div class="node-box">
                <div class="node-title">AI核验</div>
                <div class="node-text">估值与风控判断</div>
              </div>
            </div>

            <div class="chain-line flow-line delay-2"></div>

            <div class="chain-node">
              <div class="node-dot pulse delay-3"></div>
              <div class="node-box highlight-box">
                <div class="node-title">链上存证</div>
                <div class="node-text">区块哈希写入</div>
              </div>
            </div>
          </div>
        </div>

        <div class="hash-card">
          <div class="hash-title">最新区块链哈希</div>
          <div class="hash-value">HASH_1776334297308</div>
          <div class="hash-status">状态：已上链 · 可追溯 · 不可篡改</div>
        </div>
      </div>
    </section>

    <section class="flow-section" ref="flowSection">
      <div class="section-title">项目全流程图</div>
      <div class="section-sub-title">从生物资产识别到金融服务落地，形成完整业务闭环</div>

      <div class="flow-wrapper">
        <div class="flow-step done">
          <div class="step-index">01</div>
          <div class="step-title">资产登记</div>
          <div class="step-desc">采集基础信息，建立活体档案</div>
        </div>

        <div class="flow-arrow">→</div>

        <div class="flow-step active">
          <div class="step-index">02</div>
          <div class="step-title">资产确权</div>
          <div class="step-desc">IoT采集 + AI核验，确认资产归属</div>
        </div>

        <div class="flow-arrow">→</div>

        <div class="flow-step">
          <div class="step-index">03</div>
          <div class="step-title">活体估值</div>
          <div class="step-desc">DBAVM模型评估活体资产价值</div>
        </div>

        <div class="flow-arrow">→</div>

        <div class="flow-step">
          <div class="step-index">04</div>
          <div class="step-title">一键融资</div>
          <div class="step-desc">将可信资产接入金融审批流程</div>
        </div>

        <div class="flow-arrow">→</div>

        <div class="flow-step warn">
          <div class="step-index">05</div>
          <div class="step-title">风险预警</div>
          <div class="step-desc">实时监测健康与资产风险变化</div>
        </div>

        <div class="flow-arrow">→</div>

        <div class="flow-step">
          <div class="step-index">06</div>
          <div class="step-title">区块链存证</div>
          <div class="step-desc">关键业务数据链上固化存证</div>
        </div>
      </div>
    </section>

    <section class="feature-section">
      <div class="section-title">平台核心亮点</div>

      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-name">可信确权</div>
          <div class="feature-text">基于耳标识别、IoT采集与AI核验，构建活体资产可信身份。</div>
        </div>

        <div class="feature-card">
          <div class="feature-name">智能估值</div>
          <div class="feature-text">通过估值模型综合体重、健康评分与市场价格，形成融资参考依据。</div>
        </div>

        <div class="feature-card">
          <div class="feature-name">金融协同</div>
          <div class="feature-text">支持从估值到融资申请的闭环流转，提升养殖户融资效率。</div>
        </div>

        <div class="feature-card">
          <div class="feature-name">链上存证</div>
          <div class="feature-text">关键业务数据上链，保证信息可追溯、不可篡改、可监管。</div>
        </div>
      </div>
    </section>

    
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const flowSection = ref(null)

const goPortal = () => {
  router.push('/portal')
}

const goDashboard = () => {
  router.push('/b/dashboard')
}

const goLogin = () => {
  router.push('/farmer-login')
}

const scrollToFlow = () => {
  flowSection.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

const handleKeydown = (event) => {
  if (event.code === 'Space') {
    event.preventDefault()
    router.push('/farmer-login')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.quick-enter-tip {
  margin-top: 14px;
  color: #5f7aa3;
  font-size: 14px;
  letter-spacing: 0.5px;
  opacity: 0.95;
}
.landing {
  min-height: 100vh;
  background: linear-gradient(180deg, #eaf3ff 0%, #f4f8ff 100%);
  color: #16325c;
  position: relative;
  overflow-x: hidden;
  padding: 0 32px 40px;
  box-sizing: border-box;
}

.bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(47, 128, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(47, 128, 255, 0.08) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
}

.bg-glow {
  position: fixed;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.18;
  pointer-events: none;
}

.glow-1 {
  width: 220px;
  height: 220px;
  background: #2f80ff;
  top: 60px;
  left: -60px;
}

.glow-2 {
  width: 260px;
  height: 260px;
  background: #1d6fff;
  right: -80px;
  bottom: 40px;
}

.scan-line {
  position: fixed;
  left: 0;
  right: 0;
  top: -10%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(57, 255, 210, 0.7), transparent);
  animation: scanMove 4s linear infinite;
  pointer-events: none;
}

.top-bar,
.hero,
.flow-section,
.feature-section,
.enter-section {
  position: relative;
  z-index: 1;
}

.top-bar {
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  width: 110px;
  max-height: 52px;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 6px 16px rgba(31, 78, 163, 0.14));
}

.top-actions {
  display: flex;
  gap: 12px;
}

.btn {
  height: 42px;
  padding: 0 18px;
  border: 1px solid #c8d9f6;
  background: #f7fbff;
  color: #16325c;
  cursor: pointer;
}

.btn.primary {
  background: #1d6fff;
  color: #ffffff;
  border: none;
  font-weight: 700;
}

.btn.ghost {
  background: #ffffff;
}

.btn.large {
  height: 48px;
  padding: 0 24px;
}

.btn.huge {
  height: 52px;
  padding: 0 28px;
  font-size: 16px;
}

.hero {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 28px;
  padding: 26px 0 32px;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.tag {
  padding: 6px 12px;
  background: rgba(47, 128, 255, 0.08);
  border: 1px solid rgba(47, 128, 255, 0.18);
  color: #2f80ff;
  font-size: 12px;
  animation: floatTag 3s ease-in-out infinite;
}

.tag:nth-child(2) { animation-delay: 0.3s; }
.tag:nth-child(3) { animation-delay: 0.6s; }
.tag:nth-child(4) { animation-delay: 0.9s; }

.main-title {
  font-size: 46px;
  line-height: 1.2;
  font-weight: 800;
  margin: 0 0 18px 0;
  color: #16325c;
}

.sub-title {
  font-size: 16px;
  line-height: 2;
  color: #567399;
  max-width: 92%;
  margin: 0 0 24px 0;
}

.hero-actions {
  display: flex;
  gap: 14px;
  margin-bottom: 28px;
}

.summary-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.summary-card,
.chain-panel,
.hash-card,
.flow-step,
.feature-card,
.enter-section {
  background: #ffffff;
  border: 1px solid #567399;
  box-shadow: 0 10px 30px rgba(31,78,163,0.08);
}

.summary-card {
  padding: 18px;
}

.summary-label {
  font-size: 13px;
  color: #6f8fb8;
  margin-bottom: 8px;
  color: #5f7aa3;
}

.summary-value {
  font-size: 30px;
  font-weight: 800;
  color: #2f80ff;
}

.summary-value.danger {
  color: #ffffff;
}

.chain-panel {
  padding: 20px;
  margin-bottom: 16px;
}

.panel-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #16325c;
}

.chain-flow {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chain-node {
  display: flex;
  align-items: center;
  gap: 12px;
}

.node-dot {
  width: 12px;
  height: 12px;
  background: #2f80ff;
  box-shadow: 0 0 10px rgba(57, 255, 210, 0.7);
  flex-shrink: 0;
}

.pulse {
  animation: pulseDot 1.8s infinite;
}

.delay-1 { animation-delay: 0.4s; }
.delay-2 { animation-delay: 0.8s; }
.delay-3 { animation-delay: 1.2s; }

.node-box {
  flex: 1;
  background: #ffffff;
  border: 1px solid #c8d9f6;
  padding: 12px 14px;
}

.highlight-box {
  box-shadow: 0 0 14px rgba(47, 128, 255, 0.18);
}

.node-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #16325c;
}

.node-text {
  font-size: 13px;
  color: #b9d8cf;
  color: #5f7aa3;
}

.chain-line {
  margin-left: 5px;
  width: 2px;
  height: 16px;
  background: linear-gradient(180deg, rgba(47,128,255,0.4), transparent);
}

.flow-line {
  animation: flowLine 1.8s linear infinite;
}

.hash-card {
  padding: 18px;
  position: relative;
  overflow: hidden;
}

.hash-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -120px;
  width: 100px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(47, 128, 255, 0.10), transparent);
  animation: hashSweep 3.2s linear infinite;
}

.hash-title {
  font-size: 14px;
  color: #6f8fb8;
  margin-bottom: 10px;
  color: #5f7aa3;
}

.hash-value {
  font-size: 18px;
  font-weight: 700;
  color: #2f80ff;
  word-break: break-all;
  margin-bottom: 10px;
}

.hash-status {
  font-size: 13px;
  color: #d3ebe4;
  color: #5f7aa3;
}

.flow-section,
.feature-section {
  margin-top: 30px;
}

.section-title {
  font-size: 30px;
  font-weight: 800;
  margin-bottom: 8px;
  color: #16325c;
}

.section-sub-title {
  color: #5f7aa3;
  margin-bottom: 20px;
  color: #5f7aa3;
}

.flow-wrapper {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr auto 1fr auto 1fr;
  gap: 12px;
  align-items: stretch;
}

.flow-step {
  padding: 18px 16px;
}

.step-index {
  font-size: 12px;
  color: #6f8fb8;
  margin-bottom: 10px;
}

.step-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}

.step-desc {
  font-size: 13px;
  line-height: 1.8;
  color: #567399;
  color: #5f7aa3;
}

.flow-step.active {
  box-shadow: 0 0 18px rgba(57, 255, 210, 0.14);
}

.flow-step.warn .step-title {
  color: #16325c;
}

.flow-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2f80ff;
  font-size: 24px;
  font-weight: 700;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.feature-card {
  padding: 18px;
}

.feature-name {
  font-size: 18px;
  font-weight: 700;
  color: #2f80ff;
  margin-bottom: 12px;
}

.feature-text {
  font-size: 14px;
  line-height: 1.9;
  color: #d0e8e0;
  color: #5f7aa3;
}

.enter-section {
  margin-top: 34px;
  padding: 30px;
  text-align: center;
}

.enter-title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 12px;
}

.enter-desc {
  max-width: 760px;
  margin: 0 auto 22px;
  color: #567399;
  line-height: 1.9;
}

@keyframes pulseDot {
  0% { transform: scale(1); opacity: 1; box-shadow: 0 0 8px rgba(57,255,210,.5); }
  50% { transform: scale(1.35); opacity: .7; box-shadow: 0 0 16px rgba(57,255,210,.9); }
  100% { transform: scale(1); opacity: 1; box-shadow: 0 0 8px rgba(57,255,210,.5); }
}

@keyframes flowLine {
  0% { background: linear-gradient(180deg, transparent, #2f80ff, transparent); }
  100% { background: linear-gradient(180deg, #2f80ff, transparent, transparent); }
}

@keyframes hashSweep {
  0% { left: -120px; }
  100% { left: calc(100% + 40px); }
}

@keyframes floatTag {
  0% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
}

@keyframes scanMove {
  0% { top: -10%; }
  100% { top: 110%; }
}

@media (max-width: 1200px) {
  .hero,
  .feature-grid,
  .summary-row,
  .flow-wrapper {
    grid-template-columns: 1fr !important;
  }

  .flow-arrow {
    display: none;
  }

  .main-title {
    font-size: 34px;
  }
}

@media (max-width: 768px) {
  .landing {
    padding: 0 16px 28px;
  }

  .top-bar {
    flex-direction: column;
    gap: 12px;
    height: auto;
    padding-top: 16px;
  }

  .hero-actions,
  .top-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn,
  .btn.large,
  .btn.huge {
    width: 100%;
  }

  .logo {
    width: 96px;
    max-height: 46px;
  }
}
</style>