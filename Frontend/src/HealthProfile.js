import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Switch,
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
      Platform.OS === 'android'
        ? `http://10.0.2.2:8080/User/getCharacteristics?email=${JSON.stringify(
            email,
          )}`
        : `http://localhost:8080/User/getCharacteristics?email=${JSON.stringify(
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

  isInvalid(str) {
    return /[-,_]/g.test(str);
  }

  isAgeInvalid(str) {
    return /[-,_.]/g.test(str);
  }

  onSave = () => {
    let {height, weight, age, sex, feet, inches, isMetric} = this.state;
    const {route} = this.props;
    const {email} = route.params;
    const stringMethod = String(email);
    this.setState({userEmail: stringMethod});
    if (!height && feet && inches) {
      height = (feet * 12 + inches) * 2.54;
    }

    if (height <= 0 || this.isInvalid(height)) {
      Alert.alert('Invalid height', 'Please enter a valid height.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (weight <= 0 || this.isInvalid(weight)) {
      Alert.alert('Invalid weight', 'Please enter a valid weight.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (age <= 0 || this.isAgeInvalid(age)) {
      Alert.alert('Invalid age', 'Please enter a valid age.', [{text: 'OK'}]);
      return;
    }
    //sending request to retrieve the corresponding user object for login
    fetch(
      Platform.OS === 'android'
        ? `http://10.0.2.2:8080/User/addCharacteristics?email=${JSON.stringify(
            email,
          )}&height=${height}&weight=${weight}&age=${age}&sex=${sex}&isMetric=${isMetric}`
        : `http://localhost:8080/User/addCharacteristics?email=${JSON.stringify(
            email,
          )}&height=${height}&weight=${weight}&age=${age}&sex=${sex}&isMetric=${isMetric}`,
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

  toggleSwitch = value => {
    this.setState({isMetric: value});
  };

  weightMetricToImperial() {
    return this.state.weight * 2.20462;
  }

  weightImperialToMetric(weight) {
    return weight * 0.4535922;
  }

  render() {
    let {height, weight, age, sex, feet, inches, isMetric} = this.state;
    const {route} = this.props;
    const {email} = route.params;
    fetch(
      Platform.OS === 'android'
        ? `http://10.0.2.2:8080/User/getCharacteristics?email=${JSON.stringify(
            email,
          )}`
        : `http://localhost:8080/User/getCharacteristics?email=${JSON.stringify(
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
                style={[
                  styles.textInput,
                  this.state.inputStyle,
                  styles.text,
                  {width: 80},
                ]}
                defaultValue={this.state.isMetric ? weight : this.weightMetricToImperial().toString()}
                placeholderTextColor="#000000"
                editable={this.state.editable}
                maxLength={20}
              />
              <Text style={[styles.text, {padding: 2}]}>
                {this.state.isMetric ? 'kg' : 'lb'}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 2}]}>Age:</Text>
              <TextInput
                onChangeText={age => this.setState({age})}
                keyboardType={'numeric'}
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

            <View style={styles.inputContainer}>
              <Text style={[styles.text, {padding: 2}]}>
                {this.state.isMetric ? 'Metric' : 'Imperial'}
              </Text>
              <Switch
                style={styles.switch}
                onValueChange={this.toggleSwitch}
                value={this.state.isMetric}
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
