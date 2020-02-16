import {Text, View, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import React, {Component} from 'react';
import {Switch} from 'react-native';

let {height, width} = Dimensions.get('window');

export default class EnterCharacteristics extends React.Component {
  state = {switchValue: false};
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
        <Text>{this.state.switchValue ? 'Imperial' : 'Metric'}</Text>
        <Switch
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
});
