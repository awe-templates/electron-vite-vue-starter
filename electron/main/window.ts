import { BrowserWindow, shell, app } from 'electron';
import { join } from 'path';
import { existsSync } from 'fs';
import { is } from '@electron-toolkit/utils';

export function createMainWindow(): BrowserWindow {
  // Try multiple paths for preload script
  let preloadPath: string;

  if (is.dev) {
    // In development, use path relative to app root
    preloadPath = join(app.getAppPath(), 'dist', 'main', 'preload.js');
  } else {
    // In production, use path relative to __dirname
    preloadPath = join(__dirname, 'preload.js');
  }

  console.log('[Window] Preload path:', preloadPath);
  console.log('[Window] File exists:', existsSync(preloadPath));
  console.log('[Window] __dirname:', __dirname);
  console.log('[Window] app.getAppPath():', app.getAppPath());

  if (!existsSync(preloadPath)) {
    console.error('[Window] PRELOAD FILE NOT FOUND AT:', preloadPath);
    throw new Error(`Preload script not found at: ${preloadPath}`);
  }

  // Create the browser window with security best practices
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      // Security: Enable context isolation
      contextIsolation: true,
      // Security: Disable node integration in renderer
      nodeIntegration: false,
      // Security: Sandbox renderer process
      sandbox: true, // Set to true if you don't need Node.js in preload
      // Preload script
      preload: preloadPath,
    },
    show: false, // Don't show until ready-to-show
  });

  // Listen for preload script errors
  mainWindow.webContents.on('preload-error', (_event, preloadPath, error) => {
    console.error('[Window] Preload script error:', preloadPath, error);
  });

  // Show window when ready to avoid visual flash
  mainWindow.once('ready-to-show', () => {
    console.log('[Window] Window ready to show');
    mainWindow.show();
  });

  // Security: Open external links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  // Load the app
  if (is.dev) {
    mainWindow.loadURL('http://localhost:5173');
    // Open DevTools in development
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  mainWindow.webContents.session.webRequest.onHeadersReceived(
    (details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': [
            "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;",
          ],
        },
      });
    }
  );

  return mainWindow;
}
