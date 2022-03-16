import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";

import { instance } from '../utilities/axiosInstance';

export const userUpdateProfile =
  (user, typeOfInfo) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      });

      const {
        userLogin: { userTokens },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userTokens.access.token}`,
        },
      };

      const { data } = await instance.patch(
        `/users/change-${typeOfInfo}`,
        user,
        config
      );

      console.log('data', data)

      const userInfo = data.data;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          userInfo: userInfo,
          userTokens: userTokens,
        },
      });

      localStorage.setItem("userInfo", JSON.stringify(data.data));
    } catch (error) {
      console.dir(error)
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
      });
      //

    }
  };

export const userDetails = () => async (dispatch, getState) => {};

export const register =
  ({ username, email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await instance.post(
        "/auth/register",
        { username, email, password },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const login =
  ({ email, password, deviceId }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await instance.post(
        "/auth/login",
        { email, password, deviceId },
        config
      );

      const userTokens = data.data.tokens;
      const userInfo = data.data.user;

      localStorage.setItem("userTokens", JSON.stringify(userTokens));
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("deviceId", JSON.stringify(deviceId));

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          userInfo,
          userTokens,
          deviceId
        },
      });
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => async (dispatch, getState) => {
  try {
    const { userTokens, deviceId } = getState().userLogin;
    const refreshToken = userTokens?.refresh?.token;

    localStorage.clear();

    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
    dispatch({ type: USER_LIST_RESET });
    document.location.href = "/signin";

    await instance.post(
      "/auth/logout",
      {
        refreshToken: refreshToken,
        deviceId: deviceId
      }
    )

  }
  catch (error) {
    console.log(error)
  }
};
