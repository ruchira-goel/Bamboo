import React from 'react';
import NotifService from './NotifService';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BUTTONS from './styles/buttons';
import URL from './url';

export default class NotifSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      dailyInput: '',
      goalStreak: '',
      buttonValue: 'Edit',
      editable: false,
    };
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  componentDidMount(): void {
    const {route} = this.props;
    const {userId} = route.params;
    this.setState({userId: userId});
    fetch(
      Platform.OS === 'android'
        ? `${URL.android}/User/getUser?userId=${userId}`
        : `${URL.ios}/User/getUser?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          dailyInput: data.dailyInputReminder,
          goalStreak: data.goalStreakNotif,
        });
      });
  }

  onRegister(token) {
    Alert.alert('Registered !', JSON.stringify(token));
    console.log(token);
    this.setState({registerToken: token.token, gcmRegistered: true});
  }

  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }

  toggleDailyInputSwitch = value => {
    this.setState({dailyInput: value});
  };

  toggleGoalStreakSwitch = value => {
    this.setState({goalStreak: value});
  };

  onPress = () => {
    if (this.state.buttonValue === 'Edit') {
      this.setState({
        buttonValue: 'Save',
        editable: true,
      });
    } else {
      this.onSave();
      this.setState({
        buttonValue: 'Edit',
        editable: false,
      });
    }
  };

  onSave = () => {
    fetch(
      Platform.OS === 'android'
        ? `${URL.android}/User/addNotifSettings?userId=${
            this.state.userId
          }&dailyInput=${this.state.dailyInput}&goalStreak=${
            this.state.goalStreak
          }`
        : `${URL.ios}/User/addNotifSettings?userId=${
            this.state.userId
          }&dailyInput=${this.state.dailyInput}&goalStreak=${
            this.state.goalStreak
          }`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          //throwing error when getUser fails (invalid userId)
          if (data.message === 'There was an error locating your account') {
            Alert.alert(
              'Error',
              'There was an error locating your account, please try changing settings another time',
              [{text: 'OK'}],
            );
          }
        } else {
          this.notif.scheduleNotifications(this.state.userId);
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={[styles.text, {padding: 2}]}>
            Reminder to enter daily inputs
          </Text>
          <Switch
            style={styles.switch}
            onValueChange={this.toggleDailyInputSwitch}
            disabled={!this.state.editable}
            value={this.state.dailyInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.text, {padding: 2}]}>
            Goal Streaks
          </Text>
          <Switch
            style={styles.switch}
            onValueChange={this.toggleGoalStreakSwitch}
            disabled={!this.state.editable}
            value={this.state.goalStreak}
          />
        </View>
        <TouchableOpacity style={BUTTONS.primaryButton} onPress={this.onPress}>
          <Text style={BUTTONS.primaryButtonText}>
            {this.state.buttonValue}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  textEdit: {
    borderBottomWidth: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    // alignSelf: 'center',
    paddingTop: 35,
    paddingLeft: '20%',
  },
  text: {
    fontSize: 20,
    width: 200,
  },
  switch: {
    textAlign: 'center',
    justifyContent: 'center',
  },
});
