# Token Studio Workflow with Figma

## How Token Studio Actually Works

Token Studio is a **design token management platform** that works as the **source of truth** for your design tokens. Here's the proper workflow:

### 1. Token Studio as Source of Truth
```
Token Studio → Figma Plugin → Figma
```

- You create and manage tokens in **Token Studio**
- Use the **Figma plugin** to sync tokens **TO** Figma
- Figma receives the tokens, not the other way around

### 2. Azure DevOps Integration
```
Token Studio → Azure DevOps Pipeline → Your Repository
```

- Token Studio can export tokens to your repository
- Azure DevOps pipeline can trigger on Token Studio changes
- Build your design system from Token Studio exports

## Proper Setup for Token Studio

### Option 1: Token Studio Webhook + Azure DevOps
1. **Configure Token Studio webhook** to trigger on token changes
2. **Azure DevOps pipeline** receives webhook and pulls latest tokens
3. **Build and deploy** your design system

### Option 2: Token Studio CLI + Azure DevOps
1. **Use Token Studio CLI** to export tokens
2. **Azure DevOps pipeline** runs CLI commands
3. **Process and build** tokens with Style Dictionary

### Option 3: Manual Sync with Azure DevOps
1. **Export tokens** from Token Studio manually
2. **Commit to repository** 
3. **Azure DevOps pipeline** builds on commit

## Recommended Approach

For your use case, I recommend **Option 1** with webhooks:

```yaml
# azure-pipelines.yml (Token Studio version)
trigger:
  - main

# Webhook trigger from Token Studio
resources:
  webhooks:
    - webhook: tokenStudioWebhook
      connection: tokenStudioServiceConnection

pool:
  vmImage: 'ubuntu-latest'

variables:
  - name: TOKEN_STUDIO_PROJECT_ID
    value: 'your-project-id'
  - name: TOKEN_STUDIO_ACCESS_TOKEN
    secret: true

stages:
- stage: SyncTokens
  displayName: 'Sync Tokens from Token Studio'
  jobs:
  - job: UpdateTokens
    displayName: 'Update Design Tokens'
    steps:
    - task: NodeTool@0
      inputs:
        versionSpec: '18.x'
      displayName: 'Install Node.js'

    - script: |
        npm install
      displayName: 'Install Dependencies'

    - script: |
        # Use Token Studio CLI to export tokens
        npx @tokens-studio/cli export \
          --project-id $(TOKEN_STUDIO_PROJECT_ID) \
          --access-token $(TOKEN_STUDIO_ACCESS_TOKEN) \
          --output-dir ./tokens \
          --format json
      displayName: 'Export Tokens from Token Studio'

    - script: |
        npm run build:token
      displayName: 'Build Design Tokens with Style Dictionary'

    - script: |
        node scripts/build-typescript.js
      displayName: 'Build TypeScript Files'

    - script: |
        git config --global user.email "azure-pipeline@your-company.com"
        git config --global user.name "Azure Pipeline"
      displayName: 'Configure Git'

    - script: |
        node scripts/update-pr.js
      displayName: 'Update PR with New Tokens'
```

## Token Studio CLI Commands

```bash
# Install Token Studio CLI
npm install -g @tokens-studio/cli

# Export tokens from Token Studio
tokens-studio export \
  --project-id your-project-id \
  --access-token your-access-token \
  --output-dir ./tokens \
  --format json

# Sync tokens to Figma
tokens-studio sync \
  --project-id your-project-id \
  --figma-file-key your-figma-file-key \
  --figma-access-token your-figma-token
```

## Why This Approach is Better

1. **Single Source of Truth**: Token Studio manages all tokens
2. **Version Control**: Token Studio has built-in versioning
3. **Collaboration**: Multiple designers can work on tokens
4. **Automation**: Webhooks trigger builds automatically
5. **Figma Integration**: Official plugin for seamless sync

## Migration from Current Setup

To migrate from the Figma-first approach:

1. **Export current tokens** from Figma using the script I created
2. **Import into Token Studio** using their import feature
3. **Set up Token Studio webhook** to Azure DevOps
4. **Update pipeline** to use Token Studio CLI
5. **Remove Figma API scripts** (they're no longer needed)

Would you like me to create the proper Token Studio integration instead? 