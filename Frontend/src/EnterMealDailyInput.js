import React, {useState} from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Constants from './Constants';
import {useNavigation, useRoute} from '@react-navigation/native';

class EnterMealDailyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pickerSelection: 'Enter link to recipe',
      mealInfo: '',
      userId: '',
      date: new Date(),
      formattedDate:
        `${new Date().getDate()}/` +
        (new Date().getMonth() + 1 < 10 ? '0' : '') +
        `${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      pickerVisible: false,
    };
  }

  setformattedDate() {
    this.setState({
      formattedDate:
        `${this.state.date.getDate()}/` +
        (this.state.date.getMonth() + 1 < 10 ? '0' : '') +
        `${this.state.date.getMonth() + 1}/${this.state.date.getFullYear()}`,
    });
  }

  addMeal = () => {
    const {pickerSelection, mealInfo, formattedDate} = this.state;
    const {route} = this.props;
    const {userId} = route.params;
    this.setState({userId: userId});
    console.log('id: ' + userId + ' Link: ' + mealInfo);

    if (!mealInfo) {
      Alert.alert('Meal Information Empty', 'Please enter meal information.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (pickerSelection === 'Enter link to recipe') {
      fetch(
        Platform.OS === 'android'
          ? `${
              Constants.URL.android
            }/Meal/infoFromLink?link=${mealInfo}&userId=${userId}&date=${formattedDate}`
          : `http://localhost:8080/Meal/infoFromLink?link=${mealInfo}&userId=${userId}&date=${formattedDate}`,
      )
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.error) {
            Alert.alert(
              data.message,
              'Unable to load recipe information for the given link, please try a different link.',
              [{text: 'OK'}],
            );
          } else {
            Alert.alert(
              'Meal Added',
              data.name +
                ' successfully added! Do you want to save this meal to your favorites?',
              [
                {
                  text: 'Yes',
                  onPress: () => this.addToFavorites(data.id, userId),
                },
                {text: 'No'},
              ],
            );
            this.setState({mealInfo: ''});
            this.setState({name: ''});
          }
        });
    } else if (pickerSelection === 'Enter meal name') {
      fetch(
        Platform.OS === 'android'
          ? `${
              Constants.URL.android
            }/Meal/infoFromName?name=${mealInfo}&userid=${userId}&date=${formattedDate}`
          : `http://localhost:8080/Meal/infoFromName?name=${mealInfo}&userid=${userId}&date=${formattedDate}`,
      )
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.error) {
            Alert.alert(
              data.message,
              'Unable to load recipe information for the given name, please try a different name.',
              [{text: 'OK'}],
            );
          } else {
            Alert.alert(
              'Meal Added',
              data.name +
                ' successfully added! Do you want to save this meal to your favorites?',
              [
                {
                  text: 'Yes',
                  onPress: () => this.addToFavorites(data.id, userId),
                },
                {text: 'No'},
              ],
            );
            this.setState({mealInfo: ''});
            this.setState({name: ''});
          }
        });
    } else if (pickerSelection === 'Enter your own recipe') {
      const {name} = this.state;
      if (!name) {
        Alert.alert('Meal Name  Empty', 'Please enter a meal name.', [
          {text: 'OK'},
        ]);
        return;
      }
      console.log('Recipe: ' + mealInfo);
      fetch(
        Platform.OS === 'android'
          ? `${
              Constants.URL.android
            }/Meal/infoFromRecipe?recipe=${mealInfo}&userId=${userId}&date=${formattedDate}&name=${name}`
          : `http://localhost:8080/Meal/infoFromRecipe?recipe=${mealInfo}&userId=${userId}&date=${formattedDate}&name=${name}`,
      )
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.error) {
            if (data.message === 'Ingredients not found') {
              Alert.alert(
                data.message,
                'Unable to find nutritional information for the recipe entered.',
                [{text: 'OK'}],
              );
            } else {
              Alert.alert(
                data.message,
                'Unable to save information for the given recipe, please try a different recipe.',
                [{text: 'OK'}],
              );
            }
          } else {
            Alert.alert(
              'Meal Added',
              data.name +
                ' successfully added! Do you want to save this meal to your favorites?',
              [
                {
                  text: 'Yes',
                  onPress: () => this.addToFavorites(data.id, userId),
                },
                {text: 'No'},
              ],
            );
            this.setState({mealInfo: ''});
            this.setState({name: ''});
          }
        });
    }
  };

  addToFavorites = (mealId, userId) => {
    console.log('userid from addToFavs: ' + userId);
    fetch(
      Platform.OS === 'android'
        ? `${
            Constants.URL.android
          }/Meal/addToFavorites?mealId=${mealId}&userId=${userId}`
        : `http://localhost:8080/Meal/addToFavorites?mealId=${mealId}&userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert(
            'Save Failed',
            'Unable to save to favorites this time, please try a different name.',
            [{text: 'OK'}],
          );
        } else {
          Alert.alert(
            'Added to Favorites',
            data.name + ' added to favorites!',
            [{text: 'OK'}],
          );
          //going to home screen
        }
      });
  };

  renderHomePage = () => {
    this.props.navigation.navigate('HomeScreen');
  };

  renderTextInput() {
    if (this.state.pickerSelection === 'Enter your own recipe') {
      console.log('inside');
      return (
        <View>
          <TextInput
            style={styles.fieldText}
            placeholder={'Enter meal name'}
            onChangeText={name => this.setState({name: name})}
            value={this.state.name}
          />
          <View style={{padding: '1%'}} />
          <TextInput
            multiline={true}
            style={styles.textArea}
            placeholder={
              'Enter your own recipe, for e.g:\n3 oz pork shoulder\n2 tbsp sugar'
            }
            onChangeText={mealInfo => this.setState({mealInfo: mealInfo})}
            value={this.state.mealInfo} //setting meal information entered
          />
        </View>
      );
    } else {
      return (
        <TextInput
          style={styles.fieldText}
          placeholder={this.state.pickerSelection}
          onChangeText={mealInfo => this.setState({mealInfo: mealInfo})}
          value={this.state.mealInfo} //setting meal information entered
        />
      );
    }
  }

  render() {
    // console.log('Date' + this.state.date);
    const DatePicker = () => {
      const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

      const showDatePicker = () => {
        setDatePickerVisibility(true);
      };

      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };

      const handleConfirm = date => {
        this.setState(
          {
            date: date,
          },
          function() {
            this.setformattedDate();
          },
        );
        hideDatePicker();
      };

      return (
        <View>
          <TouchableOpacity style={styles.datePicker} onPress={showDatePicker}>
            <Text style={styles.text}>{this.state.formattedDate}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
          />
        </View>
      );
    };
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>What did you eat?</Text>
        <View style={styles.rowContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.text}>Date:</Text>
          </View>
          <View style={styles.rightContainer}>
            <DatePicker />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.text}>Input Type:</Text>
          <View style={styles.rightContainer}>
            <Picker
              style={styles.picker}
              itemStyle={{fontSize: 16}}
              selectedValue={this.state.pickerSelection}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({pickerSelection: itemValue})
              }>
              <Picker.Item
                label="Enter link to recipe"
                value="Enter link to recipe"
              />
              <Picker.Item
                label="Enter my own recipe"
                value="Enter your own recipe"
              />
              <Picker.Item label="Enter a meal name" value="Enter meal name" />
            </Picker>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingLeft: 50,
            paddingRight: 50,
          }}>
          {this.renderTextInput()}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              const {route} = this.props;
              const {userId} = route.params;
              this.setState({userId: userId});
              // console.log('From meal i/p page: ' + userId);
              this.props.navigation.navigate('FavMeals', {
                userId: userId,
                date: this.state.formattedDate,
              });
            }}
            style={styles.linkStyle}>
            <Text style={{color: '#0000EE', textDecorationLine: 'underline'}}>
              Or select a meal from your favorites!
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', paddingLeft: 50, paddingRight: 50}}>
          <TouchableOpacity onPress={this.addMeal} style={styles.primaryBtn}>
            <Text>Save Meal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.navigation.goBack}
            style={styles.secondaryBtn}>
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <EnterMealDailyInput {...props} navigation={navigation} route={route} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Constants.DIMENSIONS.screenWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    // justifyContent: 'center',
  },
  heading: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  rowContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  fieldText: {
    fontSize: 16,
    borderBottomWidth: 0.5,
    // alignSelf: 'stretch',
    // width: '100%',
    // width: Constants.DIMENSIONS.screenWidth,
  },
  picker: {
    //TODO
  },
  textArea: {
    fontSize: 16,
  },
  linkStyle: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  primaryBtn: {
    backgroundColor: Constants.COLORS.primary.main,
    borderRadius: 60,
    borderColor: Constants.COLORS.primary.main,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  secondaryBtn: {
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Constants.COLORS.primary.main,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  datePicker: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Constants.COLORS.primary.main,
  },
});
