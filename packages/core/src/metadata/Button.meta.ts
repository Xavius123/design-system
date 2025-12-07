/**
 * Button Component Metadata
 * 
 * This metadata describes the Button component structure and provides
 * guidance for AI-assisted translation from web to React Native.
 */

export const ButtonMetadata = {
  componentName: 'Button',
  category: 'interaction',
  description: 'Primary interactive element for user actions',
  
  platform: {
    web: {
      baseElement: 'button',
      primitives: ['Radix UI Slot for asChild prop'],
      dependencies: ['@radix-ui/react-slot']
    },
    native: {
      baseElement: 'Pressable',
      alternatives: ['TouchableOpacity', 'TouchableHighlight'],
      dependencies: ['react-native']
    }
  },
  
  props: {
    variant: {
      type: 'enum',
      values: ['primary', 'secondary', 'ghost', 'outline'],
      default: 'primary',
      affects: ['background', 'border', 'text'],
      description: 'Visual style variant of the button'
    },
    size: {
      type: 'enum',
      values: ['sm', 'md', 'lg'],
      default: 'md',
      affects: ['height', 'padding', 'fontSize'],
      description: 'Size of the button'
    },
    disabled: {
      type: 'boolean',
      default: false,
      affects: ['opacity', 'pointerEvents'],
      description: 'Whether the button is disabled'
    },
    asChild: {
      type: 'boolean',
      default: false,
      webOnly: true,
      description: 'Render as a child using Radix Slot (web only)'
    }
  },
  
  events: {
    onClick: {
      web: 'onClick',
      native: 'onPress',
      description: 'Handler called when button is pressed'
    }
  },
  
  stateMapping: {
    hover: {
      web: ':hover CSS pseudo-class',
      native: 'onPressIn/onPressOut callbacks or Pressable pressed state',
      tokenMapping: {
        web: 'uses hover token from design system',
        native: 'uses hover token, applied via pressed state'
      }
    },
    active: {
      web: ':active CSS pseudo-class',
      native: 'Pressable pressed state',
      tokenMapping: {
        web: 'uses active token',
        native: 'uses active token via pressed state'
      }
    },
    focus: {
      web: ':focus-visible CSS pseudo-class',
      native: 'onFocus callback',
      tokenMapping: {
        web: 'uses focus shadow token',
        native: 'requires manual state management'
      }
    },
    disabled: {
      web: ':disabled attribute + CSS',
      native: 'disabled prop + conditional styling',
      tokenMapping: {
        web: 'opacity reduced automatically',
        native: 'opacity manually set to 0.5'
      }
    }
  },
  
  styling: {
    web: {
      approach: 'CSS Modules',
      file: 'Button.module.css',
      tokens: 'Uses CSS variables from design tokens',
      variants: 'Class composition based on props'
    },
    native: {
      approach: 'StyleSheet with design tokens',
      file: 'Button.styles.ts',
      tokens: 'Direct import from @toyota/design-tokens/js',
      variants: 'Style array composition based on props'
    }
  },
  
  conversionNotes: [
    'Replace onClick with onPress',
    'Replace button element with Pressable',
    'Replace Text content with <Text> component',
    'Convert CSS Modules to StyleSheet.create()',
    'Map hover state to Pressable pressed prop',
    'Remove asChild prop (web-specific)',
    'Add activeOpacity for better feedback (optional)'
  ],
  
  example: {
    web: `
<Button 
  variant="primary" 
  size="md" 
  onClick={handleClick}
  disabled={isLoading}
>
  Submit
</Button>`,
    native: `
<Button 
  variant="primary" 
  size="md" 
  onPress={handlePress}
  disabled={isLoading}
>
  Submit
</Button>`
  }
} as const;

export type ButtonMetadataType = typeof ButtonMetadata;

