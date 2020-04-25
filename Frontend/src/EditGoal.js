import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import * as Constants from './Constants';
import {useNavigation, useRoute} from '@react-navigation/native';

class EditGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      goalId: '',
      goals: [],
      goalOptions: [
        {
          value: 'Grams of Protein',
        },
        {
          value: 'Calories',
        },
      ],
      isMealGoal: true,
      limitType: '____',
      amount: '____',
      trackedItem: '____',
      duration: '____',
      mealOpts: [
        {
          value: 'Grams of Protein',
        },
        {
          value: 'Calories',
        },
      ],
      exOpts: [
        {
          value: 'Minutes of exercise',
        },
        {
          value: 'Hours of exercise',
        },
        {
          value: 'Calories burned',
        },
      ],
    };
    this.fetchGoal();
  }

  isAmountInvalid(str) {
    return /[-,_.]/g.test(str);
  }

  submit = () => {
    const {
      limitType,
      amount,
      trackedItem,
      duration,
      isMealGoal,
      mealOpts,
      exOpts,
    } = this.state;
    const {route} = this.props;
    const {userId} = route.params;
    const {goalId} = route.params;
    this.setState({userId: userId});
    if (limitType === '____') {
      Alert.alert('Limit Empty', 'Please select a limit type.', [{text: 'OK'}]);
      return;
    }
    if (amount === '____' || amount === '') {
      Alert.alert('Amount Empty', 'Please enter an amount.', [{text: 'OK'}]);
      return;
    }
    if (trackedItem === '____') {
      Alert.alert('Goal Empty', 'Please select a Goal Option.', [{text: 'OK'}]);
      return;
    }
    if (duration === '____') {
      Alert.alert('Duration Empty', 'Please select a duration type.', [
        {text: 'OK'},
      ]);
      return;
    }

    if (amount <= 0 || this.isAmountInvalid(amount)) {
      Alert.alert('Invalid amount', 'Please enter a valid amount.', [
        {text: 'OK'},
      ]);
      return;
    }
    // Second condition taken from user Andy
    // from https://stackoverflow.com/questions/22844560/check-if-object-value-exists-within-a-javascript-array-of-objects-and-if-not-add
    if (isMealGoal && !mealOpts.some(value => value.value === trackedItem)) {
      Alert.alert('Meal Option', 'Please select a meal option', [{text: 'OK'}]);
      return;
    }
    // Second condition taken from user Andy
    // from https://stackoverflow.com/questions/22844560/check-if-object-value-exists-within-a-javascript-array-of-objects-and-if-not-add
    else if (
      !isMealGoal &&
      !exOpts.some(value => value.value === trackedItem)
    ) {
      Alert.alert('Exercise Option', 'Please select an exercise option', [
        {text: 'OK'},
      ]);
      return;
    }
    let type;
    if (isMealGoal) {
      type = 'Meal';
    } else {
      type = 'Exercise';
    }
    // console.log('userid = ' + userId);
    // console.log('goalid = ' + goalId);
    // console.log('type = ' + type);
    // console.log('limitType = ' + limitType);
    // console.log('amount = ' + amount);
    // console.log('trackeditem = ' + trackedItem);
    // console.log('duration = ' + duration);

    fetch(
      Platform.OS === 'android'
        ? `${
            Constants.URL.android
          }/Goal/editGoal?userId=${userId}&goalId=${goalId}&type=${type}&limitType=${limitType}&amount=${amount}&trackedItem=${trackedItem}&duration=${duration}`
        : `${
            Constants.URL.ios
          }/Goal/editGoal?userId=${userId}&goalId=${goalId}&type=${type}&limitType=${limitType}&amount=${amount}&trackedItem=${trackedItem}&duration=${duration}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          //throwing error when login fails - wrong password / email not registered yet
          Alert.alert('Error', data.message, [{text: 'OK'}]);
        } else {
          Alert.alert('Success', 'Goal successfully saved.', [
            {
              text: 'OK',
              onPress: this.props.navigation.goBack('ViewGoals'),
            },
          ]);
        }
      });
  };

  fetchGoal() {
    const {route} = this.props;
    const {userId, goalId} = route.params;
    this.setState({userId: userId});
    fetch(
      Platform.OS === 'android'
        ? `${
            Constants.URL.android
          }/Goal/fetchGoalInfo?userId=${userId}&goalId=${goalId}`
        : `${
            Constants.URL.ios
          }/Goal/fetchGoalInfo?userId=${userId}&goalId=${goalId}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          Alert.alert(
            data.message,
            'Unable to fetch goals at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          // console.log('Now no errors, printing data:\n' + data);
          this.setState({
            goals: data,
          });
          // console.log('Printing out goals:\n' + this.state.goals);
          let isMealGoal = this.state.goals[3] === 'Meal';
          let limitType = this.state.goals[5];
          let amount = parseInt(this.state.goals[7]);
          let trackedItem = this.state.goals[6];
          let duration = this.state.goals[4];
          let userId = this.state.goals[1];
          let goalId = this.state.goals[0];
          this.setState({
            userId: userId,
            goalId: goalId,
            isMealGoal: isMealGoal,
            limitType: limitType,
            amount: amount,
            trackedItem: trackedItem,
            duration: duration,
          });
        }
      });
  }

  render() {
    const durationOpts = [
      {
        value: 'Day',
      },
      {
        value: 'Week',
      },
    ];
    const limitOpts = [
      {
        value: 'Less than',
      },
      {
        value: 'Greater than',
      },
    ];
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Goal Type:</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity disabled={true} style={styles.typeButton}>
              <Text style={styles.text}>
                {this.state.isMealGoal ? 'Meal' : 'Exercise'}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={[styles.text, styles.sentence]}>
              Current Goal: {this.state.limitType} {this.state.amount} of{' '}
              {this.state.trackedItem} per {this.state.duration}.
            </Text>
          </View>
          <View style={styles.dropdown}>
            <Dropdown
              label="Limit type"
              data={limitOpts}
              defaultValue={this.state.limitType}
              onChangeText={value => {
                this.setState({limitType: value});
              }}
              selectedItemColor="#3eb245"
              containerStyle={{width: '50%'}}
            />
          </View>
          <View>
            <TextInput
              style={[styles.textInput]}
              keyboardType={'numeric'}
              placeholder="Enter amount"
              defaultValue={this.state.amount.toString()}
              onChangeText={amount => this.setState({amount})}
            />
          </View>
          <View style={styles.dropdown}>
            <Dropdown
              label="Goal Options"
              data={
                this.state.isMealGoal ? this.state.mealOpts : this.state.exOpts
              }
              defaultValue={this.state.trackedItem}
              onChangeText={value => {
                this.setState({trackedItem: value});
              }}
              selectedItemColor="#3eb245"
              containerStyle={{width: '50%'}}
            />
          </View>
          <View style={styles.dropdown}>
            <Dropdown
              label="Duration type"
              data={durationOpts}
              defaultValue={this.state.duration}
              onChangeText={value => {
                this.setState({duration: value});
              }}
              selectedItemColor="#3eb245"
              containerStyle={{width: '50%'}}
            />
          </View>
          <View>
            <TouchableOpacity onPress={this.submit} style={styles.primaryBtn}>
              <Text style={styles.text}>Update Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <EditGoal {...props} navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    margin: 20,
    fontSize: 18,
  },
  textInput: {
    width: Constants.DIMENSIONS.screenWidth * 0.5,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    marginHorizontal: '25%',
    marginTop: 20,
    marginBottom: 10,
  },
  sentence: {
    width: Constants.DIMENSIONS.screenWidth * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn: {
    backgroundColor: Constants.COLORS.primary.main,
    borderRadius: 60,
    borderColor: Constants.COLORS.primary.main,
    padding: 12,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: Constants.DIMENSIONS.screenWidth * 0.5,
  },
  typeButton: {
    color: 'black',
    width: '40%',
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Constants.COLORS.primary.main,
    padding: 4,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: Constants.COLORS.primary.main,
  },
  text: {
    fontSize: 16,
  },
});
