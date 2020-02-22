/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import EnterCharacteristics from './src/EnterCharacteristics';

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <EnterCharacteristics.js />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    padding: 8,
  },
});

export default App;
