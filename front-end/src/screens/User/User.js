import { Image, Row, Col } from "react-bootstrap";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useLayoutEffect } from "react";

import { checkImgUrl } from "../../utilities/checkImgUrl";

import userIcon from "../../assets/profile-icon.png";
import purchaseIcon from "../../assets/my-purchase.png";
import passwordIcon from "../../assets/password.png";

import "./User.scss";

const User = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userColTitle, setUserColTitle] = useState({
    title: "",
    description: "",
  });

  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo;

  const authenCondition = Boolean(userInfo.username && location.pathname === '/user')

  const handleSetTitle = (title, description) => {
    setUserColTitle({
      title: title,
      description: description,
    });
  };

  useEffect(() => {
    if(!userInfo.username) return navigate("/signin");
  }, [userInfo.username])

  useEffect(() => {
    if(authenCondition) return navigate('/user/profile')
  }, [userInfo.username])

  useEffect(() => {
    document.title = "Manage account"

    return () => {
      document.title = "Taka - Mua hàng online"
    }
  }, [])

  return (
    <Row className="taka-white-frame my-3 px-3 py-3">
      <Col className="divider-vertical" md lg={2}>
        <div className="user-col-title divider-horizontal px-2 pb-2 d-flex justify-content-start align-items-center">
          <div className="user-avatar-sm me-2">
            <Image
              src={checkImgUrl(userInfo.avatar) ? userInfo.avatar : userIcon}
              roundedCircle
              thumbnail
              fluid
            />
          </div>
          <div className="d-flex flex-column justify-content-center">
            <div className="taka-text-sm-bold">{userInfo.username}</div>
            <div className="taka-text-xs-normal text-muted">
              {userInfo.role}
            </div>
          </div>
        </div>
        <nav className="user-nav mt-2 py-2">
            <NavLink className={({ isActive }) =>
              `user-nav-item my-1 px-2 py-2 ${isActive ? "link-active" : undefined}`
            } to="profile">
                <div className="d-flex align-items-center">
                  <div className="user-nav-icon pe-2">
                    <Image fluid src={userIcon} />
                  </div>
                  <div className="user-nav-text">My Profile</div>
                </div>
            </NavLink>
            <NavLink className={({ isActive }) =>
              `user-nav-item px-2 py-2 ${isActive ? "link-active" : undefined}`
            } to="change-password">
                <div className="d-flex align-items-center">
                  <div className="user-nav-icon pe-2">
                    <Image fluid src={passwordIcon} />
                  </div>
                  <div className="user-nav-text">Change password</div>
                </div>
            </NavLink>
            <NavLink className={({ isActive }) =>
              `user-nav-item px-2 py-2 ${isActive ? "link-active" : undefined}`
            } to="purchases">
                <div className="d-flex align-items-center">
                  <div className="user-nav-icon pe-2">
                    <Image fluid src={purchaseIcon} />
                  </div>
                  <div className="user-nav-text">My Purchase</div>
                </div>
            </NavLink>
        </nav>
      </Col>
      <Col md lg={10}>
        <div className="user-col-title divider-horizontal px-2">
          <div className="taka-text-md-bold">{userColTitle.title}</div>
          <div className="taka-text-sm-normal">{userColTitle.description}</div>
        </div>
        <Outlet context={[userInfo, handleSetTitle]} />
      </Col>
    </Row>
  );
};

export default User;
