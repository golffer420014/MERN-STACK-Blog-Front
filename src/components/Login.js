import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";

import { authenticate, getUser } from "../sevices/authorize";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const { username, password } = state;

  const inputValue = (name) => (event) => {
    // console.log(name,"=",event.target.value)
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!username) return Swal.fire("Username is null", "try again", "warning");
    else {
      axios
        .post(`${process.env.REACT_APP_API}/login`, { username, password })
        .then((res) => {
          authenticate(res, () => props.history.push("/create"));
          setTimeout(() => {
            window.location.reload();
          }, 100);
        })
        .catch((err) => {
          const errorString = JSON.stringify(err.response.data.error);
          Swal.fire("Password invalid", errorString, "warning");
          // console.log(err.response.data)
        });
    }
  };

  useEffect(() => {
    getUser() && props.history.push("/");
  },[]);

  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1 style={{ margin: "20px 0 20px 0" }}>Login</h1>
      <form onSubmit={submitForm} className="d-flex flex-column gap-3 ">
        <div className="form-group w-100">
          <label htmlFor="" className="  fw-bold">
            username
          </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={inputValue("username")}
          />
        </div>

        <div className="form-group w-100">
          <label htmlFor="" className="  fw-bold">
            password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={inputValue("password")}
          />
        </div>
        <br />
        <input
          type="submit"
          value="เข้าสู่ระบบ | Admin"
          className="btn btn-primary"
        />
      </form>
    </div>
  );
};

export default withRouter(Login);
