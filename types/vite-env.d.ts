/// <reference types="vite/client" />

import type { ElectronAPI } from '@preload/preload';

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
