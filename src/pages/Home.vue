<template>
  <section class="section info-section">
    <div class="info-card">
      <h2>Application Info</h2>

      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">App Version:</span> <span class="info-value">
            {{ appVersion }}
          </span>
        </div>

        <div class="info-item">
          <span class="info-label">Electron Version:</span> <span class="info-value">
            {{ versions.electron }}
          </span>
        </div>

        <div class="info-item">
          <span class="info-label">Chrome Version:</span> <span class="info-value">
            {{ versions.chrome }}
          </span>
        </div>

        <div class="info-item">
          <span class="info-label">Node Version:</span> <span class="info-value">
            {{ versions.node }}
          </span>
        </div>
      </div>
    </div>

    <div class="info-card">
      <h2>System Info</h2>

      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">Platform:</span> <span class="info-value">
            {{ systemInfo.platform }}
          </span>
        </div>

        <div class="info-item">
          <span class="info-label">Architecture:</span> <span class="info-value">
            {{ systemInfo.arch }}
          </span>
        </div>

        <div class="info-item">
          <span class="info-label">OS Version:</span> <span class="info-value">
            {{ systemInfo.version }}
          </span>
        </div>

        <div class="info-item">
          <span class="info-label">Hostname:</span> <span class="info-value">
            {{ systemInfo.hostname }}
          </span>
        </div>
      </div>
    </div>

    <div class="info-card">
      <h2>Technology Stack</h2>

      <div class="tech-icons">
        <a href="https://www.electronjs.org" target="_blank" class="tech-icon-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg"
            alt="Electron" class="tech-icon" />
          <span>Electron</span>
        </a>

        <a href="https://www.typescriptlang.org" target="_blank" class="tech-icon-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
            alt="TypeScript" class="tech-icon" />
          <span>TypeScript</span>
        </a>

        <a href="https://vuejs.org" target="_blank" class="tech-icon-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" alt="Vue"
            class="tech-icon" />
          <span>Vue</span>
        </a>

        <a href="https://tailwindcss.com" target="_blank" class="tech-icon-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
            alt="TailwindCSS" class="tech-icon" />
          <span>TailwindCSS</span>
        </a>

        <a href="https://vite.dev" target="_blank" class="tech-icon-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" alt="Vite"
            class="tech-icon" />
          <span>Vite</span>
        </a>

        <a href="https://vitest.dev" target="_blank" class="tech-icon-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg" alt="Vitest"
            class="tech-icon" />
          <span>Vitest</span>
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
@reference 'tailwindcss';

.section {
  @apply grid gap-6;

  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  .info-card {
    @apply border rounded-lg p-6 transition-shadow duration-300 border-(--border-color) bg-(--card-bg);

    &:hover {
      @apply [box-shadow:var(--card-shadow)];
    }

    h2 {
      @apply m-0 mb-4 text-xl text-(--text-primary);
    }

    .info-grid {
      @apply grid grid-cols-2 gap-4;

      .info-item {
        @apply flex flex-col gap-0.5;

        .info-label {
          @apply text-sm font-medium text-(--text-secondary);
        }

        .info-value {
          @apply font-mono text-sm text-(--text-primary);
        }
      }
    }
  }

  .tech-icons {
    @apply grid gap-4;

    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));

    .tech-icon-item {
      @apply flex flex-col items-center gap-2 no-underline transition-all duration-300 p-2 rounded text-(--text-secondary);

      &:hover {
        @apply text-(--primary-color) -translate-y-0.5;
      }
    }
  }
}

.tech-icon {
  @apply w-12 h-12;
}

.tech-icon-item span {
  @apply text-xs text-center;
}
</style>
