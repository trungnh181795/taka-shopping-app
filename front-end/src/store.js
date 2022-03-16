import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productDetailReducer,
  productCreateReducer,
  productDeleteReducer,
} from "./reducers/productReducer";

import { cartReducer } from './reducers/cartReducer';
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer
} from "./reducers/userReducer";

import {
  orderCreateReducer,
  orderListMyReducer
} from './reducers/orderReducer';

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

  console.log('storage', cartItemsFromStorage)

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const userTokensFromStorage = localStorage.getItem("userTokens")
  ? JSON.parse(localStorage.getItem("userTokens"))
  : {};

const deviceIdFromStorage = localStorage.getItem("deviceId")
  ? JSON.parse(localStorage.getItem("deviceId"))
  : "";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  cartItems: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfileUpdate: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderListMy: orderListMyReducer
});


const initialState = {
  cartItems: cartItemsFromStorage,
  userLogin: {
      userInfo: userInfoFromStorage,
      userTokens: userTokensFromStorage,
      deviceId: deviceIdFromStorage
  }
};

console.log('initialState', initialState)

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);



export default store;
