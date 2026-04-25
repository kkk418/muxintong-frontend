<template>
  <section class="tech-showcase">
    <div class="bg-grid"></div>
    <div class="bg-glow glow-1"></div>
    <div class="bg-glow glow-2"></div>
    <div class="scan-line"></div>

    <div class="showcase-left">
      <div class="tag-row">
        <span class="tag">区块链存证</span>
        <span class="tag">AI估值</span>
        <span class="tag">IoT采集</span>
      </div>

      <h1 class="main-title">链上牧审 · 生物资产可信流转平台</h1>
      <p class="sub-title">
        通过区块链、人工智能与物联网技术，构建生物资产“可确权、可估值、可融资、可监管”的数字化闭环。
      </p>

      <div class="feature-row">
        <div class="feature-card">
          <div class="feature-label">链上存证总量</div>
          <div class="feature-value">2356</div>
          <div class="feature-desc">全流程可信记录</div>
        </div>

        <div class="feature-card">
          <div class="feature-label">AI估值调用</div>
          <div class="feature-value">896</div>
          <div class="feature-desc">模型实时计算</div>
        </div>

        <div class="feature-card">
          <div class="feature-label">IoT在线率</div>
          <div class="feature-value">98%</div>
          <div class="feature-desc">设备数据稳定采集</div>
        </div>
      </div>
    </div>

    <div class="showcase-right">
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
</template>

<style scoped>
.tech-showcase {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 24px;
  padding: 28px;
  background: linear-gradient(180deg, #f7fbff 0%, #0b2d25 100%);
  border: 1px solid #c8d9f6;
  margin-bottom: 24px;
  min-height: 360px;
  box-sizing: border-box;
  box-shadow: 0 0 20px rgba(47, 128, 255, 0.08);
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(47, 128, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(47, 128, 255, 0.08) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
}

.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.18;
  pointer-events: none;
}

.glow-1 {
  width: 180px;
  height: 180px;
  background: #2f80ff;
  top: -40px;
  left: -40px;
}

.glow-2 {
  width: 220px;
  height: 220px;
  background: #1d6fff;
  right: -60px;
  bottom: -40px;
}

.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  top: -10%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(57, 255, 210, 0.7), transparent);
  animation: scanMove 4s linear infinite;
  pointer-events: none;
}

.showcase-left,
.showcase-right {
  position: relative;
  z-index: 1;
}

.tag-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.tag {
  padding: 6px 12px;
  background: rgba(47, 128, 255, 0.08);
  border: 1px solid rgba(47, 128, 255, 0.18);
  color: #2f80ff;
  font-size: 12px;
  letter-spacing: 0.5px;
  animation: floatTag 3s ease-in-out infinite;
}

.tag:nth-child(2) {
  animation-delay: 0.4s;
}

.tag:nth-child(3) {
  animation-delay: 0.8s;
}

.main-title {
  font-size: 38px;
  line-height: 1.2;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 14px 0;
  text-shadow: 0 0 12px rgba(47, 128, 255, 0.08);
}

.sub-title {
  font-size: 15px;
  line-height: 1.9;
  color: #c6e3da;
  margin: 0 0 24px 0;
  max-width: 90%;
}

.feature-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.feature-card {
  background: rgba(10, 47, 38, 0.9);
  border: 1px solid #c8d9f6;
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 0 0 14px rgba(57, 255, 210, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 16px rgba(57, 255, 210, 0.14);
}

.feature-label {
  font-size: 13px;
  color: #6f8fb8;
  margin-bottom: 10px;
}

.feature-value {
  font-size: 30px;
  font-weight: 800;
  color: #2f80ff;
  margin-bottom: 6px;
}

.feature-desc {
  font-size: 12px;
  color: #c6e3da;
}

.chain-panel,
.hash-card {
  background: rgba(10, 47, 38, 0.92);
  border: 1px solid #c8d9f6;
  box-sizing: border-box;
  box-shadow: 0 0 14px rgba(57, 255, 210, 0.06);
}

.chain-panel {
  padding: 18px;
  margin-bottom: 16px;
}

.panel-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
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

.delay-1 {
  animation-delay: 0.4s;
}

.delay-2 {
  animation-delay: 0.8s;
}

.delay-3 {
  animation-delay: 1.2s;
}

.node-box {
  flex: 1;
  background: #ffffff;
  border: 1px solid #c8d9f6;
  padding: 12px 14px;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.node-box:hover {
  transform: translateX(3px);
  box-shadow: 0 0 14px rgba(47, 128, 255, 0.14);
}

.highlight-box {
  box-shadow: 0 0 14px rgba(47, 128, 255, 0.18);
}

.node-title {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 4px;
}

.node-text {
  font-size: 13px;
  color: #b9d8cf;
}

.chain-line {
  margin-left: 5px;
  width: 2px;
  height: 16px;
  background: linear-gradient(180deg, #2f80ff, transparent);
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
}

.hash-value {
  font-size: 18px;
  font-weight: 700;
  color: #2f80ff;
  word-break: break-all;
  margin-bottom: 10px;
  text-shadow: 0 0 10px rgba(57, 255, 210, 0.14);
}

.hash-status {
  font-size: 13px;
  color: #d3ebe4;
}

@keyframes pulseDot {
  0% {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 0 8px rgba(57, 255, 210, 0.5);
  }
  50% {
    transform: scale(1.35);
    opacity: 0.7;
    box-shadow: 0 0 16px rgba(57, 255, 210, 0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 0 8px rgba(57, 255, 210, 0.5);
  }
}

@keyframes flowLine {
  0% {
    background: linear-gradient(180deg, transparent, #2f80ff, transparent);
  }
  100% {
    background: linear-gradient(180deg, #2f80ff, transparent, transparent);
  }
}

@keyframes hashSweep {
  0% {
    left: -120px;
  }
  100% {
    left: calc(100% + 40px);
  }
}

@keyframes floatTag {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes scanMove {
  0% {
    top: -10%;
  }
  100% {
    top: 110%;
  }
}

@media (max-width: 1200px) {
  .tech-showcase {
    grid-template-columns: 1fr;
  }

  .feature-row {
    grid-template-columns: 1fr;
  }

  .main-title {
    font-size: 30px;
  }
}
</style>