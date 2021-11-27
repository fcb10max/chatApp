import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import signInImage from "../assets/signup.jpg";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {  username, password, phoneNumber, avatarURL } = form;

    // const URL = "https://server-chat-app0.herokuapp.com/auth";
    const URL = "http://localhost:5000/auth";

    try {
      setError(false);
      const { data: { token, userId, hashedPassword, fullName } } = await axios.post(
        `${URL}/${isSignUp ? "signup" : "login"}`,
        {
          username,
          password,
          fullName:form.fullName,
          phoneNumber,
          avatarURL,
        }
      );
      cookies.set("token", token);
      cookies.set("username", username);
      cookies.set("fullName", fullName);
      cookies.set("userId", userId);
      
      if (isSignUp) {
        cookies.set("phoneNumber", phoneNumber);
        cookies.set("avatarURL", avatarURL);
        cookies.set("hashedPassword", hashedPassword);
      }
  
      window.location.reload();
    } catch (error) {
      setError(error.response.data.message);
    }
  };


  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignUp ? "Sign up" : "Sign in"}</p>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  type="text"
                  name="avatarURL"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {!isSignUp && error && <div style={{ color: "red", fontSize: "16px"}}>{error}</div>}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignUp ? "Sign in" : "Sign up"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <span onClick={switchMode}>
                {isSignUp ? "Sign in" : "Sign up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signInImage} alt="sign in" />
      </div>
    </div>
  );
};

export default Auth;
