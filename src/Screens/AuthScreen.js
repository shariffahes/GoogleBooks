import React, { useMemo, useCallback, useReducer } from 'react';
import { View, StyleSheet, useWindowDimensions, ScrollView, Text } from 'react-native';
import UIButton from '../Components/UIButton';
import { useDispatch } from 'react-redux';
import { authenticate } from '../Store/actions/user';
import Toast from 'react-native-toast-message';
import LandingView from '../../assets/svg/LandingView.svg';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, PRIMARY_COLOR, WEB_CLIENT_ID } from '../Constants';

const ACTIONS = {
  SET_ERROR: 'set-error',
  SET_LOADING: 'set-laoding',
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.message };
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.value };
    default: throw new Error('No such action');
  }
};

const AuthScreen = () => {
  const { height, width } = useWindowDimensions();
  const [state, triggerAction] = useReducer(reducer, {
    error: null,
    isLoading: false,
  });
  const { isLoading } = state;
  const dispatch = useDispatch();

  const dynamicStyles = useMemo(() => StyleSheet.create({
    headerContainer: {
      width: width,
    },
  }), [width]);

  //Will handle the press on sign in with google
  const _onSignInHandler = useCallback(() => {
    //first set the loading to true.
    triggerAction({type: ACTIONS.SET_LOADING, value: true});

    //if everything went okay, set loading to false and populate the state with user info
    const _onSuccesHandler = (userInfo) => {
      triggerAction({ type: ACTIONS.SET_LOADING, value: false });
      dispatch(authenticate(userInfo));
    };

    //if something went wrong displaya toast that explains the error
    const _onFailHandler = (err) => {
      triggerAction({ type: ACTIONS.SET_LOADING, value: false });
      triggerAction({ type: ACTIONS.SET_ERROR, error: err });
      Toast.show({
        type: 'errorToast',
        visibilityTime: 3000,
        bottomOffset: 20,
        position: 'bottom',
        props: {
          message: err,
        },
      });
    };

    const _attemptGoogleSignIn = () => {
      GoogleSignin.signIn().then(_onSuccesHandler).catch(_onFailHandler);
    };

    //Those were ectracted from the google console.
    //web client id is required to get the token
    GoogleSignin.configure({
      androidClientId: ANDROID_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      webClientId: WEB_CLIENT_ID,
    });
    GoogleSignin.hasPlayServices().then(
      (playServiceAvailable) => {
        if (playServiceAvailable) {
          _attemptGoogleSignIn();
        }
      }
    );
  }, [dispatch, triggerAction]);

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.headerContainer, dynamicStyles.headerContainer]}>
        <LandingView width={width * 0.8} height={height * 0.5} />
      </View>
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        <View style={styles.bodyHeader}>
          <Text style={styles.titleFontStyle}>Welcome to <Text style={{color: PRIMARY_COLOR}}>Google</Text> Books</Text>
          <Text style={styles.bodyFontStyle}>We currently have over 10 millions books! Waiting for you to read or download in just 1 click. {'\n'}</Text>
        </View>
        <View>
          <UIButton
            title="Sign in with Google"
            isLoading={isLoading}
            onPressHandler={_onSignInHandler} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    position: 'relative',
  },
  body: {
    height: '55%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  bodyContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyHeader: {
    margin: 8,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  titleFontStyle: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  headerContainer: {
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyFontStyle: {
    fontSize: 17,
    lineHeight: 30,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 25,
  },
});
export default AuthScreen;
