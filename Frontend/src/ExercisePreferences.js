import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import URL from './url';

// TODO: Submit button needs to be edited to be centered

export default class ExercisePreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      daysInWeek: '',
      hoursPerDay: '',
      fetch: [],
    };
    this.fetchPreferences();
  }

  isAmountInvalid(str) {
    return /[-,_.]/g.test(str);
  }

  fetchPreferences() {
    const {route} = this.props;
    const {userId} = route.params;
    this.setState({userId: userId});
    console.log('In the edit goals page: ' + userId);
    fetch(
      Platform.OS === 'android'
        ? `http://10.0.2.2:8080/User/fetchExercisePreferences?userId=${userId}`
        : `http://localhost:8080/User/fetchExercisePreferences?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert(
            data.message,
            'Unable to fetch preferences at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          console.log('Now no errors, printing data:\n' + data);
          this.setState({
            fetch: data,
          });
          this.setState({
            daysInWeek: fetch[0],
            hoursPerDay: fetch[1],
          });
          console.log(this.state);
        }
      });
  }

  submit = () => {
    const {daysInWeek, hoursPerDay} = this.state;
    const {route} = this.props;
    const {userId} = route.params;
    if (daysInWeek === '') {
      Alert.alert('Days of Exercise Empty', 'Please enter a number of days.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (hoursPerDay === '____') {
      Alert.alert(
        'Hours of Exercise Empty',
        'Please enter a number of hours.',
        [{text: 'OK'}],
      );
      return;
    }
    if (
      daysInWeek <= 0 ||
      daysInWeek >= 7 ||
      this.isAmountInvalid(daysInWeek)
    ) {
      Alert.alert('Invalid Days of Exercise', 'Please enter a valid integer.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (
      hoursPerDay <= 0 ||
      hoursPerDay >= 24 ||
      this.isAmountInvalid(hoursPerDay)
    ) {
      Alert.alert(
        'Invalid Hours of Exercise',
        'Please enter a valid integer.',
        [{text: 'OK'}],
      );
      return;
    }
    fetch(
      Platform.OS === 'android'
        ? `${
            URL.android
          }/User/saveExercisePreferences?userId=${userId}&daysInWeek=${daysInWeek}&hoursPerDay=${hoursPerDay}`
        : `http://localhost:8080/User/saveExercisePreferences?userId=${userId}&daysInWeek=${daysInWeek}&hoursPerDay=${hoursPerDay}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert(
            data.message,
            'Unable to save exercise preferences at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          Alert.alert('Success', 'Exercise Preferences successfully updated.', [
            {text: 'OK'},
          ]);
        }
      });
  };

  render() {
    return (
      <View style={styles.heading}>
        <Text style={styles.title}>
          How many days a week do you generally exercise?
        </Text>
        <View style={{padding: '2%'}} />
        <View>
          <TextInput
            style={styles.fieldText}
            // autoCapitalize="none"
            keyboardType={'numeric'}
            placeholder="Number of days"
            defaultValue={this.state.daysInWeek.toString()}
            onChangeText={daysInWeek => this.setState({daysInWeek})}
          />
        </View>
        <View style={{padding: '4%'}} />
        <Text style={styles.title}>
          How many hours a day do you generally exercise in one stretch?
        </Text>
        <View style={{padding: '2%'}} />
        <View>
          <TextInput
            style={styles.fieldText}
            // autoCapitalize="none"
            keyboardType={'numeric'}
            placeholder="Hours of exercise"
            defaultValue={this.state.hoursPerDay.toString()}
            onChangeText={hoursPerDay => this.setState({hoursPerDay})}
          />
        </View>
        <View style={{padding: '6%'}} />
        <TouchableOpacity onPress={this.submit} style={styles.linkStyle}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '500',
    flex: 1,
    marginTop: '50%',
    alignItems: 'center',
  },
  title: {
    margin: 12,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationColor: 'gray',
  },
  fieldText: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '25%',
    marginRight: '25%',
    borderBottomWidth: 0.5,
  },
  linkStyle: {
    backgroundColor: '#3eb245',
    color: 'black',
    borderRadius: 2,
    borderColor: '#3eb245',
    width: '75%',
    height: 40,
    justifyContent: 'center', //text in the middle of the button
    alignItems: 'center', //text in the middle of the button
  },
  /*textalign for the text to be in the center for "bamboo."*/
});
