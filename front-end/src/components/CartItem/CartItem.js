import { Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { cartDeleteItem } from '../../actions/cartActions';

import QuantityInput from '../QuantityInput';

import { cartEditIteamQuantity } from '../../actions/cartActions';

import './CartItem.scss';

const CartItem = ({ item }) => {

    const { product, quantity } = item;
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(cartDeleteItem(item));
    }

    const handleInputChange = (inputValue) => {
        dispatch(cartEditIteamQuantity(product, inputValue));
    }

    return (
        <Row className="cart-item my-2">
            <Col>{product.name}</Col>
            <Col>{product.price}</Col>
            <Col>
                <QuantityInput defaultValue={quantity} onInputChange={handleInputChange} />
            </Col>
            <Col>{product.price * quantity}</Col>
            <Col>
                <button 
                    className="btn btn-danger" 
                    type="button"
                    onClick={handleOnClick}
                >
                    Delete
                </button>
            </Col>
        </Row>
    )
}

export default CartItem;