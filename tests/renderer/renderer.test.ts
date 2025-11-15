import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ElectronAPI } from '@preload/preload';

describe('Renderer Process', () => {
  beforeEach(() => {
    // Mock the electronAPI
    (global as { window?: Window & { electronAPI: ElectronAPI } }).window = {
      electronAPI: {
        api: {
          getAppVersion: vi.fn(),
          getSystemInfo: vi.fn(),
          saveData: vi.fn(),
          getVersions: vi.fn(),
        },
        platform: 'darwin' as NodeJS.Platform,
      },
    } as unknown as Window & { electronAPI: ElectronAPI };
  });

  it('should have window.electronAPI available', () => {
    expect(window.electronAPI).toBeDefined();
    expect(window.electronAPI.api).toBeDefined();
  });

  it('should have platform information', () => {
    expect(window.electronAPI.platform).toBeDefined();
    expect(typeof window.electronAPI.platform).toBe('string');
  });

  it('should call getSystemInfo API correctly', async () => {
    const mockSystemInfo = vi.mocked(window.electronAPI.api.getSystemInfo);
    const mockData = {
      platform: 'darwin' as NodeJS.Platform,
      arch: 'arm64' as NodeJS.Architecture,
      version: '21.0.0',
      hostname: 'test-machine',
    };
    mockSystemInfo.mockResolvedValue(mockData);

    const result = await window.electronAPI.api.getSystemInfo();

    expect(mockSystemInfo).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });
});
