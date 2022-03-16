import { Link } from "react-router-dom";
import {
  Container,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../../actions/userAction";

import logo from "../../../assets/Logo/logo.svg";
import searchIcon from "../../../assets/Header/search.png";
import shoppingCart from "../../../assets/shopping-cart.png";
import MobileHeader from "./MobileHeader";
import PcHeader from "./PcHeader";

import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cartItems = useSelector((state) => state.cartItems);
  const countInCart = cartItems.length;

  const handleLogOut = () => {
    dispatch(logout());
  };

  const takaNavbarBrand = (
    <Link className="taka-navbar-brand" to="/">
      <img className="taka-navbar-brand-img" src={logo} alt="taka-logo" />
      Taka
    </Link>
  );

  const searchBox = (
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
  );

  const cartIcon = (
    userInfo && userInfo.username ? (
      <Link to="/cart">
        <div className="cart">
          <img className="cart-img mx-4" src={shoppingCart} alt="cart" />
          <div className="cart-count">{countInCart}</div>
        </div>
      </Link>
    ) : null
  );

  const userDropdown =
    userInfo && userInfo?.username ? (
      <div className="d-flex align-items-center">
        <Dropdown className="user-dropdown ms-4">
          <Dropdown.Toggle className="user-dropdown-info" id="dropdown-basic">
            {userInfo.username}
          </Dropdown.Toggle>

          <Dropdown.Menu>
              <Dropdown.Item href="/user/profile">
                My Profile
              </Dropdown.Item>
            {userInfo.role === "user" && (
                <Dropdown.Item href="/user/purchases">
                  Shopping History
                </Dropdown.Item>
            )}
            <Dropdown.Item onClick={handleLogOut}>Log out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
    );

  return (
    <header className="taka-navbar d-flex align-items-center">
      <Container>
        <MobileHeader
          takaNavbarBrand={takaNavbarBrand}
          searchBox={searchBox}
          cartIcon={cartIcon}
          userDropdown={userDropdown}
        />
        <PcHeader
          takaNavbarBrand={takaNavbarBrand}
          searchBox={searchBox}
          cartIcon={cartIcon}
          userDropdown={userDropdown}
        />
      </Container>
    </header>
  );
};

export default Header;
