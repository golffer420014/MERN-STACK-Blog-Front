import React, { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../sevices/authorize";

const EditComponents = (props) => {

  const history = useHistory();

  const [state, setState] = useState({
    title: "",
    author: "",
    slug: "",
  });

  const { title, author, slug } = state;
  const [content, setContent] = useState("");

    const submitContent = (event) => {
      setContent(event);
    };


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
      // eslint-disable-next-line
      .then((res) => {
        // console.log(res.data)
        const { title, content, author, slug } = res.data;
        setState({ ...state, title, author, slug });
        setContent(content)
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  const showUpdateForm = () => (
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
          style={{ border: "1px solid gray" }}
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
      <input type="submit" value="อัพเดท" className="btn btn-primary" />
    </form>
  );

  const inputValue = (name) => (event) => {
    // console.log(name,"=",event.target.value)
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API}/blog/${slug}`, {
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
          title: "อัพเดทบทความสำเร็จ",
          text: "กด OK เพื่อปิด",
          icon: "success",
        });
    
        const { title, content, author, slug } = res.data;
        setState({ ...state, title, content, author, slug });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1 className="mt-2">แก้ไขบทความ</h1>
      {showUpdateForm()}
    </div>
  );
};

export default EditComponents;
