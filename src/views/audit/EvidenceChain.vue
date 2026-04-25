<template>
  <div class="audit-shell">
    <section class="audit-hero">
      <div><div class="eyebrow">A端 · 链上证据核验</div><h1>证据链核验中心</h1><p>统一查看链上证据、影像证据、IoT 记录和估值快照的来源、哈希、状态和复核说明，支持直接更新核验结果。</p></div>
      <div class="hero-side-stack"><div class="hero-badge">最近校验 {{ store.lastVerifiedAt }}</div><button class="action-btn" @click="store.verifyEvidence(selected.code)">标记当前证据已核验</button></div>
    </section>
    <AuditProjectBar />
    <section class="audit-grid-2">
      <article class="audit-panel"><div class="panel-head"><div><div class="panel-title">证据列表</div><div class="panel-sub">按项目维度查看所有可引用证据</div></div></div>
        <div class="evidence-list"><button v-for="item in store.currentProject.evidenceList" :key="item.code" class="evidence-item" :class="{ active: item.code === store.selectedEvidenceCode }" @click="store.selectEvidence(item.code)"><div><div class="evidence-code">{{ item.code }}</div><div class="evidence-title">{{ item.title }}</div><div class="evidence-desc">{{ item.type }} · {{ item.source }}</div></div><span :class="['status-chip', item.status === '已校验' ? 'ok' : 'warn']">{{ item.status }}</span></button></div>
      </article>
      <article class="audit-panel sticky-panel"><div class="panel-head"><div><div class="panel-title">证据详情</div><div class="panel-sub">支持核验来源、完整性和复核意见</div></div></div>
        <div class="detail-card"><div class="detail-title">{{ selected.title }}</div><div class="detail-text">{{ selected.text }}</div>
          <div class="kv-list compact"><div class="kv-item"><span class="kv-key">证据编号</span><span class="kv-value">{{ selected.code }}</span></div><div class="kv-item"><span class="kv-key">采集来源</span><span class="kv-value">{{ selected.source }}</span></div><div class="kv-item"><span class="kv-key">锚定时间</span><span class="kv-value">{{ selected.anchorTime }}</span></div><div class="kv-item"><span class="kv-key">完整性状态</span><span class="kv-value">{{ selected.integrity }}</span></div></div>
          <div class="hash-box">{{ selected.hash }}</div>
          <label class="note-box"><span>复核备注</span><textarea v-model="noteDraft" rows="4" placeholder="补充当前证据的核验说明"></textarea></label>
          <div class="detail-actions"><button class="soft-btn" @click="saveNote">保存备注</button><button class="soft-btn" @click="store.verifyEvidence(selected.code)">更新为已核验</button></div>
        </div>
      </article>
    </section>
    <section class="audit-grid-2 section-gap">
      <article class="audit-panel"><div class="panel-head"><div><div class="panel-title">证据流转链路</div><div class="panel-sub">查看采集、加工、锚定和复核的完整过程</div></div></div>
        <div class="flow-grid"><div class="flow-node" v-for="item in flow" :key="item.step"><div class="flow-step">{{ item.step }}</div><div class="flow-title">{{ item.title }}</div><div class="flow-text">{{ item.text }}</div></div></div>
      </article>
      <article class="audit-panel"><div class="panel-head"><div><div class="panel-title">底稿联动状态</div><div class="panel-sub">核验完成后，证据会同步到对应底稿章节</div></div></div>
        <div class="timeline-list"><div class="timeline-item" v-for="item in workpaperLinkage" :key="item.time"><div class="timeline-time">{{ item.time }}</div><div class="timeline-box"><div class="timeline-title">{{ item.title }}</div><div class="timeline-desc">{{ item.desc }}</div></div></div></div>
      </article>
    </section>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import AuditProjectBar from '@/components/AuditProjectBar.vue'
import { useAuditStore } from '@/stores/audit'
const store = useAuditStore()
const selected = computed(() => store.selectedEvidence)
const noteDraft = ref(selected.value?.note || '')
watch(selected, (value) => { noteDraft.value = value?.note || '' }, { immediate: true })
const saveNote = () => store.updateEvidenceNote(selected.value.code, noteDraft.value)
const flow = [
  { step: '01', title: 'IoT/视频采集', text: '设备和视觉服务生成原始记录，附带时间戳和来源。' },
  { step: '02', title: '业务与模型加工', text: '系统生成估值快照、预警事件和合约动作。' },
  { step: '03', title: '联盟链锚定', text: '关键数据写入链上并产生哈希，形成不可篡改锚点。' },
  { step: '04', title: '审计核验回填', text: '审计工作台重算哈希，把结果同步到底稿中心与预警处置。' },
]
const workpaperLinkage = [
  { time: '09:00', title: '估值快照入底稿引用池', desc: '系统将估值结果和哈希编号一起推送到底稿中心。' },
  { time: '10:21', title: '异常截帧附加到监盘章节', desc: '触发偏差后，自动把影像证据与风险编号关联。' },
  { time: '14:30', title: '复核意见写回底稿', desc: '人工复核结果会沉淀到异常事项说明和阶段结论。' },
]
</script>
<style scoped>
.section-gap { margin-top: 16px; }.evidence-list { display: grid; gap: 12px; }
.evidence-item { border: 1px solid #e7edf3; background: #f8fafc; border-radius: 16px; padding: 16px; display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; cursor: pointer; text-align: left; }
.evidence-item.active { border-color: #24364d; background: #f1f5f9; }.evidence-code { color: #7b8ea3; font-size: 12px; margin-bottom: 6px; }
.evidence-title { color: #24364d; font-weight: 800; margin-bottom: 6px; }.evidence-desc,.detail-text { color: #74879c; line-height: 1.8; font-size: 13px; }
.sticky-panel { position: sticky; top: 20px; }.detail-card { padding: 18px; border-radius: 18px; background: #f7fafc; border: 1px solid #e8edf3; }
.detail-title { font-size: 22px; font-weight: 800; margin-bottom: 8px; color: #24364d; }.compact { margin-top: 14px; }
.hash-box { margin-top: 14px; padding: 14px; border-radius: 14px; background: #1f3145; color: #eaf2fb; font-size: 12px; word-break: break-all; }
.note-box { display: grid; gap: 8px; margin-top: 16px; color: #415669; font-size: 13px; }.note-box textarea { border: 1px solid #dbe5ef; border-radius: 14px; padding: 12px; resize: vertical; }
.detail-actions { display: flex; gap: 10px; margin-top: 12px; }
.flow-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }.flow-node { padding: 16px; border-radius: 18px; background: #f6f9fc; border: 1px solid #e7edf3; }
.flow-step { width: 36px; height: 36px; border-radius: 999px; background: #24364d; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; margin-bottom: 12px; }
.flow-title { font-weight: 800; color: #24364d; margin-bottom: 8px; }.flow-text { color: #73879d; font-size: 13px; line-height: 1.8; }
@media (max-width: 1200px) { .flow-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 768px) { .flow-grid { grid-template-columns: 1fr; } }
</style>
