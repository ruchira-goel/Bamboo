import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import COLORS from './styles/colors';

const DatePicker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={showDatePicker}>
        <Text style={styles.text}>Select Date</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000',
    backgroundColor: COLORS.primaryColor,
    padding: 2,
  },
  text: {
    // color: '#FFFFFF',
    fontSize: 16,
    // textAlign: 'center',
  },
});
