// src/constants/colors.js

const COLORS = {
  // الألوان الأساسية
  primary: '#007bff',     // اللون الرئيسي للتطبيق ازرق     
  primaryDark: '#0056b3',    
  primaryLight: '#e8f2ff',  
  
  // الألوان الثانوية
  secondary: '#6c757d',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  gold: '#d4af37',
  
  // النصوص
  text: {
    dark: '#111827',       
    main: '#1a1a1a',       
    medium: '#333333',      
    light: '#666666',      
    gray: '#777777',        
    muted: '#94a3b8',       
    white: '#ffffff',
  },
  
  // الخلفيات
  background: {
    main: '#f5f5f5',
    light: '#f8fafc',
    card: '#ffffff',
    input: '#f9f9f9',
    lightGray: '#f1f5f9',
  },
  
  // الحدود
  border: {
    light: '#e8e8e8',
    medium: '#e0e0e0',
    dark: '#dddddd',
    gray: '#eeeeee',
  },
  
  // حالات
  status: {
    upcoming: '#16a34a',    
    completed: '#6c757d',   
    cancelled: '#ef4444',   
  },
  
  // ظلال
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(0, 0, 0, 0.2)',
  },
  
  // ألوان خاصة بالشاشات
  splash: {
    background: '#f5f5f5',
    ring: '#e8f2ff',
    dot: '#007bff',
  },
  
  // ألوان إضافية
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.4)',
  overlayDark: 'rgba(0, 0, 0, 0.6)',
};

export default COLORS; //يسمح للملفات الأخرى باستيراد هذا الكائن