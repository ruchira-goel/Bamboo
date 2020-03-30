import React, {Component} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function LoginScreen({navigation}) {
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
        title="To SignUp screen"
        onPress={() =>
          nav.navigate('Root', {
            screen: 'SignUp',
            params: {user: 'userParam'},
          })
        }
      />
    </View>
  );
}

export default class Login extends Component {
  render() {
    return (
      <View>
        <LoginScreen />
      </View>
    );
  }
}
