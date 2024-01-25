import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function SignIn() {
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
        <Typography variant="h6">Welcome Back, Sign In below</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant="outlined"
          style={{
            width: "400px",
            padding: "20px",
          }}
        >
          <div>
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{ margin: "10px 0" }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              fullWidth={true}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="on"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <Button
              variant="contained"
              style={{ marginTop: "10px" }}
              onClick={async () => {
                await axios
                  .post("http://localhost:3000/admin/login", undefined, {
                    headers: {
                      username: email,
                      password: password,
                    },
                  })
                  .then((response) => {
                    console.log(
                      "hi from response\nusername:",
                      email,
                      "password: ",
                      password
                    );
                    console.log("response is: ", response);
                    // if (response.status == 200) {
                    console.log("hi from response.status==200");
                    console.log("signed in successfully");
                    localStorage.setItem("authorization", response.data.token);
                    window.location = "/courses";
                  })
                  .catch((error) => {
                    console.log("hi from error");
                    console.error("Axios error:", error);

                    if (error.response) {
                      console.log(
                        "Request was made, but there was an error:",
                        error.response.status
                      );
                      alert("Invalid credentials");
                      // Handle specific errors based on the status code if needed
                    } else {
                      console.log("Unknown error:", error.message);
                      // Handle unknown errors
                    }
                  });
                //   fetch("http://localhost:3000/admin/login", {
                //     method: "POST",
                //     headers: {
                //       "Content-Type": "application/json",
                //       username: email,
                //       password: password,
                //     },
                //   })
                //     .then((response) => {
                //       if (response.ok) {
                //         return response.json();
                //       } else {
                //         throw new Error("invalid credentials");
                //       }
                //     })
                //     .then((data) => {
                //       localStorage.setItem("authorization", data.token);
                //       console.log("token for this session is: " + data.token);
                //       window.location="/landing";
                //     })
                //     .catch((error) => {
                //       console.log(error);
                //       alert("Incorrect Email or Password")
                //     });
              }}
            >
              Sign In
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default SignIn;
