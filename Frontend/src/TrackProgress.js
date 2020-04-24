import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  Image,
} from 'react-native';


import * as Constants from './Constants';
import {useNavigation, useRoute} from "@react-navigation/native";

// TODO: Display different Image and message depending on how much of the goal is achieved
// TODO: Fetch amount corresponding to the goal
// TODO: Fetch meal/exercises corresponding to the goal

class TrackProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      goalId: '',
      goalName: '',
      amount: 0,
      currentAmount: '',
      goalProgress: '',
    };
    this.fetchGoalProgress();
  }

  // Start work from this point onwards
  // Fetch goal progress
  // Print in percentage form
  // Print goal name
  // Print amount of progress = goalProgress * goal.amount
  // Print amount left / needed to achieve goal

  fetchGoalProgress() {
    const {route} = this.props;
    const {userId, goalId, goalName} = route.params;
    // this.setState({userId: userId});
    // this.setState({goalName: goalName});
    console.log('userId ' + userId);
    console.log('goalId ' + goalId);
    console.log('goalName ' + goalName);
    console.log('In the track progress page: ' + userId);
    fetch(
      Platform.OS === 'android'
        ? `${Constants.URL.android}/Goal/fetchGoalProgress?userId=${userId}&goalId=${goalId}`
        : `${Constants.URL.ios}/Goal/fetchGoalProgress?userId=${userId}&goalId=${goalId}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert(
            data.message,
            'Unable to fetch goal progress at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          console.log('Now no errors, printing data:\n' + data);
          console.log('goalProgress ' + parseFloat(data));
          this.setState({
            goalProgress: data,
            goalId: goalId,
            userId: userId,
            goalName: goalName,
          });
          console.log('goalName ' + goalName);
        }
      });
    // fetch(
    //   Platform.OS === 'android'
    //     ? `${Constants.URL.android}/Goal/fetchGoalInfo?userId=${userId}&goalId=${goalId}`
    //     : `${Constants.URL.ios}/Goal/fetchGoalInfo?userId=${userId}&goalId=${goalId}`,
    // )
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     if (data.error) {
    //       Alert.alert(
    //         data.message,
    //         'Unable to fetch goal info at this time, please try again later.',
    //         [{text: 'OK'}],
    //       );
    //     } else {
    //       this.setState({
    //         goals: data,
    //       });
    //       let name = this.state.goals[2];
    //       this.setState({
    //         name: name,
    //       });
    //     }
    //   });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.goalProgress}%</Text>
        {/*<View style={styles.container}>*/}
        {/*  <Image*/}
        {/*    source={require('./img/goalsuccess.png')}*/}
        {/*    style={styles.ImageIconStyle}*/}
        {/*  />*/}
        {/*</View>*/}
        <Text style={styles.fieldText}>
          {this.state.goalProgress >= 100
            ? 'You did it! Keep up the good work :)'
            : "You're almost there, keep it up!"}
        </Text>
        <Text style={styles.regText}>Goal: {this.state.goalName}.</Text>
      </View>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <TrackProgress {...props} navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 20,
    paddingTop: 20,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationColor: 'gray',
    borderTopWidth: 0.5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  fieldText: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: 20,
    borderBottomWidth: 0.5,
  },
  regText: {
    fontSize: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderBottomWidth: 0.5,
  },
  ImageIconStyle: {
    justifyContent: 'center',
    height: 100,
    width: 100,
    alignItems: 'center',
  },
});
