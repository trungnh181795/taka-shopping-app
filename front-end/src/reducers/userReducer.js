import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET
} from "../constants/userConstants";

export const userUpdateProfileReducer = (state = { }, action) => {
  switch(action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
        responded: false
      }

    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        responded: true
      }

    case USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
        responded: true
      }

    case USER_UPDATE_PROFILE_RESET:
      return {
        loading: false,
        user: {},
        responded: true
      }

    default:
      return state
  }
}

export const userLoginReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload.userInfo,
        userTokens: action.payload.userTokens,
        deviceId: action.payload.deviceId,
      };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true }
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload }
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload }
      case USER_LOGOUT:
        return {}
      default:
        return state
    }
  }
