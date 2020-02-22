import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Switch,
  Button,
} from 'react-native';
import Constants from 'expo-constants';
import React, {Component} from 'react';
import {Dropdown} from 'react-native-material-dropdown';

var {screenHeight, screenWidth} = Dimensions.get('window');

export default class EnterCharacteristics extends React.Component {
  state = {
    switchValue: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      height: '', //stored in cm
      weight: '', //stored in kg
      age: '',
      sex: '',
      feet: '',
      inches: '',
    };
  }

  toggleSwitch = value => {
    this.setState({switchValue: value});
  };

  renderHeight() {
    if (this.state.switchValue) {
      return (
        <View style={styles.flexRowContainer}>
          <TextInput
            value={this.state.height}
            onChangeText={height => this.setState({height})}
            placeholder={'Enter Height'}
            keyboardType={'numeric'}
            autoCorrect="false"
            returnKeyType="done"
            style={styles.input}
          />
          <Text>{this.state.switchValue ? 'inch' : 'cm'}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.flexRowContainer}>
          <TextInput
            value={this.feet}
            onChangeText={height => this.setState({height})}
            placeholder={'Enter feet'}
            keyboardType={'numeric'}
            autoCorrect="false"
            returnKeyType="done"
            style={styles.input}
          />
          <Text>{'feet'}</Text>
          <TextInput
            value={this.inches}
            onChangeText={height => this.setState({height})}
            placeholder={'Enter inches'}
            keyboardType={'numeric'}
            autoCorrect="false"
            returnKeyType="done"
            style={styles.input}
          />
          <Text>{'feet'}</Text>
          this.height = ((this.feet * 12) + this.inches) * 2.54
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Bamboo does ...
          {'\n'}...
          {'\n'}...
        </Text>
        <View style={styles.flexRowContainer}>
          <TextInput
            value={this.state.height}
            onChangeText={height => this.setState({height})}
            placeholder={'Enter Height'}
            keyboardType={'numeric'}
            autoCorrect="false"
            returnKeyType="done"
            style={styles.input}
          />
          <Text>{this.state.switchValue ? 'inch' : 'cm'}</Text>
        </View>

        <View style={styles.flexRowContainer}>
          <TextInput
            value={this.state.weight}
            onChangeText={weight => this.setState({weight})}
            placeholder={'Enter Weight'}
            keyboardType={'numeric'}
            autoCorrect="false"
            returnKeyType="done"
            style={styles.input}
          />
          <Text>{this.state.switchValue ? 'lb' : 'kg'}</Text>
        </View>

        <View style={styles.flexRowContainer}>
          <TextInput
            value={this.state.age}
            onChangeText={age => this.setState({age})}
            placeholder={'Enter Age'}
            keyboardType={'numeric'}
            autoCorrect="false"
            returnKeyType="done"
            style={styles.input}
          />
          <Text>{'years'}</Text>
        </View>

        <Dropdown
          label="Sex"
          data={[{value: 'Female'}, {value: 'Male'}, {value: 'Other'}]}
        />

        <Text>{this.state.switchValue ? 'Imperial' : 'Metric'}</Text>
        <Switch
          style={styles.switch}
          onValueChange={this.toggleSwitch}
          value={this.state.switchValue}
        />
        <Button title="Next" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
    paddingTop: screenHeight * 0.1,
    textAlign: 'center',
  },
  flexRowContainer: {
    flexDirection: 'row',
    textAlign: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.05,
    marginBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: '#ecf0f1',
  },
  switch: {
    textAlign: 'center',
    justifyContent: 'center',
  },
});
