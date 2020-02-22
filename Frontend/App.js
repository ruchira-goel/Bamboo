import 'react-native-gesture-handler';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Constants from 'expo-constants';

import HealthProfile from './src/HealthProfile.js';
import Home from './src/Home.js';
import SlidingMenu from './src/SlidingMenu.js';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Home Page'}}
        />
        <Stack.Screen
          name="HealthProfile"
          component={HealthProfile}
          options={{title: 'Health Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}) {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate('HealthProfile', {name: 'Jane'})}
    />
  );
}

export default class App extends React.Component {
  render() {
    <SlidingMenu />
    return MyStack();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },
});
