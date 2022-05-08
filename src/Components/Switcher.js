import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

// Switcher is going to be used as a screen navigator
// You pass 2 screens as children of switcher. Then you change the screen index to switch between the views;

const Switcher = ({children, screenIndex}) => {
  //determine which screen to render
  const isFirstScreen = useMemo(() => screenIndex === 0 ? true : false, [screenIndex]);
  return (
    <View>
      {React.Children.map(children, child => React.cloneElement(child, { isFirstScreen })) }
    </View>
  );
};
//I am hiding screens based on index. A different approach would be using conditional statement.
// isFirstScreen ? children[0] : children[1]
// however this way, we are going to scroll to the beginning of the scroll view again
const FirstScreen = ({children, isFirstScreen}) => {
  return (
    <View style={[ !isFirstScreen && styles.hiddenStyle]}>
      {children}
    </View>
  );
};
const SecondScreen = ({ children, isFirstScreen }) => {
  return (
    <View style={[ isFirstScreen && styles.hiddenStyle]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  hiddenStyle: {
    opacity: 0,
    height: 0,
  },
});

Switcher.FirstScreen = FirstScreen;
Switcher.SecondScreen = SecondScreen;
export default Switcher;
