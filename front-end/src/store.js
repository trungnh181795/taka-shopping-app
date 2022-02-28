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
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducer";

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

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  cartItems: cartReducer
});


const initialState = {
  cartItems: cartItemsFromStorage,
  userLogin: {
      userInfo: userInfoFromStorage,
      userTokens: userTokensFromStorage
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
