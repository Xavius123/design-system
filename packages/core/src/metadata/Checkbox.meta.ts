/**
 * Checkbox Component Metadata
 * 
 * This metadata describes the Checkbox component structure and provides
 * guidance for AI-assisted translation from web to React Native.
 */

export const CheckboxMetadata = {
  componentName: 'Checkbox',
  category: 'form',
  description: 'Checkbox input with label and validation states',
  
  platform: {
    web: {
      baseElement: 'Radix UI Checkbox',
      primitives: ['@radix-ui/react-checkbox', '@radix-ui/react-label'],
      dependencies: ['@radix-ui/react-checkbox', '@radix-ui/react-label']
    },
    native: {
      baseElement: 'Custom Pressable + Animated',
      alternatives: ['@react-native-community/checkbox (basic)', 'expo-checkbox'],
      dependencies: ['react-native'],
      note: 'React Native does not have a built-in checkbox, requires custom implementation'
    }
  },
  
  props: {
    checked: {
      type: 'boolean | "indeterminate"',
      optional: true,
      description: 'Controlled checked state'
    },
    defaultChecked: {
      type: 'boolean',
      default: false,
      description: 'Default checked state (uncontrolled)'
    },
    size: {
      type: 'enum',
      values: ['sm', 'md', 'lg'],
      default: 'md',
      affects: ['width', 'height', 'indicatorSize'],
      description: 'Size of the checkbox'
    },
    label: {
      type: 'string',
      optional: true,
      description: 'Label text displayed next to checkbox'
    },
    error: {
      type: 'boolean',
      default: false,
      affects: ['borderColor'],
      description: 'Whether the checkbox has an error'
    },
    errorMessage: {
      type: 'string',
      optional: true,
      description: 'Error message displayed below checkbox'
    },
    required: {
      type: 'boolean',
      default: false,
      description: 'Whether the checkbox is required'
    },
    disabled: {
      type: 'boolean',
      default: false,
      description: 'Whether the checkbox is disabled'
    }
  },
  
  events: {
    onCheckedChange: {
      web: 'onCheckedChange(checked: boolean | "indeterminate")',
      native: 'onCheckedChange(checked: boolean)',
      description: 'Handler called when checkbox state changes',
      note: 'Indeterminate state typically not used in native'
    }
  },
  
  stateMapping: {
    checked: {
      web: 'data-state="checked" attribute + CSS',
      native: 'Conditional rendering of indicator icon',
      tokenMapping: {
        web: 'background and border color change automatically',
        native: 'manually set background and border based on checked state'
      }
    },
    unchecked: {
      web: 'data-state="unchecked" attribute + CSS',
      native: 'Empty checkbox box',
      tokenMapping: {
        web: 'default border color',
        native: 'default border color from tokens'
      }
    },
    indeterminate: {
      web: 'data-state="indeterminate" + dash icon',
      native: 'Not commonly supported, can be custom implemented',
      tokenMapping: {
        web: 'checked background with dash indicator',
        native: 'requires custom icon and state management'
      }
    },
    focus: {
      web: ':focus CSS pseudo-class on Checkbox.Root',
      native: 'Manual focus state with onFocus/onBlur',
      tokenMapping: {
        web: 'uses focus shadow token',
        native: 'requires state variable for focus styles'
      }
    },
    disabled: {
      web: 'disabled attribute + CSS opacity',
      native: 'disabled prop + manual opacity',
      tokenMapping: {
        web: 'opacity automatically applied',
        native: 'opacity: 0.5 when disabled'
      }
    }
  },
  
  styling: {
    web: {
      approach: 'CSS Modules',
      file: 'Checkbox.module.css',
      tokens: 'Uses CSS variables from design tokens',
      layout: 'Wrapper div with Checkbox.Root and Label.Root',
      indicator: 'SVG checkmark in Checkbox.Indicator'
    },
    native: {
      approach: 'StyleSheet with design tokens',
      file: 'Checkbox.styles.ts',
      tokens: 'Direct import from @toyota/design-tokens/js',
      layout: 'Pressable with View (box) and conditional checkmark icon',
      indicator: 'SVG or vector icon from react-native-svg or custom'
    }
  },
  
  conversionNotes: [
    'Replace Radix Checkbox with custom Pressable component',
    'Implement checkbox box as a View with border',
    'Add checkmark indicator (SVG or icon) that shows when checked',
    'Replace onCheckedChange handler (signature stays same)',
    'Wrap in View instead of div for layout',
    'Replace label with Text component',
    'Handle focus state manually with useState',
    'Animate check/uncheck transition (optional, using Animated API)',
    'Consider using react-native-svg for checkmark icon',
    'Indeterminate state requires custom implementation'
  ],
  
  example: {
    web: `
<Checkbox
  checked={isChecked}
  onCheckedChange={setIsChecked}
  label="Accept terms and conditions"
  required
  error={hasError}
  errorMessage="You must accept the terms"
/>`,
    native: `
<Checkbox
  checked={isChecked}
  onCheckedChange={setIsChecked}
  label="Accept terms and conditions"
  required
  error={hasError}
  errorMessage="You must accept the terms"
/>`
  }
} as const;

export type CheckboxMetadataType = typeof CheckboxMetadata;

