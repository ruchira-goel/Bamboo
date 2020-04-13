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
      calories: '',
      fat: '',
      protein: '',
      carbs: '',
      calLimitType: '',
      fatLimitType: '',
      proteinLimitType: '',
      carbsLimitType: '',
      isCheckedCal: false,
      isCheckedFat: false,
      isCheckedProtein: false,
      isCheckedCarbs: false,
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

  renderNumMeals = () => {
    if (this.state.isCheckedNumMeals) {
      console.log('Number: ' + this.state.numMeals);
      return (
        <View
          style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
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

  renderCal = () => {
    if (this.state.isCheckedCal) {
      const {limitOpts} = this.state;
      return (
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            flex: 0.2,
            padding: '1%',
            //backgroundColor: 'blue',
          }}>
          <Text style={{flex: 0.2, padding: '9%'}}>Calories</Text>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'flex-start',
              alignItems: 'center',
              //backgroundColor: 'green'
            }}>
            <Dropdown
              label="Limit type"
              data={limitOpts}
              defaultValue={this.state.calLimitType}
              onChangeText={value => {
                this.setState({calLimitType: value});
              }}
              selectedItemColor="#3eb245"
              containerStyle={{width: '100%', flex: 0.35}}
            />
          </View>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'flex-end',
              alignItems: 'center',
              //backgroundColor: 'green'
            }}>
            <TextInput
              style={{
                borderBottomWidth: 0.6,
                width: '60%',
                height: '40%',
                textAlign: 'center',
                //backgroundColor: 'yellow',
              }}
              keyboardType={'numeric'}
              placeholder="Enter amount"
              defaultValue={this.state.calories.toString()}
              onChangeText={calories => this.setState({calories})}
            />
          </View>
        </View>
      );
    }
  };

  renderFat = () => {
    const {limitOpts} = this.state;
    if (this.state.isCheckedFat) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            flex: 0.2,
            padding: '1%',
            //backgroundColor: 'blue',
          }}>
          <Text style={{flex: 0.2, padding: '9%'}}>Fat</Text>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'flex-start',
              alignItems: 'center',
              //backgroundColor: 'green'
            }}>
            <Dropdown
              label="Limit type"
              data={limitOpts}
              defaultValue={this.state.fatLimitType}
              onChangeText={value => {
                this.setState({fatLimitType: value});
              }}
              selectedItemColor="#3eb245"
              containerStyle={{width: '100%', flex: 0.35}}
            />
          </View>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'flex-end',
              alignItems: 'center',
              //backgroundColor: 'green'
            }}>
            <TextInput
              style={{
                borderBottomWidth: 0.6,
                width: '60%',
                height: '40%',
                textAlign: 'center',
                //backgroundColor: 'yellow',
              }}
              keyboardType={'numeric'}
              placeholder="Enter amount"
              defaultValue={this.state.fat.toString()}
              onChangeText={fat => this.setState({fat})}
            />
          </View>
        </View>
      );
    }
  };

  renderProtein = () => {
    const {limitOpts} = this.state;
    if (this.state.isCheckedProtein) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            flex: 0.2,
            padding: '1%',
            //backgroundColor: 'blue',
          }}>
          <Text style={{flex: 0.2, padding: '9%'}}>Protein</Text>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'flex-start',
              alignItems: 'center',
              //backgroundColor: 'green',
            }}>
            <Dropdown
              label="Limit type"
              data={limitOpts}
              defaultValue={this.state.proteinLimitType}
              onChangeText={value => {
                this.setState({proteinLimitType: value});
              }}
              selectedItemColor="#3eb245"
              containerStyle={{width: '100%', flex: 0.35}}
            />
          </View>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'flex-end',
              alignItems: 'center',
              //backgroundColor: 'green'
            }}>
            <TextInput
              style={{
                borderBottomWidth: 0.6,
                width: '60%',
                height: '40%',
                textAlign: 'center',
                //backgroundColor: 'yellow',
              }}
              keyboardType={'numeric'}
              placeholder="Enter amount"
              defaultValue={this.state.protein.toString()}
              onChangeText={protein => this.setState({protein})}
            />
          </View>
        </View>
      );
    }
  };

  renderCarbs = () => {
    const {limitOpts} = this.state;
    if (this.state.isCheckedCarbs) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            flex: 0.2,
            padding: '1%',
            //backgroundColor: 'blue',
          }}>
          <Text style={{flex: 0.2, padding: '9%'}}>Carbs</Text>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'flex-start',
              alignItems: 'center',
              //backgroundColor: 'green'
            }}>
            <Dropdown
              label="Limit type"
              data={limitOpts}
              defaultValue={this.state.carbsLimitType}
              onChangeText={value => {
                this.setState({carbsLimitType: value});
              }}
              selectedItemColor="#3eb245"
              containerStyle={{width: '100%', flex: 0.35}}
            />
          </View>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'flex-end',
              alignItems: 'center',
              //backgroundColor: 'green'
            }}>
            <TextInput
              style={{
                borderBottomWidth: 0.6,
                width: '60%',
                height: '40%',
                textAlign: 'center',
                //backgroundColor: 'yellow',
              }}
              keyboardType={'numeric'}
              placeholder="Enter amount"
              defaultValue={this.state.carbs.toString()}
              onChangeText={carbs => this.setState({carbs})}
            />
          </View>
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
      proteinLimitType,
      carbsLimitType,
      fatLimitType,
      calLimitType,
      calories,
      fat,
      protein,
      carbs,
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
    if (isCheckedCal) {
      console.log(calLimitType);
      console.log(calories);
      if (calLimitType === '') {
        Alert.alert(
          'Enter Limit Type',
          'Please enter a limit type for calories.',
          [{text: 'OK'}],
        );
        return;
      }
      if (calories === '') {
        // calculate with
        Alert.alert('Enter Calories', 'Please enter an amount for calories.', [
          {text: 'OK'},
        ]);
        return;
      }
    }
    if (isCheckedFat) {
      if (fatLimitType === '') {
        Alert.alert('Enter Limit Type', 'Please enter a limit type for fat.', [
          {text: 'OK'},
        ]);
        return;
      }
      if (fat === '') {
        Alert.alert('Enter Fat', 'Please enter an amount for fat.', [
          {text: 'OK'},
        ]);
        return;
      }
    }
    if (isCheckedProtein) {
      if (proteinLimitType === '') {
        Alert.alert(
          'Enter Limit Type',
          'Please enter a limit type for protein.',
          [{text: 'OK'}],
        );
        return;
      }
      if (protein === '') {
        Alert.alert('Enter Protein', 'Please enter an amount for protein.', [
          {text: 'OK'},
        ]);
        return;
      }
    }
    if (isCheckedCarbs) {
      if (carbsLimitType === '') {
        Alert.alert(
          'Enter Limit Type',
          'Please enter a limit type for carbs.',
          [{text: 'OK'}],
        );
        return;
      }
      if (carbs === '') {
        Alert.alert('Enter Calories', 'Please enter an amount for carbs.', [
          {text: 'OK'},
        ]);
        return;
      }
    }
    console.log('ended');
    this.getRecommendedMeals();
  };

  getRecommendedMeals = () => {
    const {route} = this.props;
    const {userId} = route.params;
    const {
      isCheckedCal,
      isCheckedCarbs,
      isCheckedFat,
      isCheckedProtein,
      proteinLimitType,
      carbsLimitType,
      fatLimitType,
      calLimitType,
      calories,
      fat,
      protein,
      carbs,
      isCheckedNumMeals,
      numMeals,
    } = this.state;
    let request = `/Meal/getRecommended?userId=${userId}&calLimitType=`;
    if (isCheckedCal) {
      request = request.concat(`${calLimitType}&calories=${calories}`);
    } else {
      request = request.concat('&calories=0');
    }
    request = request.concat('&fatLimitType=');
    if (isCheckedFat) {
      request = request.concat(`${fatLimitType}&fat=${fat}`);
    } else {
      request = request.concat('&fat=0');
    }
    request = request.concat('&proteinLimitType=');
    if (isCheckedProtein) {
      request = request.concat(`${proteinLimitType}&protein=${protein}`);
    } else {
      request = request.concat('&protein=0');
    }
    request = request.concat('&carbsLimitType=');
    if (isCheckedCarbs) {
      request = request.concat(`${carbsLimitType}&carbs=${carbs}`);
    } else {
      request = request.concat('&carbs=0');
    }
    if (isCheckedNumMeals) {
      request = request.concat(`&numMeals=${numMeals}`);
    } else {
      request = request.concat('&numMeals=0');
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
          console.log(
            'Here: ' + data.PROTEIN + data.CARBS + data.CALORIES + data.FAT,
          );
          if (data.PROTEIN !== undefined) {
            this.setState({
              protein: data.PROTEIN[1],
              isCheckedProtein: true,
              proteinLimitType:
                data.PROTEIN[0] === 'GREATERTHAN'
                  ? 'Greater than'
                  : 'Less than',
            });
          }
          if (data.FAT !== undefined) {
            this.setState({
              fat: data.FAT[1],
              isCheckedFat: true,
              fatLimitType:
                data.FAT[0] === 'GREATERTHAN' ? 'Greater than' : 'Less than',
            });
          }
          if (data.CARBS !== undefined) {
            this.setState({
              carbs: data.CARBS[1],
              isCheckedCarbs: true,
              carbsLimitType:
                data.CARBS[0] === 'GREATERTHAN' ? 'Greater than' : 'Less than',
            });
          }
          if (data.CALORIES !== undefined) {
            this.setState({
              calories: data.CALORIES[1],
              isCheckedCal: true,
              calLimitType:
                data.CALORIES[0] === 'GREATERTHAN'
                  ? 'Greater than'
                  : 'Less than',
            });
          }
          if (data.NUMMEALS !== undefined) {
            this.setState({
              numMeals: data.NUMMEALS[1],
              isCheckedNumMeals: true,
            });
          }
        }
      });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{fontSize: 16, marginTop: '2%'}}>
          Check a box, select the limit type and enter a value to limit a
          nutrient.
          Note that if you select a nutrient and do not enter any value, it will
          be calculated based on your health characteristics.
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
        <View style={{flex: 0.5}}>
          {this.renderNumMeals()}
          {this.renderCal()}
          {this.renderFat()}
          {this.renderProtein()}
          {this.renderCarbs()}
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
    flex: 0.4,
    marginTop: '10%',
    alignItems: 'center',
  },
  /*textalign for the text to be in the center for "bamboo."*/
});
