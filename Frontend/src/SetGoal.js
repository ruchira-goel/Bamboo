import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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
      goalSelected: '____',
      duration: '____',
    };
  }

  render() {
    const durationOpts = [
      {
        value: 'day',
      },
      {
        value: 'week',
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
    const mealOpts = [
      {
        value: 'g of Proteins',
      },
      {
        value: 'calories',
      },
    ];
    const exOpts = [
      {
        value: 'minutes of activity',
      },
      {
        value: 'hours of activity',
      },
      {
        value: 'calories burned',
      },
    ];
    return (
      <View style={styles.heading}>
        <Text style={styles.title}>Select the type of goal:</Text>
        <View style={{padding: '2%'}} />
        <View
          style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({goalOptions: mealOpts, isMealGoal: true});
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
              this.setState({goalOptions: exOpts, isMealGoal: false})
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
            {this.state.goalSelected} per {this.state.duration}.
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
              this.setState({goalSelected: value});
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
