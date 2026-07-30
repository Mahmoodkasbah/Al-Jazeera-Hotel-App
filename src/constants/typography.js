// src/constants/typography.js

// تعريف أسماء الخطوط  
export const FONTS = {
  regular: 'Cairo-Regular',
  bold: 'Cairo-Bold',
  light: 'Cairo-Light',
  semibold: 'Cairo-SemiBold',
};

const TYPOGRAPHY = {
  // عائلة الخطوط
  fontFamily: {
    regular: FONTS.regular,
    bold: FONTS.bold,
    light: FONTS.light,
    semibold: FONTS.semibold,
  },

  // أحجام الخطوط
  sizes: {
    xs: 11,
    sm: 12,
    md: 13,
    base: 14,
    lg: 15,
    xl: 16,
    '2xl': 17,
    '3xl': 18,
    '4xl': 20,
    '5xl': 22,
    '6xl': 24,
    '7xl': 28,
    '8xl': 32,
  },

  // أوزان الخطوط 
  weights: {
    thin: '100',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // أنماط النصوص  
  styles: {
    heading1: {
      fontSize: 32,
      fontFamily: FONTS.bold,
      color: '#111827',
    },
    heading2: {
      fontSize: 24,
      fontFamily: FONTS.bold,
      color: '#111827',
    },
    heading3: {
      fontSize: 20,
      fontFamily: FONTS.bold,
      color: '#1a1a1a',
    },
    heading4: {
      fontSize: 18,
      fontFamily: FONTS.bold,
      color: '#1a1a1a',
    },
    heading5: {
      fontSize: 16,
      fontFamily: FONTS.bold,
      color: '#1a1a1a',
    },
    body1: {
      fontSize: 16,
      fontFamily: FONTS.regular,
      color: '#333333',
    },
    body2: {
      fontSize: 14,
      fontFamily: FONTS.regular,
      color: '#666666',
    },
    caption: {
      fontSize: 12,
      fontFamily: FONTS.regular,
      color: '#94a3b8',
    },
    button: {
      fontSize: 17,
      fontFamily: FONTS.bold,
      color: '#ffffff',
    },
    label: {
      fontSize: 14,
      fontFamily: FONTS.bold,
      color: '#333333',
    },
  },
};

export default TYPOGRAPHY; // يسمح باستيراد TYPOGRAPHY في أي ملف