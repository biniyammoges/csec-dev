import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { changePassword } from "../actions/userAction";

const UpdatePasswordScreen = () => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.updatePassword
  );

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cNewPassword, setCNewPassword] = useState("");
  const [message, setMessage] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword !== cNewPassword) {
      setMessage("New password do not match, please try again");
    } else {
      dispatch(changePassword(password, newPassword));
      setMessage(null);
    }
  };

  return (
    <div className="login">
      <div className="container flex">
        <div className="form-container my-4">
          <h2 className="my-1">
            <i className="fas fa-lock"></i> Change password
          </h2>
          {error && <Message>{error}</Message>}
          {message && <Message>{message}</Message>}
          {success && (
            <Message variant="green">'Password updated successFully'</Message>
          )}
          {loading && <h2>Loading ...</h2>}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label for="password">Old Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Old password"
              />
            </div>
            <div className="form-group">
              <label for="password">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
              />
            </div>
            <div className="form-group">
              <label for="password">Confirm New Password</label>
              <input
                type="password"
                value={cNewPassword}
                onChange={(e) => setCNewPassword(e.target.value)}
                placeholder="Confirm New password"
              />
            </div>
            <button type="submit" className="btn">
              <i className="fas fa-edit"></i> Change Password
            </button>
          </form>
          <p className="lead my-1">
            Update
            <Link className="text-primary" to="/profile/update">
              Profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordScreen;
