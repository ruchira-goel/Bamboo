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

export default class NotifSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      dailyInput: '',
      buttonValue: 'Edit',
      editable: false,
    };
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  UNSAFE_componentWillMount(): void {
    const {route} = this.props;
    const {userId} = route.params;
    this.setState({userId: userId});
    fetch(
      Platform.OS === 'android'
        ? `10.0.2.2:8080/User/getUser?userId=${userId}`
        : `http://localhost:8080/User/getUser?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          dailyInput: data.dailyInputReminder,
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

  toggleSwitch = value => {
    this.setState({dailyInput: value});
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
    if (!this.state.dailyInput) {
      this.notif.cancelAll();
    }
    if (this.state.dailyInput) {
      this.notif.scheduleNotif(
        '30',
        'Daily input',
        "Don't forget to enter your daily food and exercise!",
        'minute',
      );
    }
    fetch(
      Platform.OS === 'android'
        ? `http://10.0.2.2:8080/User/addNotifSettings?userId=${
            this.state.userId
          }&dailyInput=${this.state.dailyInput}`
        : `http://localhost:8080/User/addNotifSettings?userId=${
            this.state.userId
          }&dailyInput=${this.state.dailyInput}`,
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
          //going to home screen
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
            onValueChange={this.toggleSwitch}
            disabled={!this.state.editable}
            value={this.state.dailyInput}
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
