import {Dimensions} from 'react-native';

export const COLORS = {
  primaryColor: '#aaddaa',
  secondaryColor: '#00c880',
  tintColor: '#a4c6a4',

  primary: {
    dark: '#5a8b5c',
    main: '#81c784',
    light: '#9ad29c',
  },
  accent: {
    dark: '#b2741a',
    main: '#ffa726',
    light: '#ffb851',
  },
  contrastText: {
    black: '#000', // for main and light
    white: '#fff', // for dark
  },
  gray: 'rgba(0, 0, 0, 0.2)',
  background: '#f5f5f5',
};

export const URL = {
  android: 'https://cs-bamboo.herokuapp.com',
  // android: 'http://10.0.2.2:8080',
  ios: 'http://localhost:8080',
};

export const DIMENSIONS = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
};
