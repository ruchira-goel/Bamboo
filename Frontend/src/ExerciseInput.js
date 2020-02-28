import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import DatePicker from './DatePicker';
import BUTTONS from './styles/buttons';

// TODO:
// 1. add new exercise
// 2. choose from prev/existing exercise

export default class ExerciseInput extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={styles.inputContainer}>
              <Text style={[styles.text]}>Activity:</Text>
              <TextInput
                // onChangeText={this.handleHeight}
                returnKeyType="done"
                style={[styles.textInput, styles.text]}
                placeholder="activity"
                maxLength={20}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {paddingTop: 6}]}>Date:</Text>
              <DatePicker />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text]}>Duration:</Text>
              <TextInput
                // onChangeText={age => this.setState({age})}
                style={[styles.textInput, {fontSize: 20}]}
                keyboardType={'numeric'}
                placeholder="hh"
                maxLength={2}
              />
              <Text style={{fontSize: 20}}>:</Text>
              <TextInput
                // onChangeText={age => this.setState({age})}
                style={[styles.textInput, {fontSize: 20}]}
                keyboardType={'numeric'}
                placeholder="mm"
                maxLength={2}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text]}>Calories:</Text>
              <TextInput
                // onChangeText={age => this.setState({age})}
                style={[styles.textInput, styles.text]}
                placeholder="calories"
                maxLength={20}
              />
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity style={BUTTONS.primaryButton} onPress={this.onPress}>
          <Text style={BUTTONS.primaryButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
  },
  contentContainer: {
    flex: 1,
    margin: 0,
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  textInput: {
    borderBottomWidth: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 35,
  },
  text: {
    fontSize: 20,
    width: 100,
  },
  button: {
    margin: 0,
  },
});
