import { defineStore } from 'pinia'

const STORAGE_KEY = 'muxintong-auth'

const demoUsers = {
  business: {
    username: 'biz_admin',
    password: '123456',
    role: 'business',
    name: '张楚岚',
    org: '华牧产业运营中心',
    title: '业务平台主管',
  },
  auditor: {
    username: 'audit_lead',
    password: '123456',
    role: 'auditor',
    name: '王敏',
    org: '链上牧审审计中心',
    title: '审计项目经理',
  },
}

function readPersisted() {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function persist(data) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function clearPersisted() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    session: readPersisted(),
    loginError: '',
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.session),
    currentRole: (state) => state.session?.role || '',
    currentUser: (state) => state.session || null,
  },
  actions: {
    login({ username, password, role }) {
      const account = demoUsers[role]
      if (!account || account.username !== username || account.password !== password) {
        this.loginError = '账号或密码不正确'
        return false
      }
      this.session = {
        role: account.role,
        name: account.name,
        org: account.org,
        title: account.title,
        username: account.username,
        loginAt: new Date().toISOString(),
      }
      this.loginError = ''
      persist(this.session)
      return true
    },
    logout() {
      this.session = null
      this.loginError = ''
      clearPersisted()
    },
    hydrate() {
      this.session = readPersisted()
    },
  },
})
