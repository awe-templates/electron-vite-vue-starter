import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import App from '@app/App.vue';
import Home from '@app/pages/Home.vue';
import About from '@app/pages/About.vue';

// Mock localStorage
if (typeof window !== 'undefined' && !window.localStorage) {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
}

// Mock electronAPI
const createMockElectronAPI = () => ({
  api: {
    getAppVersion: vi.fn().mockResolvedValue('1.0.0'),
    getVersions: vi.fn().mockResolvedValue({
      electron: '39.0.0',
      chrome: '132.0.0',
      node: '20.0.0',
    }),
    getSystemInfo: vi.fn().mockResolvedValue({
      platform: 'darwin',
      arch: 'arm64',
      version: '21.0.0',
      hostname: 'test-machine',
    }),
    saveData: vi.fn().mockResolvedValue({
      success: true,
      message: 'Data saved',
    }),
  },
  platform: 'darwin',
});

describe('Vue Components', () => {
  beforeEach(() => {
    localStorage.clear();
    // @ts-expect-error: Mock object uses vi.fn() for testing purposes
    window.electronAPI = createMockElectronAPI();
  });

  it('1. App.vue renders with header and navigation', () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/about', component: { template: '<div>About</div>' } },
      ],
    });

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.find('.app').exists()).toBe(true);
    expect(wrapper.find('.header').exists()).toBe(true);
    expect(wrapper.find('.nav').exists()).toBe(true);
    expect(wrapper.text()).toContain('Electron Vite Vue');
  });

  it('2. App.vue theme toggle works correctly', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/about', component: { template: '<div>About</div>' } },
      ],
    });

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    const initialTheme = document.documentElement.getAttribute('data-theme');
    const themeToggle = wrapper.find('.theme-toggle');
    await themeToggle.trigger('click');
    await wrapper.vm.$nextTick();

    const newTheme = document.documentElement.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });

  it('3. App.vue displays active navigation link', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/about', component: { template: '<div>About</div>' } },
      ],
    });

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    await router.push('/');
    await wrapper.vm.$nextTick();

    const homeLink = wrapper.findAll('.nav a')[0];
    expect(homeLink?.classes()).toContain('active');
  });

  it('4. Home.vue renders page with info cards and tech icons', () => {
    const wrapper = mount(Home);

    expect(wrapper.find('.section').exists()).toBe(true);
    expect(wrapper.findAll('.info-card').length).toBeGreaterThanOrEqual(3);
    expect(wrapper.find('.tech-icons').exists()).toBe(true);
    expect(wrapper.findAll('.tech-icon-item').length).toBe(6);
  });

  it('5. Home.vue loads data from electronAPI on mount', async () => {
    mount(Home);
    await vi.waitFor(
      () => {
        expect(window.electronAPI.api.getAppVersion).toHaveBeenCalled();
        expect(window.electronAPI.api.getSystemInfo).toHaveBeenCalled();
        expect(window.electronAPI.api.getVersions).toHaveBeenCalled();
      },
      { timeout: 500 }
    );
  });

  it('6. Home.vue tech icons are valid external links', () => {
    const wrapper = mount(Home);
    const techLinks = wrapper.findAll('.tech-icon-item');

    techLinks.forEach((link: any) => {
      expect(link.element.tagName).toBe('A');
      expect(link.attributes('target')).toBe('_blank');
      expect(link.attributes('href')).toBeTruthy();
    });
  });

  it('7. About.vue renders with main sections', () => {
    const wrapper = mount(About);

    expect(wrapper.find('.about-container').exists()).toBe(true);
    expect(wrapper.find('.about-container h1').text()).toContain('About');
    expect(wrapper.findAll('.about-section').length).toBeGreaterThanOrEqual(4);
  });

  it('8. About.vue displays features list with items', () => {
    const wrapper = mount(About);
    const featuresList = wrapper.find('.features-list');

    expect(featuresList.exists()).toBe(true);
    expect(featuresList.findAll('li').length).toBeGreaterThan(0);
    featuresList.findAll('li').forEach((item: any) => {
      expect(item.find('strong').exists()).toBe(true);
    });
  });

  it('9. About.vue renders links grid with external documentation links', () => {
    const wrapper = mount(About);
    const linkCards = wrapper.findAll('.link-card');

    expect(linkCards.length).toBeGreaterThanOrEqual(4);
    const hrefs = linkCards.map((card: any) => card.attributes('href'));
    expect(hrefs).toContain('https://www.electronjs.org');
    expect(hrefs).toContain('https://vuejs.org');
    expect(hrefs).toContain('https://vite.dev');
  });

  it('10. About.vue displays code block with project structure', () => {
    const wrapper = mount(About);
    const codeBlock = wrapper.find('.code-block');

    expect(codeBlock.exists()).toBe(true);
    expect(codeBlock.find('code').exists()).toBe(true);
    expect(codeBlock.text()).toContain('src/');
  });
});
