import * as React from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import DoneButton from 'react-native-keyboard-done-button';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bamboo</Text>
        <Text style={styles.paragraph}>Create a Bamboo account</Text>
        <TextInput
          style={{
            height: 20,
            marginBottom: 15,
            marginTop: 15,
            marginLeft: 30,
            marginRight: 30,
            borderColor: 'gray',
            borderBottomWidth: 1,
          }}
          autoCorrect="false"
          placeholder="name"
          autoCompleteType="name"
          returnKeyLabel="Done"
          autoCapitalize="words"
        />
        <TextInput
          style={{
            height: 20,
            marginBottom: 15,
            marginTop: 15,
            marginLeft: 30,
            marginRight: 30,
            borderColor: 'gray',
            borderBottomWidth: 1,
          }}
          autoCorrect="false"
          placeholder="email@example.com"
          returnKeyLabel="Done"
        />
        <TextInput
          style={{
            height: 20,
            marginBottom: 15,
            marginTop: 15,
            marginLeft: 30,
            marginRight: 30,
            borderColor: 'gray',
            borderBottomWidth: 1,
          }}
          autoCorrect="false"
          autoCompleteType="email"
          placeholder="password"
          returnKeyLabel="Done"
        />
        <TextInput
          style={{
            height: 20,
            marginBottom: 25,
            marginTop: 15,
            marginLeft: 30,
            marginRight: 30,
            borderColor: 'gray',
            borderBottomWidth: 1,
          }}
          autoCorrect="false"
          autoCompleteType="password"
          placeholder="confirm password"
          returnKeyLabel="Done"
        />
        <DoneButton
          title="Done" //not required, default value = `Done`
          style={{backgroundColor: 'lightgrey'}} //not required
          doneStyle={{color: '#147efb'}} //not required
        />
        <Button
          onPress={() => {
            alert('You tapped the button!');
          }}
          title="Sign Up"
          color="black"
          backgroundColor="green"
        />
        <Text style={styles.paragraph}>Already have an account?</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    margin: 12,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationColor: 'gray',
  },
});
