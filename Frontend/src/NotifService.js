import PushNotification from 'react-native-push-notification';
import {Alert, Platform} from 'react-native';
import URL from './url';


import * as Constants from './Constants';

export default class NotifService {
  constructor(onRegister, onNotification) {
    this.configure(onRegister, onNotification);
    this.lastId = 0;
  }

  configure(onRegister, onNotification, gcm = '') {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: onRegister, //this._onRegister.bind(this),

      // (required) Called when a remote or local notification is opened or received
      onNotification: onNotification, //this._onNotification,

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: gcm,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  }

  localNotif() {
    this.lastId++;
    PushNotification.localNotification({
      /* Android Only Properties */
      id: '' + this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      ticker: 'My Notification Ticker', // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
      subText: 'This is a subText', // (optional) default: none
      color: 'red', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: 'group', // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification

      /* iOS only properties */
      alertAction: 'view', // (optional) default: view
      category: '', // (optional) default: empty string
      userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)

      /* iOS and Android properties */
      title: 'Local Notification', // (optional)
      message: 'My Notification Message', // (required)
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
    });
  }

  scheduleNotifications(userId) {
    this.cancelAll();
    fetch(
      Platform.OS === 'android'
        ? `${URL.android}/User/getUser?userId=${userId}`
        : `${URL.ios}/User/getUser?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          Alert.alert(
            'Could not find account',
            'There was an error locating your account, notifications could not be scheduled,',
            [{text: 'OK'}],
          );
        } else {
          if (data.dailyInputReminder) {
            this.scheduleDailyInputReminder();
          }
          if (data.goalStreakNotif) {
            //check if the user actually has any goals:
            fetch(
              Platform.OS === 'android'
                ? `${URL.android}/User/hasGoals?userId=${userId}`
                : `${URL.ios}/User/hasGoals?userId=${userId}`,
            )
              .then(res => res.json())
              .then(hasGoals => {
                if (hasGoals.toString() === 'true') {
                  console.log('it will actually schedule');
                  this.scheduleGoalStreakNotification(userId);
                } else {
                  console.log('it thinks user has no goals');
                }
              });
          }
        }
      });
  }



  scheduleGoalStreakNotification(userId) {
    let time = new Date();
    if (time.getHours() >= 9) {
      time.setDate(time.getDate() + 1);
      time.setHours(9, 0, 0, 0);
    } else {
      time.setHours(9, 0, 0, 0);
    }
    let message = '';
    fetch(
      Platform.OS === 'android'
        ? `${URL.android}/User/getGoalStreakNotificationMessage?userId=${userId}`
        : `${URL.ios}/User/getGoalStreakNotificationMessage?userId=${userId}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          return 'There was an error loading your goal streak, check back again tomorrow!';
        } else {
          message = data.message;
          this.lastId++;
          PushNotification.localNotificationSchedule({
            date: new Date(time),

            /* Android Only Properties */
            id: '' + this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
            //color: 'blue', // (optional) default: system default
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            ongoing: false, // (optional) set whether this is an "ongoing" notification

            /* iOS and Android properties */
            title: 'Goal Streak', // (optional)
            message: message, // (required)
            repeatType: 'day',
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
          });
        }
      });
  }

  scheduleDailyInputReminder() {
    let time = new Date();
    if (time.getHours() >= 20) {
      time.setDate(time.getDate() + 1);
      time.setHours(20, 0, 0, 0);
    } else {
      time.setHours(20, 0, 0, 0);
    }
    this.scheduleNotif(
      time.toString(),
      'Daily Input',
      "Don't forget to enter your daily food and exercise!",
      'day',
    );
  }

  scheduleNotif(time, title, message, repeatType) {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(time),

      /* Android Only Properties */
      id: '' + this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      //color: 'blue', // (optional) default: system default
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      ongoing: false, // (optional) set whether this is an "ongoing" notification

      /* iOS only properties */
      alertAction: 'view', // (optional) default: view
      category: '', // (optional) default: empty string
      userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)

      /* iOS and Android properties */
      title: title, // (optional)
      message: message, // (required)
      repeatType: repeatType,
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: '' + this.lastId});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}