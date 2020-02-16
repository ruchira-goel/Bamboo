import * as React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import {Card} from 'react-native-paper';

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
          placeholder="email@example.com"
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
          placeholder="password"
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
          placeholder="confirm password"
        />
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
