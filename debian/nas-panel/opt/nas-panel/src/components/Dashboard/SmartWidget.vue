<template>
  <el-card class="widget-card" shadow="hover">
    <template #header>
      <div class="widget-header">
        <Icon icon="ph:hard-drives" width="18" />
        <span class="widget-title">Monitorowane dyski</span>
        <el-tag :type="overallStatus" size="small" :effect="overallStatus === 'danger' ? 'dark' : 'plain'" round>
          {{ overallStatusText }}
        </el-tag>
      </div>
    </template>
    
    <div v-if="monitoredDisks.length > 0" class="disk-list">
      <div 
        v-for="(disk, index) in monitoredDisks" 
        :key="disk.device" 
        class="disk-item"
      >
        <div class="disk-content">
          <div class="disk-info">
            <Icon :icon="getDiskIcon(disk.device)" width="16" class="disk-icon" />
            <span class="disk-name">{{ formatDiskName(disk.device) }}</span>
            <span class="disk-path">{{ disk.device }}</span>
          </div>
          
          <div class="disk-stats">
            <div class="temperature">
              <Icon icon="mdi:thermometer" width="14" />
              <span>{{ disk.temperature || '--' }}°C</span>
            </div>
            <div class="status" :class="disk.status ? 'ok' : 'error'">
              {{ disk.status ? 'OK' : 'ERR' }}
            </div>
          </div>
        </div>
        <el-divider v-if="index < monitoredDisks.length - 1" />
      </div>
    </div>
    
    <div v-else class="empty-state">
      <Icon icon="ph:info" width="16" />
      <span>Brak dysków objętych monitoringiem</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'SmartWidget',
  displayName: 'Status SMART'
}
</script>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'
import PromisePool from 'es6-promise-pool';

const monitoredDisks = ref([])
const loading = ref(false)
const TEMP_LIMIT = 110
let intervalId = null

const overallStatus = computed(() => {
  return monitoredDisks.value.some(d => !d.status) ? 'danger' : 'success'
})

const overallStatusText = computed(() => {
  const errorCount = monitoredDisks.value.filter(d => !d.status).length
  return errorCount ? `${errorCount} BŁĘDY` : 'WSZYSTKO OK'
})

const getDiskIcon = (device) => {
  return device.includes('nvme') ? 'ph:hard-drive' : 'ph:hard-drives'
}

const formatDiskName = (device) => {
  return device.split('/').pop().toUpperCase()
}

// Dodaj na początku składni setup:
const activeControllers = ref(new Set());

const fetchDeviceDetails = async (device) => {
  const controller = new AbortController();
  activeControllers.value.add(controller);

  try {
    const detailsRes = await axios.get(
      `/api/storage/smart/details/${encodeURIComponent(device)}`, 
      {
        timeout: 5000, // Zwiększony timeout
        signal: controller.signal
      }
    );

    return {
      device,
      status: detailsRes.data.data.smart_status?.passed || false,
      temperature: detailsRes.data.data.temperature?.current || null
    };
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error(`Error fetching ${device} details:`, error);
    }
    return {
      device,
      status: false,
      temperature: null
    };
  } finally {
    activeControllers.value.delete(controller);
  }
};

const abortAllRequests = () => {
  activeControllers.value.forEach(controller => {
    controller.abort();
  });
  activeControllers.value.clear();
};

const fetchData = async () => {
  abortAllRequests();

  try {
    loading.value = true;
    const monitoringRes = await axios.get('/api/storage/smart/monitoring');
    const monitoredDevices = Object.keys(monitoringRes.data.devices)
      .filter(device => monitoringRes.data.devices[device].monitored);

    // Process devices in batches of 2
    const batchSize = 2;
    monitoredDisks.value = [];
    
    for (let i = 0; i < monitoredDevices.length; i += batchSize) {
      const batch = monitoredDevices.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(device => fetchDeviceDetails(device))
      );
      monitoredDisks.value.push(...batchResults);
    }
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error('Error:', error);
    }
    monitoredDisks.value = [];
  } finally {
    loading.value = false;
  }
};

// W onMounted:
let controller = null;

// Metoda do odświeżania danych
const refreshData = async () => {
  await fetchData()
}

// Udostępnienie metody na zewnątrz
defineExpose({
  refreshData
})

onMounted(() => {
  if (intervalId) clearInterval(intervalId);
  
  controller = new AbortController();
  fetchData().finally(() => {
    intervalId = setInterval(fetchData, 15000); // Zwiększony interwał
  });
});

onBeforeUnmount(() => {
  abortAllRequests();
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped lang="scss">
.widget-card {
  border-radius: 8px;
  height: 100%;
  
  :deep(.el-card__header) {
    padding: 12px 16px;
    border-bottom: 1px solid var(--el-border-color-light);
  }
  
  :deep(.el-card__body) {
    padding: 0;
  }
}


.widget-header {
  display: flex;
  align-items: center;
  gap: 10px;
  
  .widget-title {
    font-size: 14px;
    font-weight: 500;
    flex-grow: 1;
  }
  
  .el-tag {
    font-size: 11px;
    font-weight: 500;
    padding: 0 8px;
    height: 20px;
  }
}

.disk-list {
  display: flex;
  flex-direction: column;
}

.disk-item {
  padding: 12px 16px;
}

.disk-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.disk-info {
  display: flex;
  align-items: center;
  gap: 10px;
  
  .disk-icon {
    color: var(--el-text-color-secondary);
  }
  
  .disk-name {
    font-size: 13px;
    font-weight: 500;
    font-family: var(--el-font-family-mono);
  }
  
  .disk-path {
    font-size: 11px;
    color: var(--el-text-color-secondary);
    opacity: 0.7;
  }
}

.disk-stats {
  display: flex;
  align-items: center;
  gap: 16px;
}

.temperature {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
  
  span {
    font-feature-settings: 'tnum';
  }
}

.status {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  
  &.ok {
    color: var(--el-color-success);
    background: var(--el-color-success-light-9);
  }
  
  &.error {
    color: var(--el-color-danger);
    background: var(--el-color-danger-light-9);
  }
}

.empty-state {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
  
  svg {
    opacity: 0.6;
  }
}

:deep(.el-divider) {
  margin: 0;
}
</style>
