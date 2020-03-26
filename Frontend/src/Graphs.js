import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';

const screenWidth = Dimensions.get('window').width;

/*
https://github.com/sxywu/react-d3-example/blob/master/src/visualizations/LineChart.js
https://www.npmjs.com/package/react-native-responsive-linechart
https://formidable.com/open-source/victory/docs/native/
 */

import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000},
];

export default class Graphs extends Component {
  render() {
    return (
      <View style={styles.container}>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});
