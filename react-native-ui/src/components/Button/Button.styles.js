import { StyleSheet } from 'react-native';
import * as LightTokens from '@toyota/design-tokens/js/light';
import * as DarkTokens from '@toyota/design-tokens/js/dark';

// Helper to parse pixel values to numbers
const parsePx = (value) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.endsWith('px')) {
    return parseFloat(value);
  }
  return parseFloat(value) || 0;
};

// Create styles for light theme
const createLightStyles = () => {
  const tokens = LightTokens;
  
  // Parse spacing values from tokens
  const spacing = {
    xs: parsePx(tokens.TokenLightSpacingXs || '4px'),
    sm: parsePx(tokens.TokenLightSpacingSm || '8px'),
    md: parsePx(tokens.TokenLightSpacingMd || '16px'),
    lg: parsePx(tokens.TokenLightSpacingLg || '24px'),
    xl: parsePx(tokens.TokenLightSpacingXl || '32px'),
  };

  // Parse typography
  const fontSize = {
    small: parsePx(tokens.TokenLightTypographyFontSizeSmall || '14px'),
    body: parsePx(tokens.TokenLightTypographyFontSizeBody || '16px'),
  };

  const fontWeight = {
    button: tokens.TokenLightTypographyFontWeightButton || '500',
  };

  // Parse colors from tokens
  const colors = {
    accentPrimary: tokens.ColorLightAccentPrimary || '#EB0A1E',
    accentHover: tokens.ColorLightAccentHover || '#C00818',
    accentActive: tokens.ColorLightAccentActive || '#F52D3E',
    textPrimary: tokens.ColorLightTextPrimary || '#000000',
    textInverse: tokens.ColorLightTextInverse || '#FFFFFF',
    surfaceSecondary: tokens.ColorLightSurfaceSecondary || '#FAFAFA',
    surfaceTertiary: tokens.ColorLightSurfaceTertiary || '#F5F5F5',
    borderPrimary: tokens.ColorLightBorderPrimary || '#E5E5E5',
  };

  // Parse border radius
  const borderRadius = {
    button: parsePx(tokens.TokenLightBorderRadiusButton || '6px'),
  };

  return StyleSheet.create({
    button: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.button,
      borderWidth: 0,
    },
    // Variants
    primary: {
      backgroundColor: colors.accentPrimary,
    },
    secondary: {
      backgroundColor: colors.surfaceSecondary,
      borderWidth: 1,
      borderColor: colors.borderPrimary,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.borderPrimary,
    },
    // Sizes
    small: {
      height: spacing.md * 2, // 32px
      paddingHorizontal: spacing.sm,
    },
    medium: {
      height: spacing.md * 2.5, // 40px
      paddingHorizontal: spacing.md,
    },
    large: {
      height: spacing.lg * 2, // 48px
      paddingHorizontal: spacing.lg,
    },
    // States
    disabled: {
      opacity: 0.5,
    },
    pressed: {
      opacity: 0.8,
    },
    // Text styles
    text: {
      fontSize: fontSize.small,
      fontWeight: fontWeight.button,
      textAlign: 'center',
    },
    primaryText: {
      color: colors.textInverse,
    },
    secondaryText: {
      color: colors.textPrimary,
    },
    ghostText: {
      color: colors.textPrimary,
    },
    outlineText: {
      color: colors.textPrimary,
    },
    smallText: {
      fontSize: fontSize.small,
    },
    mediumText: {
      fontSize: fontSize.small,
    },
    largeText: {
      fontSize: fontSize.body,
    },
  });
};

// Create styles for dark theme
const createDarkStyles = () => {
  const tokens = DarkTokens;
  
  const spacing = {
    xs: parsePx(tokens.TokenDarkSpacingXs || '4px'),
    sm: parsePx(tokens.TokenDarkSpacingSm || '8px'),
    md: parsePx(tokens.TokenDarkSpacingMd || '16px'),
    lg: parsePx(tokens.TokenDarkSpacingLg || '24px'),
    xl: parsePx(tokens.TokenDarkSpacingXl || '32px'),
  };

  const fontSize = {
    small: parsePx(tokens.TokenDarkTypographyFontSizeSmall || '14px'),
    body: parsePx(tokens.TokenDarkTypographyFontSizeBody || '16px'),
  };

  const fontWeight = {
    button: tokens.TokenDarkTypographyFontWeightButton || '500',
  };

  const colors = {
    accentPrimary: tokens.ColorDarkAccentPrimary || '#EB0A1E',
    accentHover: tokens.ColorDarkAccentHover || '#F52D3E',
    accentActive: tokens.ColorDarkAccentActive || '#C00818',
    textPrimary: tokens.ColorDarkTextPrimary || '#FFFFFF',
    textInverse: tokens.ColorDarkTextInverse || '#000000',
    surfaceSecondary: tokens.ColorDarkSurfaceSecondary || '#262626',
    surfaceTertiary: tokens.ColorDarkSurfaceTertiary || '#525252',
    borderPrimary: tokens.ColorDarkBorderPrimary || '#404040',
  };

  const borderRadius = {
    button: parsePx(tokens.TokenDarkBorderRadiusButton || '6px'),
  };

  return StyleSheet.create({
    button: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.button,
      borderWidth: 0,
    },
    primary: {
      backgroundColor: colors.accentPrimary,
    },
    secondary: {
      backgroundColor: colors.surfaceSecondary,
      borderWidth: 1,
      borderColor: colors.borderPrimary,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.borderPrimary,
    },
    small: {
      height: spacing.md * 2,
      paddingHorizontal: spacing.sm,
    },
    medium: {
      height: spacing.md * 2.5,
      paddingHorizontal: spacing.md,
    },
    large: {
      height: spacing.lg * 2,
      paddingHorizontal: spacing.lg,
    },
    disabled: {
      opacity: 0.5,
    },
    pressed: {
      opacity: 0.8,
    },
    text: {
      fontSize: fontSize.small,
      fontWeight: fontWeight.button,
      textAlign: 'center',
    },
    primaryText: {
      color: colors.textInverse,
    },
    secondaryText: {
      color: colors.textPrimary,
    },
    ghostText: {
      color: colors.textPrimary,
    },
    outlineText: {
      color: colors.textPrimary,
    },
    smallText: {
      fontSize: fontSize.small,
    },
    mediumText: {
      fontSize: fontSize.small,
    },
    largeText: {
      fontSize: fontSize.body,
    },
  });
};

// Export default light theme styles
const styles = createLightStyles();

// Export function to get theme-specific styles
export const getThemeStyles = (theme = 'light') => {
  return theme === 'dark' ? createDarkStyles() : createLightStyles();
};

export default styles;

