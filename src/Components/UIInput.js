import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const UIInput = ({placeholder, icon, onChangeInputHandler, onSubmit, style, ...rest}) => {
  return (
    <View style={styles.conatiner}>
      {icon && <View style={styles.iconStyle}>{icon()}</View>}
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeInputHandler}
        style={[styles.inputStyle, style]}
        {...rest} onSubmitEditing={onSubmit}/>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  iconStyle: {
    position: 'absolute',
    left: 5,
    zIndex: 100,
    elevation: 100,
  },
  inputStyle: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingLeft: 35,
  },
});
export default UIInput;
