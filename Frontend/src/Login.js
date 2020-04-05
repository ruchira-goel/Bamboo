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

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      encryptedPassword: '',
    };
  }

  render() {
    return (
      <View style={styles.heading}>
        <Text style={styles.title}>Bamboo.</Text>
        <View style={{padding: '2%'}} />
        <View style={styles.spacingHigh} />
        <TextInput
          style={styles.fieldText}
          autoCapitalize="none"
          placeholder="Enter email"
          onChangeText={email => this.setState({email})} //setting the email when user enters it
        />
        <View style={{padding: '3%'}} />
        <TextInput
          style={styles.fieldText}
          autoCapitalize="none"
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={encryptedPassword => this.setState({encryptedPassword})} //setting the password when user enters it, not encrypted yet
        />
        <View style={{padding: '3%'}} />
        <View style={styles.spacingSmall} />
        <View style={styles.container}>
          <TouchableOpacity onPress={this.login} style={styles.btnStyle}>
            <Text>Login</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}} />
          <View style={{flex: 0.4, flexDirection: 'row'}}>
            <Text style={{padding: 15}}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.replace('SignUp')}
              style={styles.linkStyle}>
              <Text style={{color: '#0000EE', textDecorationLine: 'underline'}}>
                Signup!
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.4, flexDirection: 'row'}}>
            <Text style={{padding: 15}}>Forgot Password? </Text>
            <TouchableOpacity
              onPress={this.forgotPassword}
              style={styles.linkStyle}>
              <Text style={{color: '#0000EE', textDecorationLine: 'underline'}}>
                Reset Password
              </Text>
            </TouchableOpacity>
          </View>
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
    marginTop: '7%',
  },
  title: {
    margin: 12,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationColor: 'gray',
  },
  container: {
    flex: 0.5,
    //width: '40%',
    //height: '20%',
    alignItems: 'center',
    alignContent: 'center',
    // backgroundColor: 'blue',
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
    height: '18%',
    justifyContent: 'center', //text in the middle of the button
    alignItems: 'center', //text in the middle of the button
  },
  linkStyle: {
    marginBottom: '70%',
    padding: '4%',
  },
  /*textalign for the text to be in the center for "bamboo."*/
});
