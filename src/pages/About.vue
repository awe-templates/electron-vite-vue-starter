<template>

  <div class="about-container">

    <h1>About This Application</h1>

    <section class="about-section">

      <h2>Electron Vite Vue Starter</h2>

      <p>
         A modern, type-safe Electron starter template with Vite, TypeScript, Vue 3, and Vue Router.
        This template provides a solid foundation for building desktop applications with a focus on
        developer experience and performance.
      </p>

    </section>

    <section class="about-section">

      <h2>Features</h2>

      <ul class="features-list">

        <li>
           <strong>Electron:</strong> Build cross-platform desktop applications with web
          technologies
        </li>

        <li> <strong>Vite:</strong> Lightning-fast build tool and development server </li>

        <li> <strong>Vue 3:</strong> Progressive JavaScript framework with Composition API </li>

        <li> <strong>Vue Router:</strong> Official router for Vue with client-side routing </li>

        <li> <strong>TypeScript:</strong> Type-safe development with full IDE support </li>

        <li> <strong>Vitest:</strong> Unit testing framework powered by Vite </li>

        <li> <strong>Dark Mode:</strong> Built-in theme switching capability </li>

      </ul>

    </section>

    <section class="about-section">

      <h2>Getting Started</h2>

      <p>
         This template is ready to use out of the box. Use the navigation menu to explore the
        application. You can modify the components, add new pages, and customize the styling to
        match your needs.
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
         <a href="https://www.electronjs.org" target="_blank" class="link-card"
          >
          <h3>Electron Docs</h3>

          <p>Learn about building desktop applications with Electron</p>
           </a
        > <a href="https://vuejs.org" target="_blank" class="link-card"
          >
          <h3>Vue 3 Docs</h3>

          <p>Explore the Vue.js framework and its features</p>
           </a
        > <a href="https://vite.dev" target="_blank" class="link-card"
          >
          <h3>Vite Docs</h3>

          <p>Master the next generation frontend build tool</p>
           </a
        > <a href="https://router.vuejs.org" target="_blank" class="link-card"
          >
          <h3>Vue Router Docs</h3>

          <p>Learn about client-side routing in Vue</p>
           </a
        >
      </div>

    </section>

  </div>

</template>

<script setup lang="ts">
  // This component doesn't require any script logic for now
  // but we keep the setup script for consistency and future extensibility
</script>

<style scoped>
  .about-container {
  max-width: 900px;
  margin: 0 auto;
}

.about-container h1 {
  color: var(--text-primary);
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.about-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
}

.about-section h2 {
  color: var(--text-primary);
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.about-section p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0.5rem 0;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  padding: 0.5rem 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.features-list strong {
  color: var(--text-primary);
}

.code-block {
  background-color: var(--code-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.25rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.code-block code {
  font-family: 'Courier New', monospace;
  color: var(--code-text);
  font-size: 0.875rem;
  line-height: 1.5;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.link-card {
  display: block;
  padding: 1rem;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 0.25rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.link-card:hover {
  background-color: var(--card-bg);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--card-shadow);
}

.link-card h3 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
  font-size: 1rem;
}

.link-card p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
}
</style>

