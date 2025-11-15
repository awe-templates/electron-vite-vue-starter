import { registerIpcMain } from '@egoist/tipc/main';
import { router } from '@shared/ipc';

// Register IPC handlers
registerIpcMain(router);
