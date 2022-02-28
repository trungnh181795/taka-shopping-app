import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { logout } from '../../../actions/userAction';

import logo from "../../../assets/Logo/logo.svg";
import searchIcon from "../../../assets/Header/search.png";
import shoppingCart from "../../../assets/shopping-cart.png";

import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cartItems = useSelector((state) => state.cartItems);
  const countInCart = cartItems.length;

  const handleLogOut = () => {
    dispatch(logout());
  }

  return (
    <header className="taka-navbar d-flex align-items-center">
      <Container>
        <Row>
          <Col
            className="d-flex justify-content-start align-items-center"
            xs={3}
            md={3}
          >
            <Link className="taka-navbar-brand" to="/">
              <img
                className="taka-navbar-brand-img"
                src={logo}
                alt="taka-logo"
              />
              Taka
            </Link>
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center"
            xs={3}
            md={6}
          >
            <InputGroup className="taka-navbar-searchbox d-flex justify-content-center">
              <InputGroup.Text id="search-box">
                <img
                  className="taka-navbar-searchbox-img"
                  src={searchIcon}
                  alt="searchIcon"
                />
              </InputGroup.Text>
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-box"
              />
            </InputGroup>
          </Col>
          <Col
            className="d-flex justify-content-end align-items-center"
            xs={6}
            md={3}
          >
            {userInfo && userInfo?.username ? (
              
              <div className="d-flex align-items-center">
                <Link to="/cart">
                <div className="cart">
                  <img className="cart-img mx-4" src={shoppingCart} alt="cart" />
                  <div className="cart-count">{countInCart}</div>
                </div>
                </Link>
                <Dropdown className="user-dropdown ms-4">
                  <Dropdown.Toggle className="user-dropdown-info" id="dropdown-basic">
                    {userInfo.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link to="/profile">
                      <Dropdown.Item>My Profile</Dropdown.Item>                     
                    </Link>
                    {userInfo.role === 'user' && (
                      <Link to="/history">
                        <Dropdown.Item>
                          Shopping History
                        </Dropdown.Item>
                      </Link>
                    )}
                      <Dropdown.Item onClick={handleLogOut}>
                        Log out
                      </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <p>{userInfo.username}</p>
              </div>
            ) : (
              <ul className="taka-navbar-nav d-flex justify-content-end align-items-center">
                <li className="taka-navbar-nav-item">
                  <Link to="/signin">Sign in</Link>
                </li>
                <li className="taka-navbar-nav-item">
                  <Link to="/signup">Sign up</Link>
                </li>
              </ul>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
