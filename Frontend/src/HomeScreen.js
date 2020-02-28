import React from 'react';
import {Alert, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class HomeScreen extends React.Component {
  logout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      {text: 'Yes', onPress: () => this.props.navigation.replace('Login')},
      {text: 'No'},
    ]);
  };

  render() {
    const {route} = this.props;
    const {email} = route.params;
    //let usEmail = email.substring(1, email.length - 1);
    console.log('usEmail: ' + email);
    return (
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('MealInput', {
              email: email,
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
              email: email,
            })
          }
          style={styles.btnStyle}>
          <Text>Health Profile</Text>
        </TouchableOpacity>
        <View style={{padding: '2%'}} />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('ChangePass', {
              email: email,
            })
          }
          style={styles.btnStyle}>
          <Text>Change Password</Text>
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
    alignItems: 'center',
    //alignContent: 'center',
    //justifyContent: 'center',
    //flexDirection: 'column',
    marginTop: '45%',
    //backgroundColor: 'blue',
  },
  container: {
    flex: 1,
    width: '40%',
    height: '20%',
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
    height: '13%',
    justifyContent: 'center', //text in the middle of the button
    alignItems: 'center', //text in the middle of the button
  },
  /*textalign for the text to be in the center for "bamboo."*/
  picker: {
    width: 100,
  },
});
