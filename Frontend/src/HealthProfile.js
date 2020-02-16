import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} from 'react-native';

export default class HealthProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Name's Health Profile</Text>
          <ScrollView>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 12}]}>Height:</Text>
              <TextInput
                style={[styles.textInput, styles.text]}
                placeholder="Height"
                maxLength={20}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 12}]}>Weight:</Text>
              <TextInput
                style={[styles.textInput, styles.text]}
                placeholder="Weight"
                maxLength={20}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 12}]}>Age:</Text>
              <TextInput
                style={[styles.textInput, styles.text]}
                placeholder="Age"
                maxLength={20}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 12}]}>Sex:</Text>
              <TextInput
                style={[styles.textInput, styles.text]}
                placeholder="Sex"
                maxLength={20}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 45,
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 18,
  },
});
