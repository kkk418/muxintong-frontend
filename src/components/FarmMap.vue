<template>
  <div class="farm-map">
    <div class="map-left">
      <div class="map-grid">
        <div
          v-for="zone in zones"
          :key="zone.name"
          class="zone"
          :class="[zone.level, { active: activeZone.name === zone.name }]"
          @click="selectZone(zone)"
        >
          <div class="zone-name">{{ zone.name }}</div>
          <div class="zone-count">{{ zone.count }} 头</div>
          <div class="zone-status">{{ zone.status }}</div>
        </div>
      </div>
    </div>

    <div class="map-right">
      <div class="detail-title">区域详情</div>

      <div class="detail-card">
        <div class="detail-row">
          <span>区域名称</span>
          <span class="value">{{ activeZone.name }}</span>
        </div>

        <div class="detail-row">
          <span>牲畜数量</span>
          <span class="value">{{ activeZone.count }} 头</span>
        </div>

        <div class="detail-row">
          <span>已确权资产</span>
          <span class="value">{{ activeZone.confirmed }} 头</span>
        </div>

        <div class="detail-row">
          <span>可融资资产</span>
          <span class="value">{{ activeZone.financeable }} 头</span>
        </div>

        <div class="detail-row">
          <span>健康状态</span>
          <span class="value">{{ activeZone.status }}</span>
        </div>

        <div class="detail-row">
          <span>风险等级</span>
          <span class="value" :class="activeZone.level">
            {{ activeZone.risk }}
          </span>
        </div>
      </div>

      <div class="detail-tip">
        {{ activeZone.tip }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const zones = [
  {
    name: '育肥1舍',
    count: 126,
    confirmed: 118,
    financeable: 82,
    status: '正常',
    risk: '低风险',
    level: 'safe',
    tip: '当前区域状态稳定，可继续推进确权和融资流程。'
  },
  {
    name: '育肥2舍',
    count: 104,
    confirmed: 96,
    financeable: 65,
    status: '体温波动',
    risk: '中风险',
    level: 'warn',
    tip: '检测到体温异常数量上升，建议优先核查该区域健康数据。'
  },
  {
    name: '繁育区',
    count: 88,
    confirmed: 72,
    financeable: 50,
    status: '正常',
    risk: '低风险',
    level: 'safe',
    tip: '繁育区整体状态良好，适合纳入持续监管。'
  },
  {
    name: '隔离区',
    count: 18,
    confirmed: 10,
    financeable: 0,
    status: '重点观察',
    risk: '高风险',
    level: 'danger',
    tip: '隔离区存在异常个体，建议暂停相关融资资格评估。'
  },
  {
    name: 'IoT监测区',
    count: 65,
    confirmed: 61,
    financeable: 40,
    status: '设备在线',
    risk: '低风险',
    level: 'safe',
    tip: 'IoT设备运行正常，数据同步稳定。'
  }
]

const activeZone = ref(zones[0])

function selectZone(zone) {
  activeZone.value = zone
}
</script>

<style scoped>
.farm-map {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 20px;
}

.map-left {
  background: #ffffff;
  border: 1px solid #c8d9f6;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 6px 18px rgba(31,78,163,0.05);
  box-shadow: 0 6px 18px rgba(31,78,163,0.05);
}

.map-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 120px;
  gap: 16px;
}

.zone {
  border: 1px solid #c8d9f6;
  background: #ffffff;
  padding: 14px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.2s;
}

.zone:hover {
  background: #eef5ff;
}

.zone.active {
  border: 2px solid #2f80ff;
}

.zone-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.zone-count {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}

.zone-status {
  font-size: 14px;
  color: #355b8c;
}

.map-right {
  background: #ffffff;
  border: 1px solid #c8d9f6;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 6px 18px rgba(31,78,163,0.05);
}

.detail-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
}

.detail-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border: 1px solid #c8d9f6;
  padding: 12px 14px;
}

.value {
  font-weight: bold;
}

.detail-tip {
  background: #ffffff;
  border: 1px solid #c8d9f6;
  padding: 14px;
  line-height: 1.8;
  color: #16325c;
}

.safe {
  color: #2f80ff;
}

.warn {
  color: #ffd166;
}

.danger {
  color: #ff7b7b;
}
</style>