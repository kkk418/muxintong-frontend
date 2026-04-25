<template>
  <div class="page">
    <div class="page-header">
      <div class="page-header-left">
        <div class="page-tag">链上牧审 · 生物资产数字平台</div>
        <h1 class="page-title">活体估值</h1>
        <p class="page-desc">基于体重、健康评分与市场参考价的智能活体估值分析</p>
      </div>

      <div class="page-header-right">
        <div class="page-badge">
          <span class="dot"></span>
          估值模型运行正常
        </div>
        <div class="page-time">数据更新时间：2026-04-15 09:30</div>
      </div>
    </div>

    <div class="page-body">
      <div class="panel">
        <div class="panel-title">估值流程</div>
        <div class="steps">
          <div class="step active">估值触发</div>
          <div class="arrow">→</div>
          <div class="step active">数据核验</div>
          <div class="arrow">→</div>
          <div class="step active">模型估值</div>
          <div class="arrow">→</div>
          <div class="step">报告生成</div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">活体基础信息</div>

        <div class="form-grid">
          <div class="form-item">
            <label>耳标号</label>
            <input v-model="form.tagId" placeholder="请输入耳标号" />
          </div>

          <div class="form-item">
            <label>品种</label>
            <input v-model="form.breed" placeholder="请输入品种" />
          </div>

          <div class="form-item">
            <label>月龄</label>
            <input v-model="form.age" placeholder="请输入月龄" />
          </div>

          <div class="form-item">
            <label>体重(kg)</label>
            <input v-model="form.weight" placeholder="请输入体重" />
          </div>

          <div class="form-item">
            <label>健康评分</label>
            <input v-model="form.healthScore" placeholder="请输入健康评分" />
          </div>

          <div class="form-item">
            <label>市场参考价(元)</label>
            <input v-model="form.marketPrice" placeholder="请输入市场参考价" />
          </div>
        </div>

        <div class="btn-row">
          <button class="btn primary" @click="handleValuation" :disabled="loading">
            {{ loading ? '估值中...' : '开始估值' }}
          </button>

          <button class="btn" @click="handleReset" :disabled="loading">
            重置
          </button>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">估值结果</div>

        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">估值金额</span>
            <span class="result-value money">¥ {{ result.amount || '--' }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">风险等级</span>
            <span class="result-value warn">{{ result.riskLevel || '--' }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">估值模型</span>
            <span class="result-value">{{ result.modelName || '--' }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">估值时间</span>
            <span class="result-value">{{ result.time || '--' }}</span>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">估值报告</div>
        <div class="conclusion-box">
          {{ result.reportText || '点击“开始估值”后，这里将显示估值报告。' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { evaluateCow } from '../api/valuation'

const loading = ref(false)
const message = ref('')
const messageType = ref('success')
const form = reactive({
  tagId: '',
  breed: '',
  age: '',
  weight: '',
  healthScore: '',
  marketPrice: ''
})

const result = reactive({
  amount: '',
  riskLevel: '',
  modelName: '',
  time: '',
  reportText: ''
})

function resetResult() {
  result.amount = ''
  result.riskLevel = ''
  result.modelName = ''
  result.time = ''
  result.reportText = ''
}

async function handleValuation() {
  if (loading.value) return

  if (!form.weight || !form.healthScore || !form.marketPrice) {
  message.value = '请先填写体重、健康评分和市场参考价'
  messageType.value = 'warn'
  return
}

  loading.value = true
  resetResult()

  try {
    const res = await evaluateCow({
      weight: Number(form.weight),
      healthScore: Number(form.healthScore),
      marketPrice: Number(form.marketPrice)
    })

    result.amount = res.data.valuationAmount
    result.riskLevel = res.data.riskLevel
    result.modelName = res.data.valuationModel
    result.time = res.data.evaluateTime
    result.reportText = res.data.reportText

    message.value = '估值完成，可继续修改参数后再次估值'
    messageType.value = 'success'
  } catch (error) {
    console.error('估值失败：', error)
    message.value = '估值接口请求失败，请检查后端是否启动或地址是否正确'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}

function handleReset() {
  form.tagId = ''
  form.breed = ''
  form.age = ''
  form.weight = ''
  form.healthScore = ''
  form.marketPrice = ''
  message.value = ''
  messageType.value = 'success'
  resetResult()
}
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

.dot {
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

.steps {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.step {
  padding: 12px 18px;
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  color: #16325c;
}

.step.active {
  background: #1d6fff;
  color: #ffffff;
  font-weight: 700;
}

.arrow {
  color: #9ecfc1;
  font-size: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item label {
  font-size: 14px;
  color: #355b8c;
}

.form-item input {
  height: 42px;
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  color: #16325c;
  padding: 0 12px;
  outline: none;
  box-sizing: border-box;
}

.form-item input:focus {
  border-color: #2f80ff;
  box-shadow: 0 0 0 1px #2f80ff inset;
}

.form-item input::placeholder {
  color: #87a2c7;
}

.btn-row {
  display: flex;
  gap: 12px;
}

.btn {
  height: 40px;
  padding: 0 20px;
  border: 1px solid #c8d9f6;
  background: #f7fbff;
  color: #16325c;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.primary {
  background: #1d6fff;
  color: #ffffff;
  border: none;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.result-item {
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  padding: 16px;
  box-sizing: border-box;
}

.result-label {
  display: block;
  font-size: 14px;
  color: #5f7aa3;
  margin-bottom: 8px;
}

.result-value {
  font-size: 16px;
  font-weight: 700;
  color: #16325c;
  word-break: break-word;
}

.money {
  color: #2f80ff;
}

.warn {
  color: #f5a623;
}

.conclusion-box {
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  padding: 18px;
  line-height: 1.9;
  color: #16325c;
}

@media (max-width: 1400px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .result-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .form-grid,
  .result-grid {
    grid-template-columns: 1fr;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .page-header-right {
    align-items: flex-start;
  }
}
.message-bar {
  margin-top: 14px;
  padding: 12px 14px;
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  color: #16325c;
  line-height: 1.6;
}

.message-bar.success {
  border-left: 4px solid #2f80ff;
}

.message-bar.warn {
  border-left: 4px solid #ffd166;
}

.message-bar.error {
  border-left: 4px solid #ff7b7b;
}
</style>