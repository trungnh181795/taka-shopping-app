import { Row, Col } from "react-bootstrap";

const PcHeader = ({ takaNavbarBrand, searchBox, cartIcon, userDropdown }) => {
  return (
    <div className="taka-navbar-pc d-none d-lg-block">
      <Row>
        <Col className="d-flex justify-content-start align-items-center" lg={3}>
          {takaNavbarBrand}
        </Col>
        <Col className="d-flex justify-content-center align-items-center" lg={6}>
          {searchBox}
        </Col>
        <Col className="d-flex justify-content-end align-items-center" lg={3}>
          {cartIcon}
          {userDropdown}
        </Col>
      </Row>
    </div>
  );
};

export default PcHeader;
