import {
    CART_ADD_ITEM,
    CART_EDIT_ITEAM_QUANTITY,
    CART_DELETE_ITEM,
    CART_CLEAR_ITEMS
} from '../constants/cartConstants';

export const cartReducer = (state = [], action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const incomingItem = action.payload;
            const existedItem = state.find(item => item.product === incomingItem.product);

            if(existedItem) {
                return state.map(item => item.product === existedItem.product ? {
                    product: existedItem.product,
                    quantity: existedItem.quantity += incomingItem.quantity
                } : item)
            }
            else return [...state, incomingItem];

        case CART_EDIT_ITEAM_QUANTITY:
            return state.map(item => item.product === action.payload.product ? {
                ...item,
                quantity: action.payload.quantity
            } : item)

        case CART_DELETE_ITEM:                       
            return state.filter(item => item !== action.payload)

        case CART_CLEAR_ITEMS:
            return []

        default:
            return state
    }
}