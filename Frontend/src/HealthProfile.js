import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BUTTONS from './styles/buttons';

// TODO:
// 1. put user's name in header
// 2. validate inputs, display errors
// 3. display correct units

export default class HealthProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      height: '', //stored in cm
      weight: '', //stored in kg
      age: '',
      sex: '',
      feet: '',
      inches: '',
      isMetric: '',
      buttonValue: 'Edit',
      editable: false,
      inputStyle: styles.text,
    };
  }
  UNSAFE_componentWillMount(): void {
    const {route} = this.props;
    const {email} = route.params;
    fetch(
      `http://localhost:8080/User/getCharacteristics?email=${JSON.stringify(
        email,
      )}`,
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          height: data.height.toString(),
          weight: data.weight.toString(),
          age: data.age.toString(),
          sex: data.sex,
          isMetric: data.isMetric,
        }),
      );
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
    let {height, weight, age, sex, feet, inches, isMetric} = this.state;
    const {route} = this.props;
    const {email} = route.params;
    fetch(
      `http://localhost:8080/User/getCharacteristics?email=${JSON.stringify(
        email,
      )}`,
    )
      .then(res => res.json())
      .then(data => {});
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {/*<Text style={styles.header}>[Name]'s Health Profile</Text>*/}
          <ScrollView>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 2}]}>Height:</Text>
              <TextInput
                onChangeText={height => this.setState({height})}
                keyboardType={'numeric'}
                returnKeyType="done"
                style={[
                  styles.textInput,
                  this.state.inputStyle,
                  styles.text,
                  {width: 80},
                ]}
                defaultValue={height}
                value={height}
                placeholderTextColor="#000000"
                editable={this.state.editable}
                maxLength={20}
              />
              <Text style={[styles.text, {padding: 2}]}>cm</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 2}]}>Weight:</Text>
              <TextInput
                onChangeText={weight => this.setState({weight})}
                keyboardType={'numeric'}
                returnKeyType="done"
                style={[
                  styles.textInput,
                  this.state.inputStyle,
                  styles.text,
                  {width: 80},
                ]}
                defaultValue={weight}
                placeholderTextColor="#000000"
                editable={this.state.editable}
                maxLength={20}
              />
              <Text style={[styles.text, {padding: 2}]}>kg</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 2}]}>Age:</Text>
              <TextInput
                onChangeText={age => this.setState({age})}
                keyboardType={'numeric'}
                returnKeyType="done"
                style={[
                  styles.textInput,
                  this.state.inputStyle,
                  styles.text,
                  {width: 80},
                ]}
                defaultValue={age}
                placeholderTextColor="#000000"
                editable={this.state.editable}
                maxLength={20}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 2}]}>Sex:</Text>
              <TextInput
                onChangeText={sex => this.setState({sex})}
                style={[
                  styles.textInput,
                  this.state.inputStyle,
                  styles.text,
                  {width: 80},
                ]}
                defaultValue={sex}
                placeholderTextColor="#000000"
                editable={this.state.editable}
                maxLength={20}
              />
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity style={BUTTONS.primaryButton} onPress={this.onPress}>
          <Text style={BUTTONS.primaryButtonText}>
            {this.state.buttonValue}
          </Text>
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
    // alignSelf: 'center',
    paddingTop: 35,
    paddingLeft: '20%',
  },
  text: {
    fontSize: 20,
    width: 100,
  },
});
