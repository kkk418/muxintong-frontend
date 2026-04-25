<template>
  <div class="audit-shell">
    <section class="audit-hero">
      <div><div class="eyebrow">A端 · 远程穿透式监盘</div><h1>远程监盘中心</h1><p>通过链上存栏、现场采集、饲料逻辑和估值模型四维比对，形成可复核的远程监盘结果，并与证据和风险事项自动联动。</p></div>
      <div class="hero-side-stack"><div class="hero-badge">当前偏差阈值：1.5%</div><div class="hero-badge">高于阈值自动生成预警</div></div>
    </section>
    <AuditProjectBar />
    <section class="audit-grid-4"><article v-for="item in store.currentProject.compareCards" :key="item.label" class="audit-card metric-card"><div class="metric-label">{{ item.label }}</div><div class="metric-value smaller">{{ item.value }}</div><div class="metric-desc">{{ item.desc }}</div></article></section>
    <section class="audit-grid-2 section-gap">
      <article class="audit-panel"><div class="panel-head"><div><div class="panel-title">监盘比对结果</div><div class="panel-sub">按栏舍查看四个数据口径之间的差异</div></div></div>
        <div class="audit-table"><div class="audit-head inventory-table"><span>栏舍</span><span>链上</span><span>现场</span><span>饲喂</span><span>估值</span><span>偏差</span><span>状态</span></div>
          <div class="audit-row inventory-table" v-for="row in store.currentProject.inventoryRows" :key="row.name"><span>{{ row.name }}</span><span>{{ row.onChain }}</span><span>{{ row.camera }}</span><span>{{ row.feed }}</span><span>{{ row.valuation }}</span><span>{{ row.diff }}</span><span :class="['status-chip', row.level]">{{ row.state }}</span></div></div>
      </article>
      <article class="audit-panel"><div class="panel-head"><div><div class="panel-title">逻辑核验说明</div><div class="panel-sub">明确每一步比对所对应的审计目标</div></div></div>
        <div class="logic-list"><div class="logic-item" v-for="item in logicChecks" :key="item.title"><div class="logic-title">{{ item.title }}</div><div class="logic-desc">{{ item.desc }}</div></div></div>
        <div class="snapshot-card"><div class="snapshot-title">重点异常建议</div><p>优先复核 {{ abnormalZone }} 的链上快照、视觉截帧和估值快照，并同步更新到底稿异常事项中。</p></div>
      </article>
    </section>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import AuditProjectBar from '@/components/AuditProjectBar.vue'
import { useAuditStore } from '@/stores/audit'
const store = useAuditStore()
const logicChecks = [
  { title: '链上存栏 vs 现场采集', desc: '验证链上登记数量与实时视觉盘点是否一致，识别数量错报。' },
  { title: '现场采集 vs 饲料推算', desc: '通过饲喂记录反推合理存栏，识别经营逻辑异常。' },
  { title: '现场采集 vs 估值存续数', desc: '校验估值模型是否基于真实在栏资产运行。' },
]
const abnormalZone = computed(() => store.currentProject.inventoryRows.find((item) => item.level === 'danger')?.name || '待跟踪栏舍')
</script>
<style scoped>
.section-gap { margin-top: 16px; }.smaller { font-size: 30px; }.inventory-table { grid-template-columns: 1.2fr repeat(5, .6fr) .9fr; }
.logic-list { display: grid; gap: 12px; }.logic-item,.snapshot-card { padding: 16px; border-radius: 16px; background: #f6f9fc; border: 1px solid #e8edf3; }
.logic-title,.snapshot-title { font-weight: 800; color: #24364d; margin-bottom: 6px; }.logic-desc,.snapshot-card p { color: #73879d; line-height: 1.8; font-size: 13px; margin: 0; }
.snapshot-card { margin-top: 14px; background: #fff8ec; border-color: #ffe4b5; }
@media (max-width: 1280px) { .inventory-table { grid-template-columns: 1fr; } }
</style>
