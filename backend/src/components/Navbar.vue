<template>
  <header class="navbar">
    <div class="navbar-left">
      <!-- Logo -->
      <div class="logo-container">
        <img src="@/assets/logo.png" class="logo">
      </div>

      <el-button
        circle
        plain
        @click="toggleSidebar"
        class="toggle-button"
      >
        <el-icon :size="20">
          <Icon 
            :icon="isSidebarCollapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'" 
            class="icon" 
            :class="{ 'rotated': isSidebarCollapsed }" 
          />
        </el-icon>
      </el-button>
      
      <!-- Breadcrumbs -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item 
          v-for="(item, index) in breadcrumbs" 
          :key="index"
        >
          {{ item.meta?.title || item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="navbar-right">
      <el-select 
        v-model="$i18n.locale" 
        style="width: 100px; margin-left: 20px"
      >
        <el-option label="Polski" value="pl" />
        <el-option label="English" value="en" />
      </el-select>

      <!-- Theme Toggle -->
      <el-dropdown trigger="click" @command="handleThemeChange">
        <el-button circle plain>
          <el-icon :size="20">
            <Icon :icon="themeIcon" />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="light" :class="{ 'active': theme === 'light' }">
              <Icon icon="mdi:weather-sunny" /> Dzień
            </el-dropdown-item>
            <el-dropdown-item command="dark" :class="{ 'active': theme === 'dark' }">
              <Icon icon="mdi:weather-night" /> Noc
            </el-dropdown-item>
            <el-dropdown-item command="system" :class="{ 'active': theme === 'system' }">
              <Icon icon="mdi:monitor" /> System
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown>
        <div class="user-panel">
          <el-avatar :size="30" src="/avatar.png" />
          <span class="username">{{ username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="navigateToProfile">Profil</el-dropdown-item>
            <el-dropdown-item @click="navigateToSettings">Ustawienia</el-dropdown-item>
            <el-dropdown-item divided @click="confirmLogout">Wyloguj</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/services/AuthService'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Icon } from '@iconify/vue'
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  theme: {
    type: String,
    default: 'system'
  }
})

const emit = defineEmits(['toggle-sidebar', 'theme-changed']);
const router = useRouter()
const route = useRoute()
const { logout, currentUser } = useAuth()
const isSidebarCollapsed = ref(false)

const themeIcon = computed(() => {
  switch (props.theme) {
    case 'light': return 'mdi:weather-sunny'
    case 'dark': return 'mdi:weather-night'
    default: return 'mdi:monitor'
  }
})

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  return paths.map((path, index) => ({
    name: path,
    to: '/' + paths.slice(0, index + 1).join('/')
  }))
})

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
  localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.value);
  emit('toggle-sidebar');
}

const handleThemeChange = (theme) => {
  emit('theme-changed', theme)
}

const username = computed(() => {
  return currentUser.value?.username || 'Gość'
})

const confirmLogout = async () => {
  try {
    await ElMessageBox.confirm(
      'Czy na pewno chcesz się wylogować?',
      'Potwierdzenie wylogowania',
      {
        confirmButtonText: 'Wyloguj',
        cancelButtonText: 'Anuluj',
        type: 'warning'
      }
    )
    
    await logout()
    router.push('/login')
    
    ElMessage({
      type: 'success',
      message: 'Wylogowano pomyślnie'
    })
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage({
        type: 'error',
        message: 'Błąd podczas wylogowywania'
      })
    }
  }
}

const navigateToProfile = () => {
  router.push('/profile')
}

const navigateToSettings = () => {
  router.push('/settings')
}
</script>

<style scoped>
.navbar {
  height: 60px;
  background: var(--el-bg-color);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo-container {
  height: 100%;
  display: flex;
  align-items: center;
}

.icon {
  transition: transform 0.3s ease;
}

.icon.rotated {
  transform: rotate(0deg);
}

.logo {
  height: 30px;
}

.toggle-button {
  border: none;
  padding: 8px;
}

.user-panel {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background 0.3s;
}

.user-panel:hover {
  background: var(--el-fill-color-light);
}

.username {
  font-weight: 500;
}

.collapse-btn {
  cursor: pointer;
  margin-right: 8px;
}

.collapse-btn:hover {
  color: var(--el-color-primary);
}

.el-breadcrumb {
  margin-left: 10px;
}

.active {
  color: var(--el-color-primary);
}
</style>
