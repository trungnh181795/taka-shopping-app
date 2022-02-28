import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useDispatch} from 'react-redux';
import {register} from '../../actions/userAction';
import "./Register.scss";

const Register = () => {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch()
  //const userRegister = useSelector(state => state.userRegister)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    dispatch(register(formValues))
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.mail = "This is not a valid email format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    }
    return errors;
  };

  return (
    <div className="Register">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui sucess">Signed up successfully</div>
      ) : (
        <pre></pre>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            value={formValues.username}
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
          />
        </Form.Group>
        <p>{formErrors.username}</p>

        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
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
            Sign up
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
