import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import NavbarComponent from "./components/NavbarComponent";
import Swal from "sweetalert2";
import { getToken, getUser } from "./sevices/authorize";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const rederHtml = (htmlString) => ({ __html: htmlString });




  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blog`,)
      .then((res) => {
        // console.log(res.data)
        setBlogs(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "ต้องการลบบทความหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
    }).then((answer) => {
      // answer.isConfirmed คือตอบ ok
      if (answer.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`,
      {
        headers:{
          authorization:`Bearer ${getToken()}`
        }
      }
      )
      .then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: "success",
        });
        fetchData();
      })
      .catch((err) => {
        Swal.fire({
          title: "err.data.message",
          text: "err.data.message",
          icon: "error",
        });
      });
  };

  return (
    <div className="container p-5">
    <p>username : ใส่เป็นอะไรก็ได้เช่น admin , aa , bb </p>
    <p>password : Admin432 </p>
      <NavbarComponent />
      {blogs.map((blog, index) => (
        <div
          className="row"
          key={index}
          style={{ borderBottom: "1px solid silver" }}
        >
          <div className="col pt-3 pb-2">
            <a href={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </a>
            <p
              dangerouslySetInnerHTML={rederHtml(
                blog.content.substring(0, 250)
              )}
              className="pt-3"
            ></p>
            <p className="text-muted">
              ผู้เขียน {blog.author} , เผยแพร่เมื่อ{" "}
              {new Date(blog.createdAt).toLocaleString("TH", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
            {getUser() && (
              <div>
                <a
                  className="btn btn-outline-success"
                  href={`/blog/edit/${blog.slug}`}
                >
                  Update
                </a>{" "}
                &nbsp; {/*  &nbsp เพิ่ม space เพิ่อไม่ให้ปุ่มติดกัน */}
                <button
                  className="btn btn-outline-danger"
                  onClick={() => confirmDelete(blog.slug)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
