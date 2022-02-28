import {
    CART_ADD_ITEM,
    CART_EDIT_ITEAM_QUANTITY,
    CART_DELETE_ITEM,
    CART_CLEAR_ITEMS
} from '../constants/cartConstants';

export const cartAddItem = (product, quantity) => async (
    dispatch,
    getState
) => {

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: product,
            quantity: quantity
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cartItems));
}

export const cartEditIteamQuantity = (product, quantity) => async (
    dispatch,
    getState
) => {
    dispatch({
        type: CART_EDIT_ITEAM_QUANTITY,
        payload: {
            product: product,
            quantity: quantity
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cartItems));
}

export const cartDeleteItem = item => async (
    dispatch,
    getState
) => {
    dispatch({
        type: CART_DELETE_ITEM,
        payload: item
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cartItems));
}

export const cartClearItems = () => async (
    dispatch,
    getState
) => {
    dispatch({
        type: CART_CLEAR_ITEMS
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cartItems));
}