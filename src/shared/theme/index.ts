import {Appearance} from 'react-native';

import {THEME} from 'src/shared/Constant';

export const themeJson: ITheme = require('./theme.json');

interface ITheme {
  [theme: string]: ThemeInterface;
}

export interface ThemeInterface {
  theme: string;
  background: string;
  surface: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  onView: string;
  onViewFaint: string;
}

class ThemeStore {
  defaultTheme = THEME.LIGHT;

  constructor() {
    const deviceTheme = Appearance.getColorScheme();
    if (deviceTheme) {
      this.defaultTheme = deviceTheme;
    }
  }
}

export const themeStore = new ThemeStore();
const theme = themeJson[themeStore.defaultTheme];
export default theme;
