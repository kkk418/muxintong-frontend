<template>
  <div class="system-panel">
    <div class="top-stats">
      <div class="stat">
        <div class="label">总牲畜数</div>
        <div class="value">{{ stats.total }}</div>
      </div>

      <div class="stat">
        <div class="label">资产估值</div>
        <div class="value">¥ {{ stats.value }}</div>
      </div>

      <div class="stat">
        <div class="label">今日新增</div>
        <div class="value">{{ stats.today }}</div>
      </div>

      <div class="stat">
        <div class="label">风险数量</div>
        <div class="value danger">{{ stats.risk }}</div>
      </div>
    </div>

    <div class="status-bar">
      <span class="bar-dot"></span>
      系统运行正常 ｜ IoT在线率 98% ｜ 区块链同步稳定 ｜ AI核验正常
    </div>

    <div class="log-title">实时业务日志</div>

    <div class="log-box">
      <div
        class="log-wrapper"
        :style="{
          transform: `translateY(-${offset}px)`,
          transition: animating ? 'transform 0.6s linear' : 'none'
        }"
      >
        <div
          class="log-item"
          v-for="(log, index) in logs"
          :key="`${log.text}-${index}`"
          :class="log.level"
        >
          <span class="level-tag">{{ levelText(log.level) }}</span>
          <span class="log-text">{{ log.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const stats = ref({
  total: 6235,
  value: 3200000,
  today: 128,
  risk: 4
})

const logs = ref([
  { text: '[09:12] 耳标 A1024 完成资产确权', level: 'safe' },
  { text: '[09:16] 活体估值结果生成，估值金额 ¥7200', level: 'safe' },
  { text: '[09:20] 育肥2舍检测到体温轻微异常', level: 'warn' },
  { text: '[09:23] 融资申请进入银行审批环节', level: 'safe' },
  { text: '[09:28] 隔离区异常个体触发高风险预警', level: 'danger' }
])

const rowHeight = 30
const offset = ref(0)
const animating = ref(false)

let timer = null
let resetTimer = null

function levelText(level) {
  if (level === 'safe') return '正常'
  if (level === 'warn') return '预警'
  return '高风险'
}

function scrollOneRow() {
  animating.value = true
  offset.value = rowHeight

  resetTimer = setTimeout(() => {
    const first = logs.value.shift()
    if (first) {
      logs.value.push(first)
    }

    animating.value = false
    offset.value = 0
  }, 600)
}

onMounted(() => {
  timer = setInterval(scrollOneRow, 2000)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }

  if (resetTimer) {
    clearTimeout(resetTimer)
    resetTimer = null
  }
})
</script>

<style scoped>
.system-panel {
  background: #ffffff;
  border: 1px solid #c8d9f6;
  box-shadow: 0 0 0 1px rgba(47, 128, 255, 0.06);
  padding: 20px;
  margin-bottom: 24px;
}

.top-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 16px;
}

.stat {
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  padding: 16px;
  box-sizing: border-box;
}

.label {
  font-size: 14px;
  color: #5f7aa3;
  margin-bottom: 8px;
}

.value {
  font-size: 30px;
  font-weight: 800;
  color: #2f80ff;
  letter-spacing: 1px;
}

.danger {
  color: #e5484d;
}

.status-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  padding: 12px 14px;
  margin-bottom: 16px;
  color: #16325c;
  font-size: 14px;
}

.bar-dot {
  width: 8px;
  height: 8px;
  background: #2f80ff;
  box-shadow: 0 0 10px rgba(47, 128, 255, 0.35);
}

.log-title {
  position: relative;
  z-index: 3;
  font-size: 16px;
  font-weight: 700;
  color: #16325c;
  margin-bottom: 10px;
  background: #ffffff;
}

.log-box {
  height: 160px;
  overflow: hidden;
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  padding: 8px 14px;
  box-sizing: border-box;
  position: relative;
}

.log-wrapper {
  position: relative;
  z-index: 1;
  will-change: transform;
}

.log-item {
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.log-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.level-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 20px;
  padding: 0 6px;
  font-size: 12px;
  border: 1px solid currentColor;
}

.safe {
  color: #2f80ff;
}

.warn {
  color: #f5a623;
}

.warn .level-tag {
  animation: pulseWarn 1.8s infinite;
}

.danger {
  color: #e5484d;
}

.danger .level-tag {
  animation: pulseDanger 1.2s infinite;
}

@keyframes pulseWarn {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.65;
  }
  100% {
    opacity: 1;
  }
}

@keyframes pulseDanger {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.45;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 1200px) {
  .top-stats {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .top-stats {
    grid-template-columns: 1fr;
  }
}
</style>