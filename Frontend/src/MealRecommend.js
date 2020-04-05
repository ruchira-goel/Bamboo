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
    };
  }
  render() {
    const limitOpts = [
      {
        value: 'Less than',
      },
      {
        value: 'Greater than',
      },
    ];
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            flex: 0.1,
            padding: '1%',
            //backgroundColor: 'green',
          }}>
          <Text style={{flex: 0.2, padding: '9%'}}>Calories</Text>
          <Dropdown
            label="Limit type"
            data={limitOpts}
            onChangeText={value => {
              this.setState({calLimitType: value});
            }}
            selectedItemColor="#3eb245"
            containerStyle={{width: '40%', flex: 0.35}}
          />
          <View style={{padding: '4%'}} />
          <TextInput
            style={{
              paddingTop: '10%',
              padding: '5%',
              flex: 0.4,
              height: '15%',
              //backgroundColor: 'blue',
              justifyContent: 'center',
              borderBottomWidth: 0.5,
            }}
            keyboardType={'numeric'}
            placeholder="Enter amount"
            onChangeText={calories => this.setState({calories})}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            flex: 0.1,
            padding: '1%',
            //backgroundColor: 'green',
          }}>
          <Text style={{flex: 0.2, padding: '9%'}}>Fat</Text>
          <Dropdown
            label="Limit type"
            data={limitOpts}
            onChangeText={value => {
              this.setState({fatLimitType: value});
            }}
            selectedItemColor="#3eb245"
            containerStyle={{width: '40%', flex: 0.35}}
          />
          <View style={{padding: '4%'}} />
          <TextInput
            style={{
              paddingTop: '10%',
              padding: '5%',
              flex: 0.4,
              height: '15%',
              //backgroundColor: 'blue',
              justifyContent: 'center',
              borderBottomWidth: 0.5,
            }}
            keyboardType={'numeric'}
            placeholder="Enter amount"
            onChangeText={fat => this.setState({fat})}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            flex: 0.1,
            padding: '1%',
            //backgroundColor: 'green',
          }}>
          <Text style={{flex: 0.2, padding: '9%'}}>Protein</Text>
          <Dropdown
            label="Limit type"
            data={limitOpts}
            onChangeText={value => {
              this.setState({proteinLimitType: value});
            }}
            selectedItemColor="#3eb245"
            containerStyle={{width: '40%', flex: 0.35}}
          />
          <View style={{padding: '4%'}} />
          <TextInput
            style={{
              paddingTop: '10%',
              padding: '5%',
              flex: 0.4,
              height: '15%',
              //backgroundColor: 'blue',
              justifyContent: 'center',
              borderBottomWidth: 0.5,
            }}
            keyboardType={'numeric'}
            placeholder="Enter amount"
            onChangeText={protein => this.setState({protein})}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            flex: 0.1,
            padding: '1%',
            //backgroundColor: 'green',
          }}>
          <Text style={{flex: 0.2, padding: '9%'}}>Carbs</Text>
          <Dropdown
            label="Limit type"
            data={limitOpts}
            onChangeText={value => {
              this.setState({carbsLimitType: value});
            }}
            selectedItemColor="#3eb245"
            containerStyle={{width: '40%', flex: 0.35}}
          />
          <View style={{padding: '4%'}} />
          <TextInput
            style={{
              paddingTop: '10%',
              padding: '5%',
              flex: 0.4,
              height: '15%',
              //backgroundColor: 'blue',
              justifyContent: 'center',
              borderBottomWidth: 0.5,
            }}
            keyboardType={'numeric'}
            placeholder="Enter amount"
            onChangeText={carbs => this.setState({carbs})}
          />
        </View>
        <View style={{padding: '4%'}} />
        <View style={{flex: 0.65, alignContent: 'center'}}>
          <TouchableOpacity onPress={this.submit} style={styles.button}>
            <Text>Submit</Text>
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
    flex: 0.25,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    //marginLeft: '25%',
    // marginRight: '25%',
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
    flex: 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkseagreen',
    width: '50%',
    marginLeft: '25%',
  },
  /*textalign for the text to be in the center for "bamboo."*/
});
