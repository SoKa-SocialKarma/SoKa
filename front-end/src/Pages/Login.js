import Signup from "../Pages/Signup";
import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from "react"
// import { useHistory } from "react-router-dom"

function Login() {
 
  return (
 
    <div className="Login">
      <h1>Login Page</h1>
      <button component={Link} to="/signup" onClick={Signup}>Sign up</button>
      <button>Forgot Password</button>
    </div>
  );
}

export default Login;
