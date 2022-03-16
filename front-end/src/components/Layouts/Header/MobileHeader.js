import { Row, Col } from 'react-bootstrap';

const MobileHeader = ({ takaNavbarBrand, searchBox, cartIcon, userDropdown }) => {

    return (
        <div className="taka-navbar-mobile d-block d-lg-none">
            <Row>
                <Col>
                    {userDropdown}
                    <button>Toggle</button>                
                </Col>
                <Col>
                    {takaNavbarBrand}
                </Col>
                <Col>
                    {cartIcon}
                </Col>
            </Row>
            <Row>
                <Col>
                    {searchBox}
                </Col>
            </Row>
        </div>
    )
}

export default MobileHeader;