import React from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
//import {LinearGradient} from 'expo-linear-gradient';
import * as Constants from './Constants';
import {useNavigation, useRoute} from '@react-navigation/native';

class ChangePass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: '',
      encryptedPassword: '',
      borderColorA: Constants.COLORS.gray,
      borderColorB: Constants.COLORS.gray,
    };
  }

  login = () => {
    const {route} = this.props;
    const {userId} = route.params;
    const {encryptedPassword, pass} = this.state;
    if (!pass) {
      Alert.alert('Password Empty', 'Please enter a password.', [{text: 'OK'}]);
      return;
    }
    if (!encryptedPassword) {
      Alert.alert(
        'Password Confirmation Empty',
        'Please enter a password confirmation.',
        [{text: 'OK'}],
      );
      return;
    }

    if (pass !== encryptedPassword) {
      Alert.alert('Password Do Not Match', 'Please enter matching passwords.', [
        {text: 'OK'},
      ]);
      return;
    }

    if (pass.length < 8 || encryptedPassword.length < 8) {
      Alert.alert('Password Length', 'Please enter at least  8 characters.', [
        {text: 'OK'},
      ]);
      return;
    }
    //sending request to retrieve the corresponding user object for login
    fetch(
      Platform.OS === 'android'
        ? `${
            Constants.URL.android
          }/User/changePass?userId=${userId}&encryptedPassword=${encryptedPassword}`
        : `${
            Constants.URL.ios
          }/User/changePass?userId=${userId}&encryptedPassword=${encryptedPassword}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert(
            'Error',
            'Something went wrong, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          Alert.alert('Password Changed', 'Your password has been changed!', [
            {text: 'OK'},
          ]);
        }
      });
  };

  onFocus(field) {
    field === 'a'
      ? this.setState({
          borderColorA: Constants.COLORS.primary.main,
        })
      : this.setState({
          borderColorB: Constants.COLORS.primary.main,
        });
  }

  onBlur(field) {
    field === 'a'
      ? this.setState({
          borderColorA: Constants.COLORS.gray,
        })
      : this.setState({
          borderColorB: Constants.COLORS.gray,
        });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onBlur={() => this.onBlur('a')}
          onFocus={() => this.onFocus('a')}
          style={[styles.fieldText, {borderColor: this.state.borderColorA}]}
          autoCapitalize="none"
          placeholder="Enter new password"
          secureTextEntry={true}
          onChangeText={pass => this.setState({pass})} //setting the password when user enters it
        />
        <TextInput
          onBlur={() => this.onBlur('b')}
          onFocus={() => this.onFocus('b')}
          style={[styles.fieldText, {borderColor: this.state.borderColorB}]}
          autoCapitalize="none"
          placeholder="Retype new password"
          secureTextEntry={true}
          onChangeText={encryptedPassword => this.setState({encryptedPassword})} //setting the confirm password when user enters it, not encrypted yet
        />
        <TouchableOpacity style={styles.btnStyle} onPress={this.login}>
          <Text style={styles.btnText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <ChangePass {...props} navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  fieldText: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 4,
    marginBottom: 30,
    padding: 10,
  },
  btnStyle: {
    backgroundColor: Constants.COLORS.primary.main,
    borderRadius: 4,
    borderColor: Constants.COLORS.primary.main,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  btnText: {
    fontSize: 16,
  },
});
