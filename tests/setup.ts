import { vi } from 'vitest';

// Mock Electron APIs
export const mockBrowserWindow = {
  loadURL: vi.fn(),
  loadFile: vi.fn(),
  on: vi.fn(),
  once: vi.fn(),
  webContents: {
    send: vi.fn(),
    on: vi.fn(),
    setWindowOpenHandler: vi.fn(),
    session: {
      webRequest: {
        onHeadersReceived: vi.fn(),
      },
    },
    openDevTools: vi.fn(),
  },
  isDestroyed: vi.fn(() => false),
  close: vi.fn(),
  show: vi.fn(),
  hide: vi.fn(),
  isMinimized: vi.fn(() => false),
  restore: vi.fn(),
  focus: vi.fn(),
};

export const mockApp = {
  on: vi.fn(),
  quit: vi.fn(),
  getPath: vi.fn((name: string) => `/mock/path/${name}`),
  getAppPath: vi.fn(
    () => '/Users/eyuperdogan/Desktop/gh/at/electron-vite-starter'
  ),
  getVersion: vi.fn(() => '1.0.0'),
  whenReady: vi.fn(() => Promise.resolve()),
  isPackaged: false,
};

export const mockIpcMain = {
  on: vi.fn(),
  once: vi.fn(),
  handle: vi.fn(),
  removeHandler: vi.fn(),
};

export const mockIpcRenderer = {
  send: vi.fn(),
  on: vi.fn(),
  once: vi.fn(),
  invoke: vi.fn(),
  removeListener: vi.fn(),
};

// Mock electron module
vi.mock('electron', () => ({
  app: mockApp,
  BrowserWindow: class {
    constructor() {
      return mockBrowserWindow;
    }
  },
  ipcMain: mockIpcMain,
  ipcRenderer: mockIpcRenderer,
  shell: {
    openExternal: vi.fn(),
  },
}));

// Mock @electron-toolkit/utils
vi.mock('@electron-toolkit/utils', () => ({
  is: {
    dev: true,
    macOS: false,
    windows: false,
    linux: false,
  },
  optimizer: {
    watchWindowShortcuts: vi.fn(),
  },
  platform: 'darwin',
}));
