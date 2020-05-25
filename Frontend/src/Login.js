import React from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import {LinearGradient} from 'expo-linear-gradient';
import NotifService from './NotifService';
import {getTimeSinceStartup} from 'react-native-startup-time';

import * as Constants from './Constants';

// when your app is ready:
getTimeSinceStartup().then(time => {
  console.log(`Time since startup: ${time} ms`);
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      encryptedPassword: '',
      borderColorA: Constants.COLORS.gray,
      borderColorB: Constants.COLORS.gray,
    };
    this.notif = new NotifService(this.onRegister.bind(this));
  }

  onRegister(token) {
    Alert.alert('Registered !', JSON.stringify(token));
    // console.log(token);
    this.setState({registerToken: token.token, gcmRegistered: true});
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
        // console.log(data);
        if (data.error) {
          //throwing error when login fails - wrong password / email not registered yet
          // if (data.message === "This email isn't registered yet") {
          //   Alert.alert('Not registered', data.message, [{text: 'OK'}]);
          // } else if (data.message === 'You entered the wrong password!') {
          //   Alert.alert('Incorrect password', data.message, [{text: 'OK'}]);
          // }
          // generic error message
          Alert.alert('Login Failed', 'Your email or password do not match.', [
            {text: 'OK'},
          ]);
        } else {
          //set up notifications
          this.notif.scheduleNotifications(data.userId);
          //going to home screen
          this.emailInput.clear();
          this.passwordInput.clear();
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
      <ScrollView>
        <View styles={styles.container}>
          <Text style={styles.title}>Bamboo.</Text>
          <TextInput
            ref={input => { this.emailInput = input }}
            onBlur={() => this.onBlur('a')}
            onFocus={() => this.onFocus('a')}
            style={[styles.fieldText, {borderColor: this.state.borderColorA}]}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({email})} //setting the email when user enters it
          />
          <TextInput
            ref={input => { this.passwordInput = input }}
            onBlur={() => this.onBlur('b')}
            onFocus={() => this.onFocus('b')}
            style={[
              styles.fieldText,
              {borderColor: this.state.borderColorB, marginBottom: 10},
            ]}
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={encryptedPassword =>
              this.setState({encryptedPassword})
            } //setting the password when user enters it, not encrypted yet
          />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Root', {
                screen: 'RecoverAccount',
              })
            }>
            <Text style={{color: '#0000EE', textDecorationLine: 'underline'}}>
              Forgot password?
            </Text>
          </TouchableOpacity>
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
                <Text
                  style={{color: '#0000EE', textDecorationLine: 'underline'}}>
                  Sign Up!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
