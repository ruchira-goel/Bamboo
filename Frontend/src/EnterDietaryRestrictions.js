import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Switch,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import MultiSelect from 'react-native-multiple-select';
import {MaterialIcons} from '@expo/vector-icons';
// import {MaterialIcons} from 'expo-font/';
import * as Font from 'expo-font';

// TODO: In android, toggle switch to change units overlaps with sex dropdown

let {screenHeight, screenWidth} = Dimensions.get('window');

const allergies = [
  {
    id: '1',
    name: 'Milk/Lactose',
  },
  {
    id: '2',
    name: 'Egg',
  },
  {
    id: '3',
    name: 'Shellfish',
  },
  {
    id: '4',
    name: 'Gluten',
  },
  {
    id: '5',
    name: 'Peanut/Tree Nuts',
  },
  {
    id: '6',
    name: 'Soybean',
  },
  {
    id: '7',
    name: 'Fish',
  },
];

const diets = [
  {
    id: '1',
    name: 'Vegetarian',
  },
  {
    id: '2',
    name: 'Vegan',
  },
  {
    id: '3',
    name: 'Kosher',
  },
  {
    id: '4',
    name: 'Paleo',
  },
];

export default class EnterDietaryRestrictions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAllergyItems: [],
      selectedDiets: [],
      assetsLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'roboto-regular': require('./assets/font/Roboto-Regular.ttf'),
      'Material Design Icons': require('./assets/font/MaterialIcons-Regular.ttf'),
    });

    this.setState({assetsLoaded: true});
  }

  next() {
    if (
      (this.state.selectedAllergyItems &&
        this.state.selectedAllergyItems.length) ||
      (this.state.selectedDiets && this.state.selectedDiets.length)
    ) {
      // Array exists and is not empty
      this.saveDietaryRestrictions();
    }
  }

  saveDietaryRestrictions = () => {
    const {route} = this.props;
    let {selectedAllergyItems, selectedDiets} = this.state;
    const {userId} = route.params;
    console.log('id: ' + userId);
    //sending request to retrieve the corresponding user object for login
    fetch(
      Platform.OS === 'android'
        ? `http://10.0.2.2:8080/User/saveDietaryRestrictions?userId=${userId}&allergies=${selectedAllergyItems}&diets=${selectedDiets}`
        : `http://localhost:8080/User/saveDietaryRestrictions?userId=${userId}&allergies=${selectedAllergyItems}&diets=${selectedDiets}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          //throwing error when saveDietaryRestrictions fails (invalid userId)
          if (
            data.message ===
            'There was an error locating your account, please try signing up again'
          ) {
            Alert.alert('User Not Found', data.message, [{text: 'OK'}]);
          }
        } else {
          //going to home screen
          this.props.navigation.replace('HomeScreen', {
            userId: userId,
          });
        }
      });
  };

  onSelectedAllergyChange = selectedItems => {
    this.setState({selectedItems});
  };

  onSelectedDietChange = selectedItems => {
    this.setState({selectedItems});
  };

  render() {
    const {selectedAllergyItems, selectedDiets, assetsLoaded} = this.state;
    if (assetsLoaded) {
      return (
        <View style={styles.fullContainer}>
          <Text style={styles.paragraph}>
            Do you have any dietary restrictions? (Hit next to skip)
          </Text>
          <View style={{flex: 1}}>
            <MultiSelect
              hideTags
              items={allergies}
              uniqueKey="id"
              ref={component => {
                this.multiSelect1 = component;
              }}
              onSelectedItemsChange={this.onSelectedAllergyChange}
              selectedItems={selectedAllergyItems}
              selectText="Enter any allergies/intolerances you may have (Optional)"
              searchInputPlaceholderText="Search Items"
              onChangeInput={text => console.log(text)}
              altFontFamily="roboto-regular"
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{color: '#CCC'}}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
            <View>
              {this.multiSelect1 &&
                this.multiSelect1.getSelectedItemsExt(selectedAllergyItems)}
            </View>
          </View>
          <View style={{padding: '2%'}} />
          <View style={{flex: 1}}>
            <MultiSelect
              hideTags
              items={diets}
              uniqueKey="id"
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={this.onSelectedDietChange}
              selectedItems={selectedAllergyItems}
              selectText="Enter the diets that you follow (Optional)"
              searchInputPlaceholderText="Search Items"
              onChangeInput={text => console.log(text)}
              altFontFamily="roboto-regular"
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{color: '#CCC'}}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
            <View>
              {this.multiSelect &&
                this.multiSelect.getSelectedItemsExt(selectedDiets)}
            </View>
          </View>

          <View style={{padding: '5%'}} />
          <TouchableOpacity onPress={this.next()} style={styles.btnStyle}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.fullContainer}>
          <Text style={styles.paragraph}>Loading...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: '10%',
    textAlign: 'center',
    alignItems: 'center',
  },
  flexRowContainer: {
    width: '80%',
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnStyle: {
    backgroundColor: '#3eb245',
    color: 'black',
    borderRadius: 2,
    borderColor: '#3eb245',
    width: '75%',
    height: '7%',
    justifyContent: 'center', //text in the middle of the button
    alignItems: 'center', //text in the middle of the button
  },
  input: {
    width: '80%',
    //height: screenHeight * 0.05,
    marginBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: '#ecf0f1',
    textAlign: 'center',
  },
  smallInput: {
    width: '50%',
    //height: screenHeight * 0.05,
    marginBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: '#ecf0f1',
    textAlign: 'center',
  },
  nextButton: {
    position: 'absolute',
    // resizeMode: 'stretch',
    height: 100,
    width: 100,
    bottom: 30,
    right: 30,
  },
});
