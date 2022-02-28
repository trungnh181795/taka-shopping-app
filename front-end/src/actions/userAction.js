import axios from "axios";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_RESET,
  ORDER_LIST_MY_RESET,
  USER_LIST_RESET,
} from "../constants/userConstants";

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

      console.log("name", username);
      console.log("mail", email);
      console.log("pass", password);
      const { data } = await axios.post(
        "https://ec-jsmock.xyz/v1/auth/register",
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

      const { data } = await axios.post(
        "https://ec-jsmock.xyz/v1/auth/login",
        { email, password, deviceId },
        config
      );
      const userTokens = data.data.tokens;
      const userInfo = data.data.user;
      localStorage.setItem("userToken", JSON.stringify(userTokens));
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          userInfo,
          userTokens
        },
      });
      
    } catch (error) {
      console.log("err", error)
      const errBool = Boolean(error.response && error.response.data.message);
      console.log("errRes", errBool)
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_LIST_RESET })
    document.location.href = '/signin'
  }
