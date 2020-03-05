import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function SignUpScreen({navigation}) {
  const nav = useNavigation();
  return (
    <View>
      <Button
        title="To Home screen"
        onPress={() =>
          nav.navigate('Root', {
            screen: 'Home',
            params: {user: 'userParam'},
          })
        }
      />
      <Button
        title="To Login screen"
        onPress={() =>
          nav.navigate('Root', {
            screen: 'Login',
            params: {user: 'userParam'},
          })
        }
      />
    </View>
  );
}

export default class SignUp extends Component {
  render() {
    return (
      <View>
        <SignUpScreen />
      </View>
    );
  }
}
