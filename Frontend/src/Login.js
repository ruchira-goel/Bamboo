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
import {useNavigation} from '@react-navigation/native';
// import {LinearGradient} from 'expo-linear-gradient';

import * as Constants from './Constants';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      encryptedPassword: '',
      borderColorA: Constants.COLORS.gray,
      borderColorB: Constants.COLORS.gray,
    };
  }

  login = () => {
    const {email, encryptedPassword} = this.state;
    if (!email) {
      Alert.alert('Email Empty', 'Please enter an email address.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (!encryptedPassword) {
      Alert.alert('Password Empty', 'Please enter a password.', [{text: 'OK'}]);
      return;
    }
    //sending request to retrieve the corresponding user object for login
    fetch(
      Platform.OS === 'android'
        ? `${
            Constants.URL.android
          }/User/login?email=${email}&encryptedPassword=${encryptedPassword}`
        : `${
            Constants.URL.ios
          }/User/login?email=${email}&encryptedPassword=${encryptedPassword}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          //throwing error when login fails - wrong password / email not registered yet
          if (data.message === "This email isn't registered yet") {
            Alert.alert('Not registered', data.message, [{text: 'OK'}]);
          } else if (data.message === 'You entered the wrong password!') {
            Alert.alert('Incorrect password', data.message, [{text: 'OK'}]);
          }
        } else {
          //going to home screen
          this.props.navigation.navigate('Root', {
            screen: 'Home',
            params: {
              userId: data.userId,
              email: email,
              encryptedPassword: encryptedPassword,
            },
          });
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
      <View styles={styles.container}>
        <Text style={styles.title}>Bamboo.</Text>
        <TextInput
          onBlur={() => this.onBlur('a')}
          onFocus={() => this.onFocus('a')}
          style={[styles.fieldText, {borderColor: this.state.borderColorA}]}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({email})} //setting the email when user enters it
        />
        <TextInput
          onBlur={() => this.onBlur('b')}
          onFocus={() => this.onFocus('b')}
          style={[styles.fieldText, {borderColor: this.state.borderColorB}]}
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={encryptedPassword => this.setState({encryptedPassword})} //setting the password when user enters it, not encrypted yet
        />
        <TouchableOpacity style={styles.btnStyle} onPress={this.login}>
          <Text style={styles.btnText}>Login</Text>
          {/*<LinearGradient*/}
          {/*  colors={['#aaddaa', '#96d297', '#00c880']}*/}
          {/*  style={styles.btnStyle}*/}
          {/*  start={[0.0, 0.0]}*/}
          {/*  end={[1.0, 1.0]}>*/}
          {/*  <Text style={styles.btnText}>Login</Text>*/}
          {/*</LinearGradient>*/}
        </TouchableOpacity>
        <View style={{flex: 0.7, alignItems: 'center'}}>
        <View style={{flex: 0.2, flexDirection: 'row'}}>
          <Text style={{padding: 15}}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Root', {
                screen: 'SignUp',
              })
            }
            style={styles.linkStyle}>
            <Text style={{color: '#0000EE', textDecorationLine: 'underline'}}>
              Sign Up!
            </Text>
          </TouchableOpacity>
        </View>
        <View
            style={{
              flex: 0.3,
              flexDirection: 'row',
            }}>
          <Text style={{padding: 15}}>Forgot password? </Text>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Root', {screen: 'RecoverAccount'})}
              style={styles.linkStyle}>
            <Text
                style={{color: '#0000EE', textDecorationLine: 'underline'}}>
              Click here!
            </Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  return <Login {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
  },
  title: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationColor: 'gray',
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
  linkStyle: {
    padding: 15,
  },
});
