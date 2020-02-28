import 'react-native-gesture-handler';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackground} from '@react-navigation/stack';
import Login from './src/Login';
import HomeScreen from './src/HomeScreen';
import SignUp from './src/SignUp';
import EnterMealDailyInput from './src/EnterMealDailyInput';
import EnterCharacteristics from './src/EnterCharacteristics';
import HealthProfile from './src/HealthProfile';
import ExerciseInput from './src/ExerciseInput';

const Stack = createStackNavigator();

function App() {
  console.disableYellowBox = true;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} headerShown="false" />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          headerShown="false"
        />
        <Stack.Screen name="SignUp" component={SignUp} headerShown="false" />
        <Stack.Screen
          name="MealInput"
          component={EnterMealDailyInput}
          headerShown="false"
        />
        <Stack.Screen
          name="EnterCharacteristics"
          component={EnterCharacteristics}
          headerShown="false"
        />
        <Stack.Screen
          name="Health"
          component={HealthProfile}
          headerShown="false"
        />
        <Stack.Screen
          name="ExerciseInput"
          component={ExerciseInput}
          headerShown="false"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

/*const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
=======
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

import DrawerNav from './src/DrawerNav';

export default class App extends React.Component {
  render() {
    return <DrawerNav />;
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
>>>>>>> e3a4929189750e01f9bda30c7d65b4c8447e524d
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
<<<<<<< HEAD
});*/
//=======
//});
//>>>>>>> e3a4929189750e01f9bda30c7d65b4c8447e524d
