import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import DoneButton from 'react-native-keyboard-done-button';
import {useNavigation, useRoute} from '@react-navigation/native';
import Constants from 'expo-constants';
import URL from './url';
import COLORS from './styles/colors';
import {LinearGradient} from 'expo-linear-gradient';
const screenWidth = Dimensions.get('window').width;

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      borderColorA: COLORS.palette.gray,
      borderColorB: COLORS.palette.gray,
      borderColorC: COLORS.palette.gray,
      borderColorD: COLORS.palette.gray,
    };
  }

  signUp = () => {
    const {name, email, password, confirmPassword} = this.state;
    if (!name) {
      Alert.alert('Name Empty', 'Please enter a name.', [{text: 'OK'}]);
      return;
    }
    if (!email) {
      Alert.alert('Email Empty', 'Please enter an email address.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (!password) {
      Alert.alert('Password Empty', 'Please enter a password.', [{text: 'OK'}]);
      return;
    }
    if (!confirmPassword) {
      Alert.alert(
        'Confirm Password Empty',
        'Please enter confirm your password.',
        [{text: 'OK'}],
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords Do Not Match', 'Please enter the same password.', [
        {text: 'OK'},
      ]);
      return;
    }
    const expression = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (!expression.test(String(email).toLowerCase())) {
      Alert.alert(
        'Email Format Incorrect',
        'Ensure that the email is of the format email@example.com',
        [{text: 'OK'}],
      );
      return;
    }
    //sending request to retrieve the corresponding user object for login
    fetch(
      Platform.OS === 'android'
        ? `${
            URL.heroku
          }/User/signup?name=${name}&email=${email}&password=${password}`
        : `${
            URL.ios
          }/User/signup?name=${name}&email=${email}&password=${password}`,
    )
      .then(res => res.json())
      .then(data => {
        //const {userId} = data.userId;
        //console.log("Data.userid: " + data.userId);
        if (data.error) {
          //throwing error when signup fails - email already registered / invalid password
          if (
            data.message ===
            'This email is already registered. Try the login page instead'
          ) {
            Alert.alert('Already registered', data.message, [{text: 'OK'}]);
          } else if (
            data.message ===
            'Please make sure your password is at least 8 characters!'
          ) {
            Alert.alert('Invalid password', data.message, [{text: 'OK'}]);
          }
        } else {
          //going to enter characteristics screen
          this.props.navigation.replace('EnterCharacteristics', {
            name: name,
            email: email,
            userId: data.userId,
            password: password,
          });
          // this.props.navigation.navigate('Root', {
          //     screen: 'EnterCharacteristics',
          //     params: {
          //         userId: data.userId,
          //         email: email,
          //         encryptedPassword: encryptedPassword,
          //     },
          // });
        }
      });
  };

  onFocus(field) {
    switch (field) {
      case 'a':
        this.setState({
          borderColorA: COLORS.palette.primary.main,
        });
        break;
      case 'b':
        this.setState({
          borderColorB: COLORS.palette.primary.main,
        });
        break;
      case 'c':
        this.setState({
          borderColorC: COLORS.palette.primary.main,
        });
        break;
      case 'd':
        this.setState({
          borderColorD: COLORS.palette.primary.main,
        });
        break;
    }
  }

  onBlur(field) {
    switch (field) {
      case 'a':
        this.setState({
          borderColorA: COLORS.palette.gray,
        });
        break;
      case 'b':
        this.setState({
          borderColorB: COLORS.palette.gray,
        });
        break;
      case 'c':
        this.setState({
          borderColorC: COLORS.palette.gray,
        });
        break;
      case 'd':
        this.setState({
          borderColorD: COLORS.palette.gray,
        });
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bamboo.</Text>
        <Text style={styles.paragraph}>Create a Bamboo account</Text>
        <TextInput
          onBlur={() => this.onBlur('a')}
          onFocus={() => this.onFocus('a')}
          style={[styles.fieldText, {borderColor: this.state.borderColorA}]}
          autoCorrect={false}
          placeholder="name"
          autoCompleteType="name"
          returnKeyLabel="Done"
          autoCapitalize="words"
          onChangeText={name => this.setState({name})}
        />
        <TextInput
          onBlur={() => this.onBlur('b')}
          onFocus={() => this.onFocus('b')}
          style={[styles.fieldText, {borderColor: this.state.borderColorB}]}
          autoCorrect={false}
          placeholder="email@example.com"
          autoCompleteType="email"
          returnKeyLabel="Done"
          autoCapitalize="none"
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          onBlur={() => this.onBlur('c')}
          onFocus={() => this.onFocus('c')}
          style={[styles.fieldText, {borderColor: this.state.borderColorC}]}
          autoCorrect={false}
          placeholder="password"
          returnKeyLabel="Done"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={password => this.setState({password})}
        />
        <TextInput
          onBlur={() => this.onBlur('d')}
          onFocus={() => this.onFocus('d')}
          style={[styles.fieldText, {borderColor: this.state.borderColorD}]}
          autoCorrect={false}
          placeholder="confirm password"
          returnKeyLabel="Done"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={confirmPassword => this.setState({confirmPassword})}
        />
        <TouchableOpacity onPress={this.signUp}>
          <LinearGradient
            colors={['#aaddaa', '#96d297', '#00c880']}
            style={styles.btnStyle}
            start={[0.0, 0.0]}
            end={[1.0, 1.0]}>
            <Text style={styles.btnText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{padding: 15}}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Root', {
                screen: 'Login',
              })
            }
            style={styles.linkStyle}>
            <Text style={{color: '#0000EE', textDecorationLine: 'underline'}}>
              Login!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  return <SignUp {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
  },
  title: {
    marginTop: 50,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationColor: 'gray',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  fieldText: {
    width: screenWidth * 0.75,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 4,
    marginBottom: 15,
    padding: 10,
  },
  btnStyle: {
    width: screenWidth * 0.75,
    backgroundColor: COLORS.palette.primary.main,
    borderRadius: 4,
    borderColor: COLORS.palette.primary.main,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    fontSize: 16,
  },
  linkStyle: {
    marginBottom: '60%',
    padding: 15,
  },
});
