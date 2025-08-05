#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupFigmaIntegration() {
  console.log('🎨 Figma Integration Setup\n');
  console.log('This script will help you configure the Figma integration for your design system with Token Studio format.\n');

  try {
    // Get Figma file key
    const figmaFileKey = await question('Enter your Figma file key (from the URL): ');
    
    // Get Figma access token
    const figmaToken = await question('Enter your Figma personal access token: ');
    
    // Get Azure DevOps project URL
    const azureProjectUrl = await question('Enter your Azure DevOps project URL (e.g., https://dev.azure.com/your-org/your-project): ');
    
    // Get repository name
    const repositoryName = await question('Enter your repository name: ');

    console.log('\n📝 Updating configuration files...');

    // Update azure-pipelines.yml
    const pipelinePath = path.join(__dirname, '..', 'azure-pipelines.yml');
    let pipelineContent = fs.readFileSync(pipelinePath, 'utf8');
    
    // Replace placeholder values
    pipelineContent = pipelineContent.replace(
      /value: 'your-figma-file-key-here'/g,
      `value: '${figmaFileKey}'`
    );
    
    pipelineContent = pipelineContent.replace(
      /git config --global user.email "azure-pipeline@your-company.com"/g,
      `git config --global user.email "azure-pipeline@${new URL(azureProjectUrl).hostname}"`
    );

    fs.writeFileSync(pipelinePath, pipelineContent);

    // Update figma.config.js
    const configPath = path.join(__dirname, '..', 'config', 'figma.config.js');
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    configContent = configContent.replace(
      /fileKey: process\.env\.FIGMA_FILE_KEY \|\| 'your-figma-file-key'/g,
      `fileKey: process.env.FIGMA_FILE_KEY || '${figmaFileKey}'`
    );

    fs.writeFileSync(configPath, configContent);

    // Create .env.example file
    const envExamplePath = path.join(__dirname, '..', '.env.example');
    const envExampleContent = `# Figma API Configuration
FIGMA_ACCESS_TOKEN=${figmaToken}
FIGMA_FILE_KEY=${figmaFileKey}

# Optional: Specific node IDs for token extraction
FIGMA_COLOR_NODE_IDS=node-id-1,node-id-2
FIGMA_SPACING_NODE_IDS=node-id-3
FIGMA_SHADOW_NODE_IDS=node-id-4
FIGMA_TYPOGRAPHY_NODE_IDS=node-id-5

# Git configuration for PR updates
BRANCH_NAME=update-design-tokens
COMMIT_MESSAGE=feat: sync design tokens from Figma
PR_TITLE=🔄 Sync Design Tokens from Figma
PR_BODY=This PR automatically syncs design tokens from Figma using Token Studio format.

# Azure DevOps configuration
AZURE_PROJECT_URL=${azureProjectUrl}
REPOSITORY_NAME=${repositoryName}
`;

    fs.writeFileSync(envExamplePath, envExampleContent);

    console.log('✅ Configuration files updated successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Copy .env.example to .env and update with your actual values');
    console.log('2. In Azure DevOps, create a new pipeline using azure-pipelines.yml');
    console.log('3. Set the FIGMA_ACCESS_TOKEN as a secret variable in your pipeline');
    console.log('4. Configure repository permissions for the Build Service account');
    console.log('5. Test the integration by running: npm run fetch:tokens');
    console.log('6. Build tokens with Style Dictionary: npm run build:token');
    
    console.log('\n📚 For detailed instructions, see: docs/FIGMA_INTEGRATION.md');

  } catch (error) {
    console.error('❌ Error during setup:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the setup
if (import.meta.url === `file://${process.argv[1]}`) {
  setupFigmaIntegration().catch(console.error);
}

export { setupFigmaIntegration }; 