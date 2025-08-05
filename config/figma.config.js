export const figmaConfig = {
  // Figma API settings
  api: {
    baseUrl: 'https://api.figma.com/v1',
    timeout: 30000, // 30 seconds
  },

  // Token Studio format settings
  tokenStudio: {
    // Token types to extract
    tokenTypes: {
      colors: {
        $type: 'color',
        extractFrom: ['RECTANGLE', 'ELLIPSE', 'VECTOR'],
        naming: {
          prefix: '',
          separator: '-',
          case: 'kebab'
        }
      },
      spacing: {
        $type: 'spacing',
        extractFrom: ['FRAME', 'GROUP', 'INSTANCE'],
        naming: {
          prefix: '',
          separator: '-',
          case: 'kebab'
        }
      },
      shadows: {
        $type: 'shadow',
        extractFrom: ['RECTANGLE', 'FRAME', 'GROUP'],
        naming: {
          prefix: '',
          separator: '-',
          case: 'kebab'
        }
      },
      typography: {
        $type: 'typography',
        extractFrom: ['TEXT'],
        naming: {
          prefix: '',
          separator: '-',
          case: 'kebab'
        }
      }
    },

    // Color format preferences
    colors: {
      format: 'hex', // 'hex', 'rgb', 'hsl'
      includeAlpha: true
    },

    // Spacing preferences
    spacing: {
      unit: 'px',
      roundToNearest: 1
    }
  },

  // File-specific settings
  files: {
    // You can configure multiple Figma files
    designSystem: {
      fileKey: process.env.FIGMA_FILE_KEY || 'your-figma-file-key',
      nodeIds: {
        colors: process.env.FIGMA_COLOR_NODE_IDS?.split(',') || [],
        spacing: process.env.FIGMA_SPACING_NODE_IDS?.split(',') || [],
        shadows: process.env.FIGMA_SHADOW_NODE_IDS?.split(',') || [],
        typography: process.env.FIGMA_TYPOGRAPHY_NODE_IDS?.split(',') || []
      }
    }
  },

  // Output settings
  output: {
    // Directory where token files will be saved
    tokensDir: './tokens',
    
    // File naming patterns for Token Studio
    files: {
      colors: 'colors.json',
      spaces: 'spaces.json',
      shadows: 'shadows.json',
      typography: 'typography.json'
    },

    // Backup settings
    backup: {
      enabled: true,
      dir: './tokens/backup',
      maxBackups: 5
    }
  },

  // Validation settings
  validation: {
    // Validate token values before saving
    enabled: true,
    
    // Rules for validation
    rules: {
      colors: {
        requireValidHex: true,
        requireValidRgb: true
      },
      spacing: {
        requirePositiveValues: true,
        maxValue: 1000
      },
      shadows: {
        requireValidFormat: true
      },
      typography: {
        requireValidFontFamily: true,
        requireValidFontSize: true
      }
    }
  }
};

export default figmaConfig; 