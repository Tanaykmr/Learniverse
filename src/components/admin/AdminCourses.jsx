import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../../config.js";


// lists out all the courses

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/courses`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("authorization"),
        },
      })
      .then((response) => {
        setCourses(response.data.courses);
      })
      .catch((error) => {
        console.log("Network response was not ok");
        console.log("error is: ", error)
      });

  }, []);

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      {/* TODO: remove id name, remove */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // Corrected: Use flexWrap instead of flex-wrap
          justifyContent: "center",
        }}
      >
        {courses.map((course) => {
          return <Course key={course._id} coursee={course} />;
        })}
      </div>
    </div>
  );
}

function Course(props) {
  const navigate = useNavigate();
  const imageUrl = `https://img.youtube.com/vi/${props.coursee.imageLink}/maxresdefault.jpg`

    return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Card
          sx={{ borderRadius: "15px" }}
          style={{
            margin: 10,
            width: 300,
            minHeight: 200,
            padding: 20,
          }}
          id="mainCard"
          elevation={4}
        >
          <Typography textAlign={"center"} variant="h5">
            {props.coursee.title}
          </Typography>

          <Typography textAlign={"center"} variant="subtitle1">
            {props.coursee.description}
          </Typography>

          <img
            src={imageUrl}
            style={{
              width: 300,
              height: 168.328,
              border: "5px solid orange",
            }}
          ></img>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "5px 0px -5px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                navigate("/courses/" + props.coursee._id);
              }}
            >
              edit course
            </Button>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}

// prop types are to ensure the strictness of the i/p that goes in, this is amongst the places where TS comes into play and helps us make code more strict

export default Courses;
