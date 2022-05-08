import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { PRIMARY_COLOR } from '../Constants';

const UIButton = props => {
  const {
    onPressHandler,
    title,
    disabled,
    buttonStyle,
    buttonTextStyle,
    color,
    width,
    isLoading,
  } = props;
  const dynamicStyles = StyleSheet.create({
    buttonStyle: {
      width: width ?? '65%',
      backgroundColor: disabled ? '#bbb' : color ?? PRIMARY_COLOR,
    },
  });
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPressHandler}
      style={[ styles.buttonContainer, buttonStyle, dynamicStyles.buttonStyle ]}>
      {isLoading ? <ActivityIndicator size="small" />
                 : <Text style={[styles.textStyle, buttonTextStyle]}>
                    {title}
                   </Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 16,
    borderRadius: 20,
    padding: 16,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '75%',
  },
  textStyle: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 17,
  },
});
export default UIButton;
