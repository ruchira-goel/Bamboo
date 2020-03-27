import * as React from 'react';
import {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import COLORS from '../src/styles/colors';
import SettingsPage from '../src/Settings';
import LoginPage from '../src/Login.js';
import SignUpPage from '../src/SignUp.js';
// import LoginPage from './Login.js';
// import SignUpPage from './SignUp.js';
import NavigationService from '../src/NavigationService';

const Test = ({navigation}) => {
  useEffect(() => {
    NavigationService._navigation = navigation;
  }, [navigation]);
};

function LoginScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <BaseHeader screenName={'Login'} />
      <LoginPage />
    </View>
  );
}
function SignUpScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <BaseHeader screenName={'Sign Up'} />
      <SignUpPage />
    </View>
  );
}

function ProfileScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <MenuHeader screenName={'Profile'} />
      <Text>Profile Screen</Text>
    </View>
  );
}
function SettingsScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <MenuHeader screenName={'Settings'} />
      <SettingsPage />
    </View>
  );
}

function MealScreen({route, navigation}) {
  const {user} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Meal Input'} />
      <Text>Health Input Screen</Text>
      <Text>userParam: {JSON.stringify(user)}</Text>
    </View>
  );
}
function ExerciseScreen({route, navigation}) {
  const {user} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Exercise Input'} />
      <Text>Exercise Input Screen</Text>
      <Text>userParam: {JSON.stringify(user)}</Text>
      {/*<Button*/}
      {/*  title="Go to Profile"*/}
      {/*  onPress={() => navigation.navigate('Profile')}*/}
      {/*/>*/}
    </View>
  );
}

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <MenuHeader screenName={'Home'} />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Root', {
            screen: 'Meal',
            params: {user: 'userParam'},
          })
        }>
        <Text style={styles.text}>Meal Input</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Root', {
            screen: 'Exercise',
            params: {user: 'userParam'},
          })
        }>
        <Text style={styles.text}>Exercise Input</Text>
      </TouchableOpacity>
    </View>
  );
}

function MenuHeader({screenName}) {
  const nav = useNavigation();

  return (
    <View style={styles.navBar}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => nav.toggleDrawer()}>
          <Image
            source={require('../images/menu.png')}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.centerContainer}>
        <Text
          style={{
            fontSize: 18,
          }}>
          {screenName}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Image
          source={require('../images/bamboo-icon.png')}
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
          }}
        />
      </View>
    </View>
  );
}
function StackHeader({screenName}) {
  const nav = useNavigation();

  return (
    <View style={styles.navBar}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Image
            source={require('../images/back-arrow.png')}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.centerContainer}>
        <Text
          style={{
            fontSize: 18,
          }}>
          {screenName}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Image
          source={require('../images/bamboo-icon.png')}
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
          }}
        />
      </View>
    </View>
  );
}
function BaseHeader({screenName}) {
  return (
    <View style={styles.navBar}>
      <View style={styles.leftContainer} />
      <View style={styles.centerContainer}>
        <Text
          style={{
            fontSize: 18,
          }}>
          {screenName}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Image
          source={require('../images/bamboo-icon.png')}
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
          }}
        />
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primaryColor,
          },
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primaryColor,
          },
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primaryColor,
          },
        }}
      />
      <Stack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primaryColor,
          },
        }}
      />
      <Stack.Screen
        name="Meal"
        component={MealScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primaryColor,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Root"
        drawerContentOptions={{
          activeTintColor: COLORS.secondaryColor,
        }}
        edgeWidth={0}>
        <Drawer.Screen
          name="Root"
          component={Root}
          options={{
            title: 'Home',
          }}
        />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight,
    padding: 10,
    backgroundColor: COLORS.primaryColor,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rightIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#d9e3bf',
    padding: 15,
    margin: 10,
    width: '100%',
  },
  text: {
    fontSize: 16,
  },
});
