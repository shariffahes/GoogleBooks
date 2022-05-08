import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import userReducer from './src/Store/reducers/user';
import booksReducer from './src/Store/reducers/books';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Toast from 'react-native-toast-message';
import Navigator from './src/Screens/Navigator';
import {toastConfig} from './src/toastConfig';

const rootReducers = combineReducers({
  user: userReducer,
  booksProvider: booksReducer,
});
const store = createStore(rootReducers, applyMiddleware(ReduxThunk));
const App = () => {

  return (
    <SafeAreaView>
      <StatusBar />
      <Provider store={store}>
        <Navigator />
        <Toast config={toastConfig}/>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
