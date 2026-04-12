/**
 * Add these font links to your index.html <head>:
 *
 * <link rel="preconnect" href="https://fonts.googleapis.com" />
 * <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
 * <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet" />
 */

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2D52E0',
      light: '#4F6EF7',
      dark: '#1D3DBF',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7C3AED',
      light: '#9D5CF8',
      dark: '#5B21B6',
    },
    success: {
      main: '#059669',
      light: '#34D399',
      dark: '#047857',
    },
    warning: {
      main: '#D97706',
      light: '#F59E0B',
      dark: '#B45309',
    },
    error: {
      main: '#DC2626',
      light: '#EF4444',
      dark: '#B91C1C',
    },
    background: {
      default: '#FAFAF8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0D0F17',
      secondary: '#6B7180',
    },
    divider: '#EEECE8',
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.05,
    },
    h2: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
    h5: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
    body1: { lineHeight: 1.65 },
    body2: { lineHeight: 1.6 },
    button: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
    caption: {
      fontFamily: '"DM Sans", sans-serif',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(13,15,23,0.04)',
    '0px 1px 4px rgba(13,15,23,0.06)',
    '0px 2px 8px rgba(13,15,23,0.06), 0px 1px 2px rgba(13,15,23,0.04)',
    '0px 4px 16px rgba(13,15,23,0.07), 0px 2px 4px rgba(13,15,23,0.05)',
    '0px 8px 24px rgba(13,15,23,0.08), 0px 2px 6px rgba(13,15,23,0.05)',
    '0px 12px 32px rgba(13,15,23,0.09), 0px 4px 8px rgba(13,15,23,0.05)',
    '0px 16px 40px rgba(13,15,23,0.10), 0px 4px 10px rgba(13,15,23,0.06)',
    '0px 20px 48px rgba(13,15,23,0.11), 0px 6px 12px rgba(13,15,23,0.06)',
    '0px 24px 56px rgba(13,15,23,0.12), 0px 6px 14px rgba(13,15,23,0.07)',
    '0px 28px 64px rgba(13,15,23,0.13), 0px 8px 16px rgba(13,15,23,0.07)',
    '0px 32px 72px rgba(13,15,23,0.13), 0px 8px 18px rgba(13,15,23,0.08)',
    '0px 36px 80px rgba(13,15,23,0.14), 0px 10px 20px rgba(13,15,23,0.08)',
    '0px 40px 88px rgba(13,15,23,0.15), 0px 10px 22px rgba(13,15,23,0.09)',
    '0px 44px 96px rgba(13,15,23,0.15), 0px 12px 24px rgba(13,15,23,0.09)',
    '0px 48px 104px rgba(13,15,23,0.16), 0px 12px 26px rgba(13,15,23,0.10)',
    '0px 52px 112px rgba(13,15,23,0.17), 0px 14px 28px rgba(13,15,23,0.10)',
    '0px 56px 120px rgba(13,15,23,0.17), 0px 14px 30px rgba(13,15,23,0.11)',
    '0px 60px 128px rgba(13,15,23,0.18), 0px 16px 32px rgba(13,15,23,0.11)',
    '0px 64px 136px rgba(13,15,23,0.18), 0px 16px 34px rgba(13,15,23,0.12)',
    '0px 68px 144px rgba(13,15,23,0.19), 0px 18px 36px rgba(13,15,23,0.12)',
    '0px 72px 152px rgba(13,15,23,0.20), 0px 18px 38px rgba(13,15,23,0.13)',
    '0px 76px 160px rgba(13,15,23,0.20), 0px 20px 40px rgba(13,15,23,0.13)',
    '0px 80px 168px rgba(13,15,23,0.21), 0px 20px 42px rgba(13,15,23,0.14)',
    '0px 84px 176px rgba(13,15,23,0.22), 0px 22px 44px rgba(13,15,23,0.14)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        '::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#D1CFC9',
          borderRadius: '100px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#B5B3AE',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '9px 20px',
          fontSize: '0.875rem',
          transition: 'all 0.18s ease',
        },
        contained: {
          background: 'linear-gradient(135deg, #2D52E0 0%, #4A3FDB 100%)',
          boxShadow: '0 2px 6px rgba(45,82,224,0.30), 0 1px 2px rgba(45,82,224,0.20)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1D3DBF 0%, #3730C5 100%)',
            boxShadow: '0 4px 14px rgba(45,82,224,0.40), 0 2px 4px rgba(45,82,224,0.20)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        },
        outlined: {
          borderColor: '#DDDBD6',
          color: '#0D0F17',
          '&:hover': {
            borderColor: '#2D52E0',
            color: '#2D52E0',
            backgroundColor: 'rgba(45,82,224,0.04)',
          },
        },
        text: {
          color: '#6B7180',
          '&:hover': {
            color: '#0D0F17',
            backgroundColor: 'rgba(13,15,23,0.05)',
          },
        },
        sizeLarge: {
          padding: '11px 24px',
          fontSize: '0.9375rem',
        },
        sizeSmall: {
          padding: '6px 14px',
          fontSize: '0.8125rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 1px 3px rgba(13,15,23,0.05), 0px 1px 2px rgba(13,15,23,0.04)',
          border: '1px solid #EEECE8',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: '#FAFAF8',
            transition: 'all 0.18s ease',
            '& fieldset': {
              borderColor: '#DDDBD6',
              transition: 'border-color 0.18s ease',
            },
            '&:hover fieldset': {
              borderColor: '#B5B3AE',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2D52E0',
              borderWidth: '1.5px',
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#2D52E0',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.7rem',
          letterSpacing: '0.02em',
          fontFamily: '"DM Sans", sans-serif',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #EEECE8',
          boxShadow: 'none',
          backgroundColor: '#FAFAF8',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 0 #EEECE8',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontSize: '0.875rem',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#EEECE8',
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: '#9CA3AF',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontFamily: '"Sora", sans-serif',
          fontWeight: 700,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#0D0F17',
          borderRadius: 8,
          fontSize: '0.75rem',
          fontFamily: '"DM Sans", sans-serif',
        },
        arrow: {
          color: '#0D0F17',
        },
      },
    },
  },
});