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
import * as Constants from './Constants';
// import DatePicker from './DatePicker';
import {Dropdown} from 'react-native-material-dropdown';

import BUTTONS from './styles/buttons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import COLORS from './styles/colors';
import {useNavigation, useRoute} from '@react-navigation/native';

// TODO:
// 2. choose from prev/existing exercise

class ExerciseInput extends Component {
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
        ? `${
            Constants.URL.android
          }/Activity/saveActivity?&userId=${userId}&activityName=${activity}&time=${timeInMinutes}&distance=${distance}&date=${date}`
        : `http://localhost:8080/Activity/saveActivity?&userId=${userId}&activityName=${activity}&time=${timeInMinutes}&distance=${distance}&date=${date}`,
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
        ? `${
            Constants.URL.android
          }/Activity/addToFavorites?activityId=${activityId}&userId=${userId}`
        : `http://localhost:8080/Activity/addToFavorites?activityId=${activityId}&userId=${userId}`,
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
          <TouchableOpacity style={styles.datePicker} onPress={showDatePicker}>
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
        <View style={styles.dropdown}>
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
        <View style={styles.dropdown}>
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

        <View style={styles.rowContainer}>
          {/*<View style={styles.leftContainer}>*/}
          <Text style={styles.text}>Date:</Text>
          {/*</View>*/}
          {/*<View style={styles.rightContainer}>*/}
          <DatePicker />
          {/*</View>*/}
        </View>

        <View style={styles.rowContainer}>
          {/*<View style={styles.leftContainer}>*/}
          <Text style={styles.text}>Duration:</Text>
          {/*</View>*/}
          {/*<View style={styles.rightContainer}>*/}
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
          {/*</View>*/}
        </View>

        {this.state.showDistance && (
          <View style={styles.rowContainer}>
            <Text style={[styles.text]}>Distance:</Text>
            <TextInput
              onChangeText={distance => this.setState({distance})}
              style={[styles.textInput, {width: 40}]}
              keyboardType={'numeric'}
              placeholder="00"
              maxLength={10}
            />
            <Text style={styles.text}>km</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            const {route} = this.props;
            const {userId} = route.params;
            this.setState({userId: userId});
            // console.log('From meal i/p page: ' + userId);
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

        <View style={{width: '100%', paddingLeft: 50, paddingRight: 50}}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={this.addExercise}>
            <Text>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.navigation.goBack}
            style={styles.secondaryBtn}>
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <ExerciseInput {...props} navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Constants.DIMENSIONS.screenWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    // justifyContent: 'center',
  },
  dropdown: {
    // marginTop: 20,
    // textAlign: 'center',
    // fontSize: 18,
    width: '50%',
  },
  rowContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    // marginLeft: 40,
    // marginRight: 40,
    width: '50%',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textInput: {
    fontSize: 16,
    borderBottomWidth: 0.5,
    textAlign: 'center',
    // alignSelf: 'stretch',
    // width: '100%',
    // width: Constants.DIMENSIONS.screenWidth,
  },
  picker: {
    //TODO
  },
  textArea: {
    fontSize: 16,
  },
  linkStyle: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  primaryBtn: {
    backgroundColor: Constants.COLORS.primary.main,
    borderRadius: 60,
    borderColor: Constants.COLORS.primary.main,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  secondaryBtn: {
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Constants.COLORS.primary.main,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  datePicker: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Constants.COLORS.primary.main,
  },
});
