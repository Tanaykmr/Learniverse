import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "100px",
        marginRight: "20px",
      }}
    >
      <div
        style={{ display: "flex", flexFlow: "column nowrap", margin: "20px" }}
      >
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", fontFamily: "arial", }}
        >
          Ditch the guesswork: Expert-picked courses for every ambition
        </Typography>
        <Typography variant="subtitle1">
          Master in-demand skills, land your dream job, and boost your salary.
          <br />
          Sign up today: <Button
            variant="contained"
            size="large"
            style={{ width: "150px", marginLeft: "20px", }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </Button>
          <Button
            variant="contained"
            size="large"
            style={{ width: "150px", marginLeft: "20px", }}
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign in
          </Button>
        </Typography>
      </div>
      <img
        src="https://classplusapp.com/growth/wp-content/uploads/2023/04/Understanding-The-Different-Levels-Of-Teaching-1.jpg"
        style={{ height: "468px", width: "700px", border: "2px solid black" }}
      ></img>
    </div>
  );
}

export default LandingPage;
