import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";

// lists out all the courses

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/admin/courses", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("authorization")
      }
    }).then((response)=>{
      console.log(response);
      setCourses(response.data.courses);
    }).catch(()=>{
      console.log("Network response was not ok"); 
    })






    // fetch("http://localhost:3000/admin/courses", {
    //   method: "GET",
    //   headers: {
    //     authorization: "Bearer " + localStorage.getItem("authorization"),
    //   },
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error("Network response was not ok"); 
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log("data is", data);
    //     setCourses(data.courses);
    //     console.log(JSON.stringify(data.courses));
    //   });
  }, []);
  
  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <Typography variant="h6" id="your-course">Your courses are: </Typography>
    {/* TODO: remove id name, remove */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // Corrected: Use flexWrap instead of flex-wrap
          justifyContent: "center"
        }}
      >
       {courses.map(course => {
            return <Course key = {course._id} coursee={course} />}
        )}
      </div>
    </div>
  )
}



function Course(props) {
  {console.log("hello from Course component from inside courses")}
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Card
        sx={{borderRadius: '15px'}}
          style={{
            margin: "10px",
            width: "300px",
            padding: "10px",
            minHeight: "200px",
            // display: "flex",
            // justifyContent: "center",
            // flexDirection: "column",
          }}
          id="mainCard"
          elevation={4}
        >
          <Typography textAlign={"center"} variant="h4">
            {props.coursee.title}
          </Typography>

          <Typography textAlign={"center"} variant="subtitle1">
            {props.coursee.description}
          </Typography>

          <img
            src={props.coursee.imageLink}
            style={{ width: "100px", padding: "5px" ,border: "5px solid #555", display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          marginBottom: "5px"}}
          ></img>
        </Card>
      </Grid>
    </Grid>
  );
}

// this is to ensure the strictness of the i/p that goes in, this is amongst the places whre TS comes into play and helps us make code more strict

export default Courses;

