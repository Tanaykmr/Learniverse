import { Button, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// we found a better way, useNavigate
import { useNavigate } from "react-router-dom";
import isUserLoading from "../store/selectors/isUserLoading";
import userEmailState from "../store/selectors/userEmail";
import userState from "../store/atoms/user";
import { useRecoilValue, useSetRecoilState } from "recoil";

function AppBar() {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);

  //we use useEffect to perform side operations such as fetching, checking etc, more info here: https://chat.openai.com/share/6e3b732d-b0df-44e8-b56b-248241e049d2



  if (userLoading) {
    return <>loading...</>;
  }
  if (userEmail) {


    return (
      <div
        style={{
          background: "#F3F3F3",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
        }}
      >
        <Typography variant="h4" style={{ marginLeft: "10px" }}>
          Coursera
        </Typography>

        <div
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
              setUser({ isLoading: false, userEmail: null });
              navigate("/");
              // window.location = "/";
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
          marginBottom: "5px",
        }}
      >
        <Typography variant="h4" style={{ marginLeft: "10px" }}>
          Coursera
        </Typography>

        <div
          style={{
            margin: "5px 10px 0 0",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px"
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
