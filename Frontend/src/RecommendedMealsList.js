import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
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

class RecommendedMealsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      ingredients: '',
      instructions: '',
      meals: [],
    };
  }

  render() {
    const {route} = this.props;
    const {meals} = route.params;
    return (
      <ScrollView>
        <FlatList
          data={meals}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                style={styles.meal}
                onPress={() => this.getInstructionsAndIngredients(item.id)}>
                <Text style={styles.text}>{item.name}</Text>
                {this.renderNutrient('Calories', item.calories.toFixed(2))}
                {this.renderNutrient('Fat', item.fat.toFixed(2))}
                {this.renderNutrient('Protein', item.protein.toFixed(2))}
                {this.renderNutrient('Carbs', item.carbs.toFixed(2))}
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={{marginTop: 5}} />
      </ScrollView>
    );
  }

  getInstructionsAndIngredients = mealId => {
    const {route} = this.props;
    const {userId} = route.params;
    fetch(
      Platform.OS === 'android'
        ? `${
            Constants.URL.android
          }/Meal/getIng?mealId=${mealId}&userId=${userId}`
        : `${Constants.URL.ios}/Meal/getIng?mealId=${mealId}&userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          Alert.alert(data.message, 'Unable to find this meal', [{text: 'OK'}]);
        } else {
          this.setState({ingredients: data}, () => {
            fetch(
              Platform.OS === 'android'
                ? `${Constants.URL.android}/Meal/getIns?mealId=${mealId}`
                : `${Constants.URL.ios}/Meal/getIns?mealId=${mealId}`,
            )
              .then(res => res.json())
              .then(data => {
                if (data.error) {
                  Alert.alert(data.message, 'Unable to find this meal', [
                    {text: 'OK'},
                  ]);
                } else {
                  this.setState({instructions: data}, () => {
                    this.props.navigation.navigate('Meal Instructions', {
                      instructions: data,
                      ingredients: this.state.ingredients,
                    });
                  });
                }
              });
          });
        }
      });
  };

  renderNutrient = (nutrient, value) => {
    if (value !== '0.00') {
      let unit = 'g';
      if (nutrient === 'Calories') {
        unit = '';
      }
      return (
        <View>
          <Text>
            {nutrient}: {value}
            {unit}
          </Text>
        </View>
      );
    }
  };
}

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <RecommendedMealsList {...props} navigation={navigation} route={route} />
  );
}

const styles = StyleSheet.create({
  meal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Constants.COLORS.accent.main,
    marginTop: 5,
    marginHorizontal: 5,
    padding: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});
