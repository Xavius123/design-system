/**
 * Input Component Metadata
 * 
 * This metadata describes the Input component structure and provides
 * guidance for AI-assisted translation from web to React Native.
 */

export const InputMetadata = {
  componentName: 'Input',
  category: 'form',
  description: 'Text input field with label, validation, and helper text',
  
  platform: {
    web: {
      baseElement: 'input',
      primitives: ['Radix UI Label'],
      dependencies: ['@radix-ui/react-label']
    },
    native: {
      baseElement: 'TextInput',
      alternatives: [],
      dependencies: ['react-native']
    }
  },
  
  props: {
    type: {
      type: 'enum',
      values: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      default: 'text',
      description: 'Type of input',
      platformDifferences: {
        web: 'HTML input type attribute',
        native: 'Maps to keyboardType and secureTextEntry props'
      }
    },
    size: {
      type: 'enum',
      values: ['sm', 'md', 'lg'],
      default: 'md',
      affects: ['height', 'padding', 'fontSize'],
      description: 'Size of the input'
    },
    label: {
      type: 'string',
      optional: true,
      description: 'Label text displayed above input'
    },
    placeholder: {
      type: 'string',
      optional: true,
      description: 'Placeholder text shown when input is empty'
    },
    error: {
      type: 'boolean',
      default: false,
      affects: ['borderColor', 'textColor'],
      description: 'Whether the input has an error'
    },
    errorMessage: {
      type: 'string',
      optional: true,
      description: 'Error message displayed below input when error is true'
    },
    helperText: {
      type: 'string',
      optional: true,
      description: 'Helper text displayed below input'
    },
    required: {
      type: 'boolean',
      default: false,
      description: 'Whether the input is required'
    },
    disabled: {
      type: 'boolean',
      default: false,
      description: 'Whether the input is disabled'
    },
    fullWidth: {
      type: 'boolean',
      default: false,
      webOnly: true,
      description: 'Whether input takes full width (web only)'
    }
  },
  
  events: {
    onChange: {
      web: 'onChange with event.target.value',
      native: 'onChangeText with text directly',
      description: 'Handler called when input value changes'
    },
    onBlur: {
      web: 'onBlur with event',
      native: 'onBlur without event',
      description: 'Handler called when input loses focus'
    },
    onFocus: {
      web: 'onFocus with event',
      native: 'onFocus without event',
      description: 'Handler called when input gains focus'
    }
  },
  
  stateMapping: {
    focus: {
      web: ':focus CSS pseudo-class',
      native: 'Manual state management with onFocus/onBlur',
      tokenMapping: {
        web: 'uses border-focus and shadow-focus tokens',
        native: 'requires state to conditionally apply focus styles'
      }
    },
    error: {
      web: 'error prop + conditional CSS class',
      native: 'error prop + conditional style',
      tokenMapping: {
        web: 'uses error-primary color for border',
        native: 'uses error-primary color conditionally'
      }
    },
    disabled: {
      web: 'disabled attribute + CSS',
      native: 'editable={!disabled} prop + conditional styling',
      tokenMapping: {
        web: 'background and color change automatically',
        native: 'manually set background and color based on disabled prop'
      }
    }
  },
  
  typeMapping: {
    text: { native: { keyboardType: 'default' } },
    email: { native: { keyboardType: 'email-address', autoCapitalize: 'none' } },
    password: { native: { secureTextEntry: true } },
    number: { native: { keyboardType: 'numeric' } },
    tel: { native: { keyboardType: 'phone-pad' } },
    url: { native: { keyboardType: 'url', autoCapitalize: 'none' } },
    search: { native: { keyboardType: 'default', returnKeyType: 'search' } }
  },
  
  styling: {
    web: {
      approach: 'CSS Modules',
      file: 'Input.module.css',
      tokens: 'Uses CSS variables from design tokens',
      layout: 'Wrapper div with label, input, and message elements'
    },
    native: {
      approach: 'StyleSheet with design tokens',
      file: 'Input.styles.ts',
      tokens: 'Direct import from @toyota/design-tokens/js',
      layout: 'View wrapper with Text label, TextInput, and Text message'
    }
  },
  
  conversionNotes: [
    'Replace input element with TextInput',
    'Replace onChange with onChangeText',
    'Map type prop to keyboardType and secureTextEntry',
    'Replace label element with Text component',
    'Wrap in View instead of div',
    'Convert error/helper messages to Text components',
    'Handle focus state manually with useState',
    'Convert fullWidth to flex: 1 or width: "100%"',
    'Add autoCapitalize, autoCorrect props as needed'
  ],
  
  example: {
    web: `
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={hasError}
  errorMessage="Invalid email"
  required
/>`,
    native: `
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  error={hasError}
  errorMessage="Invalid email"
  required
/>`
  }
} as const;

export type InputMetadataType = typeof InputMetadata;

