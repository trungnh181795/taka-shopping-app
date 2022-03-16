import { Row, Col, Image } from 'react-bootstrap';
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
        <Row className="taka-white-frame my-2 py-3 px-3 d-flex align-items-center">
            <Col md lg={1}>
                <Image 
                    src={product.images[0].url}
                    fluid
                />
            </Col>
            <Col className="taka-text-sm-normal" md lg={3}>{product.name}</Col>
            <Col className="taka-text-sm-normal d-flex justify-content-end" md lg={2}>
                <span className="mx-3">{product.price}</span> 
                <span className="mx-3">$</span>
            </Col>
            <Col className="taka-text-sm-normal d-flex justify-content-center" md lg={2}>
                <QuantityInput defaultValue={quantity} onInputChange={handleInputChange} />
            </Col>
            <Col className="taka-text-sm-normal d-flex justify-content-end" md lg={2}>
                <span className="mx-3">{product.price * quantity}</span>
                <span className="mx-3">$</span>
            </Col>
            <Col className="taka-text-sm-normal d-flex justify-content-center" md lg={2}>
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
