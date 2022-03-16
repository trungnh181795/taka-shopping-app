import { Row, Col, Image, Button, Form, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import Message from "../../components/Message";

import { createOrder } from "../../actions/orderActions";

import './Order.scss';

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cartItems);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error, items } = orderCreate;

  const [isSubmit, setIsSubmit] = useState(false);

  const [order, setOrder] = useState({
    address: '',
    contact: '',
    paymentMethod: '',
    totalPrice: cartItems.reduce((total, item) => total += item.product.price * item.quantity, 0),
    userId: userInfo.id
  })

  const itemArr = cartItems.map(item => ({
    productId: item.product.id,
    quantity: item.quantity,
    price: item.product.price,
    total: item.product.price * item.quantity
  }))

  const validate = (values) => {
    const errors = {};
    if (!values.address) {
      errors.address = "Required";
    }

    if (!values.contact) {
      errors.contact = "Required";
    } else if (values.contact.length < 10) {
      errors.newPassword = "Must be valid phone number";
    }

    if (!values.paymentMethod) {
      errors.paymentMethod = "Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      address: '',
      contact: '',
      paymentMethod: ''
    },
    validate,
    onSubmit: () => {
      setIsSubmit(prev => !prev);
      dispatch(createOrder({ order, itemArr }));
    }
  })

  useEffect(() => {
    if(!loading && items) {
      setTimeout(() => navigate('/user/purchases'), 2000 );
    }
  }, [loading, items])

  useEffect(() => {
    setOrder(prev => ({ ...prev,  ...formik.values  }));
  }, [formik.values])

  useEffect(() => {
    if(!userInfo) navigate('/signin');
  }, [userInfo])

  console.log(order)

  return (
    <Container>
      <Row className="taka-white-frame px-3 py-3 mt-3 mb-2">
        <Col md lg={1} className="taka-text-sm-bold">

        </Col>
        <Col md lg={5} className="taka-text-sm-bold">
          Name
        </Col>
        <Col md lg={2} className="taka-text-sm-bold text-center">
          Unit Price
        </Col>
        <Col md lg={2} className="taka-text-sm-bold text-center">
          Quantity
        </Col>
        <Col md lg={2} className="taka-text-sm-bold text-center">
          Total
        </Col>
      </Row>

      {cartItems.map((item, index) => (
        <Row key={index} className="taka-white-frame px-3 py-3 my-2 d-flex align-items-center">
          <Col md lg={1}>
            <Image
              src={item.product.images[0].url}
              fluid
            />
          </Col>
          <Col md lg={5} className="taka-text-sm-normal text-start">
            {item.product.name}
          </Col>
          <Col md lg={2} className="taka-text-sm-normal d-flex justify-content-end">
                <span className="mx-3">{item.product.price}</span>
                <span className="mx-3">$</span>
          </Col>
          <Col md lg={2} className="taka-text-sm-normal text-center">
            {item.quantity}
          </Col>
          <Col md lg={2} className="taka-text-sm-normal d-flex justify-content-end">
                <span className="mx-3">{item.product.price * item.quantity}</span>
                <span className="mx-3">$</span>
          </Col>
        </Row>
      ))}

      <Row className="taka-white-frame px-3 py-3 mt-2 mb-3">
        <Col md lg={10}></Col>
        <Col md lg={2} className="taka-text-sm-bold d-flex justify-content-end">
            <span className="mx-3">{order.totalPrice}</span>
            <span className="mx-3">$</span>
        </Col>
      </Row>

      <Row className="taka-white-frame px-3 py-3 my-3">
        <Col md lg={4}>
          <div className="taka-text-md-bold mb-3">Billing information</div>
          <Form>
            <Form.Group className="mb-2" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={formik.values.address}
                onChange={formik.handleChange}
                name="address"
                type="text"
                placeholder="Address"
              />
            </Form.Group>
            {formik.errors.address ? <div className="form-error">{formik.errors.address}</div> : null}


            <Form.Group className="mb-2" controlId="contact">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                value={formik.values.contact}
                onChange={formik.handleChange}
                name="contact"
                type="text"
                placeholder="Phone number"
              />
            </Form.Group>
            {formik.errors.contact ? <div className="form-error">{formik.errors.contact}</div> : null}

            <Form.Group className="mb-2" controlId="paymentMethod">
              <Form.Label>Payment method</Form.Label>
              <Form.Select onChange={formik.handleChange}>
                <option className="text-muted" value={null}>Select payment method</option>
                <option value="Credit card">Credit card</option>
                <option value="Cash">Cash</option>
              </Form.Select>
            </Form.Group>
            {formik.errors.paymentMethod ? <div className="form-error">{formik.errors.paymentMethod}</div> : null}

          </Form>
        </Col>
      </Row>

      <Row className="taka-white-frame px-3 py-3 my-2">
        <Col md lg={4}>
          <Button
            type="button"
            variant="primary"
            onClick={() => navigate("/")}
          >
            Continue shopping
          </Button>
        </Col>
        <Col md lg={4}></Col>
        <Col md lg={2}></Col>
        <Col md lg={2} className="d-flex justify-content-center">
          <Button
            type="button"
            variant="success"
            onClick={formik.handleSubmit}
          >
            Purchase
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="px-2 py-2">
          {isSubmit && (
            <Message
              variant={
                loading
                ? "warning"
                : (
                  error ? "danger" : "success"
                )
              }
            >
              {
                loading
                ? "Sending your order..."
                : (
                  error ? error : "Your order has been recorded!"
                )
              }
            </Message>
          )}

        </Col>
      </Row>
    </Container>
  )
}

export default Order;
