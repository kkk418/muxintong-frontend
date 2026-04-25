<template>
  <div class="page">
    <div class="page-header">
      <div class="page-header-left">
        <div class="page-tag">链上牧审 · 生物资产数字平台</div>
        <h1 class="page-title">资产确权</h1>
        <p class="page-desc">基于 IoT 采集、AI 核验与区块链存证的牲畜资产确权流程</p>
      </div>

      <div class="page-header-right">
        <div class="page-badge">
          <span class="dot"></span>
          确权流程可追踪
        </div>
        <div class="page-time">数据更新时间：2026-04-15 09:30</div>
      </div>
    </div>

    <div class="page-body">
      <div class="panel">
        <div class="panel-title">确权流程追踪</div>

        <div class="steps">
          <div class="step" :class="{ active: currentStep >= 0 }">申请提交</div>
          <div class="arrow">→</div>
          <div class="step" :class="{ active: currentStep >= 1 }">IoT采集</div>
          <div class="arrow">→</div>
          <div class="step" :class="{ active: currentStep >= 2 }">AI核验</div>
          <div class="arrow">→</div>
          <div class="step" :class="{ active: currentStep >= 3 }">区块链上链</div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">确权信息录入</div>

        <div class="form-grid">
          <div class="form-item">
            <label>耳标号</label>
            <input v-model="form.earTag" placeholder="请输入耳标号" />
          </div>

          <div class="form-item">
            <label>体重</label>
            <input v-model="form.weight" placeholder="请输入体重" />
          </div>
        </div>

        <div class="btn-row">
          <button class="btn primary" @click="handleSubmit" :disabled="loading">
           {{ loading ? '提交中...' : '提交确权' }}
          </button>

          <button class="btn" @click="handleReset" :disabled="loading">
            重置
          </button>
        </div>
        <div v-if="message" class="message-bar" :class="messageType">
  {{ message }}
</div>
      </div>

      <div class="panel">
        <div class="panel-title">确权结果</div>

        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">区块链哈希</span>
            <span class="result-value">{{ result.blockchainHash || '--' }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">上链状态</span>
            <span class="result-value status-ok">{{ result.chainStatus || '--' }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">上链时间</span>
            <span class="result-value">{{ result.chainTime || '--' }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">AI核验结果</span>
            <span class="result-value">{{ result.aiCheckResult || '--' }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">IoT数据完整度</span>
            <span class="result-value">{{ result.iotDataIntegrity || '--' }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">IoT状态</span>
            <span class="result-value">{{ result.statusIot || '--' }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">资产状态</span>
            <span class="result-value">{{ result.statusAsset || '--' }}</span>
          </div>

          <div class="result-item">
            <span class="result-label">风险状态</span>
            <span class="result-value status-warn">{{ result.statusRisk || '--' }}</span>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">智能核验建议</div>
        <div class="conclusion-box">
          {{ result.financeQualification || '提交确权后，这里会显示系统建议。' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { confirmCow } from '../api/asset'

const currentStep = ref(0)
const loading = ref(false)
const message = ref('')
const messageType = ref('success')
const form = reactive({
  earTag: '',
  weight: ''
})

const result = reactive({
  blockchainHash: '',
  chainStatus: '',
  chainTime: '',
  aiCheckResult: '',
  iotDataIntegrity: '',
  statusIot: '',
  statusAi: '',
  statusAsset: '',
  statusRisk: '',
  financeQualification: ''
})

function resetResult() {
  result.blockchainHash = ''
  result.chainStatus = ''
  result.chainTime = ''
  result.aiCheckResult = ''
  result.iotDataIntegrity = ''
  result.statusIot = ''
  result.statusAi = ''
  result.statusAsset = ''
  result.statusRisk = ''
  result.financeQualification = ''
}

async function handleSubmit() {
  if (loading.value) return

 if (!form.earTag || !form.weight) {
  message.value = '请先填写耳标号和体重'
  messageType.value = 'warn'
  return
}

  loading.value = true
  currentStep.value = 0
  resetResult()

  try {
    const res = await confirmCow({
      earTag: form.earTag,
      weight: Number(form.weight)
    })

    result.blockchainHash = res.data.blockchainHash
    result.chainStatus = res.data.chainStatus
    result.chainTime = res.data.chainTime
    result.aiCheckResult = res.data.aiCheckResult
    result.iotDataIntegrity = res.data.iotDataIntegrity
    result.statusIot = res.data.statusIot
    result.statusAi = res.data.statusAi
    result.statusAsset = res.data.statusAsset
    result.statusRisk = res.data.statusRisk
    result.financeQualification = res.data.financeQualification

    currentStep.value = 3
   message.value = '确权提交成功，可继续修改数据后再次提交'
   messageType.value = 'success'
  } catch (error) {
    console.error('确权失败：', error)
    message.value = '确权接口请求失败，请检查后端是否启动或地址是否正确'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}

function handleReset() {
  form.earTag = ''
  form.weight = ''
  currentStep.value = 0
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
  font-size: 15px;
  font-weight: 700;
  color: #16325c;
  line-height: 1.7;
  word-break: break-all;
}

.status-ok {
  color: #2f80ff;
}

.status-warn {
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