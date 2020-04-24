import React from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';

import * as Constants from './Constants';

export default class HomeScreen extends React.Component {
  logout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      {text: 'Yes', onPress: () => this.props.navigation.replace('Login')},
      {text: 'No'},
    ]);
  };

  delAccountConfirm = () => {
    Alert.alert(
      'Confirm Delete',
      'All data associated with your account will be deleted. You will not be able to recover any of the saved data. Are you sure you want to delete your account?',
      [{text: 'Yes', onPress: this.delAccount}, {text: 'No'}],
    );
  };

  delAccount = () => {
    console.log('here');
    const {route} = this.props;
    const {userId} = route.params;
    console.log(userId);
    fetch(
      Platform.OS === 'android'
        ? `${Constants.URL.android}/User/delAccount?userId=${userId}`
        : `${Constants.URL.ios}/User/delAccount?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (!data) {
          Alert.alert(
            'Error',
            'Something went wrong, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          //going to home screen
          this.props.navigation.replace('Login');
        }
      });
  };

  render() {
    const {route} = this.props;
    const {userId} = route.params;
    console.log('User ID: ', this.props.userId);
    return (
      <ScrollView>
        <View style={styles.heading}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('MealInput', {
                userId: userId,
              })
            }
            style={styles.btnStyle}>
            <Text>Save Meal</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}} />
          <TouchableOpacity onPress={this.logout} style={styles.btnStyle}>
            <Text>Logout</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}} />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('HealthProfile', {
                userId: userId,
              })
            }
            style={styles.btnStyle}>
            <Text>Health Profile</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}} />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EditDietaryRestrictions', {
                userId: userId,
              })
            }
            style={styles.btnStyle}>
            <Text>View Dietary Restrictions</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}} />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ExerciseInput', {
                userId: userId,
              })
            }
            style={styles.btnStyle}>
            <Text>Exercise Input</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}} />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ChangePass', {
                userId: userId,
              })
            }
            style={styles.btnStyle}>
            <Text>Change Password</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}} />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ViewGoals', {
                userId: userId,
              })
            }
            style={styles.btnStyle}>
            <Text>View Goals</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}} />
          <TouchableOpacity
            onPress={this.delAccountConfirm}
            style={styles.btnStyle}>
            <Text>Delete Account</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}} />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('SetGoal', {
                userId: userId,
              })
            }
            style={styles.btnStyle}>
            <Text>Add Goal</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}} />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ExerciseGraphs', {
                userId: userId,
              })
            }
            style={styles.btnStyle}>
            <Text>Exercise Graphs</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}} />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('DietGraphs', {
                userId: userId,
              })
            }
            style={styles.btnStyle}>
            <Text>Diet Graphs</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '500',
    flex: 1,
    alignItems: 'center',
    //alignContent: 'center',
    //justifyContent: 'center',
    //flexDirection: 'column',
    // marginTop: '45%',
    //backgroundColor: 'blue',
  },
  container: {
    flex: 1,
    width: '40%',
    // height: '20%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: '35%',
  },
  spacingHigh: {
    padding: 15,
  },
  spacingSmall: {
    padding: 10,
  },
  fieldText: {
    fontSize: 16,
    //justifyContent: 'center',
    //alignItems: 'center',
    marginLeft: '15%',
    marginRight: '40%',
    borderBottomWidth: 0.5,
    //alignSelf: 'stretch',
    width: '100%',
  },
  alignLeftView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  btnStyle: {
    backgroundColor: '#3eb245',
    color: 'black',
    borderRadius: 2,
    borderColor: '#3eb245',
    width: '75%',
    height: 40,
    justifyContent: 'center', //text in the middle of the button
    alignItems: 'center', //text in the middle of the button
  },
  /*text align for the text to be in the center for "bamboo."*/
  picker: {
    width: 100,
  },
});
