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
import URL from './url';

// TODO: Display different Image and message depending on how much of the goal is achieved
// TODO: Fetch amount corresponding to the goal
// TODO: Fetch meal/exercises corresponding to the goal

export default class TrackProgress extends React.Component {
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
        ? `${URL.android}/Goal/fetchGoalProgress?userId=${userId}&goalId=${goalId}`
        : `${URL.ios}/Goal/fetchGoalProgress?userId=${userId}&goalId=${goalId}`,
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
    //     ? `http://10.0.2.2:8080/Goal/fetchGoalInfo?userId=${userId}&goalId=${goalId}`
    //     : `http://localhost:8080/Goal/fetchGoalInfo?userId=${userId}&goalId=${goalId}`,
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
      <View style={styles.heading}>
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
        <View style={{padding: '4%'}} />
        <Text style={styles.regText}>Goal: {this.state.goalName}.</Text>
        <View style={{padding: '2%'}} />
        <Text style={styles.title} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '500',
    flex: 1,
    marginTop: '7%',
  },
  title: {
    margin: 12,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationColor: 'gray',
  },
  container: {
    // flex: 1,
    //width: '40%',
    //height: '20%',
    alignItems: 'center',
    alignContent: 'center',
    //backgroundColor: 'blue',
    //marginBottom: '70%',
    //marginLeft: '30%',
  },
  fieldText: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderBottomWidth: 0.5,
  },
  regText: {
    fontSize: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderBottomWidth: 0.5,
  },
  alignLeftView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  linkStyle: {
    marginBottom: '70%',
    padding: 15,
  },
  ImageIconStyle: {
    justifyContent: 'center',
    height: 100,
    width: 100,
    alignItems: 'center',
  },
  /*textalign for the text to be in the center for "bamboo."*/
});
