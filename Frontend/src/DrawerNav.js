import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import Constants from 'expo-constants';

import HomePage from './Home';
import HealthProfile from './HealthProfile';
import SettingsPage from './Settings';
import ExercisePage from './ExerciseInput';
import COLORS from './styles/colors';

function Header({screenName}) {
  const nav = useNavigation();

  return (
    <View style={styles.navBar}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => nav.toggleDrawer()}>
          <Image
            source={require('./images/menu.png')}
            style={{
              marginTop: Constants.statusBarHeight,
              marginLeft: 10,
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
            top: Constants.statusBarHeight - 10,
            right: 10,
            fontSize: 18,
          }}>
          {screenName}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Image
          source={require('./images/bamboo-icon.png')}
          style={{
            marginTop: Constants.statusBarHeight,
            marginRight: 10,
            width: 30,
            height: 30,
            resizeMode: 'contain',
          }}
        />
      </View>
    </View>
  );
}

function Home() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Header screenName={'Home'} />
      <HomePage />
    </View>
    // <Stack.Navigator>
    //   <Stack.Screen name="First" component={First} />
    //   <Stack.Screen name="Second" component={Second} />
    // </Stack.Navigator>
  );
}
function Profile() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Header screenName={'Health Profile'} />
      <HealthProfile />
    </View>
  );
}
function Settings() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Header screenName={'Settings'} />
      <SettingsPage />
    </View>
  );
}
// TODO: temp
function Exercise() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Header screenName={'Exercise Input'} />
      <ExercisePage />
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => CustomDrawerContent(props)}
      drawerContentOptions={{
        activeTintColor: COLORS.secondaryColor,
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Health Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Exercise Input" component={Exercise} />
    </Drawer.Navigator>
  );
}
function First({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Second')}
      />
      <Home />
    </View>
  );
}
function Second({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="Go back to first"
        onPress={() => navigation.navigate('First')}
      />
      <ExercisePage />
    </View>
  );
}
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="First" component={First} />
      <Stack.Screen name="Second" component={Second} />
    </Stack.Navigator>
  );
}

export default function DrawerNav() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navBar: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
