import React, { useState } from 'react';
import { useParameter } from '@storybook/manager-api';
import { styled } from '@storybook/theming';

const PanelWrapper = styled.div`
  padding: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: #333;
  letter-spacing: 0.5px;
`;

const TokenGrid = styled.div`
  display: grid;
  gap: 8px;
`;

const TokenRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 13px;
  transition: background 0.2s;
  
  &:hover {
    background: #e8e8e8;
  }
`;

const TokenName = styled.code`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: #e01e5a;
  font-size: 12px;
  background: transparent;
`;

const TokenValue = styled.span`
  color: #666;
  font-size: 12px;
  margin-left: 8px;
`;

const ColorPreview = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid #ddd;
  margin-left: 8px;
  flex-shrink: 0;
`;

const CopyButton = styled.button`
  padding: 4px 8px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
  color: #666;
  margin-left: 8px;
  
  &:hover {
    background: #f0f0f0;
  }
  
  &:active {
    background: #e0e0e0;
  }
`;

const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #999;
  font-size: 14px;
`;

const ThemeToggle = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const ThemeButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: ${props => props.active ? '#007bff' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.active ? '#0056b3' : '#f0f0f0'};
  }
`;

// Mock token values - in a real implementation, these would be loaded from the actual token files
const TOKEN_VALUES = {
  light: {
    'color-light-primary': '#EB0A1E',
    'color-light-secondary': '#58595B',
    'color-light-text-primary': '#1F2937',
    'color-light-text-secondary': '#6B7280',
    'color-light-text-inverse': '#FFFFFF',
    'color-light-background': '#FFFFFF',
    'color-light-surface': '#F9FAFB',
    'color-light-border': '#E5E7EB',
    'color-light-success': '#10B981',
    'color-light-warning': '#F59E0B',
    'color-light-error': '#EF4444',
    'color-light-info': '#3B82F6',
    'spacing-xs': '0.25rem',
    'spacing-sm': '0.5rem',
    'spacing-md': '1rem',
    'spacing-lg': '1.5rem',
    'spacing-xl': '2rem',
    'spacing-2xl': '3rem',
    'spacing-3xl': '4rem',
    'fontSize-xs': '0.75rem',
    'fontSize-sm': '0.875rem',
    'fontSize-body': '1rem',
    'fontSize-lg': '1.125rem',
    'fontSize-xl': '1.25rem',
    'fontSize-2xl': '1.5rem',
    'fontSize-3xl': '1.875rem',
    'fontSize-h1': '3rem',
    'fontSize-h2': '2.25rem',
    'fontSize-h3': '1.875rem',
    'fontWeight-regular': '400',
    'fontWeight-medium': '500',
    'fontWeight-semibold': '600',
    'fontWeight-bold': '700',
    'borderRadius-sm': '0.25rem',
    'borderRadius-md': '0.5rem',
    'borderRadius-lg': '0.75rem',
    'borderRadius-xl': '1rem',
  },
  dark: {
    'color-dark-primary': '#FF1E30',
    'color-dark-secondary': '#9CA3AF',
    'color-dark-text-primary': '#F9FAFB',
    'color-dark-text-secondary': '#D1D5DB',
    'color-dark-text-inverse': '#1F2937',
    'color-dark-background': '#111827',
    'color-dark-surface': '#1F2937',
    'color-dark-border': '#374151',
    'color-dark-success': '#34D399',
    'color-dark-warning': '#FBBF24',
    'color-dark-error': '#F87171',
    'color-dark-info': '#60A5FA',
  },
};

const copyToClipboard = (text) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
};

export const DesignTokensPanel = () => {
  const designTokens = useParameter('designTokens', null);
  const [theme, setTheme] = useState('light');

  if (!designTokens) {
    return (
      <PanelWrapper>
        <EmptyState>
          No design tokens defined for this story.
          <br /><br />
          Add tokens metadata to your story:
          <pre style={{ marginTop: 12, padding: 12, background: '#f5f5f5', borderRadius: 4, textAlign: 'left' }}>
{`parameters: {
  designTokens: {
    colors: ['color-light-primary', ...],
    spacing: ['spacing-md', ...],
    typography: ['fontSize-body', ...],
  }
}`}
          </pre>
        </EmptyState>
      </PanelWrapper>
    );
  }

  const renderTokens = (tokens, category) => {
    if (!tokens || tokens.length === 0) return null;

    const isColor = category === 'colors';
    const tokenMap = theme === 'dark' ? { ...TOKEN_VALUES.light, ...TOKEN_VALUES.dark } : TOKEN_VALUES.light;

    return (
      <Section key={category}>
        <SectionTitle>{category}</SectionTitle>
        <TokenGrid>
          {tokens.map((token) => {
            const value = tokenMap[token] || 'Unknown';
            return (
              <TokenRow key={token}>
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <TokenName>{token}</TokenName>
                  <TokenValue>{value}</TokenValue>
                  {isColor && value !== 'Unknown' && (
                    <ColorPreview style={{ backgroundColor: value }} />
                  )}
                </div>
                <CopyButton onClick={() => copyToClipboard(`var(--token-${theme}-${token})`)}>
                  Copy CSS
                </CopyButton>
              </TokenRow>
            );
          })}
        </TokenGrid>
      </Section>
    );
  };

  return (
    <PanelWrapper>
      <ThemeToggle>
        <ThemeButton active={theme === 'light'} onClick={() => setTheme('light')}>
          Light Theme
        </ThemeButton>
        <ThemeButton active={theme === 'dark'} onClick={() => setTheme('dark')}>
          Dark Theme
        </ThemeButton>
      </ThemeToggle>
      
      {Object.entries(designTokens).map(([category, tokens]) => 
        renderTokens(tokens, category)
      )}
    </PanelWrapper>
  );
};

