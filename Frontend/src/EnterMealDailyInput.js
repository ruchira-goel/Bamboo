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
import COLORS from './styles/colors';

export default class EnterMealDailyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pickerSelection: 'Enter link',
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
    if (pickerSelection === 'Enter link') {
      fetch(
        Platform.OS === 'android'
          ? `http://10.0.2.2:8080/Meal/infoFromLink?link=${mealInfo}&userId=${userId}&date=${formattedDate}`
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
          ? `http://10.0.2.2:8080/Meal/infoFromName?name=${mealInfo}&userid=${userId}&date=${formattedDate}`
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
          ? `http://10.0.2.2:8080/Meal/infoFromRecipe?recipe=${mealInfo}&userId=${userId}&date=${formattedDate}&name=${name}`
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
        ? `http://10.0.2.2:8080/Meal/addToFavorites?mealId=${mealId}&userId=${userId}`
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
    console.log('Date' + this.state.date);
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
          <TouchableOpacity style={styles.button} onPress={showDatePicker}>
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
      <View style={styles.heading}>
        <View
          style={{
            flex: 0.2,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '2%',
            //backgroundColor: 'white',
          }}>
          <Text style={{textAlign: 'center', fontSize: 20}}>
            What did you eat?
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 0.3,
            //backgroundColor: 'green',
          }}>
          <View style={{flex: 0.4, marginLeft: '15%'}}>
            <Text style={{fontSize: 17}}>Select Date: </Text>
          </View>
          <View style={{flex: 0.6, marginTop: '4%'}}>
            <DatePicker />
          </View>
        </View>
        <View style={{padding: '4%'}} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 0.3,
            //backgroundColor: 'white',
          }}>
          <View style={{flex: 0.4, marginLeft: '15%'}}>
            <Text style={{fontSize: 16}}>Select Input Type: </Text>
          </View>
          <View style={{flex: 0.6}}>
            <Picker
              itemStyle={{fontSize: 16, marginRight: '15%'}}
              selectedValue={this.state.pickerSelection}
              style={{}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({pickerSelection: itemValue})
              }>
              <Picker.Item label="Enter link to recipe" value="Enter link" />
              <Picker.Item
                label="Enter my own recipe"
                value="Enter your own recipe"
              />
              <Picker.Item label="Enter a meal name" value="Enter meal name" />
            </Picker>
          </View>
        </View>
        <View style={{padding: '4%'}} />
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            //backgroundColor: 'white',
          }}>
          {this.renderTextInput()}
        </View>
        <View style={{padding: '6%'}} />
        <View>
          <TouchableOpacity
            onPress={() => {
              const {route} = this.props;
              const {userId} = route.params;
              this.setState({userId: userId});
              console.log('From meal i/p page: ' + userId);
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
        <View style={{padding: '4%'}} />
        <View style={{alignItems: 'center', flex: 1}}>
          <TouchableOpacity onPress={this.addMeal} style={styles.btnStyle}>
            <Text>Save Meal</Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 0.03,
              //backgroundColor: 'green'
            }}
          />
          <TouchableOpacity
            onPress={this.renderHomePage}
            style={styles.btnStyle}>
            <Text>Done</Text>
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
    marginTop: '10%',
  },
  fieldText: {
    fontSize: 16,
    //justifyContent: 'center',
    //alignItems: 'center',
    marginLeft: '15%',
    marginRight: '40%',
    borderBottomWidth: 0.5,
    //alignSelf: 'stretch',
    width: '100%',
  },
  alignLeftView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  btnStyle: {
    backgroundColor: 'darkseagreen',
    color: 'black',
    borderRadius: 2,
    borderColor: '#3eb245',
    width: '70%',
    height: '12%',
    //alignContent: 'center',
    justifyContent: 'center', //text in the middle of the button
    alignItems: 'center', //text in the middle of the butto
    //alignSelf: 'stretch',
    //mar
  },
  /*textalign for the text to be in the center for "bamboo."*/
  picker: {
    width: 100,
  },
  textArea: {
    fontSize: 16,
    //justifyContent: 'center',
    //alignItems: 'center',
    marginLeft: '15%',
    marginRight: '40%',
    borderWidth: 0.5,
    //alignSelf: 'stretch',
    width: '100%',
    height: '100%',
  },
  linkStyle: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    // width: 100,
  },
  button: {
    backgroundColor: 'darkseagreen',
    padding: 2,
    marginRight: '15%',
    alignItems: 'center',
    borderRadius: 2,
    height: '65%',
    justifyContent: 'center',
  },
});
