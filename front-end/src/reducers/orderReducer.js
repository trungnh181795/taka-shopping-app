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

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        items: action.payload.items,
        orderInfo: action.payload.order
      }

    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }

    case ORDER_CREATE_RESET:
      return { }

    default:
      return state
  }
}

export const orderListMyReducer = (state = { orders: []}, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders.result,
        totalOrders: action.payload.orders.total,
        currentPage: action.payload.orders.currentPage,
        totalPage: action.payload.orders.totalPage
      }
    case ORDER_LIST_MY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case ORDER_LIST_MY_RESET:
      return { }

    default:
      return state
  }
}
