/// <reference types="vite/client" />
/// <reference types="vue" />
/// <reference types="@vitejs/plugin-vue" />

import type { ElectronAPI } from '@preload/preload';

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
