/// <reference types="vite/client" />
/// <reference types="vue" />

import type { ElectronAPI } from '@preload/preload';

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
