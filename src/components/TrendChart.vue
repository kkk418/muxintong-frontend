<template>
  <div ref="chartRef" class="chart-box"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const chartRef = ref(null)

onMounted(() => {
  const chart = echarts.init(chartRef.value)

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '3%',
      top: '10%',
      bottom: '8%',
      containLabel: true
    },
    legend: {
      top: 0,
      textStyle: {
        color: '#16325c'
      },
      data: ['存栏', '出栏']
    },
    xAxis: {
      type: 'category',
      data: ['19:20', '19:23', '19:24', '19:35', '19:39', '19:42', '19:45', '19:51', '19:55', '20:10'],
      axisLine: {
        lineStyle: {
          color: 'rgba(15,61,145,0.18)'
        }
      },
      axisLabel: {
        color: '#5f7aa3'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(15,61,145,0.08)'
        }
      },
      axisLabel: {
        color: '#5f7aa3'
      }
    },
    series: [
      {
        name: '存栏',
        type: 'bar',
        barWidth: 18,
        data: [6200, 4800, 6500, 9100, 5300, 4700, 5000, 7100, 4000, 6200],
        itemStyle: {
          color: '#2f80ff',
          borderRadius: [6, 6, 0, 0]
        }
      },
      {
        name: '出栏',
        type: 'line',
        smooth: true,
        data: [2800, 3600, 4200, 5800, 4700, 5400, 5000, 6900, 4100, 6100],
        itemStyle: {
          color: '#7aa8ff'
        },
        lineStyle: {
          width: 3,
          color: '#7aa8ff'
        },
        areaStyle: {
          color: 'rgba(47,128,255,0.12)'
        }
      }
    ]
  }

  chart.setOption(option)

  window.addEventListener('resize', () => {
    chart.resize()
  })
})
</script>

<style scoped>
.chart-box {
  width: 100%;
  height: 380px;
}
</style>