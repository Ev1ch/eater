import { createTheme } from '@mui/material/styles';

import { mergeWithDefaultOptions } from '../utils';

const darkTheme = createTheme(
  mergeWithDefaultOptions({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
        contrastText: 'rgba(255, 255, 255, 1)',
      },
    },
  }),
);

export default darkTheme;
