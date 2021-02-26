import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.loginUser);

  const logoutHandler = (e) => {
    dispatch(logout());
  };

  return (
    <div className="navbar">
      <div className="container flex">
        <Link to="/" className="nav-brand">
          <i className="fas fa-code"></i> CSE_DEV
        </Link>
        <ul>
          <li>
            <Link to="/events">
              <i className="fas fa-flag"></i> Events
            </Link>
          </li>
          {userInfo ? (
            userInfo.role === "committee" ? (
              <li>
                <Link>
                  <i className="fas fa-cog"></i> Dashboard
                </Link>
              </li>
            ) : null
          ) : null}

          {userInfo ? (
            <>
              <li>
                <Link onClick={logoutHandler}>
                  <i className="fas fa-sign-out-alt"></i> Logout{" "}
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <i className="fas fa-user"></i> {userInfo.data.firstName}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">
                  <i className="fas fa-plus"></i> Register
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <i className="fas fa-sign-in-alt"></i> Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
