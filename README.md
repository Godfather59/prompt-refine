# Prompt Refinery

Prompt Refinery is a guided React wizard that helps engineers craft precise, production-ready prompts for coding-focused AI agents. It asks the right questions, offers safe defaults when you are unsure, and generates a live markdown prompt with export/share actions.
You can try : https://godfather59.github.io/prompt-refine/

## Features

- Multi-step prompt wizard with progress indicator, keyboard navigation, and Framer Motion transitions
- Structured steps for task type, language, runtime, context, constraints, style, tooling, and target agent
- "I don't know" option on every step that surfaces suggestion cards with safe defaults
- Live Markdown preview with prompt quality checklist, copy/export/share actions, and template presets
- Zustand store with URL query serialization for shareable state and built-in templates for common workflows
- Tailwind CSS + shadcn/ui component library, Radix primitives, Lucide icons, and accessible focus management
- Export prompt as Markdown or JSON, copy to clipboard, and share link with encoded wizard state
- GitHub Pages-ready build pipeline with Vite, ESLint, Prettier, Vitest, and GitHub Actions workflow

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The app runs at http://localhost:5173/ by default.
3. Run linting and tests:
   ```bash
   npm run lint
   npm test
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Preview the production build locally:
   ```bash
   npm run preview
   ```

## Repository Structure

```
prompt-refinery/
+- src/
¦  +- components/            # Wizard steps, preview, templates, UI primitives
¦  +- lib/                   # Schema, templates, prompt builder, URL helpers
¦  +- store/                 # Zustand state management
¦  +- styles/                # Tailwind global styles
¦  +- main.tsx, App.tsx      # App entry and layout
+- public/                   # Static assets
+- eslint.config.js          # Flat ESLint config
+- tailwind.config.js        # Tailwind + shadcn theme configuration
+- vite.config.ts            # Vite + Vitest configuration
+- vitest.setup.ts           # Testing setup (jest-dom)
```

## Accessibility

- All interactive controls include label associations and focus states.
- Every wizard step can be completed via keyboard navigation.
- Animations are subtle, and actionable feedback appears for copy/share actions.

## License

This project is released under the MIT License. See [`LICENSE`](./LICENSE) for details.
