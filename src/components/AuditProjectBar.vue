<template>
  <section class="project-bar">
    <div class="project-meta">
      <div class="meta-item">
        <span class="meta-label">审计项目</span>
        <select class="project-select" :value="store.currentProjectId" @change="onChange">
          <option v-for="item in store.projects" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="meta-item">
        <span class="meta-label">核验场区</span>
        <strong>{{ store.currentProject.farm }}</strong>
      </div>
      <div class="meta-item">
        <span class="meta-label">审计负责人</span>
        <strong>{{ store.currentProject.auditLead }}</strong>
      </div>
      <div class="meta-item">
        <span class="meta-label">当前结论</span>
        <strong>{{ store.currentProject.auditConclusion }}</strong>
      </div>
    </div>

    <div class="project-side">
      <div class="mini-chip danger">活跃预警 {{ store.projectAlerts.filter((item) => item.status !== '已关闭').length }}</div>
      <div class="mini-chip">底稿 {{ store.currentProject.workpaperVersion }}</div>
      <div class="mini-chip subtle">最近校验 {{ store.lastVerifiedAt }}</div>
    </div>
  </section>
</template>

<script setup>
import { useAuditStore } from '@/stores/audit'

const store = useAuditStore()

const onChange = (event) => {
  store.switchProject(event.target.value)
}
</script>

<style scoped>
.project-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  margin: 18px 0 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #dde5ee;
  box-shadow: 0 10px 26px rgba(19, 31, 46, 0.06);
}

.project-meta {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  flex: 1;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 14px;
  border-radius: 14px;
  background: #f7fafc;
  border: 1px solid #ebf0f4;
}

.meta-label {
  color: #73879d;
  font-size: 12px;
}

strong {
  color: #24364d;
  font-size: 14px;
}

.project-select {
  border: none;
  background: transparent;
  color: #24364d;
  font-weight: 700;
  padding: 0;
}

.project-side {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.mini-chip {
  padding: 8px 12px;
  border-radius: 999px;
  background: #eef3f8;
  border: 1px solid #dde6ef;
  color: #405366;
  font-size: 12px;
}

.mini-chip.subtle {
  background: #f6f8fb;
}

.mini-chip.danger {
  background: #ffecec;
  border-color: #ffd8d8;
  color: #b14b4b;
}

@media (max-width: 1180px) {
  .project-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .project-meta {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .project-side {
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .project-meta {
    grid-template-columns: 1fr;
  }
}
</style>
