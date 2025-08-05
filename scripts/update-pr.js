import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BRANCH_NAME = process.env.BRANCH_NAME || 'update-design-tokens';
const COMMIT_MESSAGE = process.env.COMMIT_MESSAGE || 'feat: update design tokens from Figma';
const PR_TITLE = process.env.PR_TITLE || 'Update Design Tokens from Figma';
const PR_BODY = process.env.PR_BODY || 'This PR updates design tokens by fetching the latest values from Figma.';

console.log('🚀 Updating PR with new design tokens...');

async function updatePR() {
  try {
    // Check if there are any changes
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    
    if (!status.trim()) {
      console.log('ℹ️ No changes detected, skipping PR update');
      return;
    }

    console.log('📝 Changes detected:');
    console.log(status);

    // Create or switch to feature branch
    try {
      execSync(`git checkout -b ${BRANCH_NAME}`, { stdio: 'inherit' });
    } catch (error) {
      // Branch might already exist, try to switch to it
      try {
        execSync(`git checkout ${BRANCH_NAME}`, { stdio: 'inherit' });
      } catch (switchError) {
        console.error('❌ Failed to create or switch to branch:', switchError.message);
        throw switchError;
      }
    }

    // Add all changes
    execSync('git add .', { stdio: 'inherit' });

    // Commit changes
    execSync(`git commit -m "${COMMIT_MESSAGE}"`, { stdio: 'inherit' });

    // Push to remote
    execSync(`git push origin ${BRANCH_NAME}`, { stdio: 'inherit' });

    console.log('✅ Changes committed and pushed successfully!');

    // Create PR using Azure DevOps CLI (if available)
    try {
      const prCommand = `az repos pr create --title "${PR_TITLE}" --description "${PR_BODY}" --source-branch ${BRANCH_NAME} --target-branch main`;
      execSync(prCommand, { stdio: 'inherit' });
      console.log('✅ Pull request created successfully!');
    } catch (azError) {
      console.log('ℹ️ Azure CLI not available or PR creation failed. Please create PR manually.');
      console.log(`Branch: ${BRANCH_NAME}`);
      console.log(`Title: ${PR_TITLE}`);
      console.log(`Body: ${PR_BODY}`);
    }

  } catch (error) {
    console.error('❌ Error updating PR:', error.message);
    throw error;
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  updatePR().catch(process.exit);
}

export { updatePR }; 