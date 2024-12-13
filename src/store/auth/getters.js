import { IS_USER_AUTHENTICATED, GET_USERNAME } from '../storeconstants';

export default {
  [IS_USER_AUTHENTICATED](state) {
    return state.IS_USER_AUTHENTICATED;
  },
  [GET_USERNAME](state) {
    return state.username;
  },
};
