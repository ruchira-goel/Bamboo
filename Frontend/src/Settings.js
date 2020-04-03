import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import ChangePass from './ChangePass';
import * as Constants from './Constants';
import {useNavigation} from '@react-navigation/native';

class Settings extends Component {
  render() {
    const userId = this.props.userId;
    const email = this.props.email;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Account</Text>
        <TouchableOpacity
          style={[styles.selectBox, {borderBottomWidth: 0}]}
          disabled={true}>
          <View style={styles.leftContainer}>
            <Text style={styles.text}>Email</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={[styles.text, {color: 'rgba(0, 0, 0, 0.5)'}]}>
              {email}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            // goes back to Home screen instead of Settings
            this.props.navigation.navigate('Root', {
              screen: 'ChangePass',
              params: {
                userId: userId,
              },
            })
          }
          style={[styles.selectBox, {marginBottom: 20}]}>
          <View style={styles.leftContainer}>
            <Text style={styles.text}>Change password</Text>
          </View>
          <View style={styles.rightContainer}>
            <Image
              source={require('./img/forward-arrow.png')}
              style={{
                width: 16,
                height: 16,
                opacity: 0.5,
                resizeMode: 'contain',
              }}
            />
          </View>
        </TouchableOpacity>
        {/*<ChangePass />*/}
        <Text style={styles.heading}>Units</Text>
        <Text style={styles.heading}>Notifications</Text>
      </View>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  return <Settings {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Constants.DIMENSIONS.screenWidth,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Constants.COLORS.background,
    padding: 20,
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    // margin: 10,
  },
  selectBox: {
    fontSize: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: Constants.COLORS.gray,
    backgroundColor: '#fff',
    padding: 10,
    // marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
