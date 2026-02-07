export const COLORS = {
  light: {
    text: '#000000',
    textSecondary: '#666666',
    background: 'whitesmoke',
    backgroundSecondary: 'white',
    primary: '#007AFF',
  },
  dark: {
    text: '#E5E5E5',
    textSecondary: '#999999',
    background: '#111111',
    backgroundSecondary: '#222',
    primary: '#0A84FF',
  },
};

export const getTheme = (isDark: boolean) =>
  isDark ? COLORS.dark : COLORS.light;
