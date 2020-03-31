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
import URL from './url';

export default class ChangePass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: '',
      encryptedPassword: '',
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
        ? `${URL.android}/User/changePass?userId=${userId}&encryptedPassword=${encryptedPassword}`
        : `http://localhost:8080/User/changePass?userId=${userId}&encryptedPassword=${encryptedPassword}`,
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

  render() {
    return (
      <View style={styles.heading}>
        <View style={{padding: '2%'}} />
        <View style={styles.spacingHigh} />
        <TextInput
          style={styles.fieldText}
          autoCapitalize="none"
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={pass => this.setState({pass})} //setting the password when user enters it
        />
        <View style={{padding: '3%'}} />
        <TextInput
          style={styles.fieldText}
          autoCapitalize="none"
          placeholder="Enter password again"
          secureTextEntry={true}
          onChangeText={encryptedPassword => this.setState({encryptedPassword})} //setting the confirm password when user enters it, not encrypted yet
        />
        <View style={{padding: '3%'}} />
        <View style={styles.spacingSmall} />
        <View style={styles.container}>
          <TouchableOpacity onPress={this.login} style={styles.btnStyle}>
            <Text>Change Password</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}} />
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
    marginTop: '35%',
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
    marginLeft: '15%',
    marginRight: '15%',
    borderBottomWidth: 0.5,
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
    width: '40%',
    height: '11%',
    justifyContent: 'center', //text in the middle of the button
    alignItems: 'center', //text in the middle of the button
  },
  linkStyle: {
    marginBottom: '70%',
  },
  /*textalign for the text to be in the center for "bamboo."*/
});
