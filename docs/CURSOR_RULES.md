# Cursor Rules

This project uses Cursor rules in `.cursor/rules/` to enforce standards and conventions.

## Active Rules

### 1. Documentation Organization
**File**: `.cursor/rules/documentation-organization.mdc`  
**Scope**: Always applies  
**Purpose**: Ensures all new documentation goes in `docs/` folder

**Key requirement**: Only README.md, CHANGELOG.md, and CONTRIBUTING.md belong in root.

### 2. Mitosis Components
**File**: `.cursor/rules/mitosis-components.mdc`  
**Scope**: `source/redhorn-components/**/*.lite.tsx`  
**Purpose**: Standards for writing Mitosis components

**Key requirements**:
- JSX pragma required: `/** @jsxImportSource @builder.io/mitosis */`
- Use `class` not `className`
- Use `useStore` for computed values
- Keep cross-framework compatible

### 3. Package Publishing
**File**: `.cursor/rules/package-publishing.mdc`  
**Scope**: `packages/*/package.json`  
**Purpose**: Publishing and versioning standards

**Key requirements**:
- Published packages need `publishConfig: { "access": "public" }`
- All packages version together (synchronized)
- Source package stays private

### 4. Storybook Documentation
**File**: `.cursor/rules/storybook-documentation.mdc`  
**Scope**: `packages/react/stories/**/*.mdx`  
**Purpose**: Multi-framework Storybook documentation format

**Key requirements**:
- Use MDX format (not TSX)
- Include all 4 framework examples
- Show live React previews
- Document all props

### 5. Build Workflow
**File**: `.cursor/rules/build-workflow.mdc`  
**Scope**: Always applies  
**Purpose**: Standard development workflow

**Key requirements**:
- Never edit generated files
- Always edit source in `source/redhorn-components`
- Build before preview
- Version all packages together

### 6. Package Structure
**File**: `.cursor/rules/package-structure.mdc`  
**Scope**: Always applies  
**Purpose**: Folder organization and package roles

**Key requirements**:
- Source in `source/redhorn-components/`
- Generated outputs in framework folders
- Storybook in `packages/react/stories/`

## How Rules Work

Rules automatically activate when:
- **Always apply rules** - Active in every session
- **File-specific rules** - Active when matching files are open

## Benefits

- Consistent component development
- Proper documentation placement
- Correct publishing workflow
- Prevents common mistakes
- Enforces best practices

## Editing Rules

Rules are in `.cursor/rules/*.mdc` files with YAML frontmatter.

To add a new rule:
1. Create `.mdc` file in `.cursor/rules/`
2. Add frontmatter (description, globs, alwaysApply)
3. Write clear, actionable content

## Rule Summary

| Rule | When Active | Purpose |
|------|-------------|---------|
| documentation-organization | Always | Docs in docs/ folder |
| mitosis-components | .lite.tsx files | Component standards |
| package-publishing | package.json files | Publishing config |
| storybook-documentation | .mdx stories | Multi-framework docs |
| build-workflow | Always | Development process |
| package-structure | Always | Folder organization |
