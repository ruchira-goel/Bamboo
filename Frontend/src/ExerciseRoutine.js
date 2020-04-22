import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Dimensions} from 'react-native';

export default class ExerciseRoutine extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ScrollView>
          <View style={[styles.card, {marginTop: 10}]}>
            <Text style={styles.day}>Tuesday</Text>
            <View style={styles.row}>
              <Text style={[styles.text, styles.activity]}>Running</Text>
              <Text style={styles.text}>30 min.</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.day}>Thursday</Text>
            <View style={styles.row}>
              <Text style={[styles.text, styles.activity]}>Swimming</Text>
              <Text style={styles.text}>90 min.</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width - 20,
    alignItems: 'flex-start',
    padding: 10,
    marginVertical: 5,
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
    width: (Dimensions.get('window').width - 20)/2,
  },
});
