import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import "./LoginForm.css";
import { Link, useNavigate } from 'react-router-dom';

import BackgroundImage from "../assets/images/background.jpg";
import Logo from "../assets/images/logo.png";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    // Define the API endpoint
    const loginUrl = 'http://localhost:3000/login';
  
    // Prepare the data to be sent
    const loginData = {
      username: inputUsername,
      password: inputPassword,
    };
  
    try {
      // Send a POST request to the backend
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Handle login success
        console.log('Login successful:', data);
        alert()
        // Redirect user to their specific account
        navigate(`/account/${data.userId}`); // Assuming userId is returned in the response
      } else {
        // Handle errors or unsuccessful login attempts
        setShow(true);
        console.log('Login failed:', response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="sign-in__backdrop"></div>

      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <img className="img-thumbnail mx-auto d-block mb-2" src={Logo} alt="logo" />
        <div className="h4 mb-2 text-center">Sign In</div>

        <Button variant="outline-primary" className="mb-2 w-100 google-sign-in">
          <FontAwesomeIcon icon={faGoogle} className="social-icon" />
          Sign in with Google
        </Button>

        <Button variant="outline-primary" className="mb-2 w-100 facebook-sign-in">
          <FontAwesomeIcon icon={faFacebook} className="social-icon" />
          Sign in with Facebook
        </Button>

            {/* Divider with 'or' Text */}
        <div className="divider-or">
            <div className="divider-line"></div>
            <span>or</span>
            <div className="divider-line"></div>
        </div>

        {show && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect username or password.
          </Alert>
        )}

        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={inputUsername}
            placeholder="Username"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        

        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={() => {} /* Add functionality for forgot password */}
          >
            Forgot password?
          </Button>
        </div>
        {/* Registration Prompt */}
        <div className="text-center registration-prompt">
          Not a member? <Link to="/register">Register</Link>
        </div>
      </Form>
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Team 17 | &copy;2024
      </div>
    </div>
  );
};

export default Login;
