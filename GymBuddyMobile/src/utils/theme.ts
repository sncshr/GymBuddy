import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

// Custom theme extending the default theme
export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4A90E2',
    secondary: '#50E3C2',
    accent: '#FF5A5F',
    background: '#F8F9FA',
    text: '#2D3436',
    error: '#FF3B30',
    success: '#4CD964',
    warning: '#FF9500',
    info: '#5AC8FA',
  },
  // Custom values not part of the theme type but useful for our app
  customSpacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  customBorderRadius: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
  },
};

// For TypeScript, we need to export the spacing and borderRadius separately
export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

export const borderRadius = {
  s: 4,
  m: 8,
  l: 16,
  xl: 24,
}; 