import {Appearance} from 'react-native';

import Repository from 'src/data/Repository';
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

  async getInitialTheme() {
    const persistedValue = await Repository.getTheme();
    if (persistedValue) {
      return persistedValue;
    }
    const deviceTheme = Appearance.getColorScheme();
    if (deviceTheme) {
      return deviceTheme;
    }
    return this.defaultTheme;
  }
}

export const themeStore = new ThemeStore();
const theme = themeJson[themeStore.defaultTheme];
export default theme;
