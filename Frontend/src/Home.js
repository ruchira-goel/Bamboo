import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import DrawerNav from './DrawerNav';
import * as Constants from './Constants';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text> This is Main Container View. </Text>

        <View style={styles.bottomView}>
          <Text style={styles.textStyle}>This is Bottom View.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Constants.DIMENSIONS.screenHeight,
  },

  bottomView: {
    // flex: 1,
    width: '100%',
    height: 50,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // bottom: 0,
  },

  textStyle: {
    color: '#fff',
    fontSize: 22,
  },
});
