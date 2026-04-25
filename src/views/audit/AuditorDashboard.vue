<template>
  <div class="audit-shell">
    <section class="audit-hero">
      <div>
        <div class="eyebrow">A端 · 审计工作台总览</div>
        <h1>审计驾驶舱</h1>
        <p>以项目为单位统一查看审计对象、证据状态、预警事项与底稿沉淀结果，支持远程监盘、证据复核和事项处置联动。</p>
      </div>
      <div class="hero-side-stack">
        <div class="hero-badge">当前审计周期：2026-Q2</div>
        <div class="hero-badge">最近校验：{{ store.lastVerifiedAt }}</div>
      </div>
    </section>
    <AuditProjectBar />
    <section class="audit-grid-4">
      <article v-for="item in metrics" :key="item.label" class="audit-card metric-card"><div class="metric-label">{{ item.label }}</div><div class="metric-value">{{ item.value }}</div><div class="metric-desc">{{ item.desc }}</div></article>
    </section>
    <section class="audit-grid-3 section-gap">
      <article class="audit-panel project-overview">
        <div class="panel-head"><div><div class="panel-title">当前项目画像</div><div class="panel-sub">总览项目主体、底稿版本、阶段结论和当前风险等级</div></div><span class="status-chip danger">{{ store.currentProject.warningLevel }}</span></div>
        <div class="kv-list">
          <div class="kv-item"><span class="kv-key">项目名称</span><span class="kv-value">{{ store.currentProject.name }}</span></div>
          <div class="kv-item"><span class="kv-key">场区 / 负责人</span><span class="kv-value">{{ store.currentProject.farm }} / {{ store.currentProject.manager }}</span></div>
          <div class="kv-item"><span class="kv-key">当前底稿版本</span><span class="kv-value">{{ store.currentProject.workpaperVersion }}</span></div>
          <div class="kv-item"><span class="kv-key">阶段性结论</span><span class="kv-value">{{ store.currentProject.auditConclusion }}</span></div>
        </div>
      </article>
      <article class="audit-panel">
        <div class="panel-head"><div><div class="panel-title">风险事项队列</div><div class="panel-sub">优先处理一级预警和待复核事项</div></div></div>
        <div class="audit-table">
          <div class="audit-head risk-table"><span>项目</span><span>异常类型</span><span>状态</span></div>
          <div class="audit-row risk-table" v-for="item in riskProjects" :key="item.id"><span>{{ item.projectId }}</span><span>{{ item.source }}</span><span :class="['status-chip', chipClass(item.level)]">{{ item.level }}</span></div>
        </div>
      </article>
      <article class="audit-panel">
        <div class="panel-head"><div><div class="panel-title">证据链状态</div><div class="panel-sub">证据校验、预警同步和规则追踪状态</div></div></div>
        <div class="tag-list"><span class="tag-pill">链上哈希已锚定</span><span class="tag-pill">估值快照自动归档</span><span class="tag-pill">预警事项同步到底稿</span><span class="tag-pill">合约规则可追溯</span></div>
        <div class="mini-metrics"><div><strong>{{ store.currentProject.evidenceList.length }}</strong><span>当前项目证据条目</span></div><div><strong>{{ store.projectAlerts.length }}</strong><span>当前项目风险事项</span></div></div>
      </article>
    </section>
    <section class="audit-grid-2 section-gap">
      <article class="audit-panel">
        <div class="panel-head"><div><div class="panel-title">当前待办</div><div class="panel-sub">围绕复核、底稿补充和规则校验的下一步动作</div></div></div>
        <div class="action-list"><div class="action-item" v-for="item in tasks" :key="item.title"><div class="action-title">{{ item.title }}</div><div class="action-desc">{{ item.desc }}</div></div></div>
      </article>
      <article class="audit-panel">
        <div class="panel-head"><div><div class="panel-title">审计时间线</div><div class="panel-sub">查看证据采集、预警触发和底稿同步过程</div></div></div>
        <div class="timeline-list"><div class="timeline-item" v-for="item in store.currentProject.timeline" :key="item.time + item.title"><div class="timeline-time">{{ item.time }}</div><div class="timeline-box"><div class="timeline-title">{{ item.title }}</div><div class="timeline-desc">{{ item.desc }}</div></div></div></div>
      </article>
    </section>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import AuditProjectBar from '@/components/AuditProjectBar.vue'
import { useAuditStore } from '@/stores/audit'
const store = useAuditStore()
const metrics = computed(() => store.dashboardMetrics)
const riskProjects = computed(() => store.activeAlerts)
const tasks = computed(() => [
  { title: '复核高风险证据', desc: `当前共有 ${store.projectAlerts.filter((item) => item.status !== '已关闭').length} 个事项等待人工处理。` },
  { title: '补充底稿复核意见', desc: '将复核说明回填到异常事项和阶段结论中。' },
  { title: '确认规则审计状态', desc: `尚有 ${store.contractSummary.pending} 条规则需要继续复核。` },
])
const chipClass = (level) => { if (level.includes('一级')) return 'danger'; if (level.includes('二级')) return 'warn'; return 'neutral' }
</script>
<style scoped>
.section-gap { margin-top: 16px; }.risk-table { grid-template-columns: 1fr 1fr .8fr; }.project-overview { min-width: 0; }
.mini-metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 18px; }
.mini-metrics > div { padding: 16px; border-radius: 16px; background: #f6f9fc; border: 1px solid #e8edf3; }
.mini-metrics strong { display: block; font-size: 26px; color: #24364d; margin-bottom: 6px; }
.mini-metrics span { color: #73879d; font-size: 13px; }
.action-list { display: grid; gap: 14px; }.action-item { padding: 16px; border-radius: 16px; background: #f6f9fc; border: 1px solid #e8edf3; }
.action-title { font-weight: 800; color: #24364d; margin-bottom: 6px; }.action-desc { color: #74879c; line-height: 1.8; font-size: 13px; }
</style>
