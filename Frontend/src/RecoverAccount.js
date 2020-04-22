import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import URL from './url';

export default class RecoverAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  sendEmail = () => {
    const {email} = this.state;
    if (!email) {
      Alert.alert('Email Empty', 'Please enter an email.', [{text: 'OK'}]);
      return;
    }
    fetch(
      Platform.OS === 'android'
        ? `${URL.android}/User/recoverAccount?email=${email}`
        : `http://localhost:8080/User/recoverAccount?email=${email}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          if (data.message === "This email isn't registered yet") {
            Alert.alert('Not registered', data.message, [{text: 'OK'}]);
          } else if (data.message === "Couldn't send email") {
            Alert.alert(
              data.message,
              "Couldn't send email at this time, please try again later.",
              [{text: 'OK'}],
            );
          }
        } else {
          //TODO: Add loading bar
          Alert.alert('Check Your Inbox', 'Email has been successfully sent.', [
            {text: 'OK'},
          ]);
        }
      });
  };

  enterEmail = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', marginTop: '10%'}}>
        <View style={{}}>
          <Text style={{fontSize: 20}}>Recover Password</Text>
        </View>
        <View style={{padding: '3%'}} />
        <TextInput
          style={styles.fieldText}
          autoCapitalize="none"
          placeholder="Enter email"
          onChangeText={email => this.setState({email})}
        />
        <View style={{padding: '3%'}} />
        <View style={{flex: 0.8, width: '40%'}}>
          <TouchableOpacity style={styles.btnStyle} onPress={this.sendEmail}>
            <Text>Send email</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return <View style={{flex: 1}}>{this.enterEmail()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  textEdit: {
    borderBottomWidth: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    // alignSelf: 'center',
    paddingTop: 35,
    paddingLeft: '20%',
  },
  text: {
    fontSize: 20,
    width: 100,
  },
  switch: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    backgroundColor: '#3eb245',
    color: 'black',
    borderRadius: 2,
    borderColor: '#3eb245',
    height: '8%',
    justifyContent: 'center', //text in the middle of the button
    alignItems: 'center', //text in the middle of the button
  },
});
