import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.loginUser);

  return (
    <div className="show-case">
      <div className="container flex">
        <div className="show-case-text">
          <h1>Welcome to CSE_DEV</h1>
          <h3>Develop your programming skill with us and get certificate</h3>
          <Link
            to={userInfo ? "/profile" : "/login"}
            className="btn btn-dark my-1"
          >
            {userInfo ? "Go To Profile" : "Get connected"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
