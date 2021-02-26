import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, getProfile } from "../actions/userAction";
import Message from "../components/Message";
import { USER_PROFILE_UPDATE_RESET } from "../constants/userConstants";

const UpdateProfileScreen = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [year, setYear] = useState("");
  const [sex, setSex] = useState("");

  const dispatch = useDispatch();

  const { profileInfo } = useSelector((state) => state.userProfile);
  const { userInfo } = useSelector((state) => state.loginUser);
  const { success, loading, error } = useSelector((state) => state.updateUser);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!profileInfo.firstName) {
        dispatch(getProfile("profile"));
        dispatch({ type: USER_PROFILE_UPDATE_RESET });
      } else {
        setFirstName(profileInfo.firstName);
        setLastName(profileInfo.lastName);
        setEmail(profileInfo.email);
        setIdNumber(profileInfo.idNumber);
        setYear(profileInfo.year);
        setSex(profileInfo.sex);
      }
    }
  }, [dispatch, history, userInfo, profileInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({ firstName, lastName, email, idNumber, year, sex })
    );
  };

  return (
    <div>
      <div className="container flex">
        <div className="form-container my-2">
          <h2 className="my-1">
            <i className="fas fa-edit"></i> Update Profile Info
          </h2>
          {success && <Message variant="green">Profile Updated</Message>}
          {error && <Message variant="red">{error}</Message>}
          {loading && <h2>Loding..</h2>}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="email">First Name</label>
              <input
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Last Name</label>
              <input
                id="email"
                name="email"
                autoComplete
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="id">Id Number</label>
              <input
                placeholder="Id number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="id">Sex</label>
              <select value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="id">Year</label>
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
                <option value="5th">5th Year</option>
              </select>
            </div>

            <button type="submit" className="btn">
              <i className="fas fa-edit"></i> Update Profile
            </button>
          </form>

          <p className="lead my-1">
            Change
            <Link className="text-primary" to="/profile/update/password">
              Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileScreen;
