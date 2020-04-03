import 'react-native-gesture-handler';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import Navigation from './src/Navigation';

// const Stack = createStackNavigator();

function App() {
  console.disableYellowBox = true;
  return (
    <Navigation />
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Login">
    //     <Stack.Screen name="Login" component={Login} headerShown="false" />
    //     <Stack.Screen
    //       name="HomeScreen"
    //       component={HomeScreen}
    //       headerShown={'false'}
    //     />
    //     <Stack.Screen name="SignUp" component={SignUp} headerShown="false" />
    //     <Stack.Screen
    //       name="MealInput"
    //       component={EnterMealDailyInput}
    //       headerShown={'false'}
    //     />
    //     <Stack.Screen
    //       name="FavMeals"
    //       component={FavMeals}
    //       headerShown={'false'}
    //     />
    //     <Stack.Screen
    //       name="EnterCharacteristics"
    //       component={EnterCharacteristics}
    //       headerShown={'false'}
    //     />
    //     <Stack.Screen
    //       name="HealthProfile"
    //       component={HealthProfile}
    //       headerShown={'false'}
    //     />
    //     <Stack.Screen
    //       name="FavActivities"
    //       component={FavActivities}
    //       headerShown={'false'}
    //     />
    //     <Stack.Screen
    //       name="ExerciseInput"
    //       component={ExerciseInput}
    //       headerShown={'false'}
    //     />
    //     <Stack.Screen
    //       name="ChangePass"
    //       component={ChangePass}
    //       headerShown={'false'}
    //     />
    //     <Stack.Screen
    //       name="ViewGoals"
    //       component={ViewGoals}
    //       headerShown={'false'}
    //     />
    //     <Stack.Screen
    //       name="EditGoal"
    //       component={EditGoal}
    //       headerShown={'false'}
    //     />
    //     <Stack.Screen
    //       name="TrackProgress"
    //       component={TrackProgress}
    //       headerShown={'false'}
    //     />
    //     <Stack.Screen
    //       name="SetGoal"
    //       component={SetGoal}
    //       headerShown={'false'}
    //     />
    //     <Stack.Screen name="ExerciseGraphs" component={ExerciseGraphs} />
    //     <Stack.Screen name="DietGraphs" component={DietGraphs} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default App;
