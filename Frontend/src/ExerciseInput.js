import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import DatePicker from './DatePicker';
import BUTTONS from './styles/buttons';

// TODO:
// 1. add new exercise
// 2. choose from prev/existing exercise

export default class ExerciseInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: '',
      date: '',
      hours: '',
      minutes: '',
      calories: '',
    };
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

    const timeInMinutes = hours * 60 + minutes;

    fetch(
      `http://localhost:8080/Activity/saveActivity?&email=${email}&activityName=${activity}&time=${timeInMinutes}&calories=${calories}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert('Error', 'Sorry, try again later!', [{text: 'OK'}]);
        } else {
          Alert.alert(
            'Activity Added',
            data.activity + ' successfully added!',
            [{text: 'OK'}],
          );
        }
      });
  };

  renderHomePage = () => {
    this.props.navigation.navigate('HomeScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={styles.inputContainer}>
              <Text style={[styles.text]}>Activity:</Text>
              <TextInput
                onChangeText={activity => this.setState({activity})}
                returnKeyType="done"
                style={[styles.textInput, styles.text]}
                placeholder="activity"
                maxLength={20}
              />
            </View>
            <View style={styles.inputContainer}>
              {/*onChangeText={activity => this.setState({activity})}*/}
              <Text style={[styles.text, {paddingTop: 6}]}>Date:</Text>
              <DatePicker />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text]}>Duration:</Text>
              <TextInput
                onChangeText={hours => this.setState({hours})}
                style={[styles.textInput, {fontSize: 20}]}
                keyboardType={'numeric'}
                placeholder="hh"
                maxLength={2}
              />
              <Text style={{fontSize: 20}}>:</Text>
              <TextInput
                onChangeText={minutes => this.setState({minutes})}
                style={[styles.textInput, {fontSize: 20}]}
                keyboardType={'numeric'}
                placeholder="mm"
                maxLength={2}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text]}>Calories:</Text>
              <TextInput
                onChangeText={calories => this.setState({calories})}
                style={[styles.textInput, styles.text]}
                placeholder="calories"
                maxLength={20}
              />
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity style={BUTTONS.primaryButton} onPress={this.addExercise}>
          <Text style={BUTTONS.primaryButtonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.renderHomePage} style={styles.btnStyle}>
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
  },
  contentContainer: {
    flex: 1,
    margin: 0,
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  textInput: {
    borderBottomWidth: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 35,
  },
  text: {
    fontSize: 20,
    width: 100,
  },
  button: {
    margin: 0,
  },
});
