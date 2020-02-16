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

// TODO:
// 1. put user's name in header
// 2. fill inputs with user data
// 3. update database data on 'Save' click
// 4. validate inputs
// 5. display units

export default class HealthProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonValue: 'Edit',
      editable: false,
      inputStyle: styles.text,
    };
  }

  onPress = () => {
    if (this.state.buttonValue === 'Edit') {
      this.setState({
        buttonValue: 'Save',
        editable: true,
        inputStyle: styles.textEdit,
      });
    } else {
      this.setState({
        buttonValue: 'Edit',
        editable: false,
        inputStyle: styles.text,
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
                style={[
                  styles.textInput,
                  this.state.inputStyle,
                  styles.text,
                  {width: 80},
                ]}
                placeholder="165 cm"
                placeholderTextColor="#000000"
                editable={this.state.editable}
                maxLength={20}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 12}]}>Weight:</Text>
              <TextInput
                style={[
                  styles.textInput,
                  this.state.inputStyle,
                  styles.text,
                  {width: 80},
                ]}
                placeholder="50 kg"
                placeholderTextColor="#000000"
                editable={this.state.editable}
                maxLength={20}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 12}]}>Age:</Text>
              <TextInput
                style={[
                  styles.textInput,
                  this.state.inputStyle,
                  styles.text,
                  {width: 80},
                ]}
                placeholder="20"
                placeholderTextColor="#000000"
                editable={this.state.editable}
                maxLength={20}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 12}]}>Sex:</Text>
              <TextInput
                style={[
                  styles.textInput,
                  this.state.inputStyle,
                  styles.text,
                  {width: 80},
                ]}
                placeholder="Female"
                placeholderTextColor="#000000"
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
  textEdit: {
    borderBottomWidth: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 35,
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    width: 100,
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
