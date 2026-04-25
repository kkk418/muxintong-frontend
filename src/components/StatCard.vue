<template>
  <div class="card">
    <div class="card-title">{{ title }}</div>
    <div class="card-value" :class="statusClass">{{ formattedValue }}</div>
    <div class="card-desc">{{ desc }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ title:String, value:[String,Number], desc:String, type:String })
const formattedValue = computed(() => props.type === 'money' ? '¥ ' + props.value : props.type === 'percent' ? props.value + '%' : props.value)
const statusClass = computed(() => { if (props.type === 'percent') { if (props.value >= 90) return 'good'; if (props.value >= 70) return 'warn'; return 'bad' } return '' })
</script>

<style scoped>
.card {flex:1;background:#fff;border:1px solid #c8d9f6;padding:20px;box-sizing:border-box;box-shadow:0 6px 18px rgba(31,78,163,0.05);}
.card-title {font-size:14px;color:#5f7aa3;margin-bottom:10px;}
.card-value {font-size:28px;font-weight:800;margin-bottom:6px;color:#1d6fff;}
.good {color:#1d6fff;}
.warn {color:#f5a623;}
.bad {color:#e5484d;}
.card-desc {font-size:13px;color:#6f8fb8;}
</style>