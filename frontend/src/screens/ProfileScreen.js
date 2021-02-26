import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../actions/userAction";
import Message from "../components/Message";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.loginUser);
  const { userInfo } = loginUser;

  const userProfile = useSelector((state) => state.userProfile);
  const { error, loading, profileInfo } = userProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (!profileInfo.photo) {
        dispatch(getProfile("profile"));
      }
    }
  }, [history, dispatch, userInfo, profileInfo]);

  return (
    <section className="profile my-3">
      <div className="container">
        <div className="list-group">
          <span className="list-group-title">
            <i className="fas fa-user"></i>Profile Information{" "}
          </span>
          <div className="list-group-body grid">
            <div className="profile-image">
              <img src={profileInfo.photo} alt={profileInfo.firstName} />
            </div>
            <div className="profile-info">
              <span>
                <strong>First Name</strong> - {profileInfo.firstName}
              </span>
              <span>
                <strong>Last Name</strong> - {profileInfo.lastName}
              </span>
              <span>
                <strong>Email</strong> - {profileInfo.email}
              </span>
              <span>
                <strong>Id</strong> -{" "}
                {profileInfo.idNumber && profileInfo.idNumber}
              </span>
              <span>
                <strong>Year</strong> - {profileInfo.year && profileInfo.year}
              </span>
              <span>
                <strong>Sex</strong> - {profileInfo.sex && profileInfo.sex}
              </span>
              <span>
                <strong>Joined At</strong> - {profileInfo.createdAt}
              </span>
              <Link to="/profile/update" className="btn btn-dark">
                <i className="fas fa-edit"></i> Edit profile
              </Link>
              <Link to="/profile/update/upload" className="btn btn-dark">
                <i className="fas fa-camera"></i> Upload photo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileScreen;
