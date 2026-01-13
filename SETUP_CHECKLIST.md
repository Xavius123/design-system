# GitHub Pages Setup Checklist

Follow these steps to deploy the demo app to GitHub Pages.

## Prerequisites

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Node.js 18+ installed locally

## Configuration Steps

### 1. Update Repository Name

Edit `apps/react-app-ds/vite.config.ts`:

```typescript
base: process.env.NODE_ENV === 'production' ? '/YOUR-REPO-NAME/' : '/',
```

Replace `/design-system/` with `/YOUR-ACTUAL-REPO-NAME/`

**Example**: If your repo is `https://github.com/username/my-ds`, use:
```typescript
base: process.env.NODE_ENV === 'production' ? '/my-ds/' : '/',
```

### 2. Update README URLs

Edit `README.md` and replace placeholder URLs:

```markdown
**Live Demo**: https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

Example:
```markdown
**Live Demo**: https://username.github.io/my-ds/
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** (in sidebar under "Code and automation")
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### 4. Configure Workflow Permissions

1. Still in **Settings**, click **Actions** → **General**
2. Scroll to **Workflow permissions**
3. Select **Read and write permissions**
4. Check **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

### 5. Test Locally

Before deploying, test the production build locally:

```bash
# Build for production
npm run build --workspace=apps/react-app-ds

# Preview production build
npm run preview --workspace=apps/react-app-ds
```

Visit: http://localhost:4173/YOUR-REPO-NAME/

**Important**: The URL should include your repo name, matching production.

### 6. Deploy

Commit and push your changes:

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

### 7. Monitor Deployment

1. Go to the **Actions** tab on GitHub
2. You should see a workflow running: "Deploy Demo to GitHub Pages"
3. Click on it to see progress
4. Wait for both "build" and "deploy" jobs to complete (usually 2-3 minutes)

### 8. Verify Deployment

Once deployment completes:

1. Go to **Settings** → **Pages**
2. You should see: "Your site is live at https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/"
3. Click the URL to visit your deployed app
4. Test all pages and features:
   - [ ] Home page loads
   - [ ] Navigation works (Components, Docs, Settings)
   - [ ] Theme toggle works
   - [ ] Responsive layout works (mobile/desktop)
   - [ ] Footer displays correctly

## Troubleshooting

### Blank Page After Deployment

**Symptom**: Page loads but is blank.

**Solution**:
1. Check browser console for errors
2. Verify base path in `vite.config.ts` matches your repo name
3. Rebuild and redeploy

### 404 on Refresh

**Symptom**: Direct URLs return 404.

**Solution**: This is expected with GitHub Pages. Users should:
- Use navigation within the app
- Bookmark the root URL

For advanced routing support, see `apps/react-app-ds/DEPLOYMENT.md`

### Workflow Fails

**Symptom**: GitHub Actions shows red X.

**Solution**:
1. Click the failed workflow
2. Check error message
3. Common issues:
   - Insufficient permissions → See Step 4 above
   - Build errors → Test locally first
   - Missing dependencies → Run `npm ci` locally

### Styles Not Loading

**Symptom**: App loads but looks unstyled.

**Solution**:
1. Check that CSS files are imported in `main.tsx`:
   ```typescript
   import './tokens/tokens.css';
   import './tokens/themes.css';
   import './styles/globals.css';
   ```
2. Rebuild and verify locally

## Manual Deployment Trigger

If you need to redeploy without code changes:

1. Go to **Actions** tab
2. Click **Deploy Demo to GitHub Pages**
3. Click **Run workflow**
4. Select `main` branch
5. Click **Run workflow**

## Custom Domain (Optional)

To use a custom domain:

1. Create `apps/react-app-ds/public/CNAME` with your domain:
   ```
   your-domain.com
   ```

2. Update `vite.config.ts`:
   ```typescript
   base: '/' // Use root for custom domain
   ```

3. Configure DNS:
   - Add CNAME record: `your-domain.com` → `USERNAME.github.io`

4. In GitHub Settings → Pages:
   - Enter custom domain
   - Wait for DNS check to pass
   - Enable "Enforce HTTPS"

## Next Steps

After successful deployment:

- [ ] Add the live URL to your repository description
- [ ] Update README with actual deployment URL
- [ ] Share the demo link
- [ ] Set up Chromatic for visual regression (see `docs/CHROMATIC.md`)
- [ ] Consider adding analytics (Google Analytics, Plausible, etc.)

## Support

For detailed deployment documentation, see:
- `apps/react-app-ds/DEPLOYMENT.md` - Full deployment guide
- `apps/react-app-ds/README.md` - App documentation
- `README.md` - Monorepo overview

## Verification Checklist

Before marking setup as complete:

- [ ] Repo name updated in `vite.config.ts`
- [ ] README URLs updated
- [ ] GitHub Pages enabled
- [ ] Workflow permissions configured
- [ ] Local build tested
- [ ] Changes pushed to main
- [ ] Workflow completed successfully
- [ ] Live site verified
- [ ] All pages tested
- [ ] Mobile layout tested
- [ ] Theme switching works

---

**Congratulations!** Your demo app is now live on GitHub Pages! 🎉

