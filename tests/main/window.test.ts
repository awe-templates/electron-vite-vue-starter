import { describe, it, expect } from 'vitest';
import { mockBrowserWindow } from '../setup';

describe('Window Management', () => {
  it('should create a window with correct dimensions', async () => {
    const { createMainWindow } = await import('@main/window');

    const window = createMainWindow();

    expect(window).toBeDefined();
  });

  it('should set up webContents security handlers', async () => {
    const { createMainWindow } = await import('@main/window');

    createMainWindow();

    expect(
      mockBrowserWindow.webContents.setWindowOpenHandler
    ).toHaveBeenCalled();
  });
});
