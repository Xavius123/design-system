# Deployment Guide

## GitHub Pages Deployment

This demo app is configured to automatically deploy to GitHub Pages.

### Initial Setup

1. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Update Configuration**:
   
   Edit `vite.config.ts`:
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/YOUR-REPO-NAME/' : '/',
   ```
   
   Replace `design-system` with your actual repository name.

3. **Push to Main**:
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

### Automatic Deployment

The app deploys automatically when you:
- Push to the `main` branch
- Make changes in `apps/react-app-ds/`
- Trigger the workflow manually

### Manual Deployment

You can manually trigger deployment:

1. Go to the "Actions" tab on GitHub
2. Select "Deploy Demo to GitHub Pages"
3. Click "Run workflow"

### Local Preview

Build and preview the production version locally:

```bash
# Build for production
npm run build --workspace=apps/react-app-ds

# Preview built version
npm run preview --workspace=apps/react-app-ds
```

Visit: http://localhost:4173/design-system/

**Note**: The preview URL includes `/design-system/` to match production.

### Troubleshooting

#### Blank Page After Deployment

**Problem**: Page loads but shows blank screen or 404 on routes.

**Solution**: Check that the base path matches your repo name:

1. In `vite.config.ts`:
   ```typescript
   base: '/YOUR-ACTUAL-REPO-NAME/'
   ```

2. Rebuild and redeploy:
   ```bash
   npm run build --workspace=apps/react-app-ds
   git push origin main
   ```

#### Routes Not Working

**Problem**: Direct URLs like `/components` return 404.

**Solution**: GitHub Pages doesn't support client-side routing by default. This is already handled with:

1. `BrowserRouter` uses `basename` from `import.meta.env.BASE_URL`
2. All internal navigation uses React Router's `Link` or programmatic navigation

If you need to support direct URLs, add a `404.html` that redirects to `index.html`.

#### Deployment Fails

**Problem**: GitHub Actions workflow fails.

**Solution**: Check:

1. **Permissions**: Ensure GitHub Actions has write permissions:
   - Settings → Actions → General
   - Workflow permissions → "Read and write permissions"

2. **Pages Source**: Ensure source is set to "GitHub Actions":
   - Settings → Pages
   - Source → "GitHub Actions"

3. **Build Logs**: Check the Actions tab for error details

### Custom Domain

To use a custom domain:

1. Add a `CNAME` file to `apps/react-app-ds/public/`:
   ```
   your-domain.com
   ```

2. Configure DNS with your provider:
   - Add a CNAME record pointing to `USERNAME.github.io`

3. Update `vite.config.ts`:
   ```typescript
   base: '/' // Root path for custom domain
   ```

4. In GitHub:
   - Settings → Pages
   - Custom domain → Enter your domain
   - Save

### Environment-Specific Configuration

The app uses environment variables for configuration:

- **Development**: `base: '/'`
- **Production**: `base: '/design-system/'`

This is handled automatically via:
```typescript
base: process.env.NODE_ENV === 'production' ? '/design-system/' : '/',
```

### Deployment Checklist

Before deploying to production:

- [ ] Update `base` in `vite.config.ts` with correct repo name
- [ ] Test locally with `npm run build && npm run preview`
- [ ] Verify routing works on all pages
- [ ] Check theme switching works
- [ ] Verify responsive layout on mobile/desktop
- [ ] Enable GitHub Pages in repository settings
- [ ] Set source to "GitHub Actions"
- [ ] Push to main branch
- [ ] Check deployment in Actions tab
- [ ] Visit deployed URL and test

### URLs

After deployment, your app will be available at:

**Standard**: `https://YOUR-USERNAME.github.io/design-system/`
**Custom Domain**: `https://your-domain.com/` (if configured)

Replace:
- `YOUR-USERNAME` with your GitHub username
- `design-system` with your repository name

