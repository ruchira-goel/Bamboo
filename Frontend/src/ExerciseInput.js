import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import DatePicker from './DatePicker';
import {Dropdown} from 'react-native-material-dropdown';

import BUTTONS from './styles/buttons';

// TODO:
// 1. add new exercise
// 2. choose from prev/existing exercise

export default class ExerciseInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      activity: '',
      date: '',
      hours: '',
      minutes: '',
      calories: '',
      activityList: '',
    };
  }

  // getActivityList(category) {
  //   if (category === 'Bicycling') {
  //     return [
  //       {
  //         value: 'act1',
  //       },
  //       {
  //         value: 'act2',
  //       },
  //     ];
  //   }
  // }

  isInvalid(str) {
    return /[-,_.]/g.test(str);
  }

  addExercise = () => {
    const {activity, date, hours, minutes, calories} = this.state;
    const {route} = this.props;
    const {email} = route.params;
    //let usEmail = email.substring(1, email.length - 1);
    if (!activity) {
      Alert.alert('Activity Empty', 'Please enter activity information.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (!hours) {
      Alert.alert('Hours Empty', 'Please enter time information.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (!minutes) {
      Alert.alert('Minutes Empty', 'Please enter time information.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (!calories) {
      Alert.alert('Calories Empty', 'Please enter calories information.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (hours < 0 || this.isInvalid(hours)) {
      Alert.alert('Invalid time', 'Please enter a valid number of hours.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (minutes < 0 || this.isInvalid(minutes)) {
      Alert.alert('Invalid time', 'Please enter a valid number of minutes.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (calories <= 0 || this.isInvalid(calories)) {
      Alert.alert(
        'Invalid calories',
        'Please enter a valid number of calories.',
        [{text: 'OK'}],
      );
      return;
    }

    const timeInMinutes = hours * 60 + minutes;

    if (timeInMinutes == 0) {
      Alert.alert('Invalid time', 'Please enter a valid duration.', [
        {text: 'OK'},
      ]);
      return;
    }

    fetch(
      Platform.OS === 'android'
        ? `http://10.0.2.2:8080/Activity/saveActivity?&email=${email}&activityName=${activity}&time=${timeInMinutes}&calories=${calories}`
        : `http://localhost:8080/Activity/saveActivity?&email=${email}&activityName=${activity}&time=${timeInMinutes}&calories=${calories}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert('Error', 'Sorry, try again later!', [{text: 'OK'}]);
        } else {
          Alert.alert('Activity Added', data.type + ' successfully added!', [
            {text: 'OK'},
          ]);
        }
      });
  };

  renderHomePage = () => {
    this.props.navigation.navigate('HomeScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{width: '50%', left: '25%'}}>
            <Dropdown
              label="Category"
              data={[
                {
                  value: 'Bicycling',
                },
                {
                  value: 'Conditioning Exercise',
                },
                {
                  value: 'Running',
                },
                {
                  value: 'Sports',
                },
                {
                  value: 'Water Activities',
                },
                {
                  value: 'Winter Activities',
                },
              ]}
            />
          </View>
          <View style={{width: '50%', left: '25%'}}>
            <Dropdown
              label="Activity"
              data={[
                {
                  value: 'Bicycling',
                },
                {
                  value: 'Conditioning Exercise',
                },
                {
                  value: 'Running',
                },
                {
                  value: 'Sports',
                },
                {
                  value: 'Water Activities',
                },
                {
                  value: 'Winter Activities',
                },
              ]}
            />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.text]}>Date:</Text>
            </View>
            <View
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <DatePicker />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.text]}>Duration:</Text>
            </View>
            <TextInput
              onChangeText={hours => this.setState({hours})}
              style={[styles.textInput, {width: '25%'}]}
              keyboardType={'numeric'}
              placeholder="hh"
              maxLength={2}
            />
            <Text style={{fontSize: 18}}>:</Text>
            <TextInput
              onChangeText={minutes => this.setState({minutes})}
              style={[styles.textInput, {width: '25%'}]}
              keyboardType={'numeric'}
              placeholder="mm"
              maxLength={2}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={BUTTONS.primaryButton}
          onPress={this.addExercise}>
          <Text style={BUTTONS.primaryButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    margin: 0,
    justifyContent: 'center',
  },
  textInput: {
    borderBottomWidth: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    // alignSelf: 'center',
    width: '50%',
    paddingTop: 35,
    left: '25%',
    // width: '100%',
  },
  text: {
    // fontSize: 20,
    // width: 100,
  },
  button: {
    // margin: 0,
  },
});
