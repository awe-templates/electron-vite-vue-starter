<template>
  <div class="about-container">
    <h1>About This Application</h1>

    <section class="about-section">
      <h2>Electron Vite Vue Starter</h2>

      <p>
        A modern, type-safe Electron starter template with Vite, TypeScript, Vue
        3, and Vue Router. This template provides a solid foundation for
        building desktop applications with a focus on developer experience and
        performance.
      </p>
    </section>

    <section class="about-section">
      <h2>Features</h2>

      <ul class="features-list">
        <li>
          <strong>Electron:</strong> Build cross-platform desktop applications
          with web technologies
        </li>

        <li>
          <strong>Vite:</strong> Lightning-fast build tool and development
          server
        </li>

        <li>
          <strong>Vue 3:</strong> Progressive JavaScript framework with
          Composition API
        </li>

        <li>
          <strong>Vue Router:</strong> Official router for Vue with client-side
          routing
        </li>

        <li>
          <strong>TypeScript:</strong> Type-safe development with full IDE
          support
        </li>

        <li><strong>Vitest:</strong> Unit testing framework powered by Vite</li>

        <li><strong>Dark Mode:</strong> Built-in theme switching capability</li>
      </ul>
    </section>

    <section class="about-section">
      <h2>Getting Started</h2>

      <p>
        This template is ready to use out of the box. Use the navigation menu to
        explore the application. You can modify the components, add new pages,
        and customize the styling to match your needs.
      </p>
    </section>

    <section class="about-section">
      <h2>Project Structure</h2>

      <pre class="code-block"><code>src/
├── App.vue              # Root Vue component
├── main.ts              # Application entry point
├── router.ts            # Vue Router configuration
├── styles.css           # Global styles
├── pages/               # Page components
│   ├── Home.vue         # Home page
│   └── About.vue        # This page
└── index.html           # HTML template

electron/
├── main/                # Electron main process
├── preload/             # Preload scripts
└── shared/              # Shared utilities</code></pre>
    </section>

    <section class="about-section">
      <h2>Learn More</h2>

      <div class="links-grid">
        <a href="https://www.electronjs.org" target="_blank" class="link-card">
          <h3>Electron Docs</h3>

          <p>Learn about building desktop applications with Electron</p>
        </a>
        <a href="https://vuejs.org" target="_blank" class="link-card">
          <h3>Vue 3 Docs</h3>

          <p>Explore the Vue.js framework and its features</p>
        </a>
        <a href="https://vite.dev" target="_blank" class="link-card">
          <h3>Vite Docs</h3>

          <p>Master the next generation frontend build tool</p>
        </a>
        <a href="https://router.vuejs.org" target="_blank" class="link-card">
          <h3>Vue Router Docs</h3>

          <p>Learn about client-side routing in Vue</p>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// This component doesn't require any script logic for now
// but we keep the setup script for consistency and future extensibility
</script>

<style scoped>
@reference 'tailwindcss';

.about-container {
  @apply max-w-3xl mx-auto;

  h1 {
    @apply mb-8 text-5xl text-(--text-primary);
  }

  .about-section {
    @apply mb-8 p-6 border rounded-lg border-(--border-color) bg-(--card-bg);

    h2 {
      @apply mt-0 mb-4 text-2xl text-(--text-primary);
    }

    p {
      @apply leading-relaxed my-2 text-(--text-secondary);
    }

    .features-list {
      @apply list-none p-0 m-0;

      li {
        @apply py-2 leading-relaxed text-(--text-secondary);

        strong {
          @apply text-(--text-primary);
        }
      }
    }

    .code-block {
      @apply border rounded p-4 overflow-x-auto my-4 border-(--border-color) bg-(--code-bg);

      code {
        @apply font-mono text-sm leading-relaxed text-(--code-text);
      }
    }

    .links-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

      @apply grid gap-4;

      .link-card {
        @apply block p-4 border rounded no-underline transition-all duration-300 border-(--border-color) bg-(--bg-primary);

        &:hover {
          @apply -translate-y-0.5 bg-(--card-bg) border-(--primary-color) [box-shadow:var(--card-shadow)];
        }

        h3 {
          @apply m-0 mb-2 text-base text-(--text-primary);
        }

        p {
          @apply m-0 text-sm text-(--text-secondary);
        }
      }
    }
  }
}
</style>
