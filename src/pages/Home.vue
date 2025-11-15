<template>
  <section class="section info-section">
    <div class="info-card">
      <h2>Application Info</h2>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">App Version:</span>
          <span class="info-value">{{ appVersion }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Electron Version:</span>
          <span class="info-value">{{ versions.electron }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Chrome Version:</span>
          <span class="info-value">{{ versions.chrome }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Node Version:</span>
          <span class="info-value">{{ versions.node }}</span>
        </div>
      </div>
    </div>

    <div class="info-card">
      <h2>System Info</h2>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">Platform:</span>
          <span class="info-value">{{ systemInfo.platform }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Architecture:</span>
          <span class="info-value">{{ systemInfo.arch }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">OS Version:</span>
          <span class="info-value">{{ systemInfo.version }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Hostname:</span>
          <span class="info-value">{{ systemInfo.hostname }}</span>
        </div>
      </div>
    </div>

    <div class="info-card">
      <h2>Technology Stack</h2>
      <div class="tech-icons">
        <a href="https://www.electronjs.org" target="_blank" class="tech-icon-item">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg"
            alt="Electron"
            class="tech-icon"
          />
          <span>Electron</span>
        </a>
        <a href="https://vuejs.org" target="_blank" class="tech-icon-item">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg"
            alt="Vue"
            class="tech-icon"
          />
          <span>Vue 3</span>
        </a>
        <a href="https://www.typescriptlang.org" target="_blank" class="tech-icon-item">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
            alt="TypeScript"
            class="tech-icon"
          />
          <span>TypeScript</span>
        </a>
        <a href="https://vite.dev" target="_blank" class="tech-icon-item">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg"
            alt="Vite"
            class="tech-icon"
          />
          <span>Vite</span>
        </a>
        <a href="https://vitest.dev" target="_blank" class="tech-icon-item">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg"
            alt="Vitest"
            class="tech-icon"
          />
          <span>Vitest</span>
        </a>
        <a href="https://router.vuejs.org" target="_blank" class="tech-icon-item">
          <img
            src="https://router.vuejs.org/logo.svg"
            alt="Vue Router"
            class="tech-icon"
          />
          <span>Vue Router</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Versions {
  electron: string;
  chrome: string;
  node: string;
}

interface SystemInfo {
  platform: string;
  arch: string;
  version: string;
  hostname: string;
}

const appVersion = ref('Loading...');
const versions = ref<Versions>({
  electron: 'Loading...',
  chrome: 'Loading...',
  node: 'Loading...',
});
const systemInfo = ref<SystemInfo>({
  platform: 'Loading...',
  arch: 'Loading...',
  version: 'Loading...',
  hostname: 'Loading...',
});

const loadMetadata = async () => {
  try {
    // Get app version
    const version = await window.electronAPI.api.getAppVersion();
    appVersion.value = version;

    // Get process versions
    const versionInfo = await window.electronAPI.api.getVersions();
    versions.value = versionInfo;

    // Get system info
    const info = await window.electronAPI.api.getSystemInfo();
    systemInfo.value = info;
  } catch (error) {
    console.error('Failed to load metadata:', error);
  }
};

onMounted(() => {
  loadMetadata();
});
</script>

<style scoped>
.section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: box-shadow 0.3s ease;
}

.info-card:hover {
  box-shadow: var(--card-shadow);
}

.info-card h2 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
  font-size: 1.25rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

.info-value {
  color: var(--text-primary);
  font-family: monospace;
  font-size: 0.95rem;
}

.tech-icons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1rem;
}

.tech-icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--text-secondary);
  transition: color 0.3s ease, transform 0.3s ease;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.tech-icon-item:hover {
  color: var(--primary-color);
  transform: translateY(-2px);
}

.tech-icon {
  width: 3rem;
  height: 3rem;
}

.tech-icon-item span {
  font-size: 0.75rem;
  text-align: center;
}
</style>
