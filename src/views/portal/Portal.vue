<template>
  <div class="portal-page">
    <section class="portal-hero">
      <div>
        <div class="hero-tag">平台门户</div>
        <h1>链上牧审平台门户</h1>
        <p>统一承载养殖业务协同与审计核验流程。用户可按岗位进入对应工作台，所有关键状态与证据处理结果均在系统内持续留痕。</p>
      </div>
      <router-link class="back-home" to="/">返回首页</router-link>
    </section>
    <section class="highlight-grid">
      <div class="highlight-card"><div class="highlight-label">平台定位</div><div class="highlight-value">业务与审计双工作台</div><p>同一项目在业务侧与审计侧共享状态口径，减少线下对表和重复录入。</p></div>
      <div class="highlight-card"><div class="highlight-label">核心能力</div><div class="highlight-value">证据、规则、底稿联动</div><p>从活体资产确权到链上证据核验、风险流转和底稿沉淀形成连续闭环。</p></div>
      <div class="highlight-card"><div class="highlight-label">当前状态</div><div class="highlight-value">前后端接口可扩展</div><p>前端已按真实模块拆分，可直接替换为正式鉴权、业务和审计接口。</p></div>
    </section>
    <section class="portal-grid">
      <div class="portal-card">
        <div class="card-type">B端</div><h2>数字牧场工作台</h2>
        <p>面向养殖企业和业务人员，聚焦资产确权、估值、融资进度与日常风险跟踪。</p>
        <ul><li>统一查看场区经营状态与活体资产规模</li><li>管理确权、估值、融资与风险处置流程</li><li>实时接收链上存证与预警结果</li></ul>
        <router-link class="enter-btn" to="/login/business">进入业务工作台</router-link>
      </div>
      <div class="portal-card auditor">
        <div class="card-type">A端</div><h2>审计师工作台</h2>
        <p>面向审计师和内控团队，聚焦远程监盘、证据链核验、底稿编制和规则复核。</p>
        <ul><li>按项目管理监盘、证据、底稿和风险事项</li><li>支撑链上证据、影像证据和估值快照核验</li><li>跟踪合约规则与异常事项处理状态</li></ul>
        <router-link class="enter-btn dark" to="/login/auditor">进入审计工作台</router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.portal-page { min-height: 100vh; padding: 40px 32px; background: linear-gradient(180deg, #edf4ff 0%, #f7faff 100%); color: #16325c; }
.portal-hero { display: flex; justify-content: space-between; gap: 24px; align-items: flex-start; margin-bottom: 24px; }
.hero-tag { display: inline-block; padding: 6px 10px; margin-bottom: 14px; background: #e6f0ff; border: 1px solid #cfe0ff; color: #2f5ea5; font-size: 12px; border-radius: 999px; }
h1 { margin: 0 0 10px; font-size: 44px; font-weight: 800; }
p { margin: 0; color: #5f7aa3; line-height: 1.8; }
.back-home { color: #5f7aa3; text-decoration: none; padding: 10px 14px; border-radius: 999px; border: 1px solid #d9e6fa; background: rgba(255,255,255,.8); }
.highlight-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-bottom: 24px; }
.highlight-card,.portal-card { background: rgba(255,255,255,.92); border: 1px solid #d8e4f5; border-radius: 22px; box-shadow: 0 18px 34px rgba(31,78,163,.08); }
.highlight-card { padding: 24px; }
.highlight-label { color: #6e86a8; font-size: 13px; }
.highlight-value { margin: 8px 0 12px; font-size: 26px; font-weight: 800; color: #16325c; }
.portal-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.portal-card { padding: 28px; }
.portal-card.auditor { border-color: #d7dfe8; box-shadow: 0 12px 28px rgba(24,36,50,.08); }
.card-type { display: inline-block; padding: 6px 10px; background: #edf4ff; border: 1px solid #d8e7ff; color: #2b5ca8; font-size: 12px; margin-bottom: 14px; border-radius: 999px; }
.portal-card.auditor .card-type { background: #eef2f6; border-color: #d7dfe8; color: #304255; }
h2 { margin: 0 0 10px; font-size: 30px; }
ul { margin: 18px 0 24px; padding-left: 18px; color: #39557f; line-height: 1.9; }
.enter-btn { display: inline-block; padding: 12px 18px; background: #2f80ff; color: #fff; text-decoration: none; font-weight: 700; border-radius: 14px; }
.enter-btn.dark { background: #24364d; }
@media (max-width: 960px) { .highlight-grid,.portal-grid { grid-template-columns: 1fr; } }
</style>
