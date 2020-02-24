import React from 'react';
import {Alert, View} from 'react-native';

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
      `http://localhost:8080/User/logout?email=${email}&encryptedPassword=${encryptedPassword}`,
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
    return <View />;
  }
}
