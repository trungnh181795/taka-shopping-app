import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { login } from "../../actions/userAction";
import Message from "../../components/Message";

import "./Login.scss";

const Login = () => {

  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;

  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length > 20) {
      errors.password = 'Must be 20 characters or less';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: values => {
      values.deviceId = `deviceId-${values.email}`
      setIsSubmit(true);
      dispatch(login(values))
    }

  })

  useEffect(() => {
    if(userInfo && userInfo.role === "admin"){
      navigate('/admin'); //admin
    }
    else if(userInfo && userInfo.role === "user") {
      navigate('/');
    }

  }, [userInfo])

  const sendNotification = () => {
    if(!loading) {
      return <Message variant={error ? 'danger' : 'success'}>{error ? error : 'Login successfully'}</Message>
    }
    return <Message variant="warning">Signing you in. Please wait!</Message>
  }


  return (
    <div className="Register">
      {isSubmit ? sendNotification() : null }

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-2" size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            value={formik.values.email}
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
          />
        </Form.Group>
        {formik.errors.email ? <div className="form-error">{formik.errors.email}</div> : null}

        <Form.Group className="mb-2" size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={formik.values.password}
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
          />
          {/* <Button className="showPass" onClick={togglePassword}>
              Show password
            </Button> */}
        </Form.Group>
        {formik.errors.password ? <div className="form-error">{formik.errors.password}</div> : null}

        <div className="d-grid gap-2 my-4">
          <Button variant="primary" type="submit" size="lg">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
