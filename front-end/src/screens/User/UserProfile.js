
import { Form, Button, Image, Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Message from "../../components/Message";

import { userUpdateProfile } from "../../actions/userAction";
import { checkImgUrl } from "../../utilities/checkImgUrl";

import userIcon from "../../assets/profile-icon.png";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const [userInfo, handleSetTitle] = useOutletContext();

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { loading, error, responded } = userProfileUpdate;

  const [file, setFile] = useState("");
  const [errors, setErrors] = useState({});
  const [userAvatar, setUserAvatar] = useState(checkImgUrl(userInfo.avatar) ? userInfo.avatar : userIcon);
  const [isShow, setIsShow] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: userInfo.username,
      email: userInfo.email,
      contact: userInfo.contact ? userInfo.contact : "",
    },
  });

  const handleFormSubmit = (fieldValue, fieldName) => {
    if (fieldValue === userInfo[fieldName]) {
      setErrors({ [fieldName]: "Duplicated with previous value" });
    } else if (fieldValue === "") {
      setErrors({ [fieldName]: "This field cannot be empty" });
    }
    else {
      setErrors({})
      setIsSubmit(!isSubmit);
      dispatch(userUpdateProfile({ [fieldName]: fieldValue }, fieldName));
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setUserAvatar(reader.result);
    }

    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if(responded) setTimeout(() => setIsSubmit(false), 2000);
  }, [responded])

  useEffect(() => {
    handleSetTitle("My Profile", "Manage you account information");
  }, []);

  console.log(error)

  return (
      <Row>
        <Col>
          <Form className="mt-4 px-4" onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Row>
                <Col md lg={10}>
                  <Form.Control
                    className="text-muted"
                    name="username"
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  {errors.username ? (
                    <div className="taka-text-xs-normal form-error">
                      {errors.username}
                    </div>
                  ) : null}
                </Col>
                <Col md lg={2}>
                  <Button
                    variant="primary"
                    type="button"
                    name="username"
                    onClick={(e) =>
                        handleFormSubmit(formik.values.username, e.target.name)
                    }
                  >
                    Update
                  </Button>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Row>
                <Col md lg={10}>
                  <Form.Control
                    className="text-muted"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {errors.email ? (
                    <div className="taka-text-xs-normal form-error">
                      {errors.email}
                    </div>
                  ) : null}
                  {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                </Col>
                <Col md lg={2}>
                  <Button
                    variant="primary"
                    type="button"
                    name="email"
                    onClick={(e) =>
                      handleFormSubmit(formik.values.email, e.target.name)
                    }
                  >
                    Update
                  </Button>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="contact">
              <Form.Label>Phone number</Form.Label>
              <Row>
                <Col md lg={10}>
                  <Form.Control
                    className="text-muted"
                    name="contact"
                    type="text"
                    value={formik.values.contact}
                    onChange={formik.handleChange}
                  />
                  {errors.contact ? (
                    <div className="taka-text-xs-normal form-error">
                      {errors.contact}
                    </div>
                  ) : null}
                </Col>
                <Col md lg={2}>
                  <Button
                    variant="primary"
                    type="button"
                    name="contact"
                    onClick={(e) =>
                      handleFormSubmit(formik.values.contact, e.target.name)
                    }
                  >
                    Update
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
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
                ? "Updating information..."
                : (
                  error ? error : "Your changes has been saved!"
                )
              }
            </Message>
          )}
        </Col>
        <Col className="d-flex flex-column align-items-center">
          <div className="user-avatar-lg mt-4 mb-2">
            <Image
                src={userAvatar}
                roundedCircle
                thumbnail
                fluid
              />
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsShow(prev => !prev)}
          >
            Change avatar
          </Button>
          {isShow && <input
            className="user-avatar-upload-input mt-2"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />}
        </Col>
      </Row>
  );
};
