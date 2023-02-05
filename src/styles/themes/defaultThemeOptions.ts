import { roboto } from '../fonts';
import { ThemeOptions } from '../types';

const defaultThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
};

export default defaultThemeOptions;
