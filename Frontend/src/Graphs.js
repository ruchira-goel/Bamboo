import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView, Platform} from 'react-native';

const screenWidth = Dimensions.get('window').width;

/*
https://github.com/sxywu/react-d3-example/blob/master/src/visualizations/LineChart.js
https://www.npmjs.com/package/react-native-responsive-linechart
https://formidable.com/open-source/victory/docs/native/
 */

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';
import URL from './url';

const graphData = [
  {day: 1, minutes: 20},
  {day: 2, minutes: 15},
  {day: 3, minutes: 60},
  {day: 4, minutes: 100},
];

let today = new Date();
let day = today.getDay();
let daysOfWeek = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
let xAxisFormat = [];
let d = day + 1;
if (d === 7) {
  d = 0;
}
for (let i = 0; i < 7; i++) {
  if (d === day) {
    xAxisFormat.push('Today');
  } else {
    xAxisFormat.push(daysOfWeek[d++]);
  }
  if (d === 7) {
    d = 0;
  }
}

export default class Graphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyInfo: '',
    };
  }
  UNSAFE_componentWillMount(): void {
    const {route} = this.props;
    const {userId} = route.params;
    fetch(
      Platform.OS === 'android'
        ? `${URL.heroku}/User/getCharacteristics?userId=${userId}`
        : `http://localhost:8080/User/getCharacteristics?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          dailyInfo: data.dailyInfo,
        }),
      );
  }
  render() {
    return (
      <View style={styles.container}>
        <VictoryChart
          padding={{left: 70, top: 50, right: 40, bottom: 50}}
          domainPadding={20}
          width={screenWidth}
          theme={VictoryTheme.material}>
          <VictoryLabel
            text="Daily Exercise"
            x={screenWidth / 2}
            y={30}
            textAnchor="middle"
          />
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3, 4, 5, 6, 7]}
            tickFormat={xAxisFormat}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={x => `${x} min`}
          />
          <VictoryBar data={graphData} x="day" y="minutes" />
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
