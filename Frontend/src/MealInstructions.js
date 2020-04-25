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
import {SafeAreaView} from 'react-native-safe-area-context';

// Sources:
// https://reactnative.dev/docs/images
// https://medium.com/react-native-training/position-element-at-the-bottom-of-the-screen-using-flexbox-in-react-native-a00b3790ca42
// https://stackoverflow.com/questions/38887069/make-an-item-stick-to-the-bottom-using-flex-in-react-native
// https://github.com/facebook/react-native/issues/325
// https://reactnative.dev/docs/handling-touches
// https://reactnativecode.com/add-onpress-onclick-image/
// https://www.tutorialspoint.com/react_native/react_native_listview.htm

class MealInstructions extends React.Component {
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
    const {ingredients} = route.params;
    const {instructions} = route.params;
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <Text style={styles.heading}>Ingredients:{'\n'}</Text>
            <FlatList
              data={ingredients}
              scrollEnabled={false}
              renderItem={({item}) => (
                <View style={styles.ingredient}>
                  <Text style={styles.text}>
                    {'\u25CF'} {item}
                  </Text>
                </View>
              )}
            />
            <Text style={styles.heading}>
              {'\n'}Instructions:{'\n'}
            </Text>

            <FlatList
              data={instructions}
              scrollEnabled={false}
              renderItem={({item}) => (
                <View style={{marginBottom: 12}}>
                  <Text style={styles.text}>{item}</Text>
                </View>
              )}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <MealInstructions {...props} navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ingredient: {
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
  },
});
