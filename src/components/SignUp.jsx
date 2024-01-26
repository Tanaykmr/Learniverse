import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import {BASE_URL} from "../config";


function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <div
        style={{
          paddingTop: "150px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" >
          Welcome to Coursera, Sign up below
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{ borderRadius: "15px" }}
          style={{
            width: "400px",
            padding: "20px",
          }}
          id="mainCard"
        >
          <div>
            <TextField
              fullWidth={true}

              label="Email"
              variant="outlined"
              style={{ margin: "10px 0" }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              fullWidth={true}
              // id="password"
              label="Password"
              type="password"
              autoComplete="on"
              variant="outlined"
              style={{ marginBottom: "10px" }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <Button
              size="large"
              variant="contained"

              onClick={async () => {
                // let Username = document.getElementById("username").value;
                // let Password = document.getElementById("password").value;
                // using getElementbyId is not the optimal way, since it is not preferable to give IDs to anything in react. we should use onChange in the <TextField> component


                await axios
                  .post(`${BASE_URL}/admin/signup`, {
                    username: email,
                    password: password,
                  })
                  .then((response) => {
                    console.log("response is: ", response);
                    localStorage.setItem("authorization", response.data.token);
                    //TODO: use recoil in such a way that appbar automatically rerenders and detects the state change
                    window.location = "/courses";
                  })
                  .catch((error) => {

                    console.error("Axios error:", error);

                    if (error.response) {
                      console.log(
                        "Request was made, but there was an error:",
                        error.response.status
                      );
                      alert("Admin already exists");

                    } else {
                      console.log("Unknown error:", error.message);

                    }
                  });
              }}
            >
              Sign Up
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default SignUp;
