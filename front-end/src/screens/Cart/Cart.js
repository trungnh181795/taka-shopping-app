import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { cartClearItems } from '../../actions/cartActions';
import CartItem from '../../components/CartItem';

import './Cart.scss';

const Cart = () => {    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cartItems);

    const handleOnClick = () => {
        dispatch(cartClearItems());
    }

    return (
        <div className="cart">
            <div className="cart-tile">Your cart:</div>
            <Row>
                <Col>Name</Col>
                <Col>Unit Price</Col>
                <Col>Quantity</Col>
                <Col>Total Price</Col>
                <Col>Action</Col>
            </Row>
            {cartItems.map(item => <CartItem item={item} />)}
            <Row>
                <Col className="d-flex">
                    <button
                        className="btn btn-primary me-2"
                        type="button"
                        onClick={() => navigate('/')} 
                    >
                        Continue shopping
                    </button>
                    <button
                        className="btn btn-danger me-2"
                        type="button"
                        onClick={handleOnClick} 
                    >
                        Clear items
                    </button>
                </Col>
                <Col>
                    <div className="cart-total">
                        Total: {cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)} $
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Cart;