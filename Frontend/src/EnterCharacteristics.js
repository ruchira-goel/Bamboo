import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Switch,
  Alert,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import * as Constants from './Constants';
import {Dropdown} from 'react-native-material-dropdown';
import {useNavigation, useRoute} from '@react-navigation/native';

class EnterCharacteristics extends React.Component {
  state = {
    switchValue: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      height: '', //stored in cm
      weight: '', //stored in kg
      age: '',
      sex: '',
      feet: '',
      inches: '',
      lifestyle: '',
    };
  }

  isInvalid(str) {
    return /[-,_]/g.test(str);
  }

  isAgeInvalid(str) {
    return /[-,_.]/g.test(str);
  }

  addCharacteristics = () => {
    const {route} = this.props;
    let {height, weight, age, sex, feet, inches, lifestyle} = this.state;
    const {userId} = route.params;
    // console.log('id: ' + userId);

    if (this.state.switchValue) {
      //imperial
      height = (parseFloat(feet * 12) + parseFloat(inches)) * 2.54;
      weight = parseFloat(weight) * 0.453592;
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
    if (!lifestyle) {
      Alert.alert('Lifestyle Field empty', 'Please enter your lifestyle.', [
        {text: 'OK'},
      ]);
      return;
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
        ? `${
            Constants.URL.android
          }/User/addCharacteristics?userId=${userId}&height=${height}&weight=${weight}&age=${age}&sex=${sex}&lifestyle=${lifestyle}&isMetric=${!this
            .state.switchValue}`
        : `${
            Constants.URL.ios
          }/User/addCharacteristics?userId=${userId}&height=${height}&weight=${weight}&age=${age}&sex=${sex}&lifestyle=${lifestyle}&isMetric=${!this
            .state.switchValue}`,
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data);
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
          this.props.navigation.navigate('Root', {
            screen: 'Enter Dietary Restrictions',
            params: {
              userId: data.userId,
            },
          });
        }
      });
  };

  toggleSwitch = value => {
    this.setState({switchValue: value});
  };

  renderHeight() {
    if (!this.state.switchValue) {
      return (
        <View style={styles.flexRowContainer}>
          <TextInput
            onChangeText={height => this.setState({height})}
            placeholder={'Enter Height'}
            keyboardType={'numeric'}
            autoCorrect={false}
            returnKeyType="done"
            style={styles.input}
          />
          <Text>{this.state.switchValue ? ' inch' : ' cm'}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.flexRowContainer}>
          <TextInput
            onChangeText={feet => this.setState({feet})}
            placeholder={'Enter Height'}
            keyboardType={'numeric'}
            autoCorrect={false}
            returnKeyType="done"
            style={styles.smallInput}
          />
          <Text>{' feet '}</Text>
          <TextInput
            onChangeText={inches => this.setState({inches})}
            placeholder={'Enter Height'}
            keyboardType={'numeric'}
            autoCorrect={false}
            returnKeyType="done"
            style={styles.smallInput}
          />
          <Text>{' inches'}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.fullContainer}>
          <Text style={styles.heading}>My Information</Text>

          <View style={styles.flexRowContainer}>{this.renderHeight()}</View>
          <View style={styles.flexRowContainer}>
            <TextInput
              onChangeText={weight => this.setState({weight})}
              placeholder={'Enter Weight'}
              keyboardType={'numeric'}
              autoCorrect={false}
              returnKeyType="done"
              style={styles.input}
            />
            <Text>{this.state.switchValue ? ' lb' : ' kg'}</Text>
          </View>

          <View style={styles.flexRowContainer}>
            <TextInput
              onChangeText={age => this.setState({age})}
              placeholder={'Enter Age'}
              keyboardType={'numeric'}
              autoCorrect={false}
              returnKeyType="done"
              style={styles.input}
            />
            <Text> years</Text>
          </View>
          <Dropdown
            selectedItemColor={Constants.COLORS.primary.main}
            label="Sex"
            containerStyle={{width: '50%'}}
            data={[{value: 'Female'}, {value: 'Male'}, {value: 'Other'}]}
            onChangeText={value => {
              this.setState({sex: value});
            }}
          />
          <Dropdown
            selectedItemColor={Constants.COLORS.primary.main}
            label="Lifestyle"
            data={[
              {value: 'Sedentary'},
              {value: 'Low Active'},
              {value: 'Moderately Active'},
              {value: 'Extremely Active'},
            ]}
            containerStyle={{width: '50%', marginBottom: 20}}
            onChangeText={value => {
              this.setState({lifestyle: value});
            }}
          />

          <Text>{this.state.switchValue ? 'Imperial' : 'Metric'}</Text>
          <Switch
            style={styles.switch}
            onValueChange={this.toggleSwitch}
            value={this.state.switchValue}
          />
          <TouchableOpacity
            onPress={this.addCharacteristics}
            style={styles.btnStyle}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <EnterCharacteristics {...props} navigation={navigation} route={route} />
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 10,
    textAlign: 'center',
    alignItems: 'center',
    width: Constants.DIMENSIONS.screenWidth,
  },
  flexRowContainer: {
    // width: '80%',
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    margin: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  btnStyle: {
    backgroundColor: Constants.COLORS.primary.main,
    borderRadius: 4,
    borderColor: Constants.COLORS.primary.main,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: Constants.DIMENSIONS.screenWidth * 0.5,
  },
  input: {
    width: Constants.DIMENSIONS.screenWidth * 0.5,
    marginBottom: 20,
    borderBottomWidth: 1,
    backgroundColor: '#ecf0f1',
    textAlign: 'center',
  },
  smallInput: {
    width: Constants.DIMENSIONS.screenWidth * 0.25,
    marginBottom: 20,
    borderBottomWidth: 1,
    backgroundColor: '#ecf0f1',
    textAlign: 'center',
  },
  switch: {
    textAlign: 'center',
    justifyContent: 'center',
  },
});
