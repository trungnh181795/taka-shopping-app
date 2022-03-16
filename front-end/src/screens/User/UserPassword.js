import { Form, Button, Image, Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { userUpdateProfile } from "../../actions/userAction";
import Message from "../../components/Message";

import "./User.scss";

export const UserPassword = () => {
  const [userInfo, handleSetTitle] = useOutletContext();

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { loading, error, responded } = userProfileUpdate;

  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.currentPassword) {
      errors.currentPassword = "Required";
    }

    if (!values.newPassword) {
      errors.newPassword = "Required";
    } else if (values.newPassword.length > 8) {
      errors.newPassword = "Must be 8 characters or less";
    }

    if (!values.repeatPassword) {
      errors.repeatPassword = "Required";
    } else if (values.repeatPassword !== values.newPassword) {
      errors.repeatPassword = "Does not match";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
    validate,
    onSubmit: (values) => {
      setIsSubmit(!isSubmit);
      const { currentPassword, newPassword } = values;
      dispatch(userUpdateProfile({
        oldPassword: currentPassword,
        newPassword: newPassword
      }, "password"));
    },
  });

  useEffect(() => {
    if(responded) setTimeout(() => setIsSubmit(false), 2000);
  }, [responded])

  useEffect(() => {
    handleSetTitle("Change password", "Protect your account");
  }, []);

  return (
    <Row>
      <Col md lg={6}>
        <Form className="mt-4 px-4" onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="currentPassword">
            <Form.Label>Current password</Form.Label>
            <Form.Control
              name="currentPassword"
              type="password"
              placeholder="Current password"
              onChange={formik.handleChange}
            />
            {formik.errors.currentPassword ? (
              <div className="taka-text-xs-normal form-error">
                {formik.errors.currentPassword}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>New password</Form.Label>
            <Form.Control
              name="newPassword"
              type="password"
              placeholder="New password"
              onChange={formik.handleChange}
            />
            {formik.errors.newPassword ? (
              <div className="taka-text-xs-normal form-error">
                {formik.errors.newPassword}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="repeatPassword">
            <Form.Label>Repeat password</Form.Label>
            <Form.Control
              name="repeatPassword"
              type="password"
              placeholder="Repeat password"
              onChange={formik.handleChange}
            />
            {formik.errors.repeatPassword ? (
              <div className="taka-text-xs-normal form-error">
                {formik.errors.repeatPassword}
              </div>
            ) : null}
          </Form.Group>

          <Button className="mb-3" variant="primary" type="submit" onClick={formik.handleSubmit}>
            Save
          </Button>

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
        </Form>
      </Col>
    </Row>
  );
};
