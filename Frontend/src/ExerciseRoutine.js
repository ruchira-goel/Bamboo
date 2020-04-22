import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import * as Constants from './Constants';
import {useNavigation, useRoute} from '@react-navigation/native';

class ExerciseRoutine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      routine: [],
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
        ? `${Constants.URL.android}/User/getExerciseRoutine?userId=${userId}`
        : `${Constants.URL.ios}/User/getExerciseRoutine?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          Alert.alert(
            data.message,
            'Unable to fetch exercise routine at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          this.setState({routine: data});
        }
      });
  }

  exerciseRoutine() {
    return this.state.routine.map(data => {
      return (
        <View style={styles.card}>
          <Text style={styles.day}>{data.split(' ')[0]}</Text>
          <View style={styles.row}>
            <Text style={[styles.text, styles.activity]}>
              {data.substring(data.indexOf(' '), data.lastIndexOf(' '))}
            </Text>
            <Text style={styles.text}>
              {data.substring(data.lastIndexOf(' '))} hour
            </Text>
          </View>
        </View>
      );
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 10,
        }}>
        <ScrollView>
          <View>{this.exerciseRoutine()}</View>
        </ScrollView>
      </View>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <ExerciseRoutine {...props} navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  card: {
    width: Constants.DIMENSIONS.screenWidth - 20,
    alignItems: 'flex-start',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  day: {
    fontSize: 22,
    color: 'orange',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
  },
  activity: {
    width: (Constants.DIMENSIONS.screenWidth - 20) / 2,
  },
});
