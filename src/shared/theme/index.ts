const themeJson: ITheme = require('./theme.json');

interface ITheme {
  [theme: string]: ThemeInterface;
}

export interface ThemeInterface {
  background: string;
  surface: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  onView: string;
  onViewFaint: string;
}

class ThemeStore {
  theme: string = 'light';

  constructor() {
    // TODO
    // if saved set
    // else if not saved get system and set
  }
}

export const themeStore = new ThemeStore();
const theme = themeJson[themeStore.theme];
export default theme;
