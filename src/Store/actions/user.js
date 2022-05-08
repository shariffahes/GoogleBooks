export const USER_ACTIONS = {
  Authenticate: 'authenticate-user',
  LOG_OUT: 'log-out',
};

export const authenticate = (userInfo) => {
  return dispatch => {
    dispatch({ type: USER_ACTIONS.Authenticate, userInfo: {
                                                  name: userInfo.user.givenName,
                                                  familyName: userInfo.user.familyName,
                                                  token: userInfo.idToken,
                                                  photo: userInfo.user.photo}});
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({type: USER_ACTIONS.LOG_OUT});
  };
};
