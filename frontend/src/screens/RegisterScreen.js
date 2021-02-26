import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { register } from "../actions/userAction";

const RegisterScreen = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.registerUser);
  const { userInfo } = useSelector((state) => state.loginUser);

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(firstName, lastName, email, password));
    }
  };

  return (
    <div className="login">
      <div className="container flex">
        <div className="form-container my-2">
          <h2 className="my-1">
            <i className="fas fa-plus"></i> Register to CSE_DEV
          </h2>
          {error && <Message>{error}</Message>}
          {message && <Message>{message}</Message>}
          {loading && <h2>Loading...</h2>}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label for="email">First Name</label>
              <input
                type="text"
                id="name"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="email">Last Name</label>
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="password">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn">
              <i className="fas fa-plus"></i> Register
            </button>
          </form>
          <p className="lead my-1">
            Already registered?
            <Link className="text-primary" to="/login">
              login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
