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
  Switch,
  SafeAreaView,
} from 'react-native';
import BUTTONS from './styles/buttons';
import * as Constants from './Constants';
import MultiSelect from 'react-native-multiple-select';
import {Dropdown} from 'react-native-material-dropdown';
import {useNavigation, useRoute} from '@react-navigation/native';

// TODO:
// 1. put user's name in header
// 2. validate inputs, display errors
// 3. display correct units

const listOfAllergies = [
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

class EditDietaryRestrictions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allergies: [],
      diet: '',
      buttonValue: 'Edit',
      editable: false,
      inputStyle: styles.text,
    };
  }
  UNSAFE_componentWillMount(): void {
    const {route} = this.props;
    const {userId} = route.params;
    fetch(
      Platform.OS === 'android'
        ? `${
            Constants.URL.android
          }/User/getDietaryRestrictions?userId=${userId}`
        : `${Constants.URL.ios}/User/getDietaryRestrictions?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          allergies: data.allergies,
          diet: data.diet.toString(),
        });
        console.log(this.state.allergies);
        this.state.allergies.map(item => {
          console.log(item);
        });
        console.log(this.state.diet);
      });
  }

  onSave = () => {
    let {allergies, diet} = this.state;
    const {route} = this.props;
    const {userId} = route.params;
    console.log('In onsave');
    fetch(
      Platform.OS === 'android'
        ? `${
            Constants.URL.android
          }/User/saveDietaryRestrictions?userId=${userId}&allergies=${allergies}&diet=${diet}`
        : `${
            Constants.URL.ios
          }/User/saveDietaryRestrictions?userId=${userId}&allergies=${allergies}&diet=${diet}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          if (
            data.message ===
            'There was an error locating your account, please try signing up again'
          ) {
            Alert.alert('User Not Found', data.message, [{text: 'OK'}]);
          } else {
            Alert.alert('Error', data.message, [{text: 'OK'}]);
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
      });
    } else {
      this.onSave();
      this.setState({
        buttonValue: 'Edit',
        editable: false,
        inputStyle: styles.text,
      });
    }
  };

  onSelectedAllergyChange = selectedItems => {
    this.setState({allergies: selectedItems});
    console.log(this.state.allergies);
  };

  render() {
    let {allergies, diet} = this.state;
    const {route} = this.props;
    const {userId} = route.params;
    fetch(
      Platform.OS === 'android'
        ? `${
            Constants.URL.android
          }/User/getDietaryRestrictions?userId=${userId}`
        : `${Constants.URL.ios}/User/getDietaryRetsrictions?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {});
    if (this.state.editable) {
      return (
        <ScrollView>
          <View style={styles.fullContainer}>
            <Text style={styles.paragraph}>
              Do you have any dietary restrictions? (Hit next to skip)
            </Text>
            <SafeAreaView
              style={{
                flex: 1,
                paddingLeft: 30,
                paddingRight: 30,
                paddingBottom: 30,
                marginBottom: 50,
              }}>
              <View
                style={{
                  flex: 1,
                  paddingLeft: 30,
                  paddingRight: 30,
                  paddingBottom: 30,
                }}>
                <Text style={styles.regText}>
                  Enter any allergies/intolerances you may have (Optional)
                </Text>
                <MultiSelect
                  hideTags
                  items={listOfAllergies}
                  uniqueKey="name"
                  ref={component => {
                    this.multiSelect = component;
                  }}
                  onSelectedItemsChange={this.onSelectedAllergyChange}
                  selectedItems={allergies}
                  selectText="Pick Items"
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={text => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#CCC"
                  displayKey="name"
                  searchInputStyle={{color: '#CCC'}}
                  submitButtonColor="#48d22b"
                  submitButtonText="Submit"
                />
              </View>
            </SafeAreaView>
            <View style={{padding: '2%'}} />
            <View style={{flex: 1, padding: 30}}>
              <Text style={styles.regText}>
                Select your special diet, if any (Optional)
              </Text>
              <Dropdown
                selectedItemColor="black"
                label="Diet"
                defaultValue={diet}
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
                  this.setState({diet: value});
                }}
              />
            </View>
            <View style={{padding: '5%'}} />
            <TouchableOpacity
              style={BUTTONS.primaryButton}
              onPress={this.onPress}>
              <Text style={BUTTONS.primaryButtonText}>
                {this.state.buttonValue}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            {/*<Text style={styles.header}>[Name]'s Health Profile</Text>*/}
            <ScrollView>
              <View style={{paddingTop: 35}}>
                <Text
                  style={{fontSize: 20, textAlign: 'center', paddingBottom: 5}}>
                  Allergies/Intolerances:
                </Text>
                {allergies.map((item, index) => (
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: 'center',
                        paddingTop: 5,
                      }}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.text, {padding: 2}]}>Diet:</Text>
                <Text
                  style={[
                    styles.textInput,
                    this.state.inputStyle,
                    styles.text,
                    {width: 200},
                  ]}>
                  {diet}
                </Text>
              </View>
            </ScrollView>
          </View>
          <TouchableOpacity
            style={BUTTONS.primaryButton}
            onPress={this.onPress}>
            <Text style={BUTTONS.primaryButtonText}>
              {this.state.buttonValue}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <EditDietaryRestrictions {...props} navigation={navigation} route={route} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  textEdit: {
    borderBottomWidth: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    // alignSelf: 'center',
    paddingTop: 35,
    paddingLeft: '20%',
  },
  text: {
    fontSize: 20,
    width: 50,
  },
  fullContainer: {
    flex: 1,
    paddingTop: 45,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  regText: {
    margin: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});
