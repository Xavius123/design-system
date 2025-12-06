# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- ThemeProvider component and useTheme hook for theme management
- ErrorBoundary component for error handling
- Dark mode support for all components
- ESLint configuration with React rules
- Prettier format scripts
- Token validation script
- Bundle size checking script
- CSS variable fallbacks for better browser support
- Accessibility improvements (aria-label fallbacks)
- Build validation to ensure tokens are built before component build

### Changed
- Replaced deprecated `substr()` with `crypto.randomUUID()` for ID generation
- Updated package.json with proper organization name and repository
- Fixed Azure Pipeline configuration
- Improved error handling in CSS bundling plugin
- Added input validation to prevent value and defaultValue conflicts

### Fixed
- Removed Tailwind classes from Storybook stories
- Replaced hardcoded pixel values with design tokens
- Fixed CSS bundling error handling to fail builds on errors

## [1.0.0] - 2024-12-06

### Added
- Initial release
- Button component with variants (primary, secondary, ghost, outline) and sizes (sm, md, lg)
- Input component with label, error states, and helper text
- Checkbox component with label support
- Design token system with light and dark themes
- Storybook configuration for component documentation
- Vite build configuration for npm package distribution

