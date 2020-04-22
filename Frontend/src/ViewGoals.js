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
import {useNavigation, useRoute} from '@react-navigation/native';
import * as Constants from './Constants';

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

  // componentDidMount() {
  //   const {fetchGoals, navigation} = this.props;
  //   this.fetchGoals();
  //   this.willFocusListener = navigation.addListener('willFocus', () => {
  //     this.fetchGoals();
  //   });
  // }
  //
  // componentWillUnmount() {
  //   this.willFocusListener.remove();
  // }

  componentDidMount() {
    console.log('RAMYA----->Mounting View Goals');
    this.fetchGoals();
  }
  //
  // componentDidUpdate(prevProps) {
  //   if (prevProps.goals !== this.props.goals) {
  //     console.log('RAMYA----->Calling componentDidUpdate');
  //     this.fetchGoals();
  //   }
  // }
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('RAMYA----->SHould Component Upate, nextState:', nextState);
  //   console.log('RAMYA----->SHould Component Upate, nextProps:', nextProps);
  //   return true;
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   console.log('RAMYA----->Component will receive props', nextProps);
  // }

  fetchGoals() {
    const {route} = this.props;
    const {userId} = route.params;
    this.setState({userId: userId});
    console.log('In the view goals page: ' + userId);
    fetch(
      Platform.OS === 'android'
        ? `${Constants.URL.android}/User/fetchGoals?userId=${userId}`
        : `${Constants.URL.ios}/User/fetchGoals?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert(
            data.message,
            'Unable to fetch goals at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          this.setState({goals: data});
          console.log(this.state.goals[0]);
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
    console.log('delGoal: ' + userId);
    console.log(item.id);
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
        console.log(data);
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
        }
      });
  }

  render() {
    return (
      <View>
        <ScrollView style={styles.container}>
          <Text style={styles.heading}>
            Here are all the goals you've saved!
          </Text>
          <View style={{alignSelf: 'center', width: '50%', marginBottom: 10}}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() =>
                this.props.navigation.navigate('Root', {
                  screen: 'SetGoal',
                  params: {
                    userId: this.props.userId,
                  },
                })
              }>
              <Text>Set a new goal</Text>
            </TouchableOpacity>
          </View>
          {this.state.goals.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.rowContainer}
              onPress={() => this.trackProgress(item)}>
              <View style={{flex: 1}}>
                <Text style={styles.text}>{item.name}</Text>
              </View>
              <View style={styles.rowView}>
                <TouchableOpacity onPress={() => this.edit(item)}>
                  <Image
                    source={require('./img/edit.png')}
                    style={styles.imageIconStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.deleteConfirm(item)}>
                  <Image
                    source={require('./img/delete.png')}
                    style={styles.imageIconStyle}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          {/*<View style={styles.fabView}>*/}
          {/*  <TouchableOpacity*/}
          {/*    style={styles.floatingActionButton}*/}
          {/*    onPress={() =>*/}
          {/*      this.props.navigation.navigate('Root', {*/}
          {/*        screen: 'SetGoal',*/}
          {/*        params: {*/}
          {/*          userId: this.props.userId,*/}
          {/*        },*/}
          {/*      })*/}
          {/*    }>*/}
          {/*    <Image*/}
          {/*      source={require('./img/plus.png')}*/}
          {/*      style={{*/}
          {/*        width: 30,*/}
          {/*        height: 30,*/}
          {/*        resizeMode: 'contain',*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}
        </ScrollView>
      </View>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <ViewGoals {...props} navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  container: {
    // fontSize: 24,
    // fontWeight: '500',
    // marginBottom: 100,
    // height: Constants.DIMENSIONS.screenHeight,
  },
  rowContainer: {
    padding: 10,
    height: 100,
    marginTop: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowView: {
    // position: 'absolute',
    // right: 0,
    flexDirection: 'row',
  },
  heading: {
    margin: '10%',
    // textAlign: 'left',
    fontSize: 18,
  },
  fabView: {
    position: 'absolute',
    top: '10%',
    right: 10,
    flex: 1,
  },
  floatingActionButton: {
    // borderWidth: 1,
    // borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: Constants.COLORS.accent.main,
    borderRadius: 100,
  },
  text: {
    margin: 7,
    color: 'black',
    fontSize: 18,
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
    backgroundColor: Constants.COLORS.accent.main,
    borderRadius: 60,
    borderColor: Constants.COLORS.accent.main,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
