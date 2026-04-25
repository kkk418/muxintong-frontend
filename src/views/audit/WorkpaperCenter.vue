<template>
  <div class="audit-shell">
    <section class="audit-hero">
      <div><div class="eyebrow">A端 · 审计底稿中心</div><h1>审计底稿中心</h1><p>将监盘结果、链上哈希、估值快照和预警记录自动汇总到同一份底稿中，并支持审计师补充复核意见与导出当前章节。</p></div>
      <div class="hero-side-stack"><div class="hero-badge">当前版本：{{ store.currentProject.workpaperVersion }}</div><button class="action-btn" @click="exportCurrentSection">导出当前章节</button></div>
    </section>
    <AuditProjectBar />
    <section class="workpaper-grid">
      <article class="audit-panel"><div class="panel-head"><div><div class="panel-title">底稿目录</div><div class="panel-sub">选择不同章节查看系统自动生成内容</div></div></div><div class="section-list"><button v-for="item in store.currentProject.workpaperSections" :key="item.key" class="section-item" :class="{ active: item.key === store.selectedSectionKey }" @click="store.selectSection(item.key)">{{ item.title }}</button></div></article>
      <article class="audit-panel main-paper"><div class="panel-head"><div><div class="panel-title">底稿正文预览</div><div class="panel-sub">正文与证据编号、复核说明保持联动</div></div></div>
        <div class="paper-card"><div class="paper-title">{{ store.selectedSection.title }}</div><div class="paper-content">{{ store.selectedSection.content }}</div><div class="paper-quote">已自动引用：{{ store.currentProject.evidenceList.map((item) => item.code).join(' / ') }}</div></div>
        <label class="note-editor"><span>复核意见</span><textarea v-model="reviewerNote" rows="5" placeholder="补充当前章节的审计复核意见"></textarea></label>
        <div class="editor-actions"><button class="soft-btn" @click="saveReviewerNote">保存复核意见</button></div>
      </article>
      <article class="audit-panel"><div class="panel-head"><div><div class="panel-title">附件与留痕</div><div class="panel-sub">附件状态会随项目流转持续更新</div></div></div><div class="attachment-list"><div class="attachment-item" v-for="item in store.currentProject.attachments" :key="item.name"><div><div class="attachment-name">{{ item.name }}</div><div class="attachment-type">{{ item.type }}</div></div><span :class="['status-chip', item.status === '已归档' ? 'ok' : 'warn']">{{ item.status }}</span></div></div></article>
    </section>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import AuditProjectBar from '@/components/AuditProjectBar.vue'
import { useAuditStore } from '@/stores/audit'
const store = useAuditStore()
const reviewerNote = ref(store.selectedSection?.reviewerNote || '')
watch(() => store.selectedSection, (value) => { reviewerNote.value = value?.reviewerNote || '' }, { immediate: true })
const saveReviewerNote = () => store.updateSectionNote(store.selectedSection.key, reviewerNote.value)
const exportCurrentSection = () => {
  const content = [store.selectedSection.title, '', store.selectedSection.content, '', `复核意见：${reviewerNote.value || '暂无'}`, `引用证据：${store.currentProject.evidenceList.map((item) => item.code).join(' / ')}`].join('\n')
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${store.currentProject.workpaperVersion}-${store.selectedSection.key}.txt`
  a.click()
  URL.revokeObjectURL(url)
}
</script>
<style scoped>
.workpaper-grid { display: grid; grid-template-columns: .9fr 1.5fr 1fr; gap: 16px; }.section-list,.attachment-list { display: grid; gap: 12px; }
.section-item,.attachment-item,.paper-card { padding: 16px; border-radius: 16px; background: #f6f9fc; border: 1px solid #e8edf3; }.section-item { text-align: left; cursor: pointer; }
.section-item.active { background: #edf2f7; border-color: #24364d; color: #24364d; font-weight: 700; }.main-paper { min-width: 0; }
.paper-title,.attachment-name { font-weight: 800; color: #24364d; margin-bottom: 8px; }.paper-content,.attachment-type { color: #73879d; line-height: 1.9; font-size: 13px; }
.paper-quote { margin-top: 16px; padding-top: 14px; border-top: 1px dashed #d9e3ec; color: #4f6479; font-size: 12px; }.attachment-item { display: flex; justify-content: space-between; gap: 12px; align-items: center; }
.note-editor { display: grid; gap: 8px; margin-top: 16px; color: #415669; font-size: 13px; }.note-editor textarea { border: 1px solid #dbe5ef; border-radius: 14px; padding: 12px; resize: vertical; }
.editor-actions { margin-top: 12px; }
@media (max-width: 1280px) { .workpaper-grid { grid-template-columns: 1fr; } }
</style>
