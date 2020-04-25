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

class FavMeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      meals: [],
    };
    this.getMeals();
  }

  confirmAdd(item) {
    const {route} = this.props;
    const {userId} = route.params;
    const {date} = route.params;
    Alert.alert(
      'Adding Meal',
      "'Are you sure you want to add meal '" +
        item.name +
        "' to " +
        date +
        ' ?',
      [
        {text: 'Yes', onPress: () => this.saveMealFromFavorties(item)},
        {text: 'No'},
      ],
    );
  }

  saveMealFromFavorties(item) {
    //save to backend
    const {route} = this.props;
    const {userId} = route.params;
    const {date} = route.params;
    this.setState({userId: userId});
    fetch(
      Platform.OS === 'android'
        ? `${
            Constants.URL.android
          }/Meal/saveMealFromFavorites?userId=${userId}&mealId=${
            item.id
          }&date=${date}`
        : `${
            Constants.URL.ios
          }/Meal/saveMealFromFavorites?userId=${userId}&mealId=${
            item.id
          }&date=${date}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          Alert.alert(
            'Error',
            'Unable to save meal at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          Alert.alert('Successfully Saved', 'Meal successfully saved.', [
            {text: 'OK'},
          ]);
        }
      });
  }

  getMeals = () => {
    const {route} = this.props;
    const {userId} = route.params;
    this.setState({userId: userId});
    fetch(
      Platform.OS === 'android'
        ? `${Constants.URL.android}/Meal/getFavorites?userId=${userId}`
        : `${Constants.URL.ios}/Meal/getFavorites?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        if (data.error) {
          Alert.alert(
            data.message,
            'Unable to load favorite meals at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          this.setState({meals: data});
          // console.log(this.state.meals[0]);
        }
      });
  };

  deleteConfirm(item) {
    Alert.alert(
      'Deleting Meal',
      "Are you sure you want to delete meal '" +
        item.name +
        "' from favorites?",
      [{text: 'Yes', onPress: () => this.deleteFavorite(item)}, {text: 'No'}],
    );
  }

  deleteFavorite(item) {
    const {route} = this.props;
    const {userId} = route.params;
    this.setState({userId: userId});
    fetch(
      Platform.OS === 'android'
        ? `${
            Constants.URL.android
          }/Meal/deleteFavorite?userId=${userId}&mealId=${item.id}`
        : `${Constants.URL.ios}/Meal/deleteFavorite?userId=${userId}&mealId=${
            item.id
          }`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          Alert.alert(
            'Delete Failed',
            'Unable to delete' +
              item.name +
              ' from favorites at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          Alert.alert(
            'Delete Successful',
            item.name + ' successfully removed from favorites.',
            [{text: 'OK'}],
          );
          this.getMeals();
        }
      });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Here are all your favorite meals!</Text>
          {this.state.meals.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.rowContainer}
              onPress={() => this.confirmAdd(item)}>
              <View style={{flex: 1}}>
                <Text style={styles.text}>{item.name}</Text>
              </View>
              <View style={styles.row}>
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

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <FavMeals {...props} navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
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
    color: 'black',
    margin: '10%',
    textAlign: 'center',
    fontSize: 20,
  },
  text: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  ImageIconStyle: {
    margin: 10,
    height: 25,
    width: 25,
  },
});
