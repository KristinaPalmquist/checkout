import { SET_AUTHENTICATION, SET_USERNAME } from "../storeconstants";

export default {
    [SET_AUTHENTICATION](state, authenticated) {
        state.isAuthenticated = authenticated;
    },
    [SET_USERNAME](state, username) {
        state.username = username;
    }
    };