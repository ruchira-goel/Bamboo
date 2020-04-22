import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import URL from './url';

export default class ExercisePreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      hoursPerDay: 0,
      su: false,
      m: false,
      t: false,
      w: false,
      th: false,
      f: false,
      sa: false,
      bicycling: false,
      conditioning: false,
      running: false,
      sports: false,
      water: false,
      winter: false,
      categories: [
        {
          name: 'Bicycling',
          check: false,
          index: 0,
        },
        {
          name: 'Conditioning Exercise',
          check: false,
          index: 1,
        },
        {
          name: 'Running',
          check: false,
          index: 2,
        },
        {
          name: 'Sports',
          check: false,
          index: 3,
        },
        {
          name: 'Water Activities',
          check: false,
          index: 4,
        },
        {
          name: 'Winter Activities',
          check: false,
          index: 5,
        },
      ],
    };
  }

  isAmountInvalid(str) {
    return /[-,_.]/g.test(str);
  }

  submit = () => {
    const {hoursPerDay} = this.state;
    const {
      su,
      m,
      t,
      w,
      th,
      f,
      sa,
      bicycling,
      conditioning,
      running,
      sports,
      water,
      winter,
    } = this.state;
    const {route} = this.props;
    const {userId} = route.params;
    if (!su && !m && !t && !w && !th && !f && !sa) {
      Alert.alert('No days selected', 'Please select one or more days.', [
        {text: 'OK'},
      ]);
      return;
    }
    if (hoursPerDay === 0) {
      Alert.alert(
        'No hours of exercise inputted',
        'Please enter a number of hours.',
        [{text: 'OK'}],
      );
      return;
    }
    if (
      hoursPerDay <= 0 ||
      hoursPerDay >= 24 ||
      this.isAmountInvalid(hoursPerDay)
    ) {
      Alert.alert(
        'Invalid hours of exercise',
        'Please enter a valid integer.',
        [{text: 'OK'}],
      );
      return;
    }
    if (
      !bicycling &&
      !conditioning &&
      !running &&
      !sports &&
      !water &&
      !winter
    ) {
      Alert.alert(
        'No categories selected',
        'Please select one or more exercise categories.',
        [{text: 'OK'}],
      );
      return;
    }

    let days = su + ' ' + m + ' ' + t + ' ' + w + ' ' + th + ' ' + f + ' ' + sa;
    let categories =
      bicycling +
      ' ' +
      conditioning +
      ' ' +
      running +
      ' ' +
      sports +
      ' ' +
      water +
      ' ' +
      winter;

    fetch(
      Platform.OS === 'android'
        ? `${
            URL.android
          }/User/generateExerciseRoutine?userId=${userId}&days=${days}&hours=${hoursPerDay}&categories=${categories}`
        : `http://localhost:8080/User/generateExerciseRoutine?userId=${userId}&days=${days}&hours=${hoursPerDay}&categories=${categories}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert(
            data.message,
            'Unable to save exercise preferences at this time, please try again later.',
            [{text: 'OK'}],
          );
        } else {
          Alert.alert(
            'Exercise routine generated',
            'Access your new exercise routine from the home screen.',
            [{text: 'OK'}],
          );
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{paddingHorizontal: '0%'}}>
          <View style={styles.section}>
            <Text style={styles.title}>
              Which days of the week do you want to exercise?
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={value => {
                  this.setState({su: !this.state.su});
                }}>
                <View
                  style={[
                    styles.buttonCircle,
                    {backgroundColor: this.state.su ? 'orange' : 'silver'},
                  ]}>
                  <Text style={styles.buttonText}>Su</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={value => {
                  this.setState({m: !this.state.m});
                }}>
                <View
                  style={[
                    styles.buttonCircle,
                    {backgroundColor: this.state.m ? 'orange' : 'silver'},
                  ]}>
                  <Text style={styles.buttonText}>M</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={value => {
                  this.setState({t: !this.state.t});
                }}>
                <View
                  style={[
                    styles.buttonCircle,
                    {backgroundColor: this.state.t ? 'orange' : 'silver'},
                  ]}>
                  <Text style={styles.buttonText}>T</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={value => {
                  this.setState({w: !this.state.w});
                }}>
                <View
                  style={[
                    styles.buttonCircle,
                    {backgroundColor: this.state.w ? 'orange' : 'silver'},
                  ]}>
                  <Text style={styles.buttonText}>W</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={value => {
                  this.setState({th: !this.state.th});
                }}>
                <View
                  style={[
                    styles.buttonCircle,
                    {backgroundColor: this.state.th ? 'orange' : 'silver'},
                  ]}>
                  <Text style={styles.buttonText}>Th</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={value => {
                  this.setState({f: !this.state.f});
                }}>
                <View
                  style={[
                    styles.buttonCircle,
                    {backgroundColor: this.state.f ? 'orange' : 'silver'},
                  ]}>
                  <Text style={styles.buttonText}>F</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={value => {
                  this.setState({sa: !this.state.sa});
                }}>
                <View
                  style={[
                    styles.buttonCircle,
                    {backgroundColor: this.state.sa ? 'orange' : 'silver'},
                  ]}>
                  <Text style={styles.buttonText}>Sa</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>
              How many hours a day do you generally exercise in one stretch?
            </Text>
            <View>
              <TextInput
                style={styles.fieldText}
                // autoCapitalize="none"
                keyboardType={'numeric'}
                placeholder="Hours of exercise"
                // defaultValue={this.state.hoursPerDay.toString()}
                onChangeText={hoursPerDay => this.setState({hoursPerDay})}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>
              Which categories of exercises do you want to do?
            </Text>
            <TouchableOpacity
              onPress={value => {
                this.setState({bicycling: !this.state.bicycling});
              }}>
              <View
                style={[
                  styles.categoryList,
                  {
                    backgroundColor: this.state.bicycling ? 'orange' : 'silver',
                  },
                ]}>
                <Text style={styles.categoryText}>
                  {this.state.categories[0].name}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={value => {
                this.setState({conditioning: !this.state.conditioning});
              }}>
              <View
                style={[
                  styles.categoryList,
                  {
                    backgroundColor: this.state.conditioning
                      ? 'orange'
                      : 'silver',
                  },
                ]}>
                <Text style={styles.categoryText}>
                  {this.state.categories[1].name}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={value => {
                this.setState({running: !this.state.running});
              }}>
              <View
                style={[
                  styles.categoryList,
                  {
                    backgroundColor: this.state.running ? 'orange' : 'silver',
                  },
                ]}>
                <Text style={styles.categoryText}>
                  {this.state.categories[2].name}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={value => {
                this.setState({sports: !this.state.sports});
              }}>
              <View
                style={[
                  styles.categoryList,
                  {
                    backgroundColor: this.state.sports ? 'orange' : 'silver',
                  },
                ]}>
                <Text style={styles.categoryText}>
                  {this.state.categories[3].name}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={value => {
                this.setState({water: !this.state.water});
              }}>
              <View
                style={[
                  styles.categoryList,
                  {
                    backgroundColor: this.state.water ? 'orange' : 'silver',
                  },
                ]}>
                <Text style={styles.categoryText}>
                  {this.state.categories[4].name}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={value => {
                this.setState({winter: !this.state.winter});
              }}>
              <View
                style={[
                  styles.categoryList,
                  {
                    backgroundColor: this.state.winter ? 'orange' : 'silver',
                  },
                ]}>
                <Text style={styles.categoryText}>
                  {this.state.categories[5].name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={this.submit} style={styles.button}>
            <Text>Get exercise routine</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  section: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    margin: 12,
    fontSize: 18,
    textAlign: 'center',
    textDecorationColor: 'gray',
  },
  fieldText: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '25%',
    marginRight: '25%',
    borderBottomWidth: 0.5,
  },
  buttonCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'silver',
    borderColor: '#000',
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 2,
    margin: 4,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16 - 2 * 2,
    lineHeight: 16 - (Platform.OS === 'ios' ? 2 * 2 : 2),
  },
  button: {
    backgroundColor: '#81c784',
    borderRadius: 60,
    borderColor: '#81c784',
    padding: 12,
    margin: 10,
    alignItems: 'center',
  },
  categoryList: {
    width: Dimensions.get('window').width - 80,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 40,
    borderColor: '#000',
    borderWidth: 2,
  },
  categoryText: {
    fontSize: 16,
  },
});
