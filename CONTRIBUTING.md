# Contributing to Design System

Thank you for your interest in contributing to the Toyota Design System! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/toyota/design-system.git
   cd design-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build tokens**
   ```bash
   npm run build:token
   ```

4. **Start Storybook**
   ```bash
   npm run storybook
   ```

## Development Workflow

### Making Changes

1. Create a new branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards

3. Test your changes
   ```bash
   npm run lint
   npm run format:check
   npm run build
   ```

4. Commit your changes with a clear message
   ```bash
   git commit -m "feat: add new component"
   ```

### Code Standards

- **Formatting**: Run `npm run format` before committing
- **Linting**: Fix all ESLint errors with `npm run lint:fix`
- **Components**: Use functional components with hooks
- **Styling**: Use CSS Modules with design tokens
- **Documentation**: Add JSDoc comments to all public APIs

### Component Guidelines

1. **Use Radix UI primitives** for accessibility
2. **Follow the component structure**:
   ```
   ComponentName/
   ├── ComponentName.jsx
   ├── ComponentName.module.css
   ├── ComponentName.stories.jsx
   └── index.js
   ```

3. **Use design tokens** for all styling values
4. **Support dark mode** using `[data-theme="dark"]` selectors
5. **Add PropTypes** for all component props
6. **Include Storybook stories** for all variants and states

### Design Tokens

- Tokens are defined in `tokens/*.json` files
- Use Style Dictionary format with `$type` and `$value`
- Build tokens with `npm run build:token`
- Always validate tokens before building components

## Pull Request Process

1. **Update CHANGELOG.md** with your changes
2. **Ensure all checks pass** (linting, formatting, build)
3. **Add tests** if applicable
4. **Update documentation** if needed
5. **Request review** from maintainers

### PR Title Format

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Testing

- Run Storybook to visually test components
- Ensure components work in both light and dark themes
- Test accessibility with keyboard navigation and screen readers
- Verify responsive behavior

## Questions?

If you have questions or need help, please:
- Open an issue for bugs or feature requests
- Check existing documentation in the `docs/` directory
- Reach out to the design system team

Thank you for contributing! 🎉

