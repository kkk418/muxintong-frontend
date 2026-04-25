<template>
  <div class="login-page">
    <div class="login-backdrop"></div>
    <div class="login-shell">
      <section class="login-brand">
        <img src="@/assets/images/logo.png" class="login-logo" alt="牧信通logo" />
        <div class="brand-badge">{{ roleInfo.label }}</div>
        <h1>{{ roleInfo.title }}</h1>
        <p>{{ roleDescription }}</p>

        <div class="account-card">
          <div class="account-title">测试账号</div>
          <div class="account-row"><span>用户名</span><strong>{{ exampleAccount.username }}</strong></div>
          <div class="account-row"><span>密码</span><strong>{{ exampleAccount.password }}</strong></div>
        </div>
      </section>

      <section class="login-panel">
        <div class="panel-header">
          <div class="panel-tag">账号登录</div>
          <router-link to="/portal" class="panel-link">返回门户</router-link>
        </div>

        <form class="login-form" @submit.prevent="handleSubmit">
          <label class="form-item">
            <span>用户名</span>
            <input v-model.trim="form.username" type="text" placeholder="请输入用户名" />
          </label>
          <label class="form-item">
            <span>密码</span>
            <input v-model.trim="form.password" type="password" placeholder="请输入密码" />
          </label>
          <button class="submit-btn" type="submit">登录并进入工作台</button>
        </form>

        <div v-if="authStore.loginError" class="error-box">{{ authStore.loginError }}</div>

        <div class="panel-note">登录后将启用角色权限、导航守卫和本地状态持久化。</div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { roleMetaMap } from '@/config/navigation'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const role = computed(() => (route.params.role === 'auditor' ? 'auditor' : 'business'))
const roleInfo = computed(() => roleMetaMap[role.value])
const exampleAccount = computed(() =>
  role.value === 'auditor'
    ? { username: 'audit_lead', password: '123456' }
    : { username: 'biz_admin', password: '123456' },
)
const roleDescription = computed(() =>
  role.value === 'auditor'
    ? '面向审计师、事务所和内部审计团队，支持远程监盘、证据核验、底稿沉淀与规则复核。'
    : '面向养殖企业与业务运营人员，支持资产确权、估值管理、融资申请与风险跟踪。',
)

const form = reactive({
  username: exampleAccount.value.username,
  password: exampleAccount.value.password,
})

const handleSubmit = () => {
  const success = authStore.login({ username: form.username, password: form.password, role: role.value })
  if (success) router.push(role.value === 'auditor' ? '/a/dashboard' : '/b/dashboard')
}
</script>

<style scoped>
.login-page { min-height: 100vh; background: linear-gradient(180deg, #edf4ff 0%, #f8fbff 100%); display: flex; align-items: center; justify-content: center; padding: 32px; position: relative; overflow: hidden; }
.login-backdrop { position: absolute; inset: 0; background-image: linear-gradient(rgba(47, 128, 255, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(47, 128, 255, 0.06) 1px, transparent 1px); background-size: 32px 32px; }
.login-shell { position: relative; z-index: 1; width: min(1120px, 100%); display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 24px; }
.login-brand, .login-panel { border-radius: 28px; box-shadow: 0 20px 44px rgba(31, 78, 163, 0.12); }
.login-brand { padding: 36px; background: linear-gradient(135deg, #183c82 0%, #11336f 100%); color: #fff; }
.login-logo {
  width: 132px;
  max-height: 68px;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  margin-bottom: 24px;
}
.brand-badge { display: inline-flex; padding: 6px 12px; border-radius: 999px; font-size: 12px; background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.16); margin-bottom: 16px; }
.login-brand h1 { margin: 0 0 12px; font-size: 38px; }
.login-brand p { margin: 0; color: #dce7f8; line-height: 1.8; max-width: 520px; }
.account-card { margin-top: 28px; padding: 20px; border-radius: 18px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12); }
.account-title { font-weight: 800; margin-bottom: 12px; }
.account-row { display: flex; justify-content: space-between; gap: 12px; color: #e7eefb; }
.account-row + .account-row { margin-top: 10px; }
.login-panel { padding: 32px; background: rgba(255,255,255,.96); border: 1px solid #dce6f3; }
.panel-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 28px; }
.panel-tag { display: inline-flex; padding: 6px 12px; border-radius: 999px; font-size: 12px; color: #2b5ca8; background: #edf4ff; border: 1px solid #d4e3fb; }
.panel-link { text-decoration: none; color: #5d7699; }
.login-form { display: grid; gap: 18px; }
.form-item { display: grid; gap: 8px; color: #1f3145; font-weight: 600; }
.form-item input { height: 48px; border-radius: 14px; border: 1px solid #d7e2ef; background: #f8fbff; padding: 0 14px; }
.form-item input:focus { outline: none; border-color: #2f80ff; box-shadow: 0 0 0 3px rgba(47,128,255,.12); }
.submit-btn { height: 50px; border: none; border-radius: 16px; background: #173c83; color: #fff; font-weight: 800; cursor: pointer; }
.error-box { margin-top: 16px; padding: 12px 14px; border-radius: 14px; background: #fff1f1; border: 1px solid #ffd5d5; color: #b94a48; }
.panel-note { margin-top: 20px; color: #6f839a; line-height: 1.8; font-size: 13px; }
@media (max-width: 960px) { .login-shell { grid-template-columns: 1fr; } }
</style>
