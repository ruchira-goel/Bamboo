import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

// TODO:
// 1. put user's name in header
// 2. fill inputs with user data
// 3. update database data on 'Save' click
// 4. validate inputs, display errors
// 5. display units

export default class HealthProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonValue: 'Edit',
      editable: false,
      inputStyle: styles.text,
      userEmail: '',
      height: '', //stored in cm
      weight: '', //stored in kg
      age: '',
      sex: '',
      feet: '',
      inches: '',
    };
  }

  onSave = () => {
    let {height, weight, age, sex, feet, inches} = this.state;
    const {route} = this.props;
    const {email} = route.params;
    const stringMethod = String(email);
    this.setState({userEmail: stringMethod});
    if (!height && feet && inches) {
      height = (feet * 12 + inches) * 2.54;
    }

    if (!height) {
      Alert.alert('Height Empty', 'Please enter your height.', [{text: 'OK'}]);
      return;
    }
    if (!weight) {
      Alert.alert('Weight Empty', 'Please enter your weight.', [{text: 'OK'}]);
      return;
    }
    if (!age) {
      Alert.alert('Age Empty', 'Please enter your age.', [{text: 'OK'}]);
      return;
    }
    if (!sex) {
      Alert.alert('Sex Field empty', 'Please enter your sex.', [{text: 'OK'}]);
      return;
    }
    if (height < 0) {
      Alert.alert('Invalid height', 'Please enter a valid height.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (weight < 0) {
      Alert.alert('Invalid weight', 'Please enter a valid weight.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (age < 0) {
      Alert.alert('Invalid age', 'Please enter a valid age.', [{text: 'OK'}]);
      return;
    }
    //sending request to retrieve the corresponding user object for login
    fetch(
      `http://localhost:8080/User/addCharacteristics?email=${JSON.stringify(
        email,
      )}&height=${height}&weight=${weight}&age=${age}&sex=${sex}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          //throwing error when addCharacteristics fails (invalid email)
          if (
            data.message ===
            'There was an error locating your account, please try signing up again'
          ) {
            Alert.alert('User Not Found', data.message, [{text: 'OK'}]);
          }
        } else {
          //going to home screen
        }
      });
  };

  onPress = () => {
    if (this.state.buttonValue === 'Edit') {
      this.setState({
        buttonValue: 'Save',
        editable: true,
        inputStyle: styles.textEdit,
      });
    } else {
      this.onSave();
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
          {/*<Text style={styles.header}>[Name]'s Health Profile</Text>*/}
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
  },
  text: {
    fontSize: 20,
    width: 100,
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#00cc00',
    backgroundColor: '#00cc00',
    padding: 15,
    margin: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
});
