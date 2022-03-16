import { Row, Col, Image } from "react-bootstrap";

import './OrderItem.scss';

const OrderItem = ({ order }) => {

  return (
    <div className="taka-white-frame my-3 py-3 px-3">
      <Row className="divider-horizontal">
        <Col className="d-flex justify-content-start">
          {order.status}
        </Col>
        <Col className="d-flex justify-content-end">
          {order.isPaid ? "Paid" : "Not paid"}
        </Col>
      </Row>
      <Row className="divider-horizontal">
        <Col md lg={1}>
          {order.id}
        </Col>
        <Col md lg={9}>
          {order.totalPrice}
        </Col>
        <Col md lg={2}>
          {order.paymentMethod}
        </Col>
      </Row>
      <Row>
        <Col>
          {order.address}
        </Col>
        <Col>
          {order.contact}
        </Col>
        <Col>
          {order.createdAt}
        </Col>
      </Row>

    </div>
  )
}

export default OrderItem;
