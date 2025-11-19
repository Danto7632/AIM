
  # AI Administrative Document Assistant

  This is a code bundle for AI Administrative Document Assistant. The original project is available at https://www.figma.com/design/ZJ4fr4DmJnJRsyauYLS0G5/AI-Administrative-Document-Assistant.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Deployment

  The repository includes `.github/workflows/deploy.yml`, which builds the Vite app and deploys the contents of the `build/` directory to GitHub Pages whenever code is pushed to the `main` branch (or when you trigger it manually).

  1. In the GitHub repository settings, enable **Pages** and choose the **GitHub Actions** deployment source (this is required only once).
  2. Merge your changes into `main` and push. The workflow installs dependencies with `npm ci`, runs `npm run build`, and publishes the resulting static files.
  3. Monitor the **Actions** tab for logs. The deployment exposes the site URL as the workflow output named `page_url`.
  