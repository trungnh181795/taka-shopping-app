import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET
} from '../constants/orderConstants';

import { instance } from '../utilities/axiosInstance';

export const createOrder = orderInfo => async (dispatch, getState) => {
  try {
    console.log(orderInfo)

    dispatch({
      type: ORDER_CREATE_REQUEST
    })

    const { userTokens } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userTokens.access.token}`,
      },
    };

    const { data } = await instance.post("/orders", orderInfo, config);

    console.log('data', data.data)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.data
    })

    dispatch({
      type: ORDER_CREATE_RESET
    })
  }
  catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.reponse.data.message
      ? error.reponse.data.message
      : error.message,
    })
  }
}

export const listMyOrder = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST
    })

    const { userTokens } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userTokens.access.token}`,
      },
    };

    const { data } = await instance.get("/orders/my-orders", config);

    console.log('data', data)

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data.data
    })
  }
  catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: error.response && error.reponse.data.message
      ? error.reponse.data.message
      : error.message,
    })
  }
}
