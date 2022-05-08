import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CrossIcon from '../assets/svg/cross.svg';
import CheckIcon from '../assets/svg/Check.svg';
import ErrorIcon from '../assets/svg/Error.svg';
import Toast from 'react-native-toast-message';

export const toastConfig = {
  successToast: (setting) => {
    const { message } = setting.props;
    return <ToastBody message={message} bgColor={'rgba(60,130,60,0.3)'} iconColor={'#3a3'} icon={() => <CheckIcon width={30} height={30}/>}/>;
  },
  errorToast: (setting) => {
    const { message } = setting.props;
    return <ToastBody message={message} bgColor={'rgba(200,80,80,0.3)'} iconColor="#f33"
    icon={() => <ErrorIcon width={30} height={30}/>}/>;
  },
};

const ToastBody = ({ message, bgColor, icon, iconColor }) => {
  return (
    <View style={[styles.toastContainer, {backgroundColor: bgColor, borderColor: iconColor}]}>
      <View style={[styles.iconStyle, {backgroundColor: iconColor}]}>
        {icon()}
      </View>
      <Text style={styles.textStyle}>{message}</Text>
      <TouchableOpacity onPress={() => Toast.hide()} style={styles.crossStyle}>
         <CrossIcon width={25} height={25}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
  },
  iconStyle: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    marginHorizontal: 6,
    padding: 8,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 12,
  },
  crossStyle: {
    marginLeft: 6,
  },
});
