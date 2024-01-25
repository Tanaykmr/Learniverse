import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
// import { Link } from "react-router-dom";
// we found a better way, useNavigate
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AppBar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null); //used to check if user is logged in
  //we use useEffect to perform side operations such as fetching, checking etc, more info here: https://chat.openai.com/share/6e3b732d-b0df-44e8-b56b-248241e049d2
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/me", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("authorization"),
        },
      })
      .then((response) => {
        setUserEmail(response.data.username);
      });
  }, []); // the empty array means that the function will only run when appbar mounts/umounts(loads)

  if (userEmail) {
    // this is the same old appbar component, just with logout button
    return (
      <div
        style={{
          background: "#F3F3F3",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" style={{ marginLeft: "10px" }}>
          Coursera
        </Typography>

        <div
          class="button-class"
          style={{
            margin: "5px 10px 0 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/addcourse");
            }}
          >
            add course
          </Button>
          <Button
            variant="outlined"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              navigate("/courses");
            }}
          >
            view courses
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              localStorage.setItem("authorization", null);
              window.location = "/";
            }}
          >
            logout
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          background: "#F3F3F3",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" style={{ marginLeft: "10px" }}>
          Coursera
        </Typography>

        <div
          class="button-class"
          style={{
            margin: "5px 10px 0 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </Button>

          <Button
            variant="contained"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign in
          </Button>
        </div>
      </div>
    );
  }
}

export default AppBar;
