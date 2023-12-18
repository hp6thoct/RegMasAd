import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../Api/AccountController";
import { useUser } from "../Context/UserContext";
import ResultModal from "../Components/ResultModal";

function Login() {
  const [username, setUsername] = useState("");
  const { loginUser} = useUser();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginFail, setLoginFail] = useState(false);

  useEffect(() => {
    // This will be called whenever your component re-renders
    // You can add conditions here to determine when to scroll to the top
    window.scrollTo(0, 0);
  }, []);


  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const userData = (await login(username, password)).data;
      if (userData.role === "Manager") {
        loginUser(userData);
        navigate("/home");
      } else {
        setLoginFail(true);
      }
    } catch (e) {
      console.log("Login error", e);
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="login">
        <div className="login__container">
          <h1 className="mb-4">Sign-in</h1>

          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="login__signInButton mt-3"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </Form>

          <div className="mt-3">
            <p>
              By signing in, you agree to our <Link to="/terms">Terms</Link> and{" "}
              <Link to="/privacy">Privacy Policy</Link>.
            </p>
          </div>

          <div className="login__divider mt-3 mb-3">
            <span className="login__divider-text">New to HB Store?</span>
          </div>

          <Link
            to="/signup"
            className="btn btn-success btn-block login__registerButton"
          >
            Create your HB Account
          </Link>
        </div>
      </div>
      <ResultModal
        visible={loginFail}
        onOk={() => setLoginFail(false)}
        onCancel={() => setLoginFail(false)}
        title="Result Modal"
        content="Can't log in! Please try again!"
        isSuccess=""
      />
    </Container>
  );
}

export default Login;
