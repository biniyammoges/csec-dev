import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container grid grid-3">
        <div>
          <h2 className="my-1">
            <i className="fas fa-code"></i> CSE_DEV
          </h2>
          <span>2020 &copy; Copyright reserved</span>
        </div>
        <div>
          <ul>
            <li>
              <Link to="">About</Link>
            </li>
            <li>
              <Link to="">Events</Link>
            </li>
            <li>
              <Link to="">Privacy policy</Link>
            </li>
          </ul>
        </div>
        <ul className="flex">
          <li>
            <Link to="#">
              <i className="fab fa-facebook fa-2x"></i>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fab fa-twitter fa-2x"></i>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fab fa-telegram fa-2x"></i>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fab fa-youtube fa-2x"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
