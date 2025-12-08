# MCP Setup Guide for Redhorn Design System

Guide for configuring and using Model Context Protocol (MCP) servers with Cursor IDE to enhance design system development.

## What is MCP?

Model Context Protocol (MCP) is an open protocol that enables AI assistants to connect to external tools and data sources. For the Redhorn Design System, MCP servers provide:

- **Filesystem access** - Deep code understanding across all packages
- **Git integration** - Diff viewing, branch management, PR preparation
- **Figma integration** - Design specs, tokens, and component mapping
- **Token pipelines** - Automated token generation for multiple platforms

---

## MCP Goals for Redhorn Design System

### Priority 1: Filesystem MCP
**Purpose:** Understand and navigate the entire codebase

**Use Cases:**
- Read all code under `packages/` directory
- Understand component structure and relationships
- Parse Storybook stories and metadata
- Navigate design token files
- Help refactor and generate new components

**Example Queries:**
- "Show me all Button component variants across web and native"
- "What design tokens are used by the Input component?"
- "Generate a new Card component following existing patterns"

### Priority 2: Git MCP
**Purpose:** Manage version control and collaboration

**Use Cases:**
- Show diffs between branches
- View commit history for specific components
- Propose refactors as PR-ready changes
- Enforce consistent patterns across packages
- Generate meaningful commit messages

**Example Queries:**
- "Show me what changed in the last 5 commits to Button.tsx"
- "Create a PR for updating all components to use new tokens"
- "What files would be affected if I change the primary color token?"

### Priority 3: Figma MCP
**Purpose:** Bridge design and development

**Use Cases:**
- Read Figma component specifications
- Extract design tokens from Figma styles
- Map Figma variants to React props
- Generate Storybook stories from Figma frames
- Sync component metadata between Figma and code

**Example Queries:**
- "Generate Button component props based on Figma variants"
- "What spacing tokens are used in this Figma component?"
- "Create Storybook MDX documentation from Figma frame"

### Priority 4: Tokens MCP (Optional but Desired)
**Purpose:** Automate token generation for multiple platforms

**Use Cases:**
- Read token source files (`packages/tokens/*.json`)
- Generate CSS variables (`dist/css/light.css`)
- Generate SCSS maps for legacy projects
- Generate TypeScript enums (`@redhorn/core`)
- Generate React Native StyleSheet tokens

**Example Queries:**
- "Generate TypeScript types for all color tokens"
- "Convert spacing tokens to React Native StyleSheet"
- "Create SCSS variables from design tokens"

---

## Setting Up MCP Servers

### 1. Filesystem MCP Server

**Installation:**

MCP servers are configured in Cursor's settings. Access via:
1. Open Cursor Settings (Cmd/Ctrl + ,)
2. Search for "MCP"
3. Configure MCP servers

**Configuration:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/design-system"],
      "env": {}
    }
  }
}
```

**Permissions:**
Grant read/write access to:
- `packages/` - All package source code
- `docs/` - Documentation
- `scripts/` - Build and utility scripts
- `config/` - Configuration files

**Usage Examples:**

```
"Read all Button component files across packages"
→ Finds: packages/react-ui/src/components/Button/*
         packages/react-native-ui/src/components/Button/*
         packages/core/src/metadata/Button.meta.ts

"Show me the component export pattern"
→ Analyzes: packages/react-ui/src/components/index.js
           packages/react-ui/src/index.js

"What design tokens does Input component use?"
→ Reads: packages/react-ui/src/components/Input/Input.module.css
        Extracts: var(--color-light-border), var(--spacing-md), etc.
```

---

### 2. Git MCP Server

**Installation:**

```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git", "/path/to/design-system"],
      "env": {}
    }
  }
}
```

**Permissions:**
- Repository path: `/path/to/design-system`
- Branch access: All branches
- Commit history: Full access

**Usage Examples:**

```
"Show me recent changes to design tokens"
→ git log --oneline packages/tokens/

"What files changed in the last commit?"
→ git diff HEAD~1 --name-status

"Create a feature branch for adding size variants"
→ git checkout -b feature/component-sizes

"Show me all commits that modified Button.tsx"
→ git log packages/react-ui/src/components/Button/Button.tsx
```

**PR Workflow:**

```
1. "Show current branch status"
   → git status

2. "Stage all component changes"
   → git add packages/react-ui/src/components/

3. "Generate commit message for these changes"
   → Analyzes diff and suggests semantic commit message

4. "Prepare PR description for this branch"
   → Summarizes changes with context
```

---

### 3. Figma MCP Server

**Installation:**

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-figma"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-figma-token-here"
      }
    }
  }
}
```

**Getting Figma Access Token:**
1. Go to Figma Settings → Account
2. Scroll to Personal Access Tokens
3. Click "Create new token"
4. Copy token and add to MCP config

**Required Figma Setup:**

In your Figma design file:
- Use consistent naming conventions
- Organize components in clear hierarchies
- Apply design tokens as Figma styles
- Use component properties for variants
- Add descriptions to components

**Usage Examples:**

```
"Read Button component from Figma"
→ Fetches: Component name, variants, properties, tokens used

"Map Figma variants to React props"
→ Input: Figma variants (Size: Small/Medium/Large, Style: Primary/Secondary)
→ Output:
  interface ButtonProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary';
  }

"Generate Storybook story from Figma"
→ Creates: Button.stories.tsx with all Figma variants as stories

"Extract color tokens from Figma styles"
→ Outputs: JSON token file with all colors
```

**Design-to-Code Workflow:**

```
1. "Show me new components in Figma file"
   → Lists components not yet in codebase

2. "Generate React component from Figma Badge component"
   → Creates Badge.tsx following existing patterns

3. "Create Storybook stories for all Figma variants"
   → Generates Badge.stories.tsx with all combinations

4. "Update tokens based on Figma style changes"
   → Syncs colors-light.json with Figma color styles
```

---

### 4. Tokens MCP Server (Custom)

**Note:** This may require a custom MCP server implementation specific to Redhorn's token system.

**Desired Functionality:**

**Input:**
- Token source: `packages/tokens/*.json`
- Token structure: Colors, typography, spacing, etc.

**Output Targets:**
1. **CSS Variables** (already handled by Style Dictionary)
2. **SCSS Maps** (for legacy projects)
3. **TypeScript Enums** (for type-safe token access)
4. **React Native StyleSheet** (platform-specific)

**Custom MCP Server Structure:**

```javascript
// mcp-servers/tokens/index.js
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'redhorn-tokens',
  version: '1.0.0',
});

// Tool: Read tokens
server.tool('read-tokens', async () => {
  // Read from packages/tokens/*.json
  // Return parsed token structure
});

// Tool: Generate CSS variables
server.tool('generate-css-vars', async (tokens) => {
  // Transform to CSS custom properties
  // Return CSS output
});

// Tool: Generate TypeScript enums
server.tool('generate-ts-enums', async (tokens) => {
  // Transform to TypeScript enums
  // Return TS output
});

// Tool: Generate React Native tokens
server.tool('generate-rn-tokens', async (tokens) => {
  // Transform to RN StyleSheet compatible format
  // Return JS/TS output
});
```

**Configuration:**

```json
{
  "mcpServers": {
    "tokens": {
      "command": "node",
      "args": ["mcp-servers/tokens/index.js"],
      "env": {}
    }
  }
}
```

**Usage Examples:**

```
"Generate TypeScript enums from color tokens"
→ Input: packages/tokens/colors-light.json
→ Output:
  export enum ColorToken {
    Primary = 'color.light.primary',
    PrimaryHover = 'color.light.primaryHover',
    // ...
  }

"Convert spacing tokens to React Native"
→ Input: packages/tokens/spaces.json
→ Output:
  export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  };

"Generate SCSS map from typography tokens"
→ Input: packages/tokens/typography.json
→ Output:
  $typography: (
    'fontSize': (
      'sm': 14px,
      'body': 16px,
      'lg': 18px
    )
  );
```

---

## Common Workflows with MCP

### Workflow 1: Creating a New Component

```
1. "Read existing Button component structure"
   → MCP Filesystem shows all Button files

2. "Check Figma for Badge component specs"
   → MCP Figma fetches Badge design

3. "Generate Badge component following Button pattern"
   → Creates Badge.tsx, Badge.module.css, etc.

4. "Create Storybook stories from Figma variants"
   → Generates Badge.stories.tsx

5. "Extract tokens used in Figma Badge"
   → Identifies color-primary, spacing-sm, etc.

6. "Create PR for new Badge component"
   → MCP Git stages changes and drafts PR
```

### Workflow 2: Updating Design Tokens

```
1. "Show current primary color token value"
   → MCP Filesystem reads colors-light.json

2. "Find all components using color-primary"
   → Searches across packages/react-ui/

3. "Check Figma for new primary color value"
   → MCP Figma reads color styles

4. "Update token and generate outputs"
   → MCP Tokens regenerates CSS, TS, RN outputs

5. "Show git diff for token changes"
   → MCP Git displays affected files

6. "Run visual regression tests"
   → Suggests: npm run chromatic
```

### Workflow 3: Syncing Figma to Code

```
1. "List components in Figma file"
   → MCP Figma fetches all components

2. "Compare with codebase components"
   → MCP Filesystem lists existing components

3. "Identify missing components"
   → Returns: Badge, Alert, Toast not in code

4. "Generate Badge component from Figma"
   → Creates complete component with stories

5. "Sync token values from Figma styles"
   → Updates packages/tokens/*.json

6. "Create changeset for new components"
   → Prepares version bump and changelog
```

### Workflow 4: Cross-Platform Component Development

```
1. "Show web Button component implementation"
   → MCP Filesystem reads packages/react-ui/Button/

2. "Show React Native Button implementation"
   → MCP Filesystem reads packages/react-native-ui/Button/

3. "Compare prop interfaces"
   → Identifies differences in ButtonProps

4. "Generate missing props for RN Button"
   → Adds web props to RN component

5. "Convert CSS tokens to RN StyleSheet"
   → MCP Tokens transforms variables

6. "Update metadata for AI translation"
   → Updates packages/core/metadata/Button.meta.ts
```

---

## MCP Best Practices for Redhorn

### 1. Consistent Naming
- Use same component names in Figma, React, and React Native
- Follow PascalCase for components
- Use kebab-case for token names

### 2. Structured Queries
**Good:**
```
"Generate Button component following existing patterns with variants: primary, secondary, ghost"
```

**Bad:**
```
"Make button"
```

### 3. Leverage Context
```
"Based on the Input component, create a Select component with similar structure"
→ MCP understands existing patterns
```

### 4. Token-First Development
```
"Check if spacing-lg token exists before using it"
→ Validates token availability
→ Suggests alternatives if missing
```

### 5. Multi-Package Awareness
```
"Update Button across web, native, and core packages"
→ MCP coordinates changes across all packages
```

---

## Troubleshooting

### MCP Server Not Responding
**Problem:** MCP server doesn't execute commands

**Solutions:**
1. Check MCP server is running in Cursor settings
2. Verify file paths in configuration
3. Restart Cursor
4. Check server logs in Cursor developer tools

### Figma Token Not Working
**Problem:** Cannot access Figma file

**Solutions:**
1. Verify `FIGMA_ACCESS_TOKEN` in MCP config
2. Ensure token has read access to file
3. Check Figma file URL/ID is correct
4. Regenerate token if expired

### Git Permissions Issues
**Problem:** Cannot commit or create branches

**Solutions:**
1. Verify Git MCP has write permissions
2. Check repository path is correct
3. Ensure not in detached HEAD state
4. Verify SSH/HTTPS authentication

### Token Generation Fails
**Problem:** Custom token MCP not working

**Solutions:**
1. Verify custom MCP server is installed
2. Check token JSON syntax is valid
3. Review server logs for errors
4. Test with simple token first

---

## Future MCP Enhancements

### Planned Improvements

**1. Storybook MCP**
- Read existing stories
- Generate story variations
- Update story parameters
- Sync with Figma specs

**2. Testing MCP**
- Generate interaction tests
- Create visual regression tests
- Run test suites
- Report coverage

**3. Documentation MCP**
- Generate component docs
- Update migration guides
- Create API references
- Sync with Storybook MDX

**4. Package Publishing MCP**
- Check version compatibility
- Generate changelogs
- Publish to npm
- Update dependencies

---

## Resources

### Official MCP Documentation
- **MCP Protocol Spec:** https://spec.modelcontextprotocol.io/
- **MCP SDK:** https://github.com/modelcontextprotocol/sdk
- **Cursor MCP Guide:** Check Cursor documentation

### Redhorn-Specific
- [Repository Improvements](./REPO_IMPROVEMENTS.md) - Tools overview
- [Storybook Addons](./STORYBOOK_ADDONS.md) - Storybook configuration
- [Chromatic Guide](./CHROMATIC.md) - Visual regression testing
- [Advanced Improvements](./ADVANCED_IMPROVEMENTS.md) - Detailed tooling

### MCP Server Examples
- **Filesystem:** `@modelcontextprotocol/server-filesystem`
- **Git:** `@modelcontextprotocol/server-git`
- **GitHub:** `@modelcontextprotocol/server-github`
- **Figma:** Community implementations (search npm)

---

## Quick Reference

### Common MCP Commands

```bash
# Filesystem
"Read all components in packages/react-ui"
"Find files using color-primary token"
"Show component directory structure"

# Git
"Show uncommitted changes"
"Create branch feature/new-component"
"View last 10 commits"
"Generate commit message for staged changes"

# Figma
"Fetch Button component from Figma"
"List all color styles in Figma file"
"Show component properties for Badge"
"Export design tokens from Figma"

# Tokens
"Generate CSS variables from tokens"
"Convert tokens to TypeScript"
"Show React Native token format"
"List all spacing tokens"
```

---

**Last Updated:** December 2024  
**Maintained by:** Redhorn Design System Team

**Questions?** Open an issue or check [CONTRIBUTING.md](../CONTRIBUTING.md)


