import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

// Sources:
// https://reactnative.dev/docs/images
// https://medium.com/react-native-training/position-element-at-the-bottom-of-the-screen-using-flexbox-in-react-native-a00b3790ca42
// https://stackoverflow.com/questions/38887069/make-an-item-stick-to-the-bottom-using-flex-in-react-native
// https://github.com/facebook/react-native/issues/325
// https://reactnative.dev/docs/handling-touches
// https://reactnativecode.com/add-onpress-onclick-image/
// https://www.tutorialspoint.com/react_native/react_native_listview.htm

class ViewGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [
        {
          id: 0,
          goal:
            '< x number of calories consumed per day calories consumed per day',
        },
        {
          id: 1,
          goal: '> y calories burned per day',
        },
        {
          id: 2,
          goal: '> z g of protein per week',
        },
        {
          id: 3,
          goal: '> p g of fat per day',
        },
        {
          id: 4,
          goal: '< x number of calories consumed per day',
        },
        {
          id: 5,
          goal: '> y calories burned per day',
        },
        {
          id: 6,
          goal: '> z g of protein per week',
        },
        {
          id: 7,
          goal: '> p g of fat per day',
        },
        {
          id: 8,
          goal: '< x number of calories consumed per day',
        },
        {
          id: 9,
          goal: '> y calories burned per day',
        },
        {
          id: 10,
          goal: '> z g of protein per week',
        },
        {
          id: 11,
          goal: '> p g of fat per day',
        },
      ],
    };
  }

  alertItemName(item) {
    alert('Navigate to Track Progress Page, ' + item.goal);
  }

  edit(item) {
    Alert.alert('Edit Goal', 'Navigate to edit page, editing ' + item.goal, [
      {text: 'OK'},
    ]);
  }

  delete(item) {
    Alert.alert(
      'Deleting Goal',
      "Are you sure you want to delete goal '" + item.goal + "'?",
      [{text: 'Yes'}, {text: 'Cancel'}],
    );
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
                <Text style={styles.text}>{item.goal}</Text>
              </View>
              <View style={styles.rowview}>
                <TouchableOpacity onPress={() => this.edit(item)}>
                  <Image
                    source={require('./img/edit.png')}
                    style={styles.ImageIconStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.delete(item)}>
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
