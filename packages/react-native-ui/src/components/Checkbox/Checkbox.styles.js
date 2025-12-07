import { StyleSheet } from 'react-native';
import { lightTokens } from '@toyota/design-tokens/js/light';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: parseInt(lightTokens.spacing.sm),
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderWidth: 2,
    borderColor: lightTokens.color.border,
    borderRadius: parseInt(lightTokens.borderRadius.sm),
    backgroundColor: lightTokens.color.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sm: {
    width: 16,
    height: 16,
  },
  md: {
    width: 20,
    height: 20,
  },
  lg: {
    width: 24,
    height: 24,
  },
  checkboxChecked: {
    backgroundColor: lightTokens.color.primary,
    borderColor: lightTokens.color.primary,
  },
  checkboxError: {
    borderColor: lightTokens.color.error,
  },
  checkboxFocused: {
    shadowColor: lightTokens.color.primary,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
  },
  checkboxDisabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: parseInt(lightTokens.typography.fontSize.body),
    color: lightTokens.color.text.primary,
    marginLeft: parseInt(lightTokens.spacing.sm),
  },
  labelDisabled: {
    color: lightTokens.color.text.secondary,
  },
  required: {
    color: lightTokens.color.error,
  },
  errorMessage: {
    color: lightTokens.color.error,
    fontSize: parseInt(lightTokens.typography.fontSize.sm),
    marginTop: parseInt(lightTokens.spacing.xs),
    marginLeft: parseInt(lightTokens.spacing.md) + 20,
  },
});

