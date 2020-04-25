import 'react-native-gesture-handler';

/**
 * Bamboo App
 * https://github.com/ruchira-goel/Bamboo
 *
 * @format
 * @flow
 */

import * as React from 'react';
import Navigation from './src/Navigation';

function App() {
  console.disableYellowBox = true;
  console.reportErrorsAsExceptions = false;
  return <Navigation />;
}

export default App;
