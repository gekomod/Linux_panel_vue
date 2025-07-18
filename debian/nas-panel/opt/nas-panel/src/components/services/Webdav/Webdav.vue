<template>
  <div class="webdav-container">
    <!-- Główna karta statusu -->
    <el-card shadow="hover" class="status-card">
      <template #header>
        <div class="card-header">
          <el-icon size="24" class="webdav-icon">
            <Icon icon="mdi:web" />
          </el-icon>
          <span>WebDAV Service</span>
        </div>
      </template>

      <div v-if="loading" class="loading-spinner">
        <el-icon :size="32" class="is-loading">
          <Icon icon="mdi:loading" />
        </el-icon>
      </div>

      <div v-else class="status-content">
        <!-- Informacje o statusie -->
        <el-descriptions :column="1" border>
          <el-descriptions-item :label="$t('webdav.status')">
            <el-tag :type="statusClass">
              <el-icon :size="16">
                <Icon :icon="statusIcon" />
              </el-icon>
              {{ statusText }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item :label="$t('webdav.version')">
            {{ status.version || 'unknown' }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('webdav.port')">
            {{ config.port }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('webdav.protocol')">
            {{ config.protocol.toUpperCase() }}
          </el-descriptions-item>
        </el-descriptions>

        <!-- Przyciski akcji -->
        <div class="action-buttons">
          <el-button 
            v-if="!serviceStatus"
            type="success"
            @click="toggleService"
            :loading="serviceLoading"
            plain
            round
          >
            <template #icon>
              <el-icon>
                <Icon icon="mdi:play" />
              </el-icon>
            </template>
            {{ $t('webdav.start_service') }}
          </el-button>
          <el-button 
            v-else
            type="danger"
            @click="toggleService"
            :loading="serviceLoading"
            plain
            round
          >
            <template #icon>
              <el-icon>
                <Icon icon="mdi:stop" />
              </el-icon>
            </template>
            {{ $t('webdav.stop_service') }}
          </el-button>
          <el-button
            type="warning"
            @click="restartService"
            :loading="serviceLoading"
            plain
            round
          >
            <template #icon>
              <el-icon>
                <Icon icon="mdi:restart" />
              </el-icon>
            </template>
            {{ $t('webdav.restart_service') }}
          </el-button>
        </div>
      </div>
    </el-card>

    <!-- Karty konfiguracyjne -->
    <el-tabs v-model="activeTab" class="config-tabs">
      <el-tab-pane :label="$t('webdav.basic_config')" name="basic">
        <el-card shadow="hover" class="config-card">
          <div class="config-section">
            <el-switch
              v-model="config.enabled"
              :active-text="$t('webdav.enable_service')"
              inline-prompt
              active-color="#13ce66"
            />
          </div>

          <div class="config-section">
            <el-form label-position="top">
              <el-form-item :label="$t('webdav.port')">
                <el-input-number 
                  v-model="config.port"
                  :min="1"
                  :max="65535"
                  controls-position="right"
                />
              </el-form-item>

              <el-form-item :label="$t('webdav.protocol')">
                <el-radio-group v-model="config.protocol">
                  <el-radio-button value="http">HTTP</el-radio-button>
                  <el-radio-button value="https">HTTPS</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane :label="$t('webdav.nfs_versions')" name="nfs">
        <el-card shadow="hover" class="config-card">
          <div class="nfs-versions">
            <el-checkbox-group v-model="selectedNfsVersions">
              <el-checkbox value="v2">NFSv2</el-checkbox>
              <el-checkbox value="v3">NFSv3</el-checkbox>
              <el-checkbox value="v4">NFSv4</el-checkbox>
              <el-checkbox value="v4_1">NFSv4.1</el-checkbox>
              <el-checkbox value="v4_2">NFSv4.2</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-card>
      </el-tab-pane>

  <el-tab-pane :label="$t('webdav.disk_selection')" name="disks">
    <el-card shadow="hover" class="config-card">
      <div class="disk-list">
        <el-table :data="availableDisks" style="width: 100%">
          <el-table-column prop="name" :label="$t('webdav.disk_name')" />
          <el-table-column prop="path" :label="$t('webdav.mount_point')" />
          <el-table-column prop="size" :label="$t('webdav.size')" />
          <el-table-column prop="fsType" :label="$t('webdav.fs_type')" />
          <el-table-column :label="$t('webdav.shared')" width="120">
            <template #default="scope">
             <el-tooltip :content="$t('webdav.toggle_disk_share')" placement="top">
              <el-switch
                v-model="scope.row.shared"
                @change="toggleDiskShare(scope.row)"
              />
             </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column :label="$t('webdav.actions')" width="120">
            <template #default="scope">
             <el-tooltip :content="$t('webdav.browse')" placement="top">
              <el-button 
                size="small" 
                @click="openDirectoryBrowser(scope.row)"
                circle
              >
                <Icon icon="mdi:magnify" />
              </el-button>
             </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </el-tab-pane>

      <el-tab-pane :label="$t('webdav.advanced_settings')" name="advanced">
        <el-card shadow="hover" class="config-card">
          <div class="advanced-settings">
            <el-form label-position="top">
              <el-form-item :label="$t('webdav.allow_anonymous')">
                <el-switch
                  v-model="config.allowAnonymous"
                  inline-prompt
                  :active-text="$t('webdav.yes')"
                  :inactive-text="$t('webdav.no')"
                />
              </el-form-item>

              <el-form-item :label="$t('webdav.read_only')">
                <el-switch
                  v-model="config.readOnly"
                  inline-prompt
                  :active-text="$t('webdav.yes')"
                  :inactive-text="$t('webdav.no')"
                />
              </el-form-item>

              <el-form-item :label="$t('webdav.max_connections')">
                <el-input-number 
                  v-model="config.maxConnections"
                  :min="1"
                  controls-position="right"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <!-- Przyciski akcji konfiguracji -->
    <div class="config-actions">
      <el-button 
        type="primary" 
        @click="saveConfig"
        :loading="saving"
        round
      >
        <Icon icon="mdi:content-save" />
        {{ $t('webdav.save_config') }}
      </el-button>

      <el-button 
        @click="resetConfig"
        :loading="resetting"
        round
      >
        <Icon icon="mdi:backup-restore" />
        {{ $t('webdav.reset') }}
      </el-button>
    </div>

    <!-- Informacje o połączeniu -->
    <el-card shadow="hover" class="connection-card">
      <template #header>
        <div class="card-header">
          <Icon icon="mdi:connection" />
          <span>{{ $t('webdav.connection_info') }}</span>
        </div>
      </template>

      <div class="connection-info">
        <el-descriptions :column="1">
          <el-descriptions-item :label="$t('webdav.server_address')">
            <el-tag>{{ serverAddress }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item :label="$t('webdav.connection_url')">
            <el-tag type="info">
              {{ connectionUrl }}
              <el-icon class="copy-icon" @click="copyToClipboard(connectionUrl)">
                <Icon icon="mdi:content-copy" />
              </el-icon>
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
  </div>
  
  <el-dialog 
    v-model="directoryDialogVisible" 
    :title="$t('webdav.select_directory')"
    width="60%"
  >
  <el-tree
    :data="directoryTree"
    :props="treeProps"
    :load="loadDirectories"
    lazy
    show-checkbox
    node-key="path"
    @check="handleDirectorySelect"
  >
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <Icon :icon="node.isLeaf ? 'mdi:folder-outline' : 'mdi:folder-open-outline'" />
        <span style="margin-left: 6px">{{ node.label }}</span>
      </span>
    </template>
  </el-tree>
    
    <template #footer>
      <el-button @click="directoryDialogVisible = false">
        {{ $t('webdav.cancel') }}
      </el-button>
      <el-button 
        type="primary" 
        @click="confirmDirectorySelection"
      >
        {{ $t('webdav.confirm') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElNotification, ElMessage } from 'element-plus'
import { Icon } from '@iconify/vue'
import axios from 'axios'

// Import tłumaczeń
import enLocales from './locales/en'
import plLocales from './locales/pl'

const { t, mergeLocaleMessage } = useI18n()

// Dodaj tłumaczenia do i18n
mergeLocaleMessage('en', enLocales)
mergeLocaleMessage('pl', plLocales)

// Dane usługi
const serviceStatus = ref(false)
const availableDisks = ref([])
const selectedDisks = ref([])
const selectedNfsVersions = ref(['v3', 'v4'])
const loading = ref(true)
const serviceLoading = ref(false)
const saving = ref(false)
const resetting = ref(false)
const activeTab = ref('basic')

// Nowe zmienne dla przeglądania katalogów
const directoryDialogVisible = ref(false);
const directoryTree = ref([]);
const currentDisk = ref(null);
const selectedDirectories = ref([]);
const treeProps = ref({
  label: 'name',
  children: 'children',
  isLeaf: 'isLeaf',
  disabled: 'disabled'
});

const status = ref({
  installed: false,
  version: 'unknown',
  running: false,
  active: false
})

// Konfiguracja
const config = ref({
  enabled: false,
  port: 8080,
  protocol: 'http',
  allowAnonymous: false,
  readOnly: false,
  maxConnections: 50,
  shares: [],
  auth: {
    enabled: true,
    users: []
  },
  nfs: {
    enabled: false,
    versions: ['v3', 'v4']
  }
})

// Status usługi
const statusClass = computed(() => {
  return status.value.running ? 'success' : 'danger'
})

const statusIcon = computed(() => {
  return status.value.running ? 'mdi:check-circle' : 'mdi:alert-circle'
})

const statusText = computed(() => {
  return status.value.running ? t('webdav.running') : t('webdav.stopped')
})

// Adres serwera i URL
const serverAddress = window.location.hostname
const connectionUrl = computed(() => {
  return `${config.value.protocol}://${serverAddress}:${config.value.port}`
})

// Funkcje pomocnicze
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  ElMessage.success(t('webdav.copied_to_clipboard'))
}

// Funkcje zarządzania usługą
const toggleService = async () => {
  try {
    serviceLoading.value = true
    const action = status.value.running ? 'stop' : 'start'
    const response = await axios.post('/services/webdav/toggle', { action })
    
    if (response.data.success) {
      await fetchStatus()
      ElNotification.success({
        title: t('webdav.success'),
        message: response.data.message
      })
    }
  } catch (error) {
    ElNotification.error({
      title: t('webdav.error'),
      message: error.response?.data?.error || t('webdav.service_toggle_error')
    })
  } finally {
    serviceLoading.value = false
  }
}

const restartService = async () => {
  try {
    serviceLoading.value = true
    const response = await axios.post('/services/webdav/toggle', { action: 'restart' })
    
    if (response.data.success) {
      await fetchStatus()
      ElNotification.success({
        title: t('webdav.success'),
        message: response.data.message
      })
    }
  } catch (error) {
    ElNotification.error({
      title: t('webdav.error'),
      message: error.response?.data?.error || t('webdav.service_restart_error')
    })
  } finally {
    serviceLoading.value = false
  }
}

const saveConfig = async () => {
  try {
    saving.value = true
    // Przygotuj pełną konfigurację do wysłania
    const fullConfig = {
      ...config.value,
      nfs: {
        enabled: selectedNfsVersions.value.length > 0,
        versions: selectedNfsVersions.value
      }
    }
    
    const response = await axios.post('/services/webdav/config', { config: fullConfig })
    
    if (response.data.success) {
      ElNotification.success({
        title: t('webdav.success'),
        message: response.data.message
      })
      await fetchConfig() // Odśwież konfigurację po zapisie
    }
  } catch (error) {
    ElNotification.error({
      title: t('webdav.error'),
      message: error.response?.data?.error || t('webdav.config_save_error')
    })
  } finally {
    saving.value = false
  }
}

const resetConfig = async () => {
  try {
    resetting.value = true
    await fetchConfig(true) // Wymuś pobranie domyślnej konfiguracji
    ElNotification.success({
      title: t('webdav.success'),
      message: t('webdav.config_reset')
    })
  } catch (error) {
    ElNotification.error({
      title: t('webdav.error'),
      message: t('webdav.config_reset_error')
    })
  } finally {
    resetting.value = false
  }
}

const fetchStatus = async () => {
  try {
    loading.value = true
    const response = await axios.get('/services/webdav/status')
    status.value = response.data
    serviceStatus.value = response.data.running
  } catch (error) {
    ElNotification.error({
      title: t('webdav.error'),
      message: t('webdav.status_fetch_error')
    })
  } finally {
    loading.value = false
  }
}

const fetchConfig = async (forceDefault = false) => {
  try {
    loading.value = true
    const response = await axios.get('/services/webdav/config')
    
    if (response.data.success) {
      config.value = response.data.config
      selectedNfsVersions.value = response.data.config.nfs?.versions || ['v3', 'v4']
      
      // Pobierz listę dysków jeśli konfiguracja została załadowana
      await fetchAvailableDisks()
    }
  } catch (error) {
    ElNotification.error({
      title: t('webdav.error'),
      message: t('webdav.config_fetch_error')
    })
  } finally {
    loading.value = false
  }
}

const fetchAvailableDisks = async () => {
  try {
    loading.value = true;
    const response = await axios.get('/services/webdav/available-disks');
    
    if (response.data.success) {
      availableDisks.value = response.data.data.map(disk => ({
        name: disk.name,
        path: disk.mountpoint,
        size: formatSize(disk.size),
        fsType: disk.fstype || 'unknown',
        model: disk.model,
        isSystem: disk.isSystem,
        shared: config.value.shares?.some(share => share.path === disk.mountpoint) || false
      }));
      
      if (availableDisks.value.length === 0) {
        ElNotification.warning({
          title: t('webdav.warning'),
          message: t('webdav.no_disks_found'),
          duration: 5000
        });
      }
    } else {
      throw new Error(response.data.error || 'No disks available');
    }
  } catch (error) {
    console.error('Error fetching disks:', error);
    ElNotification.error({
      title: t('webdav.error'),
      message: t('webdav.disk_fetch_error'),
      duration: 5000
    });
  } finally {
    loading.value = false;
  }
};

const toggleDiskShare = (disk) => {
  if (!config.value.shares) {
    config.value.shares = [];
  }

  if (disk.shared) {
    // Dodaj dysk do udostępnionych
    if (!config.value.shares.some(share => share.path === disk.path)) {
      config.value.shares.push({
        path: disk.path,
        alias: disk.name,
        read_only: false,
        auth_required: true
      });
    }
  } else {
    // Usuń dysk z udostępnionych
    config.value.shares = config.value.shares.filter(share => share.path !== disk.path);
    
    // Usuń też wszystkie podkatalogi tego dysku
    if (selectedDirectories.value.length > 0) {
      selectedDirectories.value = selectedDirectories.value.filter(dir => !dir.startsWith(disk.path));
    }
  }
};

//FILESYSTEM Wybór katalogów
const openDirectoryBrowser = (disk) => {
  currentDisk.value = disk;
  directoryTree.value = [{
    name: disk.path,
    path: disk.path,
    isLeaf: false,
    children: []
  }];
  selectedDirectories.value = [];
  directoryDialogVisible.value = true;
};

const loadDirectories = async (node, resolve) => {
  if (node.level === 0) {
    return resolve([{ 
      name: currentDisk.value.path, 
      path: currentDisk.value.path,
      isLeaf: false 
    }]);
  }

  try {
    const response = await axios.post('/api/filesystems/list-directories', {
      path: node.data.path
    });
    
    const directories = response.data.directories.map(dir => ({
      name: dir.name,
      path: dir.path,
      isLeaf: dir.isLeaf
    }));
    
    resolve(directories);
  } catch (error) {
    console.error('Error loading directories:', error);
    resolve([]);
  }
};

const handleDirectorySelect = (data, { checkedKeys }) => {
  selectedDirectories.value = checkedKeys;
};

// Zmodyfikowana funkcja confirmDirectorySelection
const confirmDirectorySelection = () => {
  if (selectedDirectories.value.length > 0) {
    if (!config.value.shares) {
      config.value.shares = [];
    }
    
    selectedDirectories.value.forEach(path => {
      if (!config.value.shares.some(share => share.path === path)) {
        config.value.shares.push({
          path,
          alias: path.split('/').pop(),
          read_only: false,
          auth_required: true
        });
      }
    });
    
    // Oznacz dysk jako udostępniony, jeśli wybrano jego katalog główny
    const rootDiskPaths = availableDisks.value.map(disk => disk.path);
    selectedDirectories.value.forEach(path => {
      if (rootDiskPaths.includes(path)) {
        const disk = availableDisks.value.find(d => d.path === path);
        if (disk) disk.shared = true;
      }
    });
    
    directoryDialogVisible.value = false;
    ElMessage.success(t('webdav.directories_added'));
  } else {
    ElMessage.warning(t('webdav.no_directories_selected'));
  }
};

// Pomocnicza funkcja do formatowania rozmiaru
const formatSize = (bytes) => {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(1))} ${sizes[i]}`;
};

// Inicjalizacja komponentu
onMounted(() => {
  fetchStatus()
  fetchConfig()
})
</script>

<style scoped>
.webdav-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.status-card,
.connection-card,
.config-card {
  border-radius: 12px;
  border: none;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}

.webdav-icon {
  color: var(--el-color-primary);
}

.status-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.config-tabs {
  margin-top: 10px;
}

.config-section {
  margin-bottom: 20px;
}

.config-section:last-child {
  margin-bottom: 0;
}

.nfs-versions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.disk-list {
  margin-top: 10px;
}

.advanced-settings {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.config-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.connection-info {
  padding: 10px;
}

.copy-icon {
  margin-left: 8px;
  cursor: pointer;
}

.copy-icon:hover {
  color: var(--el-color-primary);
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 4px 0;
}

/* Styl dla ikon */
.iconify {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
}

/* Responsywność */
@media (max-width: 768px) {
  .action-buttons,
  .config-actions {
    flex-direction: column;
  }
  
  .action-buttons > *,
  .config-actions > * {
    width: 100%;
  }
}
</style>
