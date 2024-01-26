import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userEmailState from "../store/selectors/userEmail";
import userState from "../store/atoms/user";
import {BASE_URL} from "../config";


function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userState);

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
                  .post(`${BASE_URL}/admin/login`, undefined, {
                    headers: {
                      username: email,
                      password: password,
                    },
                  })
                  .then((response) => {
                    setUser({
                      isLoading: false,
                      userEmail: email
                    });
                    console.log("response is: ", response);


                    console.log("signed in successfully");
                    localStorage.setItem("authorization", response.data.token);
                    navigate("/courses");

                  })
                  .catch((error) => {

                    console.error("Axios error:", error);

                    if (error.response) {
                      console.log(
                        "Request was made, but there was an error:",
                        error.response.status
                      );
                      alert("Invalid credentials");

                    } else {
                      console.log("Unknown error:", error.message);

                    }
                  });
                //   fetch(`${BASE_URL}/admin/login`, {
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
