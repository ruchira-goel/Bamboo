import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import * as Constants from './Constants';
import NotifService from './NotifService';

// Sources:
// https://reactnative.dev/docs/images
// https://medium.com/react-native-training/position-element-at-the-bottom-of-the-screen-using-flexbox-in-react-native-a00b3790ca42
// https://stackoverflow.com/questions/38887069/make-an-item-stick-to-the-bottom-using-flex-in-react-native
// https://github.com/facebook/react-native/issues/325
// https://reactnative.dev/docs/handling-touches
// https://reactnativecode.com/add-onpress-onclick-image/
// https://www.tutorialspoint.com/react_native/react_native_listview.htm
// https://aboutreact.com/refresh-previous-screen-react-navigation/

class ViewGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      goals: [],
    };
  }

  componentDidMount() {
    this.fetchGoals();
  }

  fetchGoals() {
    const {route} = this.props;
    const {userId} = route.params;
    this.setState({userId: userId});
    fetch(
      Platform.OS === 'android'
        ? `${Constants.URL.android}/User/fetchGoals?userId=${userId}`
        : `${Constants.URL.ios}/User/fetchGoals?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        if (data.error) {
          Alert.alert(
            data.message,
            'Unable to fetch goals at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          this.setState({goals: data});
          // console.log(this.state.goals[0]);
        }
      });
  }

  trackProgress(item) {
    this.props.navigation.navigate('TrackProgress', {
      userId: item.userId,
      goalId: item.id,
      goalName: item.name,
    });
  }

  edit(item) {
    this.props.navigation.navigate('EditGoal', {
      userId: item.userId,
      goalId: item.id,
    });
  }

  deleteConfirm(item) {
    Alert.alert(
      'Deleting Goal',
      "Are you sure you want to delete goal '" + item.name + "'?",
      [{text: 'Yes', onPress: () => this.deleteGoal(item)}, {text: 'No'}],
    );
  }

  deleteGoal(item) {
    const {route} = this.props;
    const {userId} = route.params;
    this.setState({userId: userId});
    // console.log('delGoal: ' + userId);
    // console.log(item.id);
    fetch(
      Platform.OS === 'android'
        ? `${Constants.URL.android}/Goal/deleteGoal?userId=${userId}&goalId=${
            item.id
          }`
        : `${Constants.URL.ios}/Goal/deleteGoal?userId=${userId}&goalId=${
            item.id
          }`,
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        if (data.error) {
          Alert.alert(
            'Delete Failed',
            'Unable to delete goal ' +
              item.name +
              ' at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          Alert.alert(
            'Delete Successful',
            item.name + ' successfully deleted.',
            [{text: 'OK'}],
          );
          this.fetchGoals();
          let notif = new NotifService();
          notif.scheduleNotifications(userId);
        }
      });
  }

  render() {
    const {route} = this.props;
    const {userId} = route.params;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>
            Here are all the goals you've saved!
          </Text>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() =>
              this.props.navigation.navigate('Root', {
                screen: 'SetGoal',
                params: {
                  userId: userId,
                },
              })
            }>
            <Text>Set a new goal</Text>
          </TouchableOpacity>
          {this.state.goals.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.rowContainer}
              onPress={() => this.trackProgress(item)}>
              <View style={{flex: 1}}>
                <Text style={styles.text}>{item.name}</Text>
              </View>
              <View style={styles.row}>
                <TouchableOpacity onPress={() => this.edit(item)}>
                  <Image
                    resizeMode={'contain'}
                    source={require('./img/edit.png')}
                    style={styles.imageIconStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.deleteConfirm(item)}>
                  <Image
                    resizeMode={'contain'}
                    source={require('./img/delete.png')}
                    style={styles.imageIconStyle}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          <View style={{margin: 80}} />
        </View>
      </ScrollView>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  return (
    <View>
      {isFocused ? (
        <ViewGoals {...props} navigation={navigation} route={route} />
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  rowContainer: {
    padding: 10,
    margin: 3,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Constants.COLORS.accent.main,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  heading: {
    marginHorizontal: '10%',
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  imageIconStyle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 10,
    height: 25,
    width: 25,
  },
  primaryBtn: {
    borderRadius: 60,
    backgroundColor: Constants.COLORS.accent.main,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
