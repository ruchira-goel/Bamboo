import * as React from 'react';
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
import RecommendedMealsList from './RecommendedMealsList';
import RecoverAccount from './RecoverAccount';
import MealRecommend from './MealRecommend';
import MealInstructions from './MealInstructions';
import TrackProgress from './TrackProgress';
import EnterDietaryRestrictions from './EnterDietaryRestrictions';
import EditDietaryRestrictions from './EditDietaryRestrictions';

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

function DietaryRestrictionsScreen({navigation}) {
  //const nav = useNavigation();
  //const {userId} = nav.dangerouslyGetState().routes[0].params.params;
  //console.log(userId);
  //console.log(nav.dangerouslyGetState().routes[0].params.params);
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Dietary Profile'} />
      <EditDietaryRestrictions />
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

function RecipeScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Meal Instructions'} />
      <MealInstructions />
    </View>
  );
}

function MealRecommendScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Meal Recommendation'} />
      <MealRecommend />
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
function GoalProgressScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Goal Progress'} />
      <TrackProgress />
    </View>
  );
}
function DietGraphsScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Diet Graphs'} />
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

function RecoverAccountScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Recover Account'} />
      <RecoverAccount />
    </View>
  );
}

function RecommendedMealsListScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Recommended Meals'} />
      <RecommendedMealsList />
    </View>
  );
}

function EnterCharacteristicsScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Enter Characteristics'} />
      <EnterCharacteristics />
    </View>
  );
}

function EnterDietaryRestrictionsScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StackHeader screenName={'Enter Dietary Restrictions'} />
      <EnterDietaryRestrictions />
    </View>
  );
}

function HomeScreen({route, navigation}) {
  const {userId} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <MenuHeader screenName={'Home'} />
      <View style={styles.container}>
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
          <Image source={require('./img/goal.png')} style={styles.image} />
          <Text style={styles.text}>My Goals</Text>
          <Text style={styles.subText}>View & set goals</Text>
        </TouchableOpacity>
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
          <Image source={require('./img/meal.png')} style={styles.image} />
          <Text style={styles.text}>Add Meal</Text>
          <Text style={styles.subText}>Complete daily input</Text>
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
          <Image source={require('./img/exercise.png')} style={styles.image} />
          <Text style={styles.text}>Add Exercise</Text>
          <Text style={styles.subText}>Complete daily input</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Root', {
              screen: 'MealRecommendation',
              params: {
                userId: userId,
              },
            })
          }>
          <Image source={require('./img/meal.png')} style={styles.image} />
          <Text style={styles.text}>Meal Recommendation</Text>
          <Text style={styles.subText}>Get personal recommendations</Text>
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
          <Image source={require('./img/exercise.png')} style={styles.image} />
          <Text style={styles.text}>Exercise Routine</Text>
          <Text style={styles.subText}>Generate & view routine</Text>
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
          <Image
            source={require('./img/diet-graph.png')}
            style={styles.image}
          />
          <Text style={styles.text}>Track Diet</Text>
          <Text style={styles.subText}>View calorie graph</Text>
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
          <Image
            source={require('./img/exercise-graph.png')}
            style={styles.image}
          />
          <Text style={styles.text}>Track Exercise</Text>
          <Text style={styles.subText}>View exercise graphs</Text>
        </TouchableOpacity>
      </View>
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
        icon={({tintColor}) => (
          <Image
            source={require('./img/home.png')}
            resizeMode="contain"
            style={[styles.drawerIcon, {tintColor: tintColor}]}
          />
        )}
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
      <Stack.Screen
        name="Enter Characteristics"
        component={EnterCharacteristicsScreen}
      />
      <Stack.Screen
        name="Enter Dietary Restrictions"
        component={EnterDietaryRestrictionsScreen}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RecoverAccount" component={RecoverAccountScreen} />

      <Stack.Screen name="ViewGoals" component={ViewGoalsScreen} />
      <Stack.Screen name="SetGoal" component={SetGoalScreen} />
      <Stack.Screen name="EditGoal" component={EditGoalScreen} />
      <Stack.Screen name="TrackProgress" component={GoalProgressScreen} />

      <Stack.Screen name="Meal" component={MealScreen} />
      <Stack.Screen name="FavMeals" component={FavMealsScreen} />

      <Stack.Screen name="Exercise" component={ExerciseScreen} />
      <Stack.Screen name="FavActivities" component={FavActivitiesScreen} />

      <Stack.Screen name="MealRecommendation" component={MealRecommendScreen} />
      <Stack.Screen
        name="RecommendedMealsList"
        component={RecommendedMealsListScreen}
      />
      <Stack.Screen name="Meal Instructions" component={RecipeScreen} />

      <Stack.Screen name="ExerciseRoutine" component={ExerciseRoutineScreen} />
      <Stack.Screen
        name="ExerciseGenerator"
        component={ExerciseGeneratorScreen}
      />

      <Stack.Screen name="DietGraphs" component={DietGraphsScreen} />
      <Stack.Screen name="ExerciseGraphs" component={ExerciseGraphsScreen} />

      <Stack.Screen name="ChangePass" component={ChangePassScreen} />
      <Stack.Screen
        name="EditDietaryRestrictions"
        component={DietaryRestrictionsScreen}
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
          activeTintColor: '#00c880',
        }}
        drawerContent={props => CustomDrawerContent(props)}
        edgeWidth={0}>
        <Drawer.Screen
          name="Root"
          component={Root}
          options={{
            title: 'Home',
            drawerIcon: ({tintColor}) => (
              <Image
                source={require('./img/home.png')}
                resizeMode="contain"
                style={[styles.drawerIcon, {tintColor: tintColor}]}
              />
            ),
            // drawerLabel: () => <Text style={styles.drawerLabel}>Home</Text>,
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerIcon: ({tintColor}) => (
              <Image
                source={require('./img/profile.png')}
                resizeMode="contain"
                style={[styles.drawerIcon, {tintColor: tintColor}]}
              />
            ),
          }}
          drawerContent={props => CustomDrawerContent(props)}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            drawerIcon: ({tintColor}) => (
              <Image
                source={require('./img/settings.png')}
                resizeMode="contain"
                style={[styles.drawerIcon, {tintColor: tintColor}]}
              />
            ),
          }}
        />
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
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    width: Constants.DIMENSIONS.screenWidth - 20,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  image: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  text: {
    fontSize: 18,
  },
  subText: {
    fontSize: 14,
  },
  drawerIcon: {
    width: 25,
    height: 25,
    margin: 5,
  },
  drawerLabel: {
    fontSize: 16,
  },
});
