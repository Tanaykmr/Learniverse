import { Button, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// we found a better way, useNavigate
import { useNavigate } from "react-router-dom";
import userState from "../store/atoms/User";
import { useRecoilState } from "recoil";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function AppBar() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  console.log("in appbarRecoil, user is: ", user);

  let button1Name = null;
  if (user.userProfile === "admin") {
    button1Name = "add course";
  } else if (user.userProfile === "user") {
    button1Name = "purchased courses";
  } else {
    button1Name = "3rdcase";
  }

  //we use useEffect to perform side operations such as fetching, checking etc, more info here: https://chat.openai.com/share/6e3b732d-b0df-44e8-b56b-248241e049d2

  if (user.isLoading) {
    return (
      <>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </>
    );
  }
  if (user.userEmail) {
    console.log("user.userEmail is: ", user.userEmail);
    return (
      <div
        style={{
          background: "#F3F3F3",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          onClick={() => {
            user.userProfile == "admin"
              ? navigate("/courses")
              : navigate("/publishedCourses");
          }}
        >
          <Typography variant="h4" style={{ marginLeft: "10px" }}>
            Learniverse
          </Typography>
          <img
            src="https://cdn-icons-png.flaticon.com/512/12663/12663066.png"
            style={{ height: "30px", width: "30px", margin: "5px 0 0 5px" }}
          />
        </div>
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
              user.userProfile === "admin"
                ? navigate("/addcourse")
                : navigate("/purchasedCourses");
              //TODO: change this to navigate to purchased courses, make the page for it first
            }}
          >
            {button1Name}
          </Button>
          <Button
            variant="outlined"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              user.userProfile === "admin"
                ? navigate("/courses")
                : navigate("/publishedCourses");
              //TODO: create a page for published courses
            }}
          >
            view courses
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              localStorage.setItem("authorization", null);
              setUser((prevState) => ({
                ...prevState,
                userEmail: null,
                userProfile: null,
              }));
              console.log("after logging out, user is: ", user);
              navigate("/");
              // window.location = "/";
            }}
          >
            logout
          </Button>

          <Button
            variant="outlined"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              console.log("user is: ", user);
            }}
          >
            check
          </Button>
        </div>
      </div>
    );
  } else {
    console.log("inside else in appbar");
    return (
      <div
        style={{
          background: "#F3F3F3",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography variant="h4" style={{ marginLeft: "10px" }}>
            Learniverse
          </Typography>
          <img
            src="https://cdn-icons-png.flaticon.com/512/12663/12663066.png"
            style={{ height: "30px", width: "30px", margin: "5px 0 0 5px" }}
          />
        </div>

        <div
          style={{
            margin: "5px 10px 0 0",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
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

          {/*<Button*/}
          {/*    variant="outlined"*/}
          {/*    style={{marginLeft: "10px"}}*/}
          {/*    onClick={() => {*/}
          {/*        console.log("user is: ", user);*/}
          {/*    }}*/}
          {/*>*/}
          {/*    check*/}
          {/*</Button>*/}
        </div>
      </div>
    );
  }
}

export default AppBar;
