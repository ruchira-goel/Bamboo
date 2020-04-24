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
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import * as Constants from './Constants';
import {Dropdown} from 'react-native-material-dropdown';
import MultiSelect from 'react-native-multiple-select';
import {useNavigation, useRoute} from '@react-navigation/native';
// TODO: In android, toggle switch to change units overlaps with sex dropdown

let {screenHeight, screenWidth} = Dimensions.get('window');

const allergies = [
  {
    id: '1',
    name: 'Dairy',
  },
  {
    id: '2',
    name: 'Egg',
  },
  {
    id: '3',
    name: 'Gluten',
  },
  {
    id: '4',
    name: 'Grain',
  },
  {
    id: '5',
    name: 'Peanut',
  },
  {
    id: '6',
    name: 'Seafood',
  },
  {
    id: '7',
    name: 'Sesame',
  },
  {
    id: '8',
    name: 'Shellfish',
  },
  {
    id: '9',
    name: 'Soy',
  },
  {
    id: '10',
    name: 'Sulfite',
  },
  {
    id: '11',
    name: 'Tree Nut',
  },
  {
    id: '12',
    name: 'Wheat',
  },
];

class EnterDietaryRestrictions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAllergyItems: [],
      assetsLoaded: false,
      selectedDiet: '',
    };
  }

  componentDidMount() {
    this.setState({assetsLoaded: true});
  }

  next = () => {
    console.log('in selected allergy items');
    console.log(this.state.selectedDiet);
    console.log(this.state.selectedAllergyItems);
    // if (
    //   (this.state.selectedAllergyItems &&
    //     this.state.selectedAllergyItems.length) ||
    //   this.state.selectedDiet
    // ) {
    // Array exists and is not empty
    this.saveDietaryRestrictions();
    // }
  };

  saveDietaryRestrictions = () => {
    console.log('Route ', this.props);
    const {route} = this.props;
    let {selectedAllergyItems, selectedDiet} = this.state;
    console.log(selectedAllergyItems);
    console.log(selectedDiet);
    const {userId} = route.params;
    this.setState({userId: userId});
    console.log('id: ' + userId);
    //sending request to retrieve the corresponding user object for login
    fetch(
      Platform.OS === 'android'
        ? `${
            Constants.URL.android
          }/User/saveDietaryRestrictions?userId=${userId}&allergies=${selectedAllergyItems}&diet=${selectedDiet}`
        : `${
            Constants.URL.ios
          }/User/saveDietaryRestrictions?userId=${userId}&allergies=${selectedAllergyItems}&diet=${selectedDiet}`,
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
          } else {
            Alert.alert('Wrong code ' + data.error, data.message, [{text: 'OK'}]);
          }
        } else {
          //going to home screen
          this.props.navigation.navigate('Home', {
            userId: userId,
          });
        }
      });
  };

  onSelectedAllergyChange = selectedItems => {
    this.setState({selectedAllergyItems: selectedItems});
    console.log(this.state.selectedAllergyItems);
  };

  render() {
    const {assetsLoaded, selectedAllergyItems} = this.state;
    if (assetsLoaded) {
      return (
        <ScrollView>
          <View style={styles.fullContainer}>
            <Text style={styles.heading}>
              Do you have any dietary restrictions? (Hit next to skip)
            </Text>
            <SafeAreaView style={{flex: 1}}>
              <View style={{flex: 1}}>
                <Text style={styles.regText}>
                  Enter any allergies/intolerances you may have (Optional)
                </Text>
                <MultiSelect
                  hideTags
                  items={allergies}
                  uniqueKey="name"
                  ref={component => {
                    this.multiSelect = component;
                  }}
                  onSelectedItemsChange={this.onSelectedAllergyChange}
                  selectedItems={selectedAllergyItems}
                  selectText="Pick Items"
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={text => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor={Constants.COLORS.primary.main}
                  selectedItemIconColor={Constants.COLORS.primary.main}
                  itemTextColor="#CCC"
                  displayKey="name"
                  searchInputStyle={{color: '#CCC'}}
                  submitButtonColor="#48d22b"
                  submitButtonText="Submit"
                />
              </View>
            </SafeAreaView>
            <View style={{padding: '2%'}} />
            <View style={{flex: 1}}>
              <Text style={styles.regText}>
                Select your special diet, if any (Optional)
              </Text>
              <Dropdown
                selectedItemColor={Constants.COLORS.primary.main}
                label="Diet"
                data={[
                  {value: 'Gluten Free'},
                  {value: 'Ketogenic'},
                  {value: 'Vegetarian'},
                  {value: 'Lacto-Vegetarian'},
                  {value: 'Ovo-Vegetarian'},
                  {value: 'Vegan'},
                  {value: 'Pescetarian'},
                  {value: 'Paleo'},
                  {value: 'Primal'},
                  {value: 'Whole30'},
                ]}
                onChangeText={value => {
                  this.setState({selectedDiet: value});
                }}
              />
            </View>
            <View style={{padding: '5%'}} />
            <TouchableOpacity onPress={this.next} style={styles.btnStyle}>
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <EnterDietaryRestrictions
      {...props}
      navigation={navigation}
      route={route}
    />
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
  heading: {
    margin: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  regText: {
    margin: 20,
    fontSize: 16,
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
