import React from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class EnterMealDailyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerSelection: 'Enter link',
      mealInfo: '',
    };
  }

  addMeal = () => {};

  renderHomePage = () => {
    this.props.navigation.navigate('HomeScreen');
  };

  render() {
    const {pickerSelection} = this.state;
    return (
      <View style={styles.heading}>
        <View
          style={{
            flex: 0.2,
            alignItems: 'center',
            justifyContent: 'center',
            //backgroundColor: 'white',
          }}>
          <Text style={{textAlign: 'center', fontSize: 20}}>
            What did you eat today?
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 0.3,
            //backgroundColor: 'white',
          }}>
          <View style={{flex: 0.5, marginLeft: '5%'}}>
            <Text>Select Input Type: </Text>
          </View>
          <View style={{flex: 0.5}}>
            <Picker
              itemStyle={{fontSize: 16}}
              selectedValue={this.state.pickerSelection}
              style={{marginRight: '5%'}}
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
        <View
          style={{
            flex: 0.2,
            //backgroundColor: 'green'
          }}
        />
        <View
          style={{
            flex: 0.15,
            justifyContent: 'center',
            //backgroundColor: 'white',
          }}>
          <TextInput
            style={styles.fieldText}
            placeholder={pickerSelection}
            onChangeText={mealInfo => this.setState({mealInfo: mealInfo})} //setting meal information entered
          />
        </View>
        <View
          style={{
            flex: 0.2,
            //backgroundColor: 'green'
          }}
        />
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
  container: {
    flex: 1,
    width: '40%',
    height: '20%',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: '30%',
  },
  spacingHigh: {
    padding: 15,
  },
  spacingSmall: {
    padding: 10,
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
    height: '10%',
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
});