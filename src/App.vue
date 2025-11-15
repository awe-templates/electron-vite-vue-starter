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
@reference 'tailwindcss';

.app {
  @apply flex flex-col h-screen;
}

.header {
  @apply flex items-center justify-between px-4 py-4 border-b border-(--border-color) bg-(--header-bg);

  .title {
    @apply text-2xl font-bold m-0 text-(--text-primary);
  }

  .nav {
    @apply flex gap-6 flex-1 justify-center;

    a {
      @apply text-base no-underline font-medium transition-colors duration-300 py-2 px-0 border-b-2 border-transparent text-(--text-secondary);

      &:hover {
        @apply text-(--text-primary);
      }

      &.active {
        @apply text-(--primary-color) border-b-(--primary-color);
      }
    }
  }

  .theme-toggle {
    @apply bg-none border-none cursor-pointer p-2 flex items-center justify-center transition-colors duration-300 text-(--text-secondary);

    &:hover {
      @apply text-(--text-primary);
    }

    .icon {
      @apply w-6 h-6;
    }
  }
}

.main {
  @apply flex-1 overflow-y-auto px-8 py-8 bg-(--bg-primary);
}
</style>
