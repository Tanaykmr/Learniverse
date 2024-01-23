import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div id="motherDiv">
      landingpage
      <div
        style={{
          paddingTop: "100px",
        }}
        id="motherDiv2"
      >
        <Typography align="center">Welcome back, user</Typography>
        <div
          id="motherDiv3"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            style={{
              marginTop: "10px",
            }}
          >
            <Typography variant="h4">Account details here</Typography>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/addcourse");
              }}
            >
              Create Course
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

