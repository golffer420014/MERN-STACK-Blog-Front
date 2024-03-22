import React, { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";
import { getToken, getUser } from "../sevices/authorize";

const FormComponent = () => {
  const [state, setState] = useState({
    title: "",
    author: getUser(),
  });

  const { title, author } = state;

  const [content,setContent] = useState('')

  const inputValue = (name) => (event) => {
    // console.log(name,"=",event.target.value)
    setState({ ...state, [name]: event.target.value });
  };

  const submitContent = (event) =>{
    setContent(event)
  }

  const submitForm = (e) => {
    e.preventDefault();
    // console.table({title,content,author})
    // console.log("API URL =", process.env.REACT_APP_API);
    axios
      .post(`${process.env.REACT_APP_API}/blog`, {
        title,
        content,
        author,
      },
      {
        headers:{
          authorization:`Bearer ${getToken()}`
        }
      }
      )
      .then((res) => {
        Swal.fire({
          title: "สร้างบทความสำเร็จ",
          text: "กด OK เพื่อปิด",
          icon: "success",
        });
        setState({ ...state, title: "", author: "" });
        setContent('')
      })
      .catch((err) => {
        Swal.fire("เกิดข้อผิดพลาดของ server", err.response.data.error, "warning");
      });
  };

  return (
    <div className="container p-5">
      <NavbarComponent />
      {/* {JSON.stringify(state)} */}
      <h1>เขียนบทความ</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="">ชื่อบทความ</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">รายละเอียด</label>
          <ReactQuill 
            value={content}
            onChange={submitContent}
            // theme={snow}
            className="pb-5 mb-3"
            placeholder="เขียนรายละเอียดบทความ"
            style={{border:'1px solid gray'}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">ชื่อผู้แต่ง</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={inputValue("author")}
          />
        </div>
        <br />
        <input type="submit" value="บันทึก" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default FormComponent;
