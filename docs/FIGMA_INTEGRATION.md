# Figma Integration with Azure DevOps Pipeline

This guide explains how to set up automatic synchronization of design tokens from Figma to your design system using Azure DevOps pipelines and Token Studio format.

## Overview

The integration consists of:
1. **Figma API Script** - Fetches design tokens from Figma and converts them to Token Studio format
2. **Style Dictionary Integration** - Builds CSS, SCSS, and TypeScript outputs from Token Studio tokens
3. **Azure DevOps Pipeline** - Automatically runs the sync process
4. **PR Update Script** - Creates/updates pull requests with new tokens

## Prerequisites

- Azure DevOps project with repository access
- Figma account with API access
- Node.js 18+ installed
- Git configured with proper credentials

## Setup Instructions

### 1. Get Figma API Access

1. Go to your Figma account settings
2. Navigate to "Personal access tokens"
3. Create a new access token
4. Copy the token (you'll need it for the pipeline)

### 2. Get Figma File Key

1. Open your Figma design file
2. The file key is in the URL: `https://www.figma.com/file/FILE_KEY/...`
3. Copy the FILE_KEY value

### 3. Configure Azure DevOps Pipeline

1. In your Azure DevOps project, go to **Pipelines**
2. Create a new pipeline and select "Azure Repos Git"
3. Choose your repository
4. Select "Existing Azure Pipelines YAML file"
5. Use the path: `azure-pipelines.yml`

### 4. Set Pipeline Variables

In your pipeline settings, add these variables:

#### Secret Variables (Library Variables)
- `FIGMA_ACCESS_TOKEN` - Your Figma personal access token

#### Regular Variables
- `FIGMA_FILE_KEY` - Your Figma file key
- `FIGMA_COLOR_NODE_IDS` - Comma-separated node IDs for color tokens (optional)
- `FIGMA_SPACING_NODE_IDS` - Comma-separated node IDs for spacing tokens (optional)
- `FIGMA_SHADOW_NODE_IDS` - Comma-separated node IDs for shadow tokens (optional)

### 5. Configure Git Permissions

The pipeline needs to push to your repository. In Azure DevOps:

1. Go to **Project Settings** > **Repositories**
2. Select your repository
3. Go to **Security**
4. Add the **Build Service** account with **Contribute** permissions

### 6. Update Configuration

Edit `config/figma.config.js` to match your Figma file structure:

```javascript
export const figmaConfig = {
  files: {
    designSystem: {
      fileKey: 'your-actual-figma-file-key',
      nodeIds: {
        colors: ['node-id-1', 'node-id-2'],
        spacing: ['node-id-3'],
        shadows: ['node-id-4']
      }
    }
  }
};
```

## Pipeline Features

### Automatic Scheduling
The pipeline runs automatically:
- **Daily at 9 AM on weekdays** (configurable in `azure-pipelines.yml`)
- **On every push to main branch**

### Token Extraction
The pipeline extracts and converts to Token Studio format:
- **Color tokens** from rectangles, ellipses, and vectors (`$type: "color"`)
- **Spacing tokens** from frames and groups (`$type: "spacing"`)
- **Shadow tokens** from elements with drop shadows (`$type: "shadow"`)
- **Typography tokens** from text elements (`$type: "typography"`)

### Style Dictionary Outputs
The pipeline generates:
- **CSS variables** for light and dark themes
- **SCSS variables** with getter functions
- **TypeScript definitions** for type-safe usage

### Validation
The pipeline includes validation steps:
- Token Studio format validation
- Style Dictionary build testing
- TypeScript build testing
- Custom validation rules

### Artifact Publishing
Build artifacts are published for review and download.

## Manual Execution

You can run the token sync manually:

```bash
# Fetch tokens from Figma (converts to Token Studio format)
npm run fetch:tokens

# Build tokens with Style Dictionary
npm run build:token

# Build TypeScript definitions
npm run build:typescript

# Update PR with changes
npm run update:pr

# Run complete sync (fetch + build + PR)
npm run sync:tokens
```

## Environment Variables

Set these environment variables for local development:

```bash
export FIGMA_ACCESS_TOKEN="your-figma-token"
export FIGMA_FILE_KEY="your-figma-file-key"
export BRANCH_NAME="update-design-tokens"
export COMMIT_MESSAGE="feat: sync design tokens from Figma"
```

## Token Studio Format Examples

### Colors
```json
{
  "Color": {
    "primary": {
      "$type": "color",
      "$value": "#007bff"
    },
    "secondary": {
      "$type": "color",
      "$value": "#6c757d"
    }
  }
}
```

### Spacing
```json
{
  "Spacing": {
    "small": {
      "$type": "spacing",
      "$value": "8px"
    },
    "medium": {
      "$type": "spacing",
      "$value": "16px"
    }
  }
}
```

### Typography
```json
{
  "Typography": {
    "heading-large": {
      "$type": "typography",
      "$value": {
        "fontFamily": "Inter",
        "fontSize": "32px",
        "fontWeight": 700,
        "lineHeight": "40px",
        "letterSpacing": "0px"
      }
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **Pipeline fails to push changes**
   - Check Build Service permissions in repository settings
   - Verify Git configuration in pipeline

2. **Figma API errors**
   - Verify access token is valid
   - Check file key is correct
   - Ensure file is accessible with your token

3. **Token extraction issues**
   - Review Figma file structure
   - Check node IDs in configuration
   - Verify naming conventions

4. **Token Studio format errors**
   - Ensure tokens have `$type` and `$value` properties
   - Check JSON syntax in token files
   - Validate token structure matches expected format

### Debug Mode

Enable debug logging by setting:
```bash
export DEBUG=true
```

## Customization

### Adding New Token Types

1. Update `figmaConfig.tokenStudio.tokenTypes`
2. Add extraction logic in `scripts/fetch-figma-tokens.js`
3. Update validation rules in `figmaConfig.validation.rules`
4. Add Style Dictionary format if needed

### Changing Schedule

Edit the cron expression in `azure-pipelines.yml`:
```yaml
schedules:
- cron: "0 9 * * 1-5"  # 9 AM weekdays
```

### Custom Validation

Add custom validation rules in `figmaConfig.validation.rules` and implement them in the pipeline validation stage.

## Security Considerations

- Store Figma tokens as secret variables
- Use least-privilege access for pipeline permissions
- Regularly rotate access tokens
- Review pipeline logs for sensitive information

## Support

For issues or questions:
1. Check pipeline logs in Azure DevOps
2. Review Figma API documentation
3. Verify configuration settings
4. Test locally before deploying 