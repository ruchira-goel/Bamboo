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

export default class PreferredExerciseCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      categories: [
        {
          name: 'Bicycling',
          check: false,
          opacity: 0,
        },
        {
          name: 'Conditioning Exercise',
          check: false,
          opacity: 0,
        },
        {
          name: 'Running',
          check: false,
          opacity: 0,
        },
        {
          name: 'Sports',
          check: false,
          opacity: 0,
        },
        {
          name: 'Water Activities',
          check: false,
          opacity: 0,
        },
        {
          name: 'Winter Activities',
          check: false,
          opacity: 0,
        },
      ],
      preferred: [],
    };
    this.fetchPreferredCategories();
  }

  fetchPreferredCategories() {
    // Get check values for categories array from backend
    const {route} = this.props;
    const {userId} = route.params;
    this.setState({userId: userId});
    fetch(
      Platform.OS === 'android'
        ? `http://10.0.2.2:8080/User/fetchPreferredExerciseCategories?userId=${userId}`
        : `http://localhost:8080/User/fetchPreferredExerciseCategories?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        if (data.error) {
          Alert.alert(
            data.message,
            'Unable to fetch preferred exercise categories at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          this.setState({preferred: data});
          this.setCheckMarks();
        }
      });
  }

  setCheckMarks() {
    // Set check and opacity values from preferred[]
    //
    console.log("I'm in Set Check Marks");
    // for each preferred, check if the name is in categories.name
    // react state immutability
    var categories = this.state.categories;
    this.state.preferred.forEach(p => {
      categories
        .filter(category => category.name === p)
        .map(category => {
          category.opacity = 1;
          category.check = true;
        });
    });
    console.log('New categories:', categories);
    this.setState({categories: categories});
  }

  selectOrUnselect(item) {
    const {route} = this.props;
    const {userId} = route.params;
    this.setState({userId: userId});
    let addOrRemove = 0;
    if (!item.check) {
      addOrRemove = 1;
      item.opacity = 1;
      item.check = true;
      // Add to preferred categories on backend
    } else {
      addOrRemove = 0;
      item.opacity = 0;
      item.check = false;
      // remove from preferred categories on backend
    }
    fetch(
      Platform.OS === 'android'
        ? `http://10.0.2.2:8080/User/changePreferredExerciseCategories?userId=${userId}&category=${
            item.name
          }&addOrRemove=${addOrRemove}`
        : `http://localhost:8080/User/changePreferredExerciseCategories?userId=${userId}&category=${
            item.name
          }&addOrRemove=${addOrRemove}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert(
            'Change to Exercise Categories Failed',
            'Unable to add/remove ' +
              item.name +
              ' from categories at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          Alert.alert(
            'Saved Successfully',
            item.name +
              ' successfully added/removed from preferred exercise categories.',
            [{text: 'OK'}],
          );
        }
      });
  }

  nextPage() {
    const {route} = this.props;
    const {userId} = route.params;
    this.setState({userId: userId});
    this.props.navigation.navigate('ExercisePreferences', {
      userId: userId,
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.heading}>
          <Text style={styles.textheader}>
            What category of exercises do you generally like to do?
          </Text>
          {this.state.categories.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.rowcontainer}
              onPress={() => this.selectOrUnselect(item)}>
              <View style={{flex: 1}}>
                <Text style={styles.text}>{item.name}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => this.selectOrUnselect(item)}>
                  <Image
                    source={require('./img/check.png')}
                    style={{
                      marginTop: 10,
                      marginLeft: 10,
                      marginRight: 5,
                      marginBottom: 10,
                      height: 25,
                      width: 25,
                      opacity: item.opacity,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          <View>
            <TouchableOpacity onPress={() => this.nextPage()}>
              <Image
                source={require('./img/next.png')}
                style={styles.nextButton}
              />
            </TouchableOpacity>
          </View>
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
  nextButton: {
    position: 'absolute',
    // resizeMode: 'stretch',
    height: 100,
    width: 100,
    bottom: 30,
    right: 30,
  },
});
