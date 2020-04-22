import * as React from 'react';
import {useState, useEffect} from 'react';
import {Alert, StatusBar} from 'react-native';
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
import {getStatusBarHeight} from 'react-native-status-bar-height';

import * as Constants from './Constants';
import SettingsPage from '../src/Settings';
import LoginPage from '../src/Login.js';
import SignUpPage from '../src/SignUp.js';
import EnterMealDailyInput from '../src/EnterMealDailyInput';
import ExerciseInput from '../src/ExerciseInput';
import DietGraphs from '../src/DietGraphs';
import ExerciseGraphs from '../src/ExerciseGraphs';
import HealthProfile from '../src/HealthProfile';
import ChangePass from './ChangePass';
import EnterCharacteristics from './EnterCharacteristics';
import FavMeals from './FavMeals';
import FavActivities from './FavActivities';
import ViewGoals from './ViewGoals';
import SetGoal from './SetGoal';
import EditGoal from './EditGoal';
import ExerciseGenerator from './ExerciseGenerator';
import ExerciseRoutine from './ExerciseRoutine';

function MenuHeader({screenName}) {
  const nav = useNavigation();

  return (
    <View style={styles.navBar}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => nav.toggleDrawer()}>
          <Image
            source={require('./img/menu.png')}
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
          source={require('./img/bamboo-icon.png')}
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
            source={require('./img/back-arrow.png')}
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
          source={require('./img/bamboo-icon.png')}
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
          source={require('./img/bamboo-icon.png')}
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
  // console.log(nav.dangerouslyGetState().routes[0].params.params);
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <MenuHeader screenName={'Profile'} />
      {/*<Text>Profile Screen</Text>*/}
      <HealthProfile userId={userId} />
    </View>
  );
}
function SettingsScreen({route, navigation}) {
  const nav = useNavigation();
  const {userId} = nav.dangerouslyGetState().routes[0].params.params;
  const {email} = nav.dangerouslyGetState().routes[0].params.params;
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <MenuHeader screenName={'Settings'} />
      <SettingsPage userId={userId} email={email} />
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
function FavMealsScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Favorite Meals'} />
      <FavMeals />
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
function FavActivitiesScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Favorite Activities'} />
      <FavActivities />
    </View>
  );
}
function ViewGoalsScreen({route, navigation}) {
  return (
    <View style={{alignItems: 'center'}}>
      <StackHeader screenName={'My Goals'} />
      <ViewGoals />
    </View>
  );
}
function SetGoalScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Set Goal'} />
      <SetGoal />
    </View>
  );
}
function EditGoalScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Edit Goal'} />
      <EditGoal />
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
function ChangePassScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Change Password'} />
      <ChangePass />
    </View>
  );
}
function ExerciseGeneratorScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Exercise Routine Generator'} />
      <ExerciseGenerator />
    </View>
  );
}
function ExerciseRoutineScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Exercise Routine'} />
      <ExerciseRoutine />
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
            screen: 'ExerciseGraphs',
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
            screen: 'DietGraphs',
            params: {
              userId: userId,
            },
          })
        }>
        <Text style={styles.text}>Diet Graphs</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Root', {
            screen: 'ViewGoals',
            params: {
              userId: userId,
            },
          })
        }>
        <Text style={styles.text}>Goals</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Root', {
            screen: 'SetGoal',
            params: {
              userId: userId,
            },
          })
        }>
        <Text style={styles.text}>Set Goals</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Root', {
            screen: 'ExerciseGenerator',
            params: {
              userId: userId,
            },
          })
        }>
        <Text style={styles.text}>Exercise Routine Generator</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Root', {
            screen: 'ExerciseRoutine',
            params: {
              userId: userId,
            },
          })
        }>
        <Text style={styles.text}>Exercise Routine</Text>
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
      {/*<DrawerItem*/}
      {/*  label="Profile"*/}
      {/*  onPress={() =>*/}
      {/*    props.navigation.jumpTo('Profile', {*/}
      {/*      params: {*/}
      {/*        userId: props.userId,*/}
      {/*      },*/}
      {/*    })*/}
      {/*  }*/}
      {/*/>*/}
      <DrawerItem
        label="Logout"
        onPress={() =>
          Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
            {
              text: 'Yes',
              onPress: () =>
                props.navigation.navigate('Root', {
                  screen: 'Login',
                }),
            },
            {text: 'No'},
          ])
        }
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
      {/*<Stack.Screen name="EnterCharacteristics" component={EnterCharacteristicsScreen} />*/}

      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Meal" component={MealScreen} />
      <Stack.Screen name="FavMeals" component={FavMealsScreen} />

      <Stack.Screen name="Exercise" component={ExerciseScreen} />
      <Stack.Screen name="FavActivities" component={FavActivitiesScreen} />

      <Stack.Screen name="ViewGoals" component={ViewGoalsScreen} />
      <Stack.Screen name="SetGoal" component={SetGoalScreen} />
      <Stack.Screen name="EditGoal" component={EditGoalScreen} />

      <Stack.Screen name="DietGraphs" component={DietGraphsScreen} />
      <Stack.Screen name="ExerciseGraphs" component={ExerciseGraphsScreen} />

      <Stack.Screen name="ChangePass" component={ChangePassScreen} />

      <Stack.Screen
        name="ExerciseGenerator"
        component={ExerciseGeneratorScreen}
      />
      <Stack.Screen name="ExerciseRoutine" component={ExerciseRoutineScreen} />
      {/*
      TODO:
      enter characteristics
      view goals
      edit goal
      track progress
      set goal
      */}
    </Stack.Navigator>
  );
}
// function SettingsRoot() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Settings" component={SettingsScreen} />
//       <Stack.Screen name="ChangePass" component={ChangePassScreen} />
//     </Stack.Navigator>
//   );
// }

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Root"
        drawerContentOptions={{
          activeTintColor: Constants.COLORS.primary.main,
        }}
        drawerContent={props => CustomDrawerContent(props)}
        edgeWidth={0}>
        <Drawer.Screen
          name="Root"
          component={Root}
          options={{
            title: 'Home',
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          drawerContent={props => CustomDrawerContent(props)}
        />
        {/*<Drawer.Screen*/}
        {/*  name="Settings"*/}
        {/*  component={SettingsRoot}*/}
        {/*  options={{*/}
        {/*    title: 'Settings',*/}
        {/*  }}*/}
        {/*/>*/}
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
    // marginTop: StatusBar.currentHeight,
    padding: 10,
    paddingTop: getStatusBarHeight() + 10,
    backgroundColor: Constants.COLORS.primary.main,
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 4,
    // },
    // shadowOpacity: 0.30,
    // shadowRadius: 4.65,
    //
    // elevation: 8,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  centerContainer: {
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
