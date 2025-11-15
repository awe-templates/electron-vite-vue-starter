import { tipc } from '@egoist/tipc/main';
import os from 'os';

// Define your IPC routes with full type safety
export const router = {
  // Example: Get app version
  getAppVersion: tipc.create().procedure.action(async () => {
    const { app } = await import('electron');
    return app.getVersion();
  }),

  // Example: Complex operation with error handling
  saveData: tipc
    .create()
    .procedure.input<{ key: string; value: unknown }>()
    .action(async ({ input }) => {
      try {
        // In a real app, you might save to a database or file
        console.log(
          `Saving data: ${input.key} = ${JSON.stringify(input.value)}`
        );
        return {
          success: true,
          message: `Data saved successfully for key: ${input.key}`,
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    }),

  // Example: Get system info
  getSystemInfo: tipc.create().procedure.action(async () => {
    return {
      platform: os.platform(),
      arch: os.arch(),
      version: os.release(),
      hostname: os.hostname(),
    };
  }),

  // Get process versions (Electron, Chrome, Node)
  getVersions: tipc.create().procedure.action(async () => {
    return {
      electron: process.versions.electron,
      chrome: process.versions.chrome,
      node: process.versions.node,
    };
  }),
};

export type AppRouter = typeof router;
