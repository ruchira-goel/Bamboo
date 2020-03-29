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

export default class FavActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      activities: [],
    };
    this.getActivities();
  }

  confirmAdd(item) {
    const {route} = this.props;
    const {userId} = route.params;
    const {date} = route.params;
    Alert.alert(
      'Adding Activity',
      "Are you sure you want to add activity " + item.type + " to " + date + " ?",
      [
        {text: 'Yes', onPress: () => this.saveActivityFromFavorties(item)},
        {text: 'No'},
      ],
    );
  }

  saveActivityFromFavorties(item) {
    //save to backend
    const {route} = this.props;
    const {userId} = route.params;
    const {date} = route.params;
    console.log('Date: ' + date);
    this.setState({userId: userId});
    console.log('In the savemealsfromfavs function: ' + userId);
    console.log('');
    fetch(
      Platform.OS === 'android'
        ? `http://10.0.2.2:8080/Activity/saveActivityFromFavorites?userId=${userId}&activityId=${
            item.id
          }&date=${date}`
        : `http://localhost:8080/Activity/saveActivityFromFavorites?userId=${userId}&activityId=${
            item.id
          }&date=${date}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log(data);
        if (data.error) {
          Alert.alert(
            'Error',
            'Unable to save activity at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          Alert.alert('Successfully Saved', 'Activity successfully saved.', [
            {text: 'OK'},
          ]);
        }
      });
  }

  getActivities = () => {
    const {route} = this.props;
    const {userId} = route.params;
    this.setState({userId: userId});
    console.log('In the favmeals page: ' + userId);
    fetch(
      Platform.OS === 'android'
        ? `http://10.0.2.2:8080/Activity/getFavorites?userId=${userId}`
        : `http://localhost:8080/Activity/getFavorites?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert(
            'Error',
            'Unable to load favorite activities at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          this.setState({activities: data});
        }
      });
  };

  deleteConfirm(item) {
    Alert.alert(
      'Deleting Activity',
      "Are you sure you want to delete activity '" +
        item.type +
        "' from favorites?",
      [{text: 'Yes', onPress: () => this.deleteFavorite(item)}, {text: 'No'}],
    );
  }

  deleteFavorite(item) {
    const {route} = this.props;
    const {userId} = route.params;
    this.setState({userId: userId});
    console.log('delFav: ' + userId);
    console.log(item.id);
    fetch(
      Platform.OS === 'android'
        ? `http://10.0.2.2:8080/Activity/deleteFavorite?userId=${userId}&activityId=${
            item.id
          }`
        : `http://localhost:8080/Activity/deleteFavorite?userId=${userId}&activityId=${
            item.id
          }`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert(
            'Delete Failed',
            'Unable to delete' +
              item.type +
              ' from favorites at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          Alert.alert(
            'Delete Successful',
            item.type + ' successfully removed from favorites.',
            [{text: 'OK'}],
          );
          this.getActivities();
        }
      });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.heading}>
          <Text style={styles.textheader}>
            Here are all your favorite activities!
          </Text>
          {this.state.activities.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.rowcontainer}
              onPress={() => this.confirmAdd(item)}>
              <View style={{flex: 1}}>
                <Text style={styles.text}>{item.type} , {item.minutes} minutes</Text>
              </View>
              <View style={styles.rowview}>
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
