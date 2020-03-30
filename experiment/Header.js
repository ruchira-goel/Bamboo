import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../src/styles/colors';
const MENU_ICON = require('../images/menu.png');
const BACK_ARROW_ICON = require('../images/back-arrow.png');

function renderIf(icon, content) {
  // console.log('---------------');
  // console.log(icon);
  if (icon) {
    return content;
  } else {
    return null;
  }
}

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const nav = useNavigation();
    return (
      <View style={styles.navBar}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => nav.toggleDrawer()}>
            <Image
              source={MENU_ICON}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          {/*{renderIf(*/}
          {/*  icon,*/}
          {/*  <TouchableOpacity onPress={() => nav.goBack()}>*/}
          {/*    <Image*/}
          {/*      source={BACK_ARROW_ICON}*/}
          {/*      style={{*/}
          {/*        width: 30,*/}
          {/*        height: 30,*/}
          {/*        resizeMode: 'contain',*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </TouchableOpacity>,*/}
          {/*)}*/}
        </View>
        <View style={styles.centerContainer}>
          <Text
            style={{
              fontSize: 18,
            }}>
            {/*{screenName}*/}
            Title
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Image
            source={require('../images/bamboo-icon.png')}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight,
    padding: 10,
    backgroundColor: COLORS.primaryColor,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rightIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#d9e3bf',
    padding: 15,
    margin: 10,
    width: '100%',
  },
  text: {
    fontSize: 16,
  },
});
