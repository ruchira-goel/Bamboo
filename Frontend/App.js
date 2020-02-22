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
import {View} from 'react-native';
import Login from './src/Login';
import HomeScreen from './src/HomeScreen';
import SignUp from './src/SignUp';
import EnterMealDailyInput from './src/EnterMealDailyInput';

const Stack = createStackNavigator();

function App() {
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
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});*/
