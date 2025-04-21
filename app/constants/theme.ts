import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export interface ThemeColors {
  primary: string;
  background: string;
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  border: string;
  card: {
    background: string;
    shadow: {
      color: string;
      offset: { width: number; height: number };
      opacity: number;
      radius: number;
    };
  };
  status: {
    online: string;
    offline: string;
  };
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeTypography {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  body: TextStyle;
  caption: TextStyle;
  small: TextStyle;
}

export interface ThemeBorderRadius {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  full: number;
}

export const colors = {
  primary: '#007AFF',
  background: '#FFFFFF',
  card: {
    background: '#FFFFFF',
    shadow: {
      color: '#000',
      offset: { width: 0, height: 2 },
      opacity: 0.1,
      radius: 4,
    },
  },
  text: {
    primary: '#000000',
    secondary: '#666666',
    tertiary: '#999999',
  },
  border: '#E5E5E5',
  status: {
    online: '#4CAF50',
    offline: '#999999',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
  },
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
}; 