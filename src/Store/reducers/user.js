import {USER_ACTIONS} from '../actions/user';

const initialState = {
  name: null,
  familyName: null,
  token: null,
  photo: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.Authenticate:
      return {...action.userInfo};
    case USER_ACTIONS.LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
