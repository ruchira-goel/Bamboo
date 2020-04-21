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
    console.log(check);
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
      console.log('Number: ' + this.state.numMeals);
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
    console.log('entered');
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
    console.log('ended');
    this.getRecommendedMeals();
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
    if (isCheckedCalLow) {
      if (calLow === '') {
        // TODO: calories lower limit not implemented yet
      } else {
        request = request.concat(`calLow=${calLow}&`);
      }
    }
    if (isCheckedCalHigh) {
      if (calHigh === '') {
        this.getDietaryRestrictions();
        calHigh = userRequirements.calories;
      }
      request = request.concat(`calHigh=${calHigh}&`);
    }
    if (isCheckedFatHigh) {
      if (fatHigh === '') {
        if (userRequirements === '') {
          this.getDietaryRestrictions();
        }
        fatHigh = userRequirements.fatHigh;
      }
      request = request.concat(`fatHigh=${fatHigh}&`);
    }
    if (isCheckedFatLow) {
      if (fatLow === '') {
        if (userRequirements === '') {
          this.getDietaryRestrictions();
        }
        fatLow = userRequirements.fatLow;
      }
      request = request.concat(`fatLow=${fatLow}&`);
    }
    if (isCheckedProteinHigh) {
      if (proteinHigh === '') {
        if (userRequirements === '') {
          this.getDietaryRestrictions();
        }
      }
      request = request.concat(`proteinHigh=${proteinHigh}&`);
    }
    if (isCheckedProteinLow) {
      if (proteinLow === '') {
        if (userRequirements === '') {
          this.getDietaryRestrictions();
        }
        proteinLow = userRequirements.proteinLow;
      }
      request = request.concat(`proteinLow=${proteinLow}&`);
    }
    if (isCheckedCarbsHigh) {
      if (carbsHigh === '') {
        if (userRequirements === '') {
          this.getDietaryRestrictions();
        }
        carbsHigh = userRequirements.carbsHigh;
      }
      request = request.concat(`carbsHigh=${carbsHigh}&`);
    }
    if (isCheckedCarbsLow) {
      if (carbsLow === '') {
        if (userRequirements === '') {
          this.getDietaryRestrictions();
        }
        carbsLow = userRequirements.carbsLow;
      }
      request = request.concat(`carbsLow=${carbsLow}&`);
    }
    if (isCheckedNumMeals) {
      request = request.concat(`numMeals=${numMeals}`);
    } else {
      request = request.concat('numMeals=0');
    }
    console.log('Request: ' + request);
    fetch(
      Platform.OS === 'android'
        ? `${URL.android}${request}`
        : `http://localhost:8080/${request}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
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
        : `http://localhost:8080/User/getDietRequirements?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert('Error', data.message, [{text: 'OK'}]);
        } else {
          this.setState({userRequirements: data});
        }
      });
  };

  componentWillMount(): void {
    const {route} = this.props;
    const {userId} = route.params;
    fetch(
      Platform.OS === 'android'
        ? `${URL.android}/User/getSavedRecommendationValues?userId=${userId}`
        : `http://localhost:8080/User/getSavedRecommendationValues?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          Alert.alert('Error', data.message, [{text: 'OK'}]);
        } else if (data.isEmpty) {
        } else {
          console.log('Here: ' + data.calHigh + data.fatHigh);
          // if (data.calories !== undefined) {
          //   this.setState({
          //     calHigh: data.calories,
          //     isCheckedCal: true,
          //     isCheckedCalHigh: true,
          //   });
          // }
          // if (data.proteinHigh !== undefined) {
          //   this.setState({
          //     proteinHigh: data.proteinHigh,
          //     isCheckedProtein: true,
          //     isCheckedProteinHigh: true,
          //   });
          // }
          // if (data.proteinLow !== undefined) {
          //   this.setState({
          //     proteinLow: data.proteinLow,
          //     isCheckedProtein: true,
          //     isCheckedProteinLow: true,
          //   });
          // }
          // if (data.fatHigh !== undefined) {
          //   this.setState({
          //     fatHigh: data.fatHigh,
          //     isCheckedFat: true,
          //     isCheckedFatHigh: true,
          //   });
          // }
          // if (data.fatLow !== undefined) {
          //   this.setState({
          //     fatLow: data.fatLow,
          //     isCheckedFat: true,
          //     isCheckedFatLow: true,
          //   });
          // }
          // if (data.carbsHigh !== undefined) {
          //   this.setState({
          //     carbsHigh: data.carbsHigh,
          //     isCheckedCarbs: true,
          //     isCheckedCarbsHigh: true,
          //   });
          // }
          // if (data.carbsLow !== undefined) {
          //   this.setState({
          //     carbsLow: data.carbsLow,
          //     isCheckedCarbs: true,
          //     isCheckedCarbsLow: true,
          //   });
          // }
          this.checkDietFields(data, 'Carbs', 'Low');
          this.checkDietFields(data, 'Carbs', 'High');
          this.checkDietFields(data, 'Fat', 'Low');
          this.checkDietFields(data, 'Fat', 'High');
          this.checkDietFields(data, 'Protein', 'Low');
          this.checkDietFields(data, 'Protein', 'High');
          this.checkDietFields(data, 'Cal', 'High');
          if (data.NUMMEALS !== undefined) {
            this.setState({
              numMeals: data.NUMMEALS[1],
              isCheckedNumMeals: true,
            });
          }
        }
      });
  }

  //TODO: Test this
  checkDietFields = (data, nutrient, limit) => {
    if (data[nutrient.toLowerCase() + limit] !== undefined) {
      this.setState({
        [nutrient.toLowerCase() + limit]: data[nutrient + limit],
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

  render() {
    console.log(this.state.proteinHigh);
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
        <CheckBox
          style={{flex: 0.05, padding: 10}}
          onClick={() => {
            this.setState(
              {
                isCheckedCal: !this.state.isCheckedCal,
              },
              () => {
                if (!this.state.isCheckedCal) {
                  this.setState({calories: ''});
                }
              },
            );
          }}
          isChecked={this.state.isCheckedCal}
          leftText={'Set Calories'}
        />
        <CheckBox
          style={{flex: 0.05, padding: 10}}
          onClick={() => {
            this.setState(
              {
                isCheckedFat: !this.state.isCheckedFat,
              },
              () => {
                if (!this.state.isCheckedFat) {
                  this.setState({fat: ''});
                }
              },
            );
          }}
          isChecked={this.state.isCheckedFat}
          leftText={'Set Fat'}
        />
        <CheckBox
          style={{flex: 0.05, padding: 10}}
          onClick={() => {
            this.setState(
              {
                isCheckedProtein: !this.state.isCheckedProtein,
              },
              () => {
                if (!this.state.isCheckedProtein) {
                  this.setState({protein: ''});
                }
              },
            );
          }}
          isChecked={this.state.isCheckedProtein}
          leftText={'Set Protein'}
        />
        <CheckBox
          style={{flex: 0.05, padding: 10}}
          onClick={() => {
            this.setState(
              {
                isCheckedCarbs: !this.state.isCheckedCarbs,
              },
              () => {
                if (!this.state.isCheckedCarbs) {
                  this.setState({carbs: 0});
                }
              },
            );
          }}
          isChecked={this.state.isCheckedCarbs}
          leftText={'Set Carbs'}
        />
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
