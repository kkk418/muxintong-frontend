import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/PublicLayout.vue'),
    children: [
      { path: '', name: 'Landing', component: () => import('@/views/Landing.vue') },
      { path: 'portal', name: 'Portal', component: () => import('@/views/portal/Portal.vue') },
      { path: 'login/:role', name: 'WorkspaceLogin', component: () => import('@/views/auth/LoginWorkspace.vue') },
      { path: 'farmer-login', redirect: '/login/business' },
    ],
  },
  {
    path: '/b',
    component: () => import('@/layouts/WorkbenchLayout.vue'),
    meta: { role: 'business', requiresAuth: true },
    children: [
      { path: '', redirect: '/b/dashboard' },
      { path: 'dashboard', name: 'BusinessDashboard', component: () => import('@/views/Dashboard.vue'), meta: { role: 'business', requiresAuth: true } },
      { path: 'asset-confirm', name: 'AssetConfirm', component: () => import('@/views/AssetConfirm.vue'), meta: { role: 'business', requiresAuth: true } },
      { path: 'valuation', name: 'Valuation', component: () => import('@/views/Valuation.vue'), meta: { role: 'business', requiresAuth: true } },
      { path: 'finance', name: 'Finance', component: () => import('@/views/Finance.vue'), meta: { role: 'business', requiresAuth: true } },
      { path: 'risk-warning', name: 'RiskWarning', component: () => import('@/views/RiskWarning.vue'), meta: { role: 'business', requiresAuth: true } },
    ],
  },
  {
    path: '/a',
    component: () => import('@/layouts/WorkbenchLayout.vue'),
    meta: { role: 'auditor', requiresAuth: true },
    children: [
      { path: '', redirect: '/a/dashboard' },
      { path: 'dashboard', name: 'AuditorDashboard', component: () => import('@/views/audit/AuditorDashboard.vue'), meta: { role: 'auditor', requiresAuth: true } },
      { path: 'inventory-check', name: 'InventoryCheck', component: () => import('@/views/audit/InventoryCheck.vue'), meta: { role: 'auditor', requiresAuth: true } },
      { path: 'evidence-chain', name: 'EvidenceChain', component: () => import('@/views/audit/EvidenceChain.vue'), meta: { role: 'auditor', requiresAuth: true } },
      { path: 'workpaper', name: 'WorkpaperCenter', component: () => import('@/views/audit/WorkpaperCenter.vue'), meta: { role: 'auditor', requiresAuth: true } },
      { path: 'contract-audit', name: 'ContractAudit', component: () => import('@/views/audit/ContractAudit.vue'), meta: { role: 'auditor', requiresAuth: true } },
      { path: 'alerts', name: 'AlertCenter', component: () => import('@/views/audit/AlertCenter.vue'), meta: { role: 'auditor', requiresAuth: true } },
    ],
  },
  { path: '/dashboard', redirect: '/b/dashboard' },
  { path: '/asset-confirm', redirect: '/b/asset-confirm' },
  { path: '/valuation', redirect: '/b/valuation' },
  { path: '/finance', redirect: '/b/finance' },
  { path: '/risk-warning', redirect: '/b/risk-warning' },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  const authStore = useAuthStore()
  authStore.hydrate()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) return `/login/${to.meta.role || 'business'}`
  if (to.meta.requiresAuth && authStore.currentRole && to.meta.role !== authStore.currentRole) {
    return authStore.currentRole === 'auditor' ? '/a/dashboard' : '/b/dashboard'
  }
  if (to.name === 'WorkspaceLogin' && authStore.isLoggedIn) {
    return authStore.currentRole === 'auditor' ? '/a/dashboard' : '/b/dashboard'
  }
  return true
})

export default router
