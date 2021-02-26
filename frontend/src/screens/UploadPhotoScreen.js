import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { uploadPhoto } from "../actions/userAction";

const UploadPhotoScreen = () => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.updatePhoto);

  const [file, setFile] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    dispatch(uploadPhoto(formData));
  };

  const changeHandle = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div className="login">
      <div className="container flex">
        <div className="form-container my-4">
          <h2 className="my-1">
            <i className="fas fa-camera"></i> Update Profile Pic
          </h2>
          {error && <Message>{error}</Message>}
          {success && (
            <Message variant="green">'Photo uploaded successFully'</Message>
          )}
          {loading && <h2>Loading ...</h2>}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <input type="file" onChange={changeHandle} />
            </div>
            <button type="submit" className="btn">
              <i className="fas fa-sign-in-alt"></i> Upload
            </button>
          </form>
          <p className="lead my-1">
            <Link className="text-primary" to="/profile">
              Cancel
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadPhotoScreen;
