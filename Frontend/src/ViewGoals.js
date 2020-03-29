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
    this.fetchGoals();
  }

  fetchGoals() {
    const {route} = this.props;
    const {userId} = route.params;
    this.setState({userId: userId});
    console.log('In the view goals page: ' + userId);
    fetch(
      Platform.OS === 'android'
        ? `http://10.0.2.2:8080/User/fetchGoals?userId=${userId}`
        : `http://localhost:8080/User/fetchGoals?userId=${userId}`,
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

  alertItemName(item) {
    alert('Navigate to Track Progress Page, ' + item.name);
  }

  edit(item) {
    Alert.alert('Edit Goal', 'Would you like to edit goal - ' + item.name, [
      {
        text: 'Yes',
        onPress: () =>
            this.props.navigation.navigate('EditGoal', {
            userId: item.userId,
            goalId: item.id,
          }),
      },
      {text: 'Cancel'},
    ]);
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
        ? `http://10.0.2.2:8080/Goal/deleteGoal?userId=${userId}&goalId=${
            item.id
          }`
        : `http://localhost:8080/Goal/deleteGoal?userId=${userId}&goalId=${
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
      <ScrollView>
        <View style={styles.heading}>
          <Text style={styles.textheader}>
            Here are all the goals you've saved!
          </Text>
          {this.state.goals.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.rowcontainer}
              onPress={() => this.alertItemName(item)}>
              <View style={{flex: 1}}>
                <Text style={styles.text}>{item.name}</Text>
              </View>
              <View style={styles.rowview}>
                <TouchableOpacity onPress={() => this.edit(item)}>
                  <Image
                    source={require('./img/edit.png')}
                    style={styles.ImageIconStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.deleteConfirm(item)}>
                  <Image
                    source={require('./img/delete.png')}
                    style={styles.ImageIconStyle}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }
}
export default ViewGoals;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '500',
    flex: 1,
    marginTop: '10%',
  },
  rowcontainer: {
    flex: 1,
    padding: 10,
    height: 100,
    marginTop: 3,
    backgroundColor: '#3eb245',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowview: {
    // position: 'absolute',
    // right: 0,
    flexDirection: 'row',
  },
  textheader: {
    color: 'black',
    margin: '10%',
    textAlign: 'center',
    fontSize: 24,
  },
  text: {
    margin: 7,
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  ImageIconStyle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 10,
    height: 25,
    width: 25,
  },
});
