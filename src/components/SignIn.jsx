import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useRecoilValue, useSetRecoilState} from "recoil";
import userState from "../store/atoms/user";
import {BASE_URL} from "../config";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profile, setProfile] = useState("");
    const setUserState = useSetRecoilState(userState);


    const handleSignIn = async () => {
        try {
            // Perform signup operation
            const response = await axios.post(`${BASE_URL}/${profile}/login`, {
                username: email, password: password,
            });
            localStorage.setItem("authorization", response.data.token);

            // Update userProfile in userState
            setUserState({
                isLoading: false, userProfile: profile, userEmail: email,
            });

            // Redirect user after successful signup
            (profile === "admin") ? navigate("/courses") : navigate("/publishedCourses")
            // window.location = "/courses";
            //TODO: change the above according to profile
        } catch (error) {
            console.error("Axios error:", error);

            if (error.response) {
                console.log("Request was made, but there was an error:", error.response.status);
                alert("Invalid credentials");
            } else {
                console.log("Unknown error:", error.message);
            }
        }
    };


    return (<div>
            <div
                style={{
                    paddingTop: "150px", marginBottom: "10px", display: "flex", justifyContent: "center",
                }}
            >
                <Typography variant="h6">Welcome Back, Sign In below</Typography>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Card
                    variant="outlined"
                    style={{
                        width: "400px", padding: "20px",
                    }}
                >
                    <div>
                        <TextField
                            fullWidth={true}
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            style={{margin: "10px 0"}}
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
                            style={{margin: "0 0 10px 0"}}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />

                        <Box sx={{minWidth: 120}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Profile</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={profile}
                                    label="Age"
                                    onChange={(event) => {
                                        setProfile(event.target.value);
                                    }}
                                >
                                    <MenuItem value={"admin"}>Admin</MenuItem>
                                    <MenuItem value={"user"}>Student</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Button
                            variant="contained"
                            style={{marginTop: "10px"}}
                            onClick={handleSignIn}
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

                        >
                            Sign In
                        </Button>
                    </div>
                </Card>
            </div>
        </div>);
}

export default SignIn;
