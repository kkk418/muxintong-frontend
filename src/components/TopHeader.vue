<template>
  <header class="top-header" :class="`role-${role}`">
    <div class="header-left">
      <div class="system-title">{{ roleInfo.title }}</div>
      <div class="system-sub">{{ roleInfo.subtitle }}</div>
    </div>
    <div class="header-right">
      <div class="user-block" v-if="authStore.currentUser">
        <div class="user-name">{{ authStore.currentUser.name }}</div>
        <div class="user-meta">{{ authStore.currentUser.org }} · {{ authStore.currentUser.title }}</div>
      </div>
      <div class="status-pill">{{ roleInfo.label }}</div>
      <router-link to="/portal" class="back-link">切换工作台</router-link>
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { roleMetaMap } from '@/config/navigation'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({ role: { type: String, default: 'business' } })
const router = useRouter()
const authStore = useAuthStore()
const roleInfo = computed(() => roleMetaMap[props.role] || roleMetaMap.business)
const handleLogout = () => { authStore.logout(); router.push(`/login/${props.role}`) }
</script>

<style scoped>
.top-header { min-height: 86px; background: rgba(255,255,255,.92); border-bottom: 1px solid #d7e3f3; display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; box-sizing: border-box; box-shadow: 0 8px 22px rgba(31,78,163,.06); backdrop-filter: blur(10px); gap: 12px; }
.role-auditor { border-bottom-color: #d9e1ea; box-shadow: 0 8px 22px rgba(21,33,45,.08); }
.header-left { display: flex; flex-direction: column; gap: 4px; }
.system-title { color: #16325c; font-size: 24px; font-weight: 800; line-height: 1; }
.system-sub { color: #5f7aa3; font-size: 12px; letter-spacing: .4px; }
.header-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: flex-end; }
.user-block { padding: 8px 12px; border-radius: 14px; background: #f7faff; border: 1px solid #e1e9f3; }
.user-name { font-weight: 800; color: #24364d; font-size: 13px; }
.user-meta { margin-top: 2px; font-size: 12px; color: #6d829a; }
.status-pill { padding: 7px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; background: #edf4ff; border: 1px solid #d2e2ff; color: #2b5ca8; }
.role-auditor .status-pill { background: #eef2f6; border-color: #d7dfe8; color: #304255; }
.back-link, .logout-btn { color: #5f7aa3; text-decoration: none; font-size: 14px; padding: 8px 12px; border-radius: 999px; background: #f6f9fc; border: 1px solid #e4ebf3; }
.logout-btn { cursor: pointer; color: #a24a4a; background: #fff6f6; border-color: #f2dada; }
@media (max-width: 1200px) { .top-header { align-items: flex-start; } }
</style>
