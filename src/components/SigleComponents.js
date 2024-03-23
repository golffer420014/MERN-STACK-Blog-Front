import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";

const SigleComponents = (props) => {
  const [blog, setBlog] = useState("");
  const rederHtml = (htmlString) => ({ __html: htmlString });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
      // eslint-disable-next-line
      .then((res) => {
        // console.log(res.data)
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1 className="pt-3">{blog.title}</h1>
      <p dangerouslySetInnerHTML={rederHtml(blog.content)}></p>
      <p className="text-muted">
        ผู้เขียน {blog.author} , เผยแพร่เมื่อ{" "}
        {new Date(blog.createdAt).toLocaleString("TH", {
          dateStyle: "long",
          timeStyle: "short",
        })}
      </p>
    </div>
  );
};

export default SigleComponents;
