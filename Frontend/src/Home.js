import React, {Component} from 'react';
import {Button, Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

// import Settings from './Settings';
import ExercisePage from './ExerciseInput';

// function ExerciseScreen({navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Button
//         title="Go to Profile"
//         onPress={() => navigation.navigate(ExercisePage)}
//       />
//     </View>
//   );
// }
// const Stack = createStackNavigator();
//
// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Exercise" component={ExerciseScreen} />
//     </Stack.Navigator>
//   );
// }
