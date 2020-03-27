import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';
import URL from './url';

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

export default class DietGraphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      caloriesGraphData: [],
    };
  }
  componentDidMount(): void {
    const {route} = this.props;
    const {userId} = route.params;
    fetch(
      Platform.OS === 'android'
        ? `${URL.heroku}/User/weekCaloriesConsumption?userId=${userId}`
        : `http://localhost:8080/User/weekCaloriesConsumption?userId=${userId}`,
    )
      .then(res => res.text())
      .then(data =>
        this.setState({
          isLoading: false,
          caloriesGraphData: [
            {day: 1, calories: Number(data.split(' ')[0])},
            {day: 2, calories: Number(data.split(' ')[1])},
            {day: 3, calories: Number(data.split(' ')[2])},
            {day: 4, calories: Number(data.split(' ')[3])},
            {day: 5, calories: Number(data.split(' ')[4])},
            {day: 6, calories: Number(data.split(' ')[5])},
            {day: 7, calories: Number(data.split(' ')[6])},
          ],
        }),
      );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <VictoryChart
          padding={{left: 70, top: 50, right: 40, bottom: 50}}
          domainPadding={20}
          width={screenWidth}
          theme={VictoryTheme.material}>
          <VictoryLabel
            text="Daily Calories Consumed"
            x={screenWidth / 2}
            y={30}
            textAnchor="middle"
          />
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7]}
            tickFormat={xAxisFormat}
          />
          <VictoryAxis
            dependentAxis
            label={'calories'}
            style={{
              axisLabel: {padding: 40},
            }}
          />
          <VictoryBar data={this.state.currentGraph} x="day" y="calories" />
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
