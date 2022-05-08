import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import Switcher from '../Components/Switcher';
import AuthScreen from './AuthScreen';
import DashboardScreen from './DashboardScreen';
import PreviewScreen from './PreviewScreen';

const Navigator = () => {
  const token = useSelector(state => state.user.token);
  const [screen, navigateToScreen] = useState({index: 0});

  return token ? <Switcher screenIndex={screen.index}>
                  <Switcher.FirstScreen>
                    <DashboardScreen navigateToScreen={navigateToScreen}/>
                  </Switcher.FirstScreen>
                  <Switcher.SecondScreen>
                    <PreviewScreen navigateToScreen={navigateToScreen} item={screen.props?.item}/>
                  </Switcher.SecondScreen>
                 </Switcher>
               : <AuthScreen />;
};

export default Navigator;
