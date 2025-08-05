import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Figma API configuration
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const FIGMA_NODE_IDS = process.env.FIGMA_NODE_IDS?.split(',') || [];

if (!FIGMA_ACCESS_TOKEN) {
  console.error('❌ FIGMA_ACCESS_TOKEN environment variable is required');
  process.exit(1);
}

if (!FIGMA_FILE_KEY) {
  console.error('❌ FIGMA_FILE_KEY environment variable is required');
  process.exit(1);
}

console.log('🎨 Fetching design tokens from Figma...');

async function fetchFigmaTokens() {
  try {
    const tokens = {
      Color: {},
      Spacing: {},
      Shadow: {},
      Typography: {}
    };

    // Fetch file information from Figma
    const fileResponse = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`, {
      headers: {
        'X-Figma-Token': FIGMA_ACCESS_TOKEN
      }
    });

    if (!fileResponse.ok) {
      throw new Error(`Failed to fetch Figma file: ${fileResponse.statusText}`);
    }

    const fileData = await fileResponse.json();
    
    // Extract tokens from Figma file
    await extractTokensFromFigma(fileData.document, tokens);

    // Update token files in Token Studio format
    await updateTokenFiles(tokens);

    console.log('✅ Tokens fetched and updated successfully!');
    
    // Return tokens for pipeline use
    return tokens;
  } catch (error) {
    console.error('❌ Error fetching Figma tokens:', error);
    throw error;
  }
}

async function extractTokensFromFigma(node, tokens) {
  // Extract color tokens
  if (node.type === 'RECTANGLE' && node.fills && node.fills.length > 0) {
    const fill = node.fills[0];
    if (fill.type === 'SOLID' && fill.color) {
      const colorName = node.name.toLowerCase().replace(/\s+/g, '-');
      const colorValue = convertFigmaColorToHex(fill.color);
      
      if (!tokens.Color[colorName]) {
        tokens.Color[colorName] = {
          $type: 'color',
          $value: colorValue
        };
      }
    }
  }

  // Extract spacing tokens from frames and groups
  if ((node.type === 'FRAME' || node.type === 'GROUP') && node.layoutMode) {
    const spacingName = node.name.toLowerCase().replace(/\s+/g, '-');
    const spacingValue = node.itemSpacing || node.paddingLeft || node.paddingTop || 0;
    
    if (spacingValue > 0 && !tokens.Spacing[spacingName]) {
      tokens.Spacing[spacingName] = {
        $type: 'spacing',
        $value: `${spacingValue}px`
      };
    }
  }

  // Extract shadow tokens
  if (node.effects && node.effects.length > 0) {
    const shadow = node.effects.find(effect => effect.type === 'DROP_SHADOW');
    if (shadow) {
      const shadowName = node.name.toLowerCase().replace(/\s+/g, '-');
      const shadowValue = convertFigmaShadowToCSS(shadow);
      
      if (!tokens.Shadow[shadowName]) {
        tokens.Shadow[shadowName] = {
          $type: 'shadow',
          $value: shadowValue
        };
      }
    }
  }

  // Extract typography tokens
  if (node.type === 'TEXT' && node.style) {
    const typographyName = node.name.toLowerCase().replace(/\s+/g, '-');
    const typographyValue = convertFigmaTextToCSS(node.style);
    
    if (!tokens.Typography[typographyName]) {
      tokens.Typography[typographyName] = {
        $type: 'typography',
        $value: typographyValue
      };
    }
  }

  // Recursively process children
  if (node.children) {
    for (const child of node.children) {
      await extractTokensFromFigma(child, tokens);
    }
  }
}

function convertFigmaColorToHex(color) {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a !== undefined ? color.a : 1;
  
  if (a === 1) {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } else {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
}

function convertFigmaShadowToCSS(shadow) {
  const x = shadow.offset.x;
  const y = shadow.offset.y;
  const radius = shadow.radius;
  const color = convertFigmaColorToHex(shadow.color);
  
  return `${x}px ${y}px ${radius}px ${color}`;
}

function convertFigmaTextToCSS(style) {
  const fontSize = style.fontSize || 16;
  const fontFamily = style.fontFamily || 'Inter';
  const fontWeight = style.fontWeight || 400;
  const lineHeight = style.lineHeightPx || fontSize * 1.5;
  const letterSpacing = style.letterSpacing || 0;
  
  return {
    fontFamily: fontFamily,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    lineHeight: `${lineHeight}px`,
    letterSpacing: `${letterSpacing}px`
  };
}

async function updateTokenFiles(tokens) {
  const tokensDir = path.join(__dirname, '..', 'tokens');

  // Update colors.json in Token Studio format
  if (Object.keys(tokens.Color).length > 0) {
    const colorsData = {
      Color: tokens.Color
    };
    fs.writeFileSync(
      path.join(tokensDir, 'colors.json'),
      JSON.stringify(colorsData, null, 2)
    );
    console.log('📝 Updated colors.json');
  }

  // Update spaces.json in Token Studio format
  if (Object.keys(tokens.Spacing).length > 0) {
    const spacesData = {
      Spacing: tokens.Spacing
    };
    fs.writeFileSync(
      path.join(tokensDir, 'spaces.json'),
      JSON.stringify(spacesData, null, 2)
    );
    console.log('📝 Updated spaces.json');
  }

  // Update shadows.json in Token Studio format
  if (Object.keys(tokens.Shadow).length > 0) {
    const shadowsData = {
      Shadow: tokens.Shadow
    };
    fs.writeFileSync(
      path.join(tokensDir, 'shadows.json'),
      JSON.stringify(shadowsData, null, 2)
    );
    console.log('📝 Updated shadows.json');
  }

  // Update typography.json in Token Studio format
  if (Object.keys(tokens.Typography).length > 0) {
    const typographyData = {
      Typography: tokens.Typography
    };
    fs.writeFileSync(
      path.join(tokensDir, 'typography.json'),
      JSON.stringify(typographyData, null, 2)
    );
    console.log('📝 Updated typography.json');
  }

  console.log('✅ All token files updated in Token Studio format');
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchFigmaTokens().catch(process.exit);
}

export { fetchFigmaTokens }; 