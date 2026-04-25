<template>
  <div class="farmer-login-page">
    <div class="bg-grid"></div>
    <div class="bg-glow glow-1"></div>
    <div class="bg-glow glow-2"></div>
    <div class="scan-line"></div>

    <header class="login-header">
      <img src="../assets/images/logo.png" class="login-logo" alt="牧信通logo" />
    </header>

    <div class="login-wrapper">
      <div class="login-panel">
        <div class="panel-tag">链上牧审 · 农户登录入口</div>

        <h1>农户登录</h1>
        <p class="sub-title">欢迎进入链上牧审养殖服务系统</p>

        <form class="login-form" @submit.prevent="handleLogin">
          <div class="form-item">
            <label>手机号</label>
            <input
              v-model="phone"
              type="text"
              placeholder="请输入手机号"
            />
          </div>

          <div class="form-item">
            <label>密码</label>
            <input
              v-model="password"
              type="password"
              placeholder="请输入密码"
            />
          </div>

          <button type="submit" class="login-btn">登录系统</button>
        </form>

        <div class="extra-tip">
          可用于农户登录、合作社登录或试点演示登录
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const phone = ref('')
const password = ref('')

function handleLogin() {
  router.push('/dashboard')
}
</script>

<style scoped>
.farmer-login-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(180deg, #eaf3ff 0%, #f4f8ff 100%);
  color: #16325c;
}

.bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(47, 128, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(47, 128, 255, 0.08) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
}

.bg-glow {
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.18;
  pointer-events: none;
}

.glow-1 {
  width: 240px;
  height: 240px;
  background: #2f80ff;
  top: 80px;
  left: -60px;
}

.glow-2 {
  width: 260px;
  height: 260px;
  background: #1d6fff;
  right: -80px;
  bottom: 40px;
}

.scan-line {
  position: fixed;
  left: 0;
  right: 0;
  top: -10%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(57, 255, 210, 0.7), transparent);
  animation: scanMove 4s linear infinite;
  pointer-events: none;
}

.login-header {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 2;
}

.login-logo {
  width: 160px;
  max-width: 100%;
  max-height: 48px;
  height: auto;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 6px 16px rgba(31, 78, 163, 0.14));
}

.login-wrapper {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}

.login-panel {
  width: 100%;
  max-width: 460px;
  background: #ffffff;
  border: 1px solid #c8d9f6;
  box-shadow:
    0 0 18px rgba(47, 128, 255, 0.08),
    inset 0 0 0 1px rgba(47, 128, 255, 0.05);
  padding: 36px 32px 30px;
  box-sizing: border-box;
}

.panel-tag {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 18px;
  background: rgba(47, 128, 255, 0.08);
  border: 1px solid rgba(47, 128, 255, 0.18);
  color: #2f80ff;
  font-size: 12px;
  letter-spacing: 1px;
}

h1 {
  margin: 0 0 10px;
  font-size: 42px;
  line-height: 1.1;
  font-weight: 800;
  color: #16325c;
}

.sub-title {
  margin: 0 0 28px;
  color: #567399;
  font-size: 15px;
  line-height: 1.8;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-item label {
  font-size: 14px;
  color: #16325c;
  font-weight: 600;
}

.form-item input {
  height: 48px;
  background: #f7fbff;
  border: 1px solid #c8d9f6;
  color: #16325c;
  padding: 0 14px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s;
}

.form-item input::placeholder {
  color: #6f8fb8;
}

.form-item input:focus {
  border-color: #2f80ff;
  box-shadow: 0 0 10px rgba(47, 128, 255, 0.14);
}

.login-btn {
  margin-top: 6px;
  height: 48px;
  border: none;
  background: #1d6fff;
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 0 12px rgba(47, 128, 255, 0.18);
}

.login-btn:hover {
  background: #2f80ff;
}

.extra-tip {
  margin-top: 18px;
  text-align: center;
  color: #6f8fb8;
  font-size: 12px;
  line-height: 1.8;
}

@keyframes scanMove {
  0% {
    top: -10%;
  }
  100% {
    top: 110%;
  }
}

@media (max-width: 768px) {
  .login-header {
    top: 18px;
    left: 18px;
  }

  .login-logo {
    width: 96px;
    max-height: 46px;
  }

  .login-panel {
    padding: 28px 22px 24px;
  }

  h1 {
    font-size: 34px;
  }
}
</style>