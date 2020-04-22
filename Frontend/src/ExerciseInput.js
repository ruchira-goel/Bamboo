import React, {Component, useState} from 'react';
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
import URL from './url';

// import DatePicker from './DatePicker';
import {Dropdown} from 'react-native-material-dropdown';

import BUTTONS from './styles/buttons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import COLORS from './styles/colors';

// TODO:
// 2. choose from prev/existing exercise

export default class ExerciseInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      activity: '',
      date: new Date(),
      hours: '',
      minutes: '',
      distance: 0,
      showDistance: false,
      activityList: [
        {
          value: 'temp',
        },
      ],
      activityDisabled: true,
      formattedDate:
        `${new Date().getDate()}/` +
        (new Date().getMonth() + 1 < 10 ? '0' : '') +
        `${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
    };
  }

  setformattedDate() {
    this.setState({
      formattedDate:
        `${this.state.date.getDate()}/` +
        (this.state.date.getMonth() + 1 < 10 ? '0' : '') +
        `${this.state.date.getMonth() + 1}/${this.state.date.getFullYear()}`,
    });
  }

  getActivityList(category) {
    this.state.activityDisabled = false;
    if (category === 'Bicycling') {
      return [
        {
          value: 'General',
        },
        {
          value: 'Stationary Bicycling',
        },
      ];
    } else if (category === 'Conditioning Exercise') {
      return [
        {
          value: 'Aerobic',
        },
        {
          value: 'Elliptical Trainer',
        },
        {
          value: 'Jump Rope',
        },
        {
          value: 'Pilates',
        },
        {
          value: 'Rowing',
        },
        {
          value: 'Weight Training',
        },
      ];
    } else if (category === 'Running') {
      return [
        {
          value: 'Jogging',
        },
        {
          value: 'Running',
        },
      ];
    } else if (category === 'Sports') {
      return [
        {
          value: 'Badminton',
        },
        {
          value: 'Baseball/Softball',
        },
        {
          value: 'Basketball',
        },
        {
          value: 'Boxing',
        },
        {
          value: 'Football',
        },
        {
          value: 'Golf',
        },
        {
          value: 'Ping Pong',
        },
        {
          value: 'Soccer',
        },
        {
          value: 'Tennis',
        },
        {
          value: 'Volleyball',
        },
        {
          value: 'Wrestling',
        },
      ];
    } else if (category === 'Water Activities') {
      return [
        {
          value: 'Canoeing',
        },
        {
          value: 'Jet Skiing',
        },
        {
          value: 'Kayaking',
        },
        {
          value: 'Scuba Diving',
        },
        {
          value: 'Surfing',
        },
        {
          value: 'Swimming',
        },
      ];
    } else if (category === 'Winter Activities') {
      return [
        {
          value: 'Ice Skating',
        },
        {
          value: 'Skiing',
        },
        {
          value: 'Sledding',
        },
        {
          value: 'Snowboarding',
        },
        {
          value: 'Ice Hockey',
        },
      ];
    }
  }

  setDistanceVisibility(activity) {
    if (activity === 'Running') {
      return true;
    } else {
      return false;
    }
  }

  isInvalid(str) {
    return /[-,_.]/g.test(str);
  }

  addExercise = () => {
    const {activity, date, hours, minutes, distance} = this.state;
    const {route} = this.props;
    const {userId} = route.params;
    if (!activity) {
      Alert.alert('Activity Empty', 'Please enter activity information.', [
        {text: 'OK'},
      ]);
      Alert.alert('This is activity', activity, [{text: 'OK'}]);
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
    if (this.state.showDistance && !distance) {
      Alert.alert('Distance Empty', 'Please enter distance.', [{text: 'OK'}]);
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
    if (
      this.state.showDistance &&
      (distance <= 0 || this.isInvalid(distance))
    ) {
      Alert.alert('Invalid distance', 'Please enter a valid positive number.', [
        {text: 'OK'},
      ]);
      return;
    }

    const timeInMinutes = parseFloat(hours) * 60 + parseFloat(minutes);

    if (timeInMinutes === 0) {
      Alert.alert('Invalid time', 'Please enter a valid duration.', [
        {text: 'OK'},
      ]);
      return;
    }

    fetch(
      Platform.OS === 'android'
        ? `${URL.android}/Activity/saveActivity?&userId=${userId}&activityName=${activity}&time=${timeInMinutes}&distance=${distance}&date=${date}`
        : `${URL.ios}/Activity/saveActivity?&userId=${userId}&activityName=${activity}&time=${timeInMinutes}&distance=${distance}&date=${date}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert('Error', 'Sorry, try again later!', [{text: 'OK'}]);
        } else {
          Alert.alert(
            'Activity Added',
            data.type +
              ' successfully added! Do you want to save this activity to your favorites?',
            [
              {
                text: 'Yes',
                onPress: () => this.addToFavorites(data.id, userId),
              },
              {text: 'No'},
            ],
          );
        }
      });
  };

  addToFavorites = (activityId, userId) => {
    fetch(
      Platform.OS === 'android'
        ? `${URL.android}/Activity/addToFavorites?activityId=${activityId}&userId=${userId}`
        : `${URL.ios}/Activity/addToFavorites?activityId=${activityId}&userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert(
            'Save Failed',
            'Unable to save to favorites this time, please try at a different time.',
            [{text: 'OK'}],
          );
        } else {
          Alert.alert(
            'Added to Favorites',
            data.type + ' added to favorites!',
            [{text: 'OK'}],
          );
          //going to home screen
        }
      });
  };

  renderHomePage = () => {
    this.props.navigation.navigate('HomeScreen');
  };

  render() {
    const DatePicker = () => {
      const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

      const showDatePicker = () => {
        setDatePickerVisibility(true);
      };

      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };

      const handleConfirm = date => {
        // Alert.alert('A date has been picked', date + ' is the picked date', [
        //   {text: 'OK'},
        // ]);
        this.setState(
          {
            date: date,
          },
          function() {
            this.setformattedDate();
          },
        );
        hideDatePicker();
      };

      return (
        <View>
          <TouchableOpacity style={styles.button} onPress={showDatePicker}>
            <Text style={styles.text}>{this.state.formattedDate}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
          />
        </View>
      );
    };

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
              onChangeText={value => {
                this.setState({category: value});
                this.setState({
                  activityList: this.getActivityList(this.state.category),
                });
              }}
            />
          </View>
          <View style={{width: '50%', left: '25%'}}>
            <Dropdown
              label="Activity"
              disabled={this.state.activityDisabled}
              data={this.state.activityList}
              onChangeText={value => {
                this.setState({activity: value});
                this.setState({
                  showDistance: this.setDistanceVisibility(this.state.activity),
                });
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={[styles.text]}>Date:</Text>
            </View>
            <View
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <DatePicker />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={[styles.text]}>Duration:</Text>
            </View>
            <View
              style={{
                width: '50%',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TextInput
                onChangeText={hours => this.setState({hours})}
                style={[styles.textInput, {width: 40}]}
                keyboardType={'numeric'}
                placeholder="hh"
                maxLength={2}
              />
              <Text style={styles.text}>:</Text>
              <TextInput
                onChangeText={minutes => this.setState({minutes})}
                style={[styles.textInput, {width: 40}]}
                keyboardType={'numeric'}
                placeholder="mm"
                maxLength={2}
              />
            </View>
          </View>
          <View style={{padding: '5%'}} />
          <View>
            <TouchableOpacity
              onPress={() => {
                const {route} = this.props;
                const {userId} = route.params;
                this.setState({userId: userId});
                console.log('From meal i/p page: ' + userId);
                this.props.navigation.navigate('FavActivities', {
                  userId: userId,
                  date: this.state.formattedDate,
                });
              }}
              style={styles.linkStyle}>
              <Text style={{color: '#0000EE', textDecorationLine: 'underline'}}>
                Or select an activity from your favorites!
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.showDistance && (
            <View style={styles.inputContainer}>
              <View
                style={{
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text style={[styles.text]}>Distance:</Text>
              </View>
              <View
                style={{
                  width: '50%',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TextInput
                  onChangeText={distance => this.setState({distance})}
                  style={[styles.textInput, {width: 40}]}
                  keyboardType={'numeric'}
                  maxLength={10}
                />
                <Text style={styles.text}>km</Text>
              </View>
            </View>
          )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    fontSize: 16,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    // alignSelf: 'center',
    width: '50%',
    paddingTop: 35,
    left: '25%',
  },
  text: {
    fontSize: 16,
    // width: 100,
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000',
    backgroundColor: COLORS.primaryColor,
    padding: 2,
  },
  linkStyle: {
    alignItems: 'center',
  },
});
