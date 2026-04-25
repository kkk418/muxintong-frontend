<template>
  <div class="audit-shell">
    <section class="audit-hero">
      <div><div class="eyebrow">A端 · 智能合约合规审计</div><h1>智能合约审计台</h1><p>通过规则结果、执行轨迹与复核责任人管理合约逻辑，保证授信相关关键规则可审查、可复核、可追踪。</p></div>
      <div class="hero-side-stack"><div class="hero-badge">规则通过：{{ store.contractSummary.passed }}</div><div class="hero-badge">待复核：{{ store.contractSummary.pending }}</div></div>
    </section>
    <AuditProjectBar />
    <section class="audit-grid-2">
      <article class="audit-panel"><div class="panel-head"><div><div class="panel-title">规则校验结果</div><div class="panel-sub">支持对待复核规则执行人工确认</div></div></div>
        <div class="rule-list"><div class="rule-card" v-for="item in store.contractRules" :key="item.id"><div><div class="rule-name">{{ item.name }}</div><div class="rule-desc">{{ item.desc }}</div><div class="rule-impact">业务意义：{{ item.impact }}</div><div class="rule-reviewer">复核状态：{{ item.reviewer }}</div></div><div class="rule-actions"><span :class="['status-chip', item.status === 'pass' ? 'ok' : 'warn']">{{ item.result }}</span><button v-if="item.status !== 'pass'" class="soft-btn" @click="reviewRule(item.id)">标记已复核</button></div></div></div>
      </article>
      <article class="audit-panel"><div class="panel-head"><div><div class="panel-title">执行轨迹</div><div class="panel-sub">查看规则触发到人工复核的完整过程</div></div></div><div class="timeline-list"><div class="timeline-item" v-for="item in store.contractTrace" :key="item.time + item.actor"><div class="timeline-time">{{ item.time }}</div><div class="timeline-box"><div class="timeline-title">{{ item.actor }} · {{ item.action }}</div><div class="timeline-desc">{{ item.status }}</div></div></div></div></article>
    </section>
  </div>
</template>
<script setup>
import AuditProjectBar from '@/components/AuditProjectBar.vue'
import { useAuditStore } from '@/stores/audit'
import { useAuthStore } from '@/stores/auth'
const store = useAuditStore()
const authStore = useAuthStore()
const reviewRule = (ruleId) => store.reviewContractRule(ruleId, authStore.currentUser?.name || '当前审计员')
</script>
<style scoped>
.rule-list { display: grid; gap: 12px; }.rule-card { padding: 16px; border-radius: 16px; background: #f6f9fc; border: 1px solid #e8edf3; display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
.rule-name { font-weight: 800; color: #24364d; margin-bottom: 8px; }.rule-desc,.rule-impact,.rule-reviewer { color: #73879d; line-height: 1.8; font-size: 13px; }
.rule-impact,.rule-reviewer { margin-top: 8px; }.rule-actions { display: flex; flex-direction: column; gap: 10px; align-items: flex-end; }
</style>
