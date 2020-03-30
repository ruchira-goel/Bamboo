import * as React from 'react';
import {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import COLORS from '../src/styles/colors';
import SettingsPage from '../src/Settings';
import LoginPage from '../src/Login.js';
import SignUpPage from '../src/SignUp.js';
import EnterMealDailyInput from '../src/EnterMealDailyInput';
import ExerciseInput from '../src/ExerciseInput';
import DietGraphs from '../src/DietGraphs';
import ExerciseGraphs from '../src/ExerciseGraphs';
import HealthProfile from '../src/HealthProfile';

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
    const nav = useNavigation();
    const {userId} = nav.dangerouslyGetState().routes[0].params.params;
    // console.log(userId);
    // console.log(nav.dangerouslyGetState().routes[0].params.params.userId);
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <MenuHeader screenName={'Profile'} />
      {/*<Text>Profile Screen</Text>*/}
      <HealthProfile userId={userId}/>
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
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Meal Input'} />
      <EnterMealDailyInput />
    </View>
  );
}
function ExerciseScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Exercise Input'} />
      <ExerciseInput />
      {/*<Button*/}
      {/*  title="Go to Profile"*/}
      {/*  onPress={() => navigation.navigate('Profile')}*/}
      {/*/>*/}
    </View>
  );
}
function DietGraphsScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Diet Graphs'} />
      {/*<Text>temporary text</Text>*/}
      <DietGraphs />
    </View>
  );
}
function ExerciseGraphsScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Exercise Graphs'} />
      <ExerciseGraphs />
    </View>
  );
}

function HomeScreen({route, navigation}) {
  const {userId} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <MenuHeader screenName={'Home'} />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Root', {
            screen: 'Meal',
            params: {
              userId: userId,
            },
          })
        }>
        <Text style={styles.text}>Meal Input</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Root', {
            screen: 'Exercise',
            params: {
              userId: userId,
            },
          })
        }>
        <Text style={styles.text}>Exercise Input</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Root', {
            screen: 'Exercise Graphs',
            params: {
              userId: userId,
            },
          })
        }>
        <Text style={styles.text}>Exercise Graphs</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Root', {
            screen: 'Diet Graphs',
            params: {
              userId: userId,
            },
          })
        }>
        <Text style={styles.text}>Diet Graphs</Text>
      </TouchableOpacity>
    </View>
  );
}
function CustomDrawerContent(props) {
    // const {route} = props;
    // const {userId} = route.params;
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Profile"
        onPress={() =>
          props.navigation.jumpTo('Profile', {
            params: {
              userId: props.userId,
            },
          })
        }
      />
      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
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
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Exercise" component={ExerciseScreen} />
      <Stack.Screen name="Meal" component={MealScreen} />
      <Stack.Screen name="Diet Graphs" component={DietGraphsScreen} />
      <Stack.Screen name="Exercise Graphs" component={ExerciseGraphsScreen} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => CustomDrawerContent(props)}
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
    backgroundColor: COLORS.palette.primary.main,
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
