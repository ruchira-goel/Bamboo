import React from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      encryptedPassword: '',
    };
  }

  static navigationOptions = {
    header: {
      visible: false,
    },
  };

  login = () => {
    const {email, encryptedPassword} = this.state;
    fetch(
      `http://localhost:8080/User/login?email=${email}&encryptedPassword=${encryptedPassword}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error) {
          Alert.alert('Error', responseJson.message, [{text: 'OK'}]);
        } else {
          console.log('Success');
          //go to characteristics page
        }
      });
  };

  render() {
    return (
      <View style={styles.heading}>
        <Text>Bamboo.</Text>
        <View style={styles.spacingHigh} />
        <TextInput
          style={styles.fieldText}
          autoCapitalize="none"
          placeholder="Enter email"
          onChangeText={email => this.setState({email})}
        />
        <View style={styles.spacingSmall} />
        <Text>{'       '}</Text>
        <TextInput
          style={styles.fieldText}
          autoCapitalize="none"
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={encryptedPassword => this.setState({encryptedPassword})}
        />
        <Text> {'  '}</Text>
        <View style={styles.spacingSmall} />
        <View>
          <Button title={'Login'} onPress={this.loginUser} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: '35%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacingHigh: {
    padding: 15,
  },
  spacingSmall: {
    padding: 0,
  },
  fieldText: {
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    marginLeft: '31%',
    marginRight: '31%',
  },
  alignLeftView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  btnStyle: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 2,
  },
});
