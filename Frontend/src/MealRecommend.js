import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import CheckBox from 'react-native-check-box';
import URL from './url';

export default class MealRecommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userRequirements: '',
      calLow: '',
      calHigh: '',
      fatLow: '',
      fatHigh: '',
      proteinLow: '',
      proteinHigh: '',
      carbsLow: '',
      carbsHigh: '',
      isCheckedCal: false,
      isCheckedFat: false,
      isCheckedProtein: false,
      isCheckedCarbs: false,
      isCheckedCalLow: false,
      isCheckedCalHigh: false,
      isCheckedProteinLow: false,
      isCheckedProteinHigh: false,
      isCheckedCarbsLow: false,
      isCheckedCarbsHigh: false,
      isCheckedFatLow: false,
      isCheckedFatHigh: false,
      isCheckedNumMeals: false,
      numMeals: '',
      limitOpts: [
        {
          value: 'Less than',
        },
        {
          value: 'Greater than',
        },
      ],
    };
  }

  renderLimits = (nutrient, limit) => {

    if (this.state['isChecked' + nutrient]) {
      let checkBoxLimit = 'isChecked' + nutrient + limit;
      let nutrientLimit = nutrient.toLowerCase() + limit;
      let label = limit === 'High' ? 'Upper Limit' : 'Lower Limit';
      return (
        <View style={{flex: 0.5}}>
          <View style={{flex: 0.5, flexDirection: 'row'}}>
            <CheckBox
              style={{width: '50%', height: '50%'}}
              onClick={() => {
                this.setState(
                  {
                    [checkBoxLimit]: !this.state[checkBoxLimit],
                  },
                  () => {
                    if (!this.state[checkBoxLimit]) {
                      this.setState({[nutrientLimit]: ''});
                    }
                  },
                );
              }}
              isChecked={this.state[checkBoxLimit]}
              leftText={label}
            />
            {this.renderTextInput(this.state[checkBoxLimit], nutrientLimit)}
          </View>
        </View>
      );
    }
  };

  renderTextInput = (check, value) => {
    if (check) {
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <TextInput
            style={{
              borderBottomWidth: 0.5,
              width: '60%',
              textAlign: 'center',
              align: 'center',
              height: '88%',
            }}
            placeholder="Amount"
            defaultValue={this.state[value]}
            onChangeText={amount => this.setState({[value]: amount})}
            keyboardType={'numeric'}
          />
        </View>
      );
    }
  };

  renderNumMeals = () => {
    if (this.state.isCheckedNumMeals) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
            style={{
              borderBottomWidth: 0.5,
              width: '50%',
              textAlign: 'center',
            }}
            placeholder="Enter number of meals"
            defaultValue={this.state.numMeals.toString()}
            onChangeText={numMeals => this.setState({numMeals})}
            keyboardType={'numeric'}
          />
        </View>
      );
    }
  };

  inputCheck = () => {
    const {
      isCheckedCal,
      isCheckedCarbs,
      isCheckedFat,
      isCheckedProtein,
      isCheckedNumMeals,
      isCheckedCalLow,
      isCheckedCalHigh,
      isCheckedProteinLow,
      isCheckedProteinHigh,
      isCheckedCarbsLow,
      isCheckedCarbsHigh,
      isCheckedFatLow,
      isCheckedFatHigh,
      numMeals,
    } = this.state;
    if (isCheckedNumMeals && numMeals === '') {
      Alert.alert(
        'Enter Number of Meals',
        'Enter the number of meals you want recommended.',
        [{text: 'OK'}],
      );
      return;
    }
    if (isCheckedNumMeals && (numMeals <= 0 || numMeals >= 100)) {
      Alert.alert('Enter Valid Number', 'Enter a number between 0 and 100.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (
      !isCheckedCal &&
      !isCheckedCarbs &&
      !isCheckedFat &&
      !isCheckedProtein
    ) {
      Alert.alert('Select Item', 'Select at least one nutrient!', [
        {text: 'OK'},
      ]);
      return;
    }
    if (
      !isCheckedCalHigh &&
      !isCheckedCalLow &&
      !isCheckedFatHigh &&
      !isCheckedFatLow &&
      !isCheckedCarbsLow &&
      !isCheckedCarbsHigh &&
      !isCheckedProteinHigh &&
      !isCheckedProteinLow
    ) {
      Alert.alert('Select Limit', 'Select at least one limit!', [{text: 'OK'}]);
      return;
    }
    if (
      this.renderAlert('Cal') ||
      this.renderAlert('Fat') ||
      this.renderAlert('Protein') ||
      this.renderAlert('Carbs')
    ) {
      return;
    }
    this.getRecommendedMeals();
  };

  renderAlert = nutrient => {
    if (
      this.state['isChecked' + nutrient] &&
      !this.state['isChecked' + nutrient + 'Low'] &&
      !this.state['isChecked' + nutrient + 'High']
    ) {
      if (nutrient === 'Cal') {
        nutrient = 'Calories';
      }
      Alert.alert(
        'Select a limit',
        `Select at least one limit for ${nutrient.toLowerCase()}!`,
        [{text: 'OK'}],
      );
      return true;
    }
    return false;
  };

  getRecommendedMeals = () => {
    const {route} = this.props;
    const {userId} = route.params;
    const {
      isCheckedNumMeals,
      isCheckedCalLow,
      isCheckedCalHigh,
      isCheckedProteinLow,
      isCheckedProteinHigh,
      isCheckedCarbsLow,
      isCheckedCarbsHigh,
      isCheckedFatLow,
      isCheckedFatHigh,
      userRequirements,
      numMeals,
    } = this.state;
    let {
      calLow,
      calHigh,
      fatLow,
      fatHigh,
      proteinLow,
      proteinHigh,
      carbsLow,
      carbsHigh,
    } = this.state;
    let request = `/Meal/getRecommended?userId=${userId}&`;
    console.log(calLow)
    if (isCheckedCalLow) {
      if (calLow === '') {
        if (userRequirements === '') {
          this.getDietaryRestrictions();
        }
        calLow = userRequirements.calLow;//.toFixed(2);
      }
      request = request.concat(`calLow=${calLow}&`);
    } else {
      request = request.concat('calLow=&');
    }
    if (isCheckedCalHigh) {
      if (calHigh === '') {
        if (userRequirements === '') {
          this.getDietaryRestrictions();
        }
        calHigh = userRequirements.calHigh;//.toFixed(2);
      }
      request = request.concat(`calHigh=${calHigh}&`);
    } else {
      request = request.concat('calHigh=&');
    }
    if (isCheckedFatHigh) {
      if (fatHigh === '') {
        if (userRequirements === '') {
          this.getDietaryRestrictions();
          //
        }

        fatHigh = userRequirements.fatHigh.toFixed(2);
      }
      request = request.concat(`fatHigh=${fatHigh}&`);
    } else {
      request = request.concat('fatHigh=&');
    }
    if (isCheckedFatLow) {
      if (fatLow === '') {
        if (userRequirements === '') {
          this.getDietaryRestrictions();
        }
        fatLow = userRequirements.fatLow.toFixed(2);
      }
      request = request.concat(`fatLow=${fatLow}&`);
    } else {
      request = request.concat('fatLow=&');
    }
    if (isCheckedProteinHigh) {
      if (proteinHigh === '') {
        if (userRequirements === '') {
          this.getDietaryRestrictions();
        }
        proteinHigh = userRequirements.proteinHigh.toFixed(2);
      }
      request = request.concat(`proteinHigh=${proteinHigh}&`);
    } else {
      request = request.concat('proteinHigh=&');
    }
    if (isCheckedProteinLow) {
      if (proteinLow === '') {
        if (userRequirements === '') {
          this.getDietaryRestrictions();
        }
        proteinLow = userRequirements.proteinLow.toFixed(2);
      }
      request = request.concat(`proteinLow=${proteinLow}&`);
    } else {
      request = request.concat('proteinLow=&');
    }
    if (isCheckedCarbsHigh) {
      if (carbsHigh === '') {
        if (userRequirements === '') {
          this.getDietaryRestrictions();
        }
        carbsHigh = userRequirements.carbsHigh.toFixed(2);
      }
      request = request.concat(`carbsHigh=${carbsHigh}&`);
    } else {
      request = request.concat('carbsHigh=&');
    }
    if (isCheckedCarbsLow) {
      if (carbsLow === '') {
        if (userRequirements === '') {
          this.getDietaryRestrictions();
        }
        carbsLow = userRequirements.carbsLow.toFixed(2);
      }
      request = request.concat(`carbsLow=${carbsLow}&`);
    } else {
      request = request.concat('carbsLow=&');
    }
    if (isCheckedNumMeals) {
      request = request.concat(`numMeals=${numMeals}`);
    } else {
      request = request.concat('numMeals=0');
    }
    console.log('Request: ' + request);
    fetch(
      Platform.OS === 'android'
        ? `${URL.android}/${request}`
        : `${URL.ios}/${request}`,
    )
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        if (data.error) {
          Alert.alert('Error', data.message, [{text: 'OK'}]);
        } else {
          this.props.navigation.navigate('RecommendedMealsList', {
            userId: userId,
            meals: data,
          });
        }
      });
  };

  getDietaryRestrictions = () => {
    const {route} = this.props;
    const {userId} = route.params;
    fetch(
      Platform.OS === 'android'
        ? `${URL.android}/User/getDietRequirements?userId=${userId}`
        : `${URL.ios}/User/getDietRequirements?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        if (data.error) {
          Alert.alert('Error', data.message, [{text: 'OK'}]);
        } else {
          console.log(data)
          this.setState({userRequirements: data});
        }
      });
  };

  setLimits = (limitName, data) => {
    if ( data[limitName]!== undefined) {
      this.setState({[limitName]: data[limitName]}, () => {
        console.log(this.state[limitName]);
      });
    }
  }

  componentWillMount(): void {
    const {route} = this.props;
    const {userId} = route.params;
    fetch(
      Platform.OS === 'android'
        ? `${URL.android}/User/getSavedRecommendationValues?userId=${userId}`
        : `${URL.ios}/User/getSavedRecommendationValues?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          Alert.alert('Error', data.message, [{text: 'OK'}]);
        } else if (data.isEmpty) {
        } else {
          this.checkDietFields(data, 'Carbs', 'Low');
          this.checkDietFields(data, 'Carbs', 'High');
          this.checkDietFields(data, 'Fat', 'Low');
          this.checkDietFields(data, 'Fat', 'High');
          this.checkDietFields(data, 'Protein', 'Low');
          this.checkDietFields(data, 'Protein', 'High');
          this.checkDietFields(data, 'Cal', 'High');
          this.checkDietFields(data, 'Cal', 'Low');
          //TODO: add calLow check
          if (data.numMeals !== undefined) {
            this.setState({
              numMeals: data.numMeals,
              isCheckedNumMeals: true,
            });
          }
        }
      });
  }

  //TODO: Test this
  checkDietFields = (data, nutrient, limit) => {
    if (data[nutrient.toLowerCase() + limit] !== undefined) {
      let value = parseFloat(data[nutrient.toLowerCase() + limit]).toFixed(2);
      this.setState({
        [nutrient.toLowerCase() + limit]: value,
        ['isChecked' + nutrient]: true,
        ['isChecked' + nutrient + limit]: true,
      });
    }
  };

  renderLabel = nutrient => {
    if (this.state['isChecked' + nutrient]) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>{nutrient} Limits</Text>
        </View>
      );
    }
  };

  renderCheckBox = nutrient => {
    let unit = ' (g)';
    let nutrientName = nutrient;
    if (nutrient === 'Cal') {
      unit = '';
      nutrientName = 'Calories';
    }
    return (
      <CheckBox
        style={{flex: 0.05, padding: 10}}
        onClick={() => {
          this.setState(
            {
              ['isChecked' + nutrient]: !this.state['isChecked' + nutrient],
            },
            () => {
              if (!this.state['isChecked' + nutrient]) {
                this.setState({
                  [nutrient.toLowerCase() + 'High']: '',
                  [nutrient.toLowerCase() + 'Low']: '',
                  ['isChecked' + nutrient + 'Low']: false,
                  ['isChecked' + nutrient + 'High']: false,
                });
              }
            },
          );
        }}
        isChecked={this.state['isChecked' + nutrient]}
        leftText={'Set ' + nutrientName + unit}
      />
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{fontSize: 16, marginTop: '2%'}}>
          Check a box, select limit type(s) and enter value(s) to limit a
          nutrient. Note that if you select a limit and do not enter any value,
          it will be calculated based on your health characteristics.
        </Text>
        <CheckBox
          style={{flex: 0.05, padding: 10}}
          onClick={() => {
            this.setState(
              {
                isCheckedNumMeals: !this.state.isCheckedNumMeals,
              },
              () => {
                if (!this.state.isCheckedNumMeals) {
                  this.setState({numMeals: ''});
                }
              },
            );
          }}
          isChecked={this.state.isCheckedNumMeals}
          leftText={'Set number of meals'}
        />
        {this.renderCheckBox('Cal')}
        {this.renderCheckBox('Fat')}
        {this.renderCheckBox('Protein')}
        {this.renderCheckBox('Carbs')}
        <View style={{flex: 0.2}}>{this.renderNumMeals()}</View>
        <View style={{padding: '3%'}} />
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
            //backgroundColor: 'green',
            height: '20%',
          }}>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'center',
              height: '100%',
              //backgroundColor: 'pink',
            }}>
            {this.renderLabel('Cal')}
          </View>
          <View style={{flex: 1, flexDirection: 'column', height: '90%'}}>
            {this.renderLimits('Cal', 'High')}
            {this.renderLimits('Cal', 'Low')}
          </View>
        </View>
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
            //backgroundColor: 'green',
            height: '20%',
          }}>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'center',
              height: '90%',
              //backgroundColor: 'pink',
            }}>
            {/*<Text style={{textAlign: 'center'}}>Fat Limits</Text>*/}
            {this.renderLabel('Fat')}
          </View>
          <View style={{flex: 1, flexDirection: 'column', height: '100%'}}>
            {this.renderLimits('Fat', 'High')}
            {this.renderLimits('Fat', 'Low')}
          </View>
        </View>
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
            //backgroundColor: 'green',
            height: '20%',
          }}>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'center',
              height: '90%',
              //backgroundColor: 'pink',
            }}>
            {this.renderLabel('Protein')}
          </View>
          <View style={{flex: 1, flexDirection: 'column', height: '100%'}}>
            {this.renderLimits('Protein', 'High')}
            {this.renderLimits('Protein', 'Low')}
          </View>
        </View>
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
            //backgroundColor: 'green',
            height: '20%',
          }}>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'center',
              height: '90%',
              // backgroundColor: 'pink',
            }}>
            {this.renderLabel('Carbs')}
          </View>
          <View style={{flex: 1, flexDirection: 'column', height: '100%'}}>
            {this.renderLimits('Carbs', 'High')}
            {this.renderLimits('Carbs', 'Low')}
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={this.inputCheck}
            style={{
              justifyContent: 'center',
              width: '50%',
              height: '25%',
              backgroundColor: 'darkseagreen',
            }}>
            <Text style={{justifyContent: 'center', textAlign: 'center'}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '500',
    flex: 1,
    marginTop: '15%',
  },
  title: {
    margin: 12,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationColor: 'gray',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  spacingHigh: {
    padding: 15,
  },
  spacingSmall: {
    padding: 10,
  },
  fieldText: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  alignLeftView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  linkStyle: {
    marginBottom: '70%',
    padding: 15,
  },
  button: {
    flex: 1,
    marginTop: '10%',
    alignItems: 'center',
  },
  /*textalign for the text to be in the center for "bamboo."*/
});
