import React from 'react';
import {Alert, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class HomeScreen extends React.Component {
  logoutConfirm = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      {text: 'Yes', onPress: this.logout},
      {text: 'No'},
    ]);
  };

  logout = ({navigation}) => {
    const {email, encryptedPassword} = this.state;
    fetch(
      `http://bamboo-testing.herokuapp.com/User/logout?email=${email}&encryptedPassword=${encryptedPassword}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          //throwing error when logout fails
          Alert.alert('Logout failed', data.message, [{text: 'OK'}]);
        } else {
          //going to SignUp screen
          navigation.navigate('SignUp', {
            email: email,
            encryptedPassword: encryptedPassword,
          });
        }
      });
  };

  render() {
    const {route} = this.props;
    const {email} = route.params;
    // let usEmail = email.substring(1, email.length - 1);
    // console.log('usEmail: ' + usEmail);
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('MealInput', {
              email: email,
            })
          }
          style={styles.btnStyle}>
          <Text>Save Meal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.replace('Login')}
          style={styles.btnStyle}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('ExerciseInput', {
              email: email,
            })
          }
          style={styles.btnStyle}>
          <Text>Save Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('HealthProfile', {
              email: email,
            })
          }
          style={styles.btnStyle}>
          <Text>Health Profile</Text>
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
    marginTop: '10%',
  },
  container: {
    flex: 1,
    width: '40%',
    height: '20%',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: '30%',
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
    backgroundColor: 'darkseagreen',
    color: 'black',
    borderRadius: 2,
    borderColor: '#3eb245',
    width: '70%',
    height: '10%',
    //alignContent: 'center',
    justifyContent: 'center', //text in the middle of the button
    alignItems: 'center', //text in the middle of the butto
    //alignSelf: 'stretch',
    //mar
  },
  /*textalign for the text to be in the center for "bamboo."*/
  picker: {
    width: 100,
  },
});
