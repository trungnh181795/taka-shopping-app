import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/userAction";
import Message from "../../components/Message";

import "./Login.scss";

const Login = () => {
  const initialValues = { email: "", password: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const newFormValues = {...formValues, deviceId: `deviceId-${formValues.email}`};
    dispatch(login(newFormValues))
  }

  useEffect(() => {
    if(userInfo && userInfo.role === "admin"){
      navigate('/admin'); //admin
    } 
    else if(userInfo && userInfo.role === "user") {
      navigate('/');
    }
    
  }, [userInfo, navigate])

  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.mail = "This is not a valid email format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };
  //let deviceId = `deviceId-${formValues.email}`;

  const sendNotification = () => {
    if(!loading) {
      return <Message variant={error ? 'danger' : 'success'}>{error ? error : 'Login successfully'}</Message>
    }
    return <Message variant="warning">Signing you in. Please wait!</Message>
  }


  return (
    <div className="Register">
      {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
        <Message variant="success">Login successfully</Message>
      ) : (
        <pre></pre>
      )} */} {/* Need explaintation on this code! - TrungNH25 asking review from GiangPT on 10/02/2022 */}
      {isSubmit ? sendNotification() : null }

      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            name="email"
            value={formValues.email}
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </Form.Group>
        <p>{formErrors.email}</p>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={formValues.password}
            type={"password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {/* <Button className="showPass" onClick={togglePassword}>
              Show password
            </Button> */}
        </Form.Group>

        <p>{formErrors.password}</p>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
