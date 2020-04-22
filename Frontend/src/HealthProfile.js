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
import * as Constants from './Constants';
import {useNavigation, useRoute} from '@react-navigation/native';
// import {LinearGradient} from 'expo-linear-gradient';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

// TODO:
// 1. put user's name in header?
// 2. validate inputs (feet & inches), display errors
// 3. slight rounding errors
// 4. sometimes on edit -> toggle -> values don't stay in input boxes

class HealthProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '', //stored in cm
      weight: '', //stored in kg
      age: '',
      sex: '',
      feet: '',
      inches: '',
      weightLb: '',
      isMetric: '',
      buttonValue: 'Edit',
      editable: false,
      inputStyle: styles.text,
      padding: {paddingTop: 12, paddingBottom: 12},
      borderColorA: Constants.COLORS.gray,
      borderColorB: Constants.COLORS.gray,
      borderColorC: Constants.COLORS.gray,
      paddingTop: {paddingTop: 0},
    };
  }
  componentDidMount(): void {
    // console.log(this.props);
    const {route} = this.props;
    const userId = this.props.userId;
    fetch(
      Platform.OS === 'android'
        ? `${Constants.URL.android}/User/getCharacteristics?userId=${userId}`
        : `${Constants.URL.ios}/User/getCharacteristics?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          height: data.height.toString(),
          weight: data.weight.toString(),
          age: data.age.toString(),
          sex: data.sex,
          isMetric: data.isMetric,
        });
        let weightLb = Math.round(data.weight * 2.20462).toString();
        this.setState({weightLb: weightLb});
        this.calculateFeetInches();
      });
  }

  calculateFeetInches() {
    let feet = Math.floor(this.state.height / 30.48);
    let inches =
      (this.state.height / 30.48 - Math.floor(this.state.height / 30.48)) * 12;
    this.setState({feet: Math.round(feet).toString()});
    this.setState({inches: Math.round(inches).toString()});
  }

  isInvalid(str) {
    return /[-,_]/g.test(str);
  }

  isAgeInvalid(str) {
    return /[-,_.]/g.test(str);
  }

  toggleSwitch = value => {
    this.setState({isMetric: value});
  };

  onSave = () => {
    let {
      height,
      weight,
      weightLb,
      age,
      sex,
      feet,
      inches,
      isMetric,
    } = this.state;
    const {route} = this.props;
    const userId = this.props.userId;
    // if (!height && feet && inches) {
    //   height = (feet * 12 + inches) * 2.54;
    // }

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
    if (isMetric) {
      this.state.feet = Math.floor(this.state.height / 30.48);
      this.state.inches = Math.round(
        (this.state.height / 30.48 - Math.floor(this.state.height / 30.48)) *
          12,
      );
      this.state.weightLb = Math.round(this.state.weight * 2.20462).toString();
    } else {
      this.state.height = Math.round(
        (parseFloat(feet * 12) + parseFloat(inches)) * 2.54,
      );
      this.state.weight = Math.round(parseFloat(weight) * 0.453592);
      height = this.state.height;
      weight = this.state.weight;
    }
    // console.log('Metric: ' + height + ',' + weight);
    // console.log('Imperial: ' + feet + ',' + inches + ',' + weightLb);
    fetch(
      Platform.OS === 'android'
        ? `${
            Constants.URL.android
          }/User/addCharacteristics?userId=${userId}&height=${height}&weight=${weight}&age=${age}&sex=${sex}&isMetric=${isMetric}`
        : `${
            Constants.URL.ios
          }/User/addCharacteristics?userId=${userId}&height=${height}&weight=${weight}&age=${age}&sex=${sex}&isMetric=${isMetric}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          //throwing error when addCharacteristics fails (invalid userId)
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
        padding: {paddingTop: 0, paddingBottom: 0},
        paddingTop: {paddingTop: 12},
      });
    } else {
      this.onSave();
      this.setState({
        buttonValue: 'Edit',
        editable: false,
        inputStyle: styles.text,
        padding: {paddingTop: 12, paddingBottom: 12},
        paddingTop: {paddingTop: 0},
      });
    }
  };

  onFocus(field) {
    switch (field) {
      case 'a':
        this.setState({
          borderColorA: Constants.COLORS.primary.main,
        });
        break;
      case 'b':
        this.setState({
          borderColorB: Constants.COLORS.primary.main,
        });
        break;
      case 'c':
        this.setState({
          borderColorC: Constants.COLORS.primary.main,
        });
        break;
    }
  }

  onBlur(field) {
    switch (field) {
      case 'a':
        this.setState({
          borderColorA: Constants.COLORS.gray,
        });
        break;
      case 'b':
        this.setState({
          borderColorB: Constants.COLORS.gray,
        });
        break;
      case 'c':
        this.setState({
          borderColorC: Constants.COLORS.gray,
        });
        break;
    }
  }

  render() {
    let {
      height,
      weight,
      weightLb,
      age,
      sex,
      feet,
      inches,
      isMetric,
    } = this.state;
    // console.log('Metric: ' + height + ',' + weight);
    // console.log('Imperial: ' + feet + ',' + inches + ',' + weightLb);
    const {route} = this.props;
    const userId = this.props.userId;
    let initialRadio = 2;
    if (sex === 'MALE') {
      initialRadio = 0;
    } else if (sex === 'FEMALE') {
      initialRadio = 1;
    }
    const radioProps = [
      {label: 'male', value: 'MALE'},
      {label: 'female', value: 'FEMALE'},
      {label: 'other', value: 'OTHER'},
    ];
    fetch(
      Platform.OS === 'android'
        ? `${Constants.URL.android}/User/getCharacteristics?userId=${userId}`
        : `${Constants.URL.ios}/User/getCharacteristics?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {});
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {/*<Text style={styles.header}>[name]'s Health Profile</Text>*/}
          <ScrollView>
            <View>
              {/*<View>{this.renderHeight()}</View>*/}
              {isMetric ? (
                <View style={[styles.rowContainer, this.state.padding]}>
                  <Text style={[styles.text]}>Height</Text>
                  <TextInput
                    onBlur={() => this.onBlur('a')}
                    onFocus={() => this.onFocus('a')}
                    onChangeText={height => this.setState({height})}
                    keyboardType={'numeric'}
                    textAlign={'right'}
                    style={[
                      this.state.inputStyle,
                      {borderColor: this.state.borderColorA},
                      styles.text,
                      {width: 50},
                    ]}
                    defaultValue={height}
                    editable={this.state.editable}
                    maxLength={3}
                  />
                  <Text style={[styles.text, {paddingLeft: 4}]}>cm</Text>
                </View>
              ) : (
                <View style={[styles.rowContainer, this.state.padding]}>
                  <Text style={[styles.text]}>Height</Text>
                  <TextInput
                    onBlur={() => this.onBlur('a')}
                    onFocus={() => this.onFocus('a')}
                    onChangeText={feet => this.setState({feet})}
                    keyboardType={'numeric'}
                    textAlign={'right'}
                    style={[
                      this.state.inputStyle,
                      {borderColor: this.state.borderColorA},
                      styles.text,
                      {width: 50},
                    ]}
                    defaultValue={feet}
                    editable={this.state.editable}
                    maxLength={3}
                  />
                  <Text
                    style={[
                      {fontSize: 16, paddingLeft: 4, paddingRight: 10.5},
                    ]}>
                    ft
                  </Text>
                  <TextInput
                    onBlur={() => this.onBlur('a')}
                    onFocus={() => this.onFocus('a')}
                    onChangeText={inches => this.setState({inches})}
                    keyboardType={'numeric'}
                    textAlign={'right'}
                    style={[
                      this.state.inputStyle,
                      {borderColor: this.state.borderColorA},
                      styles.text,
                      {width: 50},
                    ]}
                    defaultValue={inches}
                    editable={this.state.editable}
                    maxLength={3}
                  />
                  <Text style={[styles.text, {paddingLeft: 4}]}>in</Text>
                </View>
              )}
              {/*<Text style={[styles.text]}>{isMetric ? 'cm' : '??'}</Text>*/}
            </View>
            <View style={[styles.rowContainer, this.state.padding]}>
              <Text style={[styles.text]}>Weight</Text>
              <TextInput
                onBlur={() => this.onBlur('b')}
                onFocus={() => this.onFocus('b')}
                onChangeText={
                  isMetric
                    ? weight => this.setState({weight})
                    : weightLb => this.setState({weightLb})
                }
                keyboardType={'numeric'}
                textAlign={'right'}
                style={[
                  this.state.inputStyle,
                  {borderColor: this.state.borderColorB},
                  styles.text,
                  {width: 50},
                ]}
                defaultValue={isMetric ? weight : weightLb}
                editable={this.state.editable}
                maxLength={3}
              />
              <Text style={[styles.text, {paddingLeft: 4}]}>
                {isMetric ? 'kg' : 'lb'}
              </Text>
            </View>
            <View style={[styles.rowContainer, this.state.padding]}>
              <Text style={[styles.text]}>Age</Text>
              <TextInput
                onBlur={() => this.onBlur('c')}
                onFocus={() => this.onFocus('c')}
                onChangeText={age => this.setState({age})}
                keyboardType={'numeric'}
                textAlign={'right'}
                style={[
                  this.state.inputStyle,
                  {borderColor: this.state.borderColorC},
                  styles.text,
                  {width: 50},
                ]}
                defaultValue={age}
                editable={this.state.editable}
                maxLength={3}
              />
            </View>
            <View style={[styles.rowContainer, this.state.padding]}>
              <Text
                style={[
                  styles.text,
                  {alignSelf: 'flex-start'},
                  this.state.paddingTop,
                ]}>
                Sex
              </Text>
              {this.state.editable ? (
                <RadioForm
                  radio_props={radioProps}
                  initial={initialRadio}
                  formHorizontal={false}
                  labelHorizontal={true}
                  buttonColor={Constants.COLORS.gray}
                  selectedButtonColor={Constants.COLORS.primary.main}
                  animation={true}
                  onPress={value => {
                    this.setState({sex: value});
                  }}
                />
              ) : (
                <Text style={[styles.text, {width: 80}]}>
                  {sex.toLowerCase()}
                </Text>
              )}
            </View>
            {/*<View style={styles.rowContainer}>*/}
            {/*  <Text style={styles.text}>*/}
            {/*    {this.state.isMetric ? 'Metric' : 'Imperial'}*/}
            {/*  </Text>*/}
            {/*  <Switch*/}
            {/*    onValueChange={this.toggleSwitch}*/}
            {/*    value={isMetric}*/}
            {/*    disabled={!this.state.editable}*/}
            {/*  />*/}
            {/*</View>*/}
          </ScrollView>
        </View>
        <TouchableOpacity onPress={this.onPress} style={styles.btnStyle}>
          <Text style={styles.btnText}>{this.state.buttonValue}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <HealthProfile {...props} navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.COLORS.background,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Constants.COLORS.background,
    justifyContent: 'space-evenly',
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  btnStyle: {
    backgroundColor: Constants.COLORS.primary.main,
    borderRadius: 4,
    borderColor: Constants.COLORS.primary.main,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  btnText: {
    fontSize: 16,
  },
  textEdit: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 4,
    padding: 10.5,
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  text: {
    fontSize: 16,
    width: 100,
    paddingLeft: 10.5,
    paddingRight: 10.5,
  },
});
