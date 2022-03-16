import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { cartClearItems } from "../../actions/cartActions";
import CartItem from "../../components/CartItem";
import Message from "../../components/Message";

import "./Cart.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartItems);

  const handleOnClick = () => {
    dispatch(cartClearItems());
  };

  useEffect(() => {
    document.title = "Shopping Cart";
    return () => {
      document.title = "Taka - Mua hàng online";
    };
  }, []);

  return (
    <div className="cart">
      <Row className="taka-white-frame px-3 py-3 my-2">
        <Col md lg={1}></Col>
        <Col className="taka-text-sm-bold text-start" md lg={3}>
          Name
        </Col>
        <Col className="taka-text-sm-bold text-center" md lg={2}>
          Unit Price
        </Col>
        <Col className="taka-text-sm-bold text-center" md lg={2}>
          Quantity
        </Col>
        <Col className="taka-text-sm-bold text-center" md lg={2}>
          Total Price
        </Col>
        <Col className="taka-text-sm-bold text-center" md lg={2}>
          Action
        </Col>
      </Row>
      {cartItems.length > 0 ? cartItems.map((item) => (
        <CartItem item={item} />
      )) : (
        <Row className="taka-white-frame px-3 py-3 text-center">
            <p>You have no item in your cart!</p>
        </Row>
      )}
      <Row className="taka-white-frame px-3 py-3 my-2 d-flex align-items-center">
        <Col md lg={1} className="d-flex justify-content-center">
          <Button
            className="me-2"
            type="button"
            variant="danger"
            onClick={handleOnClick}
          >
            Clear
          </Button>
        </Col>
        <Col md lg={3} className="d-flex">
          <Button
            className="me-2"
            variant="primary"
            type="button"
            onClick={() => navigate("/")}
          >
            Continue shopping
          </Button>
        </Col>
        <Col md lg={2}></Col>
        <Col md lg={2} className="taka-text-sm-bold text-end">
          Total:
        </Col>
        <Col md lg={2} className="taka-text-sm-bold d-flex justify-content-end">
          <span className="mx-3">
            {cartItems.reduce(
              (total, item) => total + item.product.price * item.quantity,
              0
            )}
          </span>
          <span className="mx-3">$</span>
        </Col>
        <Col
          md
          lg={2}
          className="d-flex taka-text-sm-normal justify-content-center"
        >
          <button
            className="cart-buy-btn"
            type="button"
            onClick={() => navigate("/order")}
          >
            Buy now
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
