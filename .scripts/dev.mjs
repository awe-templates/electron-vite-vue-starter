import { spawn } from 'child_process';
import { createServer, build } from 'vite';
import electron from 'electron';

let electronProcess = null;
let manualRestart = false;

// Start Vite dev server for renderer
async function startRenderer() {
  const server = await createServer({
    configFile: './vite.renderer.config.ts',
  });
  await server.listen();
  server.printUrls();
  return server;
}

// Start Electron
function startElectron() {
  if (electronProcess) {
    manualRestart = true;
    electronProcess.kill();
    electronProcess = null;
  }

  electronProcess = spawn(electron, ['.'], {
    stdio: 'inherit',
    env: process.env,
  });

  electronProcess.on('close', (code) => {
    if (!manualRestart) {
      process.exit(code);
    }
    manualRestart = false;
  });
}

// Build and watch main process
async function buildMain() {
  const watcher = await build({
    configFile: './vite.main.config.ts',
    build: {
      watch: {},
    },
  });

  watcher.on('event', (event) => {
    if (event.code === 'BUNDLE_START') {
      console.log('Building main process...');
    } else if (event.code === 'BUNDLE_END') {
      console.log('Main process built successfully!');
      event.result.close();
      startElectron();
    } else if (event.code === 'ERROR') {
      console.error('Build error:', event.error);
    }
  });

  return watcher;
}

// Main dev script
async function main() {
  console.log('Starting development server...\n');

  // Start renderer dev server
  await startRenderer();

  // Build main process and watch for changes
  await buildMain();

  // Handle process termination
  process.on('SIGINT', () => {
    if (electronProcess) {
      electronProcess.kill();
    }
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    if (electronProcess) {
      electronProcess.kill();
    }
    process.exit(0);
  });
}

main().catch((err) => {
  console.error('Error starting dev server:', err);
  process.exit(1);
});
