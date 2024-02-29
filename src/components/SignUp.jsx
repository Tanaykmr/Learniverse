import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../config";

import {useSetRecoilState} from "recoil";
import userState from "../store/atoms/User";

function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profile, setProfile] = useState("");
    const setUserState = useSetRecoilState(userState);

    const handleSignUp = async () => {
        try {
            // Perform signup operation
            const response = await axios.post(`${BASE_URL}/${profile}/signup`, {
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
                alert("Admin already exists");
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
                <Typography variant="h6">
                    Welcome to Learniverse, Sign up below
                </Typography>
            </div>
            <div
                style={{
                    display: "flex", justifyContent: "center",
                }}
            >
                <Card
                    sx={{borderRadius: "15px"}}
                    style={{
                        width: "400px", padding: "20px",
                    }}
                    id="mainCard"
                >
                    <div>
                        <TextField
                            fullWidth={true}
                            label="Email"
                            variant="outlined"
                            style={{margin: "10px 0"}}
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
                            style={{marginBottom: "10px"}}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <Box sx={{minWidth: 120, marginBottom: "10px"}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Profile</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={profile}
                                    label="Age"
                                    onChange={(event) => {
                                        setProfile(event.target.value);
                                        console.log("the profile now is: ", profile); //we can't see profile here as setProfile is asynchronous
                                    }}
                                >
                                    <MenuItem value={"admin"}>Admin</MenuItem>
                                    <MenuItem value={"user"}>Student</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Button
                            variant="contained"
                            onClick={handleSignUp}


                            //TODO: use recoil in such a way that appbar automatically rerenders and detects the state change
                        >
                            Sign Up
                        </Button>
                    </div>
                </Card>
            </div>
        </div>);
}

export default SignUp;
