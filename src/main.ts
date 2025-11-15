import './styles.css';

// Theme Management
const THEME_KEY = 'preferred-theme';

// Set dark mode as default
const initTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
};

// Load and display metadata
const loadMetadata = async () => {
  try {
    // Get app version
    const appVersion = await window.electronAPI.api.getAppVersion();

    console.log('appVersion', appVersion);

    document.getElementById('app-version')!.textContent = appVersion;

    // Get process versions
    const versions = await window.electronAPI.api.getVersions();
    document.getElementById('electron-version')!.textContent = versions.electron;
    document.getElementById('chrome-version')!.textContent = versions.chrome;
    document.getElementById('node-version')!.textContent = versions.node;

    // Get system info
    const systemInfo = await window.electronAPI.api.getSystemInfo();
    document.getElementById('platform')!.textContent = systemInfo.platform;
    document.getElementById('arch')!.textContent = systemInfo.arch;
    document.getElementById('os-version')!.textContent = systemInfo.version;
    document.getElementById('hostname')!.textContent = systemInfo.hostname;
  } catch (error) {
    console.error('Failed to load metadata:', error);
  }
};

// Initialize theme immediately
initTheme();

// Wait for DOM to be ready before setting up event listeners and loading data
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, electronAPI available:', !!window.electronAPI);

  // Set up theme toggle
  const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;
  themeToggle.addEventListener('click', toggleTheme);

  // Load metadata
  loadMetadata();
});
