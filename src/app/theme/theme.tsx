import { extendTheme } from '@chakra-ui/react';

const colors = {
    UA_red: '#9E1B32',
    bama_burgundy: '#772432',
    bama_roll_red: '#D0103A',
    bama_ivory: '#DAD7CB',
    bama_gray: '#C1C6C9',
    bama_dark_gray: '#5F6A72',
};

const theme = extendTheme({
  colors,
});

export default theme;
