<template>
  <div class="app">
    <header class="header">
      <h1 class="title">Electron Vite Vue</h1>

      <nav class="nav">
        <router-link to="/" :class="{ active: $route.path === '/' }">Home</router-link>
        <router-link to="/about" :class="{ active: $route.path === '/about' }">About</router-link>
      </nav>
      <button class="theme-toggle" aria-label="Toggle theme" @click="toggleTheme">
        <svg v-if="isDark" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
          </path>
        </svg>
        <svg v-else class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      </button>
    </header>

    <main class="main"><router-view /></main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const THEME_KEY = 'preferred-theme';
const isDark = ref(true);

const initTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  isDark.value = savedTheme === 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
};

const toggleTheme = () => {
  const newTheme = isDark.value ? 'light' : 'dark';
  isDark.value = !isDark.value;
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
};

onMounted(() => {
  initTheme();
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--header-bg);
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: var(--text-primary);
}

.nav {
  display: flex;
  gap: 1.5rem;
  flex: 1;
  justify-content: center;
}

.nav a {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
}

.nav a:hover {
  color: var(--text-primary);
}

.nav a.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.theme-toggle:hover {
  color: var(--text-primary);
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}

.main {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background-color: var(--bg-primary);
}
</style>
