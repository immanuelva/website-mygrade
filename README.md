# Course Management App Landing

This is a Next.js TypeScript application for course management.

## Deployment to GitHub Pages

To deploy this Next.js application to GitHub Pages:

1. Make sure you have the gh-pages package installed:
   ```
   npm install --save-dev gh-pages
   ```

2. The package.json has been configured with the correct scripts:
   ```json
   "scripts": {
     "export": "next build && next export",
     "predeploy": "npm run export",
     "deploy": "gh-pages -d out"
   }
   ```

3. Deploy the application manually:
   ```
   npm run deploy
   ```

4. Alternatively, push to the main branch and let GitHub Actions deploy it automatically.

## GitHub Actions Deployment

The repository is configured with GitHub Actions to automatically build and deploy the site when you push to the main branch. The workflow:

1. Builds the Next.js application
2. Exports it as static HTML
3. Deploys it to GitHub Pages

## Development

To run the application locally:

```
npm install
npm run dev
```

The application will be available at http://localhost:3000. 