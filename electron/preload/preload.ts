import { contextBridge, ipcRenderer } from 'electron';
import { createClient } from '@egoist/tipc/renderer';
import type { AppRouter } from '@shared/ipc';

console.log('[Preload] Script started');

// Create type-safe IPC client
const api = createClient<AppRouter>({
  ipcInvoke: ipcRenderer.invoke.bind(ipcRenderer),
});

console.log('[Preload] API client created:', !!api);

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
// Note: We expose each method individually because Proxy objects cannot be cloned by contextBridge
contextBridge.exposeInMainWorld('electronAPI', {
  // Expose individual API methods
  api: {
    getAppVersion: () => api.getAppVersion(),
    saveData: (input: { key: string; value: unknown }) => api.saveData(input),
    getSystemInfo: () => api.getSystemInfo(),
    getVersions: () => api.getVersions(),
  },

  // Additional platform info
  platform: process.platform,
});

console.log('[Preload] electronAPI exposed to main world');

// Type definitions for renderer process
export type ElectronAPI = {
  api: {
    getAppVersion: () => Promise<string>;
    saveData: (input: { key: string; value: unknown }) => Promise<{
      success: boolean;
      message: string;
    }>;
    getSystemInfo: () => Promise<{
      platform: NodeJS.Platform;
      arch: NodeJS.Architecture;
      version: string;
      hostname: string;
    }>;
    getVersions: () => Promise<{
      electron: string;
      chrome: string;
      node: string;
    }>;
  };
  platform: NodeJS.Platform;
};

// Declare global window interface extension
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
