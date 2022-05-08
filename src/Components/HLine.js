import React from 'react';
import { View, StyleSheet } from 'react-native';

const HLine = () => {
  return <View style={styles.lineStyle}/>;
};

const styles = StyleSheet.create({
  lineStyle: {
    height: '100%',
    width: 4,
    backgroundColor: '#bbb',
    position: 'absolute',
    left: -3,
    top: 4,
    zIndex: 100,
  },
});
export default HLine;
