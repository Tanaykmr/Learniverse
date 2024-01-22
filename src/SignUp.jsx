import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
//TODO: remove creation of a jwt when user signs up
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      {email}
      <div
        style={{
          paddingTop: "150px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Welcome to Coursera, Sign up below</Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            width: "400px",
            padding: "20px",
          }}
          id="mainCard"
        >
          <div>
            <TextField
              fullWidth={true}
              // id="username"
              // it is not preferable to give IDs to anything in react
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
              onClick={ async() => {
                // let Username = document.getElementById("username").value;
                // let Password = document.getElementById("password").value;
                // using getElementbyId is not the optimal way, since it is not preferable to give IDs to anything in react. we should use onChange in the <TextField> component

                  console.log("hi from start");
                  await axios.post(
                    "http://localhost:3000/admin/signup",
                    {
                      username: email,
                      password: password,
                    }
                  ).then(()=> {
                    alert("signed up successfully")
                  }).catch((error)=>{
                    console.log("hi from error");
                  console.error("Axios error:", error);

                  if (error.response) {
                    console.log(
                      "Request was made, but there was an error:",
                      error.response.status
                    );
                    alert("Admin already exists")
                    // Handle specific errors based on the status code if needed
                  } else {
                    console.log("Unknown error:", error.message);
                    // Handle unknown errors
                  }
                  })
                  

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

