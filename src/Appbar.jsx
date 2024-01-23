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
    axios.get("http://localhost:3000/admin/me", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("authorization"),
      },
    }).then((response)=>{
      setUserEmail(response.data.username);
    });

    // fetch("http://localhost:3000/admin/me", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     authorization: "Bearer " + localStorage.getItem("authorization"),
    //   },
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data); //prints username data
    //     if (data.username) {
    //       setUserEmail(data.username);
    //     }
    //   });
  }, []); // the empty array means that the function will only run when appbar mounts/umounts(loads)

  if (userEmail) {
    // this is the same old appbar component, just with logout button
    return (
      <div>
        <div
          style={{
            // this is the top AppBar div
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              margin: "3px  0 0 10px",
            }}
          >
            <Typography variant="h4">
              <strong>Coursera</strong>
            </Typography>
          </div>

          <div
            style={{
              // this is the div that contains the buttons sign up and sign in
              display: "flex",
              justifyContent: "space-between",
              margin: "5px 10px 0 0",
            }}
          >
            <div
              style={{
                // this is the div that contains the sign up button
                marginRight: "10px",
              }}
            >
              username: {userEmail}
              <Button
                variant="contained"
                onClick={() => {
                  localStorage.setItem("authorization", null);
                  navigate("/");
                  setUserEmail(null);
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          // this is the top AppBar div
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            margin: "3px  0 0 10px",
          }}
        >
          <Typography variant="h4">Coursera</Typography>
        </div>

        <div
          style={{
            // this is the div that contains the buttons sign up and sign in
            display: "flex",
            justifyContent: "space-between",
            margin: "5px 10px 0 0",
          }}
        >
          <div
            style={{
              // this is the div that contains the sign up button
              marginRight: "10px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                console.log("sign up button is clicked");
                navigate("/signup");
              }}
            >
              Sign Up
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                console.log("sign in button is clicked");
                navigate("/signin");
              }}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AppBar;
