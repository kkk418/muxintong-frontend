<template>
  <div class="audit-shell">
    <section class="audit-hero">
      <div><div class="eyebrow">A端 · 风险事项管理</div><h1>预警与处置中心</h1><p>统一跟踪风险事项的等级、负责人、SLA 和处理状态，支持接手事项、推进处理中和关闭留痕。</p></div>
      <div class="hero-side-stack"><div class="hero-badge">P1 风险 {{ store.riskCounters.p1 }}</div><div class="hero-badge">P2 风险 {{ store.riskCounters.p2 }}</div></div>
    </section>
    <AuditProjectBar />
    <section class="audit-grid-3"><article class="audit-card metric-card"><div class="metric-label">活跃事项</div><div class="metric-value">{{ scopedAlerts.filter((item) => item.status !== '已关闭').length }}</div><div class="metric-desc">当前项目仍在流转中的风险事项</div></article><article class="audit-card metric-card"><div class="metric-label">一级预警</div><div class="metric-value">{{ scopedAlerts.filter((item) => item.level.includes('一级')).length }}</div><div class="metric-desc">需要优先处理的高风险事件</div></article><article class="audit-card metric-card"><div class="metric-label">已关闭事项</div><div class="metric-value">{{ scopedAlerts.filter((item) => item.status === '已关闭').length }}</div><div class="metric-desc">已完成闭环并保留审计记录</div></article></section>
    <section class="audit-grid-2 section-gap">
      <article class="audit-panel"><div class="panel-head"><div><div class="panel-title">事项列表</div><div class="panel-sub">支持负责人认领、处理中和关闭</div></div></div>
        <div class="alert-list"><div class="alert-card" v-for="item in scopedAlerts" :key="item.id"><div class="alert-main"><div class="alert-id">{{ item.id }}</div><div class="alert-title">{{ item.level }} · {{ item.source }}</div><div class="alert-desc">负责人：{{ item.owner }} ｜ 时限：{{ item.sla }} ｜ 动作：{{ item.action }}</div></div><div class="alert-actions"><span :class="['status-chip', item.status === '已关闭' ? 'ok' : 'warn']">{{ item.status }}</span><div class="btn-group"><button class="soft-btn" @click="claim(item.id)">接手</button><button class="soft-btn" @click="progress(item.id)" :disabled="item.status === '已关闭'">处理中</button><button class="soft-btn" @click="store.closeAlert(item.id)" :disabled="item.status === '已关闭'">关闭</button></div></div></div></div>
      </article>
      <article class="audit-panel"><div class="panel-head"><div><div class="panel-title">闭环逻辑</div><div class="panel-sub">每个事项均保留识别、处理和关闭过程</div></div></div><div class="timeline-list"><div class="timeline-item" v-for="item in closeLoopSteps" :key="item.time"><div class="timeline-time">{{ item.time }}</div><div class="timeline-box"><div class="timeline-title">{{ item.title }}</div><div class="timeline-desc">{{ item.desc }}</div></div></div></div></article>
    </section>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import AuditProjectBar from '@/components/AuditProjectBar.vue'
import { useAuditStore } from '@/stores/audit'
import { useAuthStore } from '@/stores/auth'
const store = useAuditStore()
const authStore = useAuthStore()
const scopedAlerts = computed(() => store.alerts.filter((item) => item.projectId === store.currentProjectId))
const claim = (id) => store.claimAlert(id, authStore.currentUser?.name || '当前审计员')
const progress = (id) => store.updateAlertStatus(id, '处理中')
const closeLoopSteps = [
  { time: 'T0', title: '识别异常', desc: '系统发现存栏偏差、重复抵押疑点或数据延迟。' },
  { time: 'T1', title: '自动升级', desc: '根据阈值自动匹配风险等级并推送给负责人。' },
  { time: 'T2', title: '证据挂接', desc: '相关哈希、影像、IoT 与估值快照统一挂接到底稿与事项中。' },
  { time: 'T3', title: '处置关闭', desc: '人工复核完成后更新事项状态，形成完整闭环留痕。' },
]
</script>
<style scoped>
.section-gap { margin-top: 16px; }.alert-list { display: grid; gap: 12px; }
.alert-card { display: flex; justify-content: space-between; gap: 16px; padding: 16px; border-radius: 16px; background: #f6f9fc; border: 1px solid #e8edf3; }
.alert-id { color: #74879c; font-size: 12px; margin-bottom: 6px; }.alert-title { font-weight: 800; color: #24364d; margin-bottom: 6px; }.alert-desc { color: #73879d; line-height: 1.8; font-size: 13px; }
.alert-actions { display: flex; flex-direction: column; gap: 10px; align-items: flex-end; }.btn-group { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
@media (max-width: 900px) { .alert-card { flex-direction: column; } .alert-actions { align-items: flex-start; } .btn-group { justify-content: flex-start; } }
</style>
