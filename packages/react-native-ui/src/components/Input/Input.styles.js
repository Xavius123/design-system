import { StyleSheet } from 'react-native';
import { lightTokens } from '@toyota/design-tokens/js/light';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: parseInt(lightTokens.spacing.md),
  },
  label: {
    fontSize: parseInt(lightTokens.typography.fontSize.sm),
    color: lightTokens.color.text.secondary,
    marginBottom: parseInt(lightTokens.spacing.xs),
    fontWeight: lightTokens.typography.fontWeight.medium,
  },
  required: {
    color: lightTokens.color.error,
  },
  input: {
    borderWidth: 1,
    borderColor: lightTokens.color.border,
    borderRadius: parseInt(lightTokens.borderRadius.md),
    padding: parseInt(lightTokens.spacing.md),
    fontSize: parseInt(lightTokens.typography.fontSize.body),
    color: lightTokens.color.text.primary,
    backgroundColor: lightTokens.color.background,
  },
  sm: {
    padding: parseInt(lightTokens.spacing.sm),
    fontSize: parseInt(lightTokens.typography.fontSize.sm),
  },
  md: {
    padding: parseInt(lightTokens.spacing.md),
    fontSize: parseInt(lightTokens.typography.fontSize.body),
  },
  lg: {
    padding: parseInt(lightTokens.spacing.lg),
    fontSize: parseInt(lightTokens.typography.fontSize.lg),
  },
  inputFocused: {
    borderColor: lightTokens.color.primary,
    shadowColor: lightTokens.color.primary,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
  },
  inputError: {
    borderColor: lightTokens.color.error,
  },
  inputDisabled: {
    opacity: 0.5,
    backgroundColor: lightTokens.color.surface,
  },
  errorMessage: {
    color: lightTokens.color.error,
    fontSize: parseInt(lightTokens.typography.fontSize.sm),
    marginTop: parseInt(lightTokens.spacing.xs),
  },
  helperText: {
    color: lightTokens.color.text.secondary,
    fontSize: parseInt(lightTokens.typography.fontSize.sm),
    marginTop: parseInt(lightTokens.spacing.xs),
  },
});

