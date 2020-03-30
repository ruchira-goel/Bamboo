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
} from 'react-native';
import BUTTONS from './styles/buttons';
import URL from './url';
import {useNavigation, useRoute} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "./styles/colors";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


// TODO:
// 1. put user's name in header
// 2. validate inputs, display errors
// 3. display correct units

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
      isMetric: '',
      buttonValue: 'Edit',
      editable: false,
      inputStyle: styles.text,
      padding: {paddingTop: 12, paddingBottom: 12},
      borderColorA: COLORS.palette.gray,
      borderColorB: COLORS.palette.gray,
      borderColorC: COLORS.palette.gray,
      paddingTop: {paddingTop: 0},
    };
  }
  componentDidMount(): void {
    // console.log(this.props);
    const {route} = this.props;
    const userId = this.props.userId;
    fetch(
      Platform.OS === 'android'
        ? `${URL.heroku}/User/getCharacteristics?userId=${userId}`
        : `${URL.ios}/User/getCharacteristics?userId=${userId}`,
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
    let {height, weight, age, sex, feet, inches} = this.state;
    const {route} = this.props;
    const userId = this.props.userId;
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
        ? `${URL.heroku}/User/addCharacteristics?userId=${userId}&height=${height}&weight=${weight}&age=${age}&sex=${sex}`
        : `${URL.ios}/User/addCharacteristics?userId=${userId}&height=${height}&weight=${weight}&age=${age}&sex=${sex}`,
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
          borderColorA: COLORS.palette.primary.main,
        });
        break;
      case 'b':
        this.setState({
          borderColorB: COLORS.palette.primary.main,
        });
        break;
      case 'c':
        this.setState({
          borderColorC: COLORS.palette.primary.main,
        });
        break;
    }
  }

  onBlur(field) {
    switch (field) {
      case 'a':
        this.setState({
          borderColorA: COLORS.palette.gray,
        });
        break;
      case 'b':
        this.setState({
          borderColorB: COLORS.palette.gray,
        });
        break;
      case 'c':
        this.setState({
          borderColorC: COLORS.palette.gray,
        });
        break;
    }
  }

  render() {
    let {height, weight, age, sex, feet, inches, isMetric} = this.state;
    const {route} = this.props;
    const userId = this.props.userId;
    let initialRadio = 2;
    if (sex === 'MALE')
      initialRadio = 0;
    else if (sex === 'FEMALE')
      initialRadio = 1;
    const radioProps = [
      {label: 'male', value: 'MALE' },
      {label: 'female', value: 'FEMALE' },
      {label: 'other', value: 'OTHER' }
    ];
    fetch(
      Platform.OS === 'android'
        ? `${URL.heroku}/User/getCharacteristics?userId=${userId}`
        : `http://localhost:8080/User/getCharacteristics?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {});
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.header}>[name]'s Health Profile</Text>
          <ScrollView>
            <View style={[styles.rowContainer, this.state.padding]}>
              <Text style={[styles.text]}>Height</Text>
              <TextInput
                  onBlur={() => this.onBlur('a')}
                  onFocus={() => this.onFocus('a')}
                onChangeText={height => this.setState({height})}
                keyboardType={'numeric'}
                style={[
                  this.state.inputStyle,
                  {borderColor: this.state.borderColorA},
                  styles.text,
                  {width: 80},
                ]}
                defaultValue={height}
                value={height}
                editable={this.state.editable}
                maxLength={20}
              />
              <Text style={[styles.text]}>cm</Text>
            </View>
            <View style={[styles.rowContainer, this.state.padding]}>
              <Text style={[styles.text]}>Weight</Text>
              <TextInput
                  onBlur={() => this.onBlur('b')}
                  onFocus={() => this.onFocus('b')}
                onChangeText={weight => this.setState({weight})}
                keyboardType={'numeric'}
                style={[
                  this.state.inputStyle,
                  {borderColor: this.state.borderColorB},
                  styles.text,
                  {width: 80},
                ]}
                defaultValue={weight}
                editable={this.state.editable}
                maxLength={20}
              />
              <Text style={[styles.text]}>kg</Text>
            </View>
            <View style={[styles.rowContainer, this.state.padding]}>
              <Text style={[styles.text]}>Age</Text>
              <TextInput
                  onBlur={() => this.onBlur('c')}
                  onFocus={() => this.onFocus('c')}
                onChangeText={age => this.setState({age})}
                keyboardType={'numeric'}
                style={[
                  this.state.inputStyle,
                  {borderColor: this.state.borderColorC},
                  styles.text,
                  {width: 80},
                ]}
                defaultValue={age}
                editable={this.state.editable}
                maxLength={20}
              />
            </View>
            <View style={[styles.rowContainer, this.state.padding]}>
              <Text style={[styles.text, {alignSelf: 'flex-start'}, this.state.paddingTop]}>Sex</Text>
              {this.state.editable ?
              <RadioForm
                  radio_props={radioProps}
                  initial={initialRadio}
                  formHorizontal={false}
                  labelHorizontal={true}
                  buttonColor={COLORS.palette.gray}
                  selectedButtonColor={COLORS.palette.primary.main}
                  animation={true}
                  onPress={(value) => {this.setState({sex:value})}}
              /> : <Text style={[
                    styles.text,
                    {width: 80},
                  ]}>{sex.toLowerCase()}</Text>}
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity onPress={this.onPress}>
          <LinearGradient
              colors={['#aaddaa', '#96d297', '#00c880']}
              style={styles.btnStyle}
              start={[0.0, 0.0]}
              end={[1.0, 1.0]}>
            <Text style={styles.btnText}>{this.state.buttonValue}</Text>
          </LinearGradient>
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
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  btnStyle: {
    backgroundColor: COLORS.palette.primary.main,
    borderRadius: 4,
    borderColor: COLORS.palette.primary.main,
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
  },
});
