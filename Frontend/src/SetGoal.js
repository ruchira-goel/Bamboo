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

export default class SetGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      goalOptions: [
        {
          value: 'g of Proteins',
        },
        {
          value: 'calories',
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
  }

  submit = () => {
    const {
      limitType,
      amount,
      trackedItem,
      duration,
      goalOptions,
      isMealGoal,
      mealOpts,
      exOpts,
    } = this.state;
    const {route} = this.props;
    const {userId} = route.params;
    if (limitType === '____') {
      Alert.alert('Limit Empty', 'Please select a limit type.', [{text: 'OK'}]);
      return;
    }
    if (amount === '____') {
      Alert.alert('Amount Empty', 'Please enter an amount.', [{text: 'OK'}]);
      return;
    }
    if (trackedItem === '____') {
      Alert.alert('Goal Empty', 'Please select a Goal Option.', [{text: 'OK'}]);
      return;
    }
    if (duration === '____') {
      Alert.alert('Duration Empty', 'Please select aa duration type.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (isMealGoal && !mealOpts.includes({value: trackedItem})) {
      Alert.alert('Meal Option', 'Please select a meal option', [
        {text: 'Yes'},
      ]);
    } else if (!isMealGoal && !exOpts.includes({value: trackedItem})) {
      Alert.alert('Exercise Option', 'Please select an exercise option', [
        {text: 'Yes'},
      ]);
    }
    let type;
    if (isMealGoal) {
      type = 'Meal';
    } else {
      type = 'Exercise';
    }
    fetch(
      Platform.OS === 'android'
        ? `http://10.0.2.2:8080/Goal/addGoal?userId=${userId}&type=${type}&limitType=${limitType}&amount=${amount}&trackedItem=${trackedItem}&duration=${duration}`
        : `http://localhost:8080/Goal/addGoal?userId=${userId}&type=${type}&limitType=${limitType}&amount=${amount}&trackedItem=${trackedItem}&duration=${duration}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          //throwing error when login fails - wrong password / email not registered yet
          Alert.alert('Error', data.message, [{text: 'OK'}]);
        } else {
          //going to home screen
        }
      });
  };

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
    const {mealOpts, exOpts} = this.state;
    return (
      <View style={styles.heading}>
        <Text style={styles.title}>Select the type of goal:</Text>
        <View style={{padding: '2%'}} />
        <View
          style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                goalOptions: mealOpts,
                isMealGoal: true,
                trackedItem: '_____',
              });
            }}
            style={{
              backgroundColor: this.state.isMealGoal ? '#3eb245' : '#b3c4b4',
              color: 'black',
              borderRadius: 2,
              borderColor: this.state.isMealGoal ? '#3eb245' : '#b3c4b4',
              width: '40%',
              height: '100%',
              justifyContent: 'center', //text in the middle of the button
              alignItems: 'center',
            }}>
            <Text>Diet</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}} />
          <TouchableOpacity
            onPress={() =>
              this.setState({
                goalOptions: exOpts,
                isMealGoal: false,
                trackedItem: '_____',
              })
            }
            style={{
              backgroundColor: !this.state.isMealGoal ? '#3eb245' : '#b3c4b4',
              color: 'black',
              borderRadius: 2,
              borderColor: !this.state.isMealGoal ? '#3eb245' : '#b3c4b4',
              width: '40%',
              height: '100%',
              justifyContent: 'center', //text in the middle of the button
              alignItems: 'center',
            }}>
            <Text>Exercise</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={{padding: '4%'}} />
          <Text
            style={{
              fontSize: 16,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '15%',
              marginRight: '15%',
            }}>
            Current Goal: {this.state.limitType} {this.state.amount} of{' '}
            {this.state.trackedItem} per {this.state.duration}.
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Dropdown
            label="Limit type"
            data={limitOpts}
            onChangeText={value => {
              this.setState({limitType: value});
            }}
            selectedItemColor="#3eb245"
            containerStyle={{width: '50%'}}
          />
        </View>
        <View style={{padding: '2%'}} />
        <View>
          <TextInput
            style={styles.fieldText}
            autoCapitalize="none"
            placeholder="Enter amount"
            onChangeText={amount => this.setState({amount})}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Dropdown
            label="Goal Options"
            data={this.state.goalOptions}
            onChangeText={value => {
              this.setState({trackedItem: value});
            }}
            selectedItemColor="#3eb245"
            containerStyle={{width: '50%'}}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Dropdown
            label="Duration type"
            data={durationOpts}
            onChangeText={value => {
              this.setState({duration: value});
            }}
            selectedItemColor="#3eb245"
            containerStyle={{width: '50%'}}
          />
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.submit} style={styles.linkStyle}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationColor: 'gray',
  },
  container: {
    flex: 1,
    //width: '40%',
    //height: '20%',
    alignItems: 'center',
    alignContent: 'center',
    //backgroundColor: 'blue',
    //marginBottom: '70%',
    //marginLeft: '30%',
  },
  spacingHigh: {
    padding: 15,
  },
  spacingSmall: {
    padding: 10,
  },
  fieldText: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '25%',
    marginRight: '25%',
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
  /*textalign for the text to be in the center for "bamboo."*/
});
