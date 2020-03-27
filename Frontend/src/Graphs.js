import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';

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
import BUTTONS from './styles/buttons';
import COLORS from './styles/colors';

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
      isLoading: true,
      timeGraphData: [],
      caloriesGraphData: [],
      currentGraph: [],
      timeButtonStyle: styles.active,
      caloriesButtonStyle: styles.inactive,
      timeGraph: true,
    };
  }
  componentDidMount(): void {
    const {route} = this.props;
    const {userId} = route.params;
    fetch(
      Platform.OS === 'android'
        ? `${URL.heroku}/User/weekExerciseTime?userId=${userId}`
        : `http://localhost:8080/User/weekExerciseTime?userId=${userId}`,
    )
      .then(res => res.text())
      .then(data =>
        this.setState({
          timeGraphData: [
            {day: 1, minutes: Number(data.split(' ')[0])},
            {day: 2, minutes: Number(data.split(' ')[1])},
            {day: 3, minutes: Number(data.split(' ')[2])},
            {day: 4, minutes: Number(data.split(' ')[3])},
            {day: 5, minutes: Number(data.split(' ')[4])},
            {day: 6, minutes: Number(data.split(' ')[5])},
            {day: 7, minutes: Number(data.split(' ')[6])},
          ],
          currentGraph: [
            {day: 1, minutes: Number(data.split(' ')[0])},
            {day: 2, minutes: Number(data.split(' ')[1])},
            {day: 3, minutes: Number(data.split(' ')[2])},
            {day: 4, minutes: Number(data.split(' ')[3])},
            {day: 5, minutes: Number(data.split(' ')[4])},
            {day: 6, minutes: Number(data.split(' ')[5])},
            {day: 7, minutes: Number(data.split(' ')[6])},
          ],
        }),
      );
    fetch(
      Platform.OS === 'android'
        ? `${URL.heroku}/User/weekExerciseCalories?userId=${userId}`
        : `http://localhost:8080/User/weekExerciseCalories?userId=${userId}`,
    )
      .then(res => res.text())
      .then(data =>
        this.setState({
          isLoading: false,
          caloriesGraphData: [
            {day: 1, minutes: Number(data.split(' ')[0])},
            {day: 2, minutes: Number(data.split(' ')[1])},
            {day: 3, minutes: Number(data.split(' ')[2])},
            {day: 4, minutes: Number(data.split(' ')[3])},
            {day: 5, minutes: Number(data.split(' ')[4])},
            {day: 6, minutes: Number(data.split(' ')[5])},
            {day: 7, minutes: Number(data.split(' ')[6])},
          ],
        }),
      );
  }

  timeGraph = () => {
    if (!this.state.timeGraph) {
      this.setState({
        timeButtonStyle: styles.active,
        caloriesButtonStyle: styles.inactive,
        timeGraph: true,
        currentGraph: this.state.timeGraphData,
      });
    }
  };
  caloriesGraph = () => {
    if (this.state.timeGraph) {
      this.setState({
        timeButtonStyle: styles.inactive,
        caloriesButtonStyle: styles.active,
        timeGraph: false,
        currentGraph: this.state.caloriesGraphData,
      });
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
    // const timeVictoryBar = (
    //   <VictoryBar data={this.state.timeGraphData} x="day" y="minutes" />
    // );
    // const caloriesVictoryBar = (
    //   <VictoryBar data={this.state.caloriesGraphData} x="day" y="minutes" />
    // );
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
            label={this.state.timeGraph ? 'minutes' : 'calories'}
            // scale={{y: 'time'}}
            style={{
              axisLabel: {padding: 40},
            }}
            // tickFormat specifies how ticks should be displayed
            // tickFormat={x => `${x} min`}
          />
          <VictoryBar data={this.state.currentGraph} x="day" y="minutes" />
        </VictoryChart>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={1}
            style={this.state.timeButtonStyle}
            disabled={this.state.timeGraph}
            onPress={this.timeGraph}>
            <Text style={styles.text}>time</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={this.state.caloriesButtonStyle}
            onPress={this.caloriesGraph}>
            <Text style={styles.text}>calories</Text>
          </TouchableOpacity>
        </View>
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
  active: {
    backgroundColor: '#455a64',
    padding: 15,
    margin: 5,
    width: 100,
    borderRadius: 40,
  },
  inactive: {
    backgroundColor: '#b0bec5',
    padding: 15,
    margin: 5,
    width: 100,
    borderRadius: 40,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
