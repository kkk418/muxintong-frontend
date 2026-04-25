<template>
  <div class="app-layout">
    <SideMenu :role="role" />
    <div class="main-area">
      <TopHeader :role="role" />
      <div class="content-area">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SideMenu from '@/components/SideMenu.vue'
import TopHeader from '@/components/TopHeader.vue'

const route = useRoute()
const role = computed(() => route.meta.role || 'business')
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f4f8ff;
}

.main-area {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.content-area {
  flex: 1;
  min-height: 0;
}
</style>
