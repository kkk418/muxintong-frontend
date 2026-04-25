<template>
  <aside class="side-menu" :class="`role-${role}`">
    <div class="brand-box"><img src="../assets/images/logo.png" class="brand-logo" alt="牧信通logo" /></div>
    <div class="role-chip">{{ roleInfo.label }}</div>
    <div class="menu-section-title">功能导航</div>
    <nav class="menu-list">
      <router-link v-for="item in menuList" :key="item.path" :to="item.path" class="menu-item"><span class="menu-dot"></span><span>{{ item.label }}</span></router-link>
    </nav>
    <div class="account-card" v-if="authStore.currentUser">
      <div class="account-title">当前账号</div>
      <div class="account-name">{{ authStore.currentUser.name }}</div>
      <div class="account-meta">{{ authStore.currentUser.org }}</div>
      <div class="account-meta">{{ authStore.currentUser.title }}</div>
    </div>
    <router-link to="/portal" class="portal-entry">返回平台门户</router-link>
    <div class="side-footer"><div class="footer-line"></div><div class="footer-text">{{ roleInfo.tagline }}</div></div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { menuByRole, roleMetaMap } from '@/config/navigation'
import { useAuthStore } from '@/stores/auth'
const props = defineProps({ role: { type: String, default: 'business' } })
const authStore = useAuthStore()
const menuList = computed(() => menuByRole[props.role] || [])
const roleInfo = computed(() => roleMetaMap[props.role] || roleMetaMap.business)
</script>

<style scoped>
.side-menu { width: 272px; min-height: 100vh; background: linear-gradient(180deg, #163b83 0%, #0f2f6d 100%); border-right: 1px solid rgba(255,255,255,.12); color: #fff; padding: 20px 16px; box-sizing: border-box; display: flex; flex-direction: column; }
.role-auditor { background: linear-gradient(180deg, #24364d 0%, #162333 100%); }
.brand-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 0 18px;
  min-height: 72px;
}

.brand-logo {
  width: 120px;
  max-height: 60px;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}
.role-chip { display: inline-flex; align-items: center; width: fit-content; padding: 6px 10px; margin: 0 0 14px 4px; font-size: 12px; color: #eff5ff; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12); border-radius: 999px; }
.menu-section-title { font-size: 12px; color: #b9cbef; letter-spacing: 1px; margin: 0 0 12px 6px; }
.menu-list { display: flex; flex-direction: column; gap: 10px; }
.menu-item { display: flex; align-items: center; gap: 10px; color: #eaf2ff; text-decoration: none; padding: 14px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08); border-radius: 14px; transition: all .2s; }
.menu-item:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.18); }
.menu-dot { width: 8px; height: 8px; background: #7fa8ff; flex-shrink: 0; border-radius: 999px; }
.router-link-active { background: #fff; border-color: #fff; color: #16325c; box-shadow: 0 8px 22px rgba(0,0,0,.12); font-weight: 700; }
.router-link-active .menu-dot { background: #2f80ff; box-shadow: 0 0 8px rgba(47,128,255,.45); }
.account-card { margin-top: 18px; padding: 14px; border-radius: 16px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); }
.account-title { font-size: 12px; color: #c7d7f3; margin-bottom: 8px; }
.account-name { font-weight: 800; margin-bottom: 6px; }
.account-meta { color: #dbe7ff; font-size: 12px; line-height: 1.6; }
.portal-entry { margin-top: 18px; padding: 12px 14px; color: #dbe7ff; text-decoration: none; border: 1px dashed rgba(255,255,255,.22); text-align: center; border-radius: 14px; }
.side-footer { margin-top: auto; padding-top: 20px; }
.footer-line { height: 1px; background: rgba(255,255,255,.12); margin-bottom: 12px; }
.footer-text { color: #c8d8f4; font-size: 12px; line-height: 1.7; }
</style>
