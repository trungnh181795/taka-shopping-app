import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import logo from '../../../assets/Logo/logo.svg';

import './Footer.scss';

const Footer = () => {
    return (
        <footer className="taka-footer">
            <Container>
                <Row>
                    <Col className="d-flex justify-content-end" xs={12} md={6}>
                        <img className="taka-footer-app-logo" src={logo} alt="logo"/>
                    </Col>
                    <Col className="d-flex justify-content-start align-items-center" xs={12} md={6}>
                        <div className="taka-footer-app-name">Taka Shopping App</div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;