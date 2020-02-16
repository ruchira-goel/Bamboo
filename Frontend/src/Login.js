import React from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';

type Props = {
  changePageHandler: string => any,
};

export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      encryptedPassword: '',
    };
  }

  login = () => {
    const {email, encryptedPassword} = this.state;
    const {changePageHandler} = this.props;
    fetch(
      `http://localhost:8080/User/login?email=${email}&encryptedPassword=${encryptedPassword}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error) {
          Alert.alert('Error', responseJson.message, [{text: 'OK'}]);
        } else {
          console.log('Success');
          changePageHandler('characteristics');
          //go to characteristics page
        }
      });
  };

  render() {
    return (
      <View style={styles.heading}>
        <Text>Bamboo.</Text>
        <TextInput
          style={styles.input}
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={encryptedPassword => this.setState({encryptedPassword})}
        />
        <View>
          <Button title={'Login'} onPress={() => this.login()} />
        </View>
      </View>
    );
  }
}

const styles = {
  heading: {
    fontSize: 24,
  },
  input: {
    width: '70%',
    autoCapitalize: 'none',
    placeholder: 'Email',
  },
};
