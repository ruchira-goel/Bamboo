import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Switch,
} from 'react-native';
import Constants from 'expo-constants';
import React, {Component} from 'react';
//import MaterialSwitch from "./components/MaterialSwitch";

var {height, width} = Dimensions.get('window');

export default class EnterCharacteristics extends React.Component {
  state = {
    switchValue: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      height: '',
    };
  }
  toggleSwitch = value => {
    this.setState({switchValue: value});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Bamboo does ...
          {'\n'}...
          {'\n'}...
        </Text>
        <TextInput
          value={this.state.height}
          onChangeText={height => this.setState({height})}
          placeholder={'Enter Height'}
          style={styles.input}
        />
        <Text>{this.state.switchValue ? 'inch' : 'cm'}</Text>
        <Text>{this.state.switchValue ? 'Imperial' : 'Metric'}</Text>
        <Switch
          style={{}}
          onValueChange={this.toggleSwitch}
          value={this.state.switchValue}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    paddingTop: height * 0.1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: width * 0.8,
    height: height * 0.05,
    padding: 8,
    marginBottom: 10,
    backgroundColor: '#ecf0f1',
  },
});
