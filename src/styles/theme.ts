const theme = {
  colors: {
    background: '#2d6587',
    backgroundSecondary: '#000000',
    bodyText: '#ffffff',
    bodyTextInverted: '#000000',
    primary: '#ffe818',
    secondary: '#00a1ff',
    border: '#ffffff',
    borderSelected: '#000000',
    borderSoft: '#464646',
    box: '#1f1f1f',
    boxLight: '#404040',
  },
  fonts: {
    title: '\'Star Jedi\', cursive',
    body: '\'Open Sans\', sans-serif',
  },
};

type ThemeType = typeof theme;

export type { ThemeType };
export default theme;
