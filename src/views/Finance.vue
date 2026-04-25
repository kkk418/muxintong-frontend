<template>
  <div class="page">
    <div class="page-header">
      <div class="page-header-left">
        <div class="page-tag">链上牧审 · 生物资产数字平台</div>
        <h1 class="page-title">一键融资</h1>
        <p class="page-desc">基于活体估值结果与授信规则的融资申请与审批进度管理</p>
      </div>

      <div class="page-header-right">
        <div class="page-badge">
          <span class="header-dot"></span>
          融资审批链路正常
        </div>
        <div class="page-time">数据更新时间：2026-04-15 09:30</div>
      </div>
    </div>

    <div class="page-body">
      <div class="panel">
        <div class="panel-title">融资概览</div>

        <div class="overview-grid">
          <div class="overview-card">
            <div class="overview-label">资产估值</div>
            <div class="overview-value money">¥ 7200</div>
          </div>

          <div class="overview-card">
            <div class="overview-label">可贷额度</div>
            <div class="overview-value money">¥ 5800</div>
          </div>

          <div class="overview-card">
            <div class="overview-label">申请金额</div>
            <div class="overview-value money">¥ {{ form.amount || 5000 }}</div>
          </div>

          <div class="overview-card">
            <div class="overview-label">当前状态</div>
            <div class="overview-value status">{{ result.status || '待提交' }}</div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">融资申请</div>

        <div class="form-grid">
          <div class="form-item">
            <label>申请人</label>
            <input v-model="form.applicant" placeholder="请输入申请人姓名" />
          </div>

          <div class="form-item">
            <label>申请金额</label>
            <input v-model="form.amount" placeholder="请输入申请金额" />
          </div>

          <div class="form-item">
            <label>贷款周期</label>
            <input v-model="form.period" placeholder="请输入贷款周期" />
          </div>

          <div class="form-item">
            <label>贷款用途</label>
            <input v-model="form.purpose" placeholder="请输入贷款用途" />
          </div>
        </div>

        <div class="btn-row">
          <button class="btn" @click="handlePreview" :disabled="loading">
            {{ loading ? '预审中...' : '资格预审' }}
          </button>

          <button class="btn primary" @click="handleSubmit" :disabled="loading">
            {{ loading ? '提交中...' : '提交融资申请' }}
          </button>

          <button class="btn" @click="handleReset" :disabled="loading">
            重置
          </button>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">审批进度</div>

        <div class="timeline">
          <div class="timeline-item" :class="{ done: progressStep >= 1 }">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-title">提交申请</div>
              <div class="timeline-desc">已提交融资申请资料</div>
            </div>
          </div>

          <div class="timeline-item" :class="{ done: progressStep >= 2 }">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-title">资料审核</div>
              <div class="timeline-desc">平台已完成资料审核</div>
            </div>
          </div>

          <div class="timeline-item" :class="{ active: progressStep >= 3 }">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-title">银行审批</div>
              <div class="timeline-desc">银行正在进行贷款审批</div>
            </div>
          </div>

          <div class="timeline-item" :class="{ done: progressStep >= 4 }">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-title">放款完成</div>
              <div class="timeline-desc">等待放款结果</div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">融资结果预测</div>

        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">预计可贷金额</span>
            <span class="result-value money">¥ {{ result.creditAmount || 5800 }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">预计利率</span>
            <span class="result-value">{{ result.rate || '4.35%' }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">预计放款时间</span>
            <span class="result-value">{{ result.loanTime || '2026-04-15' }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">审批结果</span>
            <span class="result-value warn">{{ result.status || '待确认' }}</span>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">授信建议</div>

        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">建议额度</span>
            <span class="result-value money">¥ {{ result.creditAmount || 5800 }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">建议期限</span>
            <span class="result-value">{{ result.period || '12个月' }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">建议利率</span>
            <span class="result-value">{{ result.rate || '4.35%' }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">授信判断</span>
            <span class="result-value ok">{{ result.suggestion || '建议通过' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const loading = ref(false)
const progressStep = ref(0)
const message = ref('')
const messageType = ref('success')
const form = reactive({
  applicant: '',
  amount: '',
  period: '',
  purpose: ''
})

const result = reactive({
  creditAmount: '',
  rate: '',
  loanTime: '',
  status: '',
  period: '',
  suggestion: ''
})

function resetResult() {
  result.creditAmount = ''
  result.rate = ''
  result.loanTime = ''
  result.status = ''
  result.period = ''
  result.suggestion = ''
}

async function handlePreview() {
  if (loading.value) return

  if (!form.applicant || !form.amount || !form.period || !form.purpose) {
  message.value = '请先填写完整融资信息'
  messageType.value = 'warn'
  return
}

  loading.value = true
  progressStep.value = 1

  try {
    await new Promise(resolve => setTimeout(resolve, 800))

    result.creditAmount = 5800
    result.rate = '4.35%'
    result.loanTime = '2026-04-15'
    result.status = '预审通过'
    result.period = form.period || '12个月'
    result.suggestion = '建议通过'

    progressStep.value = 2
    message.value = '资格预审完成，建议继续提交融资申请'
    messageType.value = 'success'
  } catch (error) {
    console.error('预审失败：', error)
    message.value = '资格预审失败，请稍后重试'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}

async function handleSubmit() {
  if (loading.value) return

  if (!form.applicant || !form.amount || !form.period || !form.purpose) {
    alert('请先填写完整融资信息')
    return
  }

  loading.value = true
  progressStep.value = 1
  resetResult()

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    result.creditAmount = 5800
    result.rate = '4.35%'
    result.loanTime = '2026-04-15'
    result.status = '审批中'
    result.period = form.period || '12个月'
    result.suggestion = '建议通过'

    progressStep.value = 3
    message.value = '融资申请已提交，当前已进入银行审批阶段'
    messageType.value = 'success'
  } catch (error) {
    console.error('融资提交失败：', error)
    message.value = '融资申请提交失败，请稍后重试'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}

function handleReset() {
  form.applicant = ''
  form.amount = ''
  form.period = ''
  form.purpose = ''

  progressStep.value = 0
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
  color: #16325c;
}

.money {
  color: #2f80ff;
}

.status {
  color: #f5a623;
}

.ok {
  color: #2f80ff;
}

.warn {
  color: #f5a623;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

.timeline {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.timeline-dot {
  width: 14px;
  height: 14px;
  background: #c8d9f6;
  border: 2px solid #c8d9f6;
  margin-top: 4px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.timeline-item.done .timeline-dot {
  background: #2f80ff;
}

.timeline-item.active .timeline-dot {
  background: #ffd166;
}

.timeline-item.done .timeline-title {
  color: #2f80ff;
}

.timeline-item.active .timeline-title {
  color: #f5a623;
}

.timeline-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
}

.timeline-desc {
  font-size: 14px;
  color: #5f7aa3;
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

@media (max-width: 1400px) {
  .overview-grid,
  .result-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .overview-grid,
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