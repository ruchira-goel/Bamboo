import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class HealthProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonValue: 'Edit',
      editable: false,
    };
  }

  onPress = () => {
    if (this.state.buttonValue === 'Edit') {
      this.setState({
        buttonValue: 'Save',
        editable: true,
      });
    } else {
      this.setState({
        buttonValue: 'Edit',
        editable: false,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.header}>[Name]'s Health Profile</Text>
          <ScrollView>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 12}]}>Height:</Text>
              <TextInput
                style={[styles.textInput, styles.text]}
                placeholder="Height"
                placeholderTextColor="#007BFF"
                editable={this.state.editable}
                maxLength={20}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 12}]}>Weight:</Text>
              <TextInput
                style={[styles.textInput, styles.text]}
                placeholder="Weight"
                placeholderTextColor="#007BFF"
                editable={this.state.editable}
                maxLength={20}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 12}]}>Age:</Text>
              <TextInput
                style={[styles.textInput, styles.text]}
                placeholder="Age"
                placeholderTextColor="#007BFF"
                editable={this.state.editable}
                maxLength={20}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 12}]}>Sex:</Text>
              <TextInput
                style={[styles.textInput, styles.text]}
                placeholder="Sex"
                placeholderTextColor="#007BFF"
                editable={this.state.editable}
                maxLength={20}
              />
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={this.onPress}>
          <Text style={styles.saveButtonText}>{this.state.buttonValue}</Text>
        </TouchableOpacity>
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
  contentContainer: {
    flex: 1,
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
    paddingTop: 35,
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
});
