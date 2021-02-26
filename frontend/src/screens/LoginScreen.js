import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/userAction";
import Message from "../components/Message";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector((state) => state.loginUser);

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="login">
      <div className="container flex">
        <div className="form-container my-4">
          <h2 className="my-1">
            <i className="fas fa-sign-in-alt"></i> Login to CSE_DEV
          </h2>
          {error && <Message>{error}</Message>}
          {loading && <h2>Loading...</h2>}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn">
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
          </form>
          <p className="lead my-1">
            No account?
            <Link className="text-primary" to="/register">
              regsiter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
