import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import EventScreen from "./screens/EventScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UpdatePasswordScreen from "./screens/UpdatePasswordScreen";
import UpdateProfileScreen from "./screens/UpdateProfileScreen";
import UploadPhotoScreen from "./screens/UploadPhotoScreen";

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <main>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" exact component={ProfileScreen} />
          <Route path="/profile/update" exact component={UpdateProfileScreen} />
          <Route
            path="/profile/update/password"
            component={UpdatePasswordScreen}
          />
          <Route path="/profile/update/upload" component={UploadPhotoScreen} />
          <Route path="/events" exact component={EventScreen} />
        </main>
        <Footer />
      </>
    </Router>
  );
};

export default App;
