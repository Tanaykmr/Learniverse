import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import PropTypes from "prop-types";
import { Typography, Card, TextField, Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

function Course() {
  let { courseId } = useParams();
  const setCourseList = useSetRecoilState(coursesState);
  console.log("hello from main component")
  //   const [currentCourse, setcurrentCourse] = useState([]); we cannot let currentCourse be a state variable because "objects are not a valid react child"

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("authorization"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("unable to get a response");
        }
        return res.json();
      })
      .then((data) => {
        console.log("the courseList is:" + JSON.stringify(data));
        setCourseList(data.courses);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, []);

  return (
    <div
      style={{
        margin: "10px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CourseCard courseId={courseId}></CourseCard>
      <UpdateCard courseId={courseId}></UpdateCard>
    </div>
  );
}

function CourseCard(props) {
  // currentCourse card here
  console.log("hello from CourseCard");
  const courseList = useRecoilValue(coursesState);
  let currentCourse = null;
  for (let i = 0; i < courseList.length; i++) {
    if (courseList[i].id == props.courseId) {
      currentCourse = courseList[i];
      console.log("currentCourse found in coursecard");
    }
  }
  if (!currentCourse) {
    return <div>loading...</div>;
  } else {
    return (
      <Card
        style={{
          margin: "10px",
          width: "300px",
          padding: "10px",
          minHeight: "200px",

          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
        id="mainCard"
        elevation={4}
      >
        <Typography textAlign={"center"} variant="h4">
          {currentCourse.title}
        </Typography>

        <Typography textAlign={"center"} variant="subtitle1">
          {currentCourse.description}
        </Typography>

        <img
          src={currentCourse.imageLink}
          style={{
            height: "300px",
            width: "300px",
            padding: "5px",
            display: "flex",
            justifyContent: "center",
            marginRight: "190px",
          }}
        ></img>
      </Card>
    );
  }
}

function UpdateCard(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [imageLink, setimageLink] = useState("");
  const [courseList, setCourseList] = useRecoilState(coursesState);

  let currentCourse = null;
  for (let i = 0; i < courseList.length; i++) {
    if (courseList[i].id == props.courseId) {
      currentCourse = courseList[i];
      console.log("currentCourse found in updateCard");
    }
  }

  return (
    <Card
      style={{
        width: "400px",
        padding: "20px",
      }}
      id="mainCard"
    >
      <div>
        <Typography
          textAlign={"center"}
          variant="h5"
          style={{ margin: "10px" }}
        >
          Update course here
        </Typography>
        <TextField
          fullWidth={true}
          label="Title"
          variant="outlined"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          fullWidth={true}
          label="Description"
          multiline
          maxRows={4}
          style={{ margin: "10px 0" }}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <TextField
          fullWidth={true}
          label="Image Link"
          multiline
          maxRows={4}
          style={{ margin: "10px 0" }}
          onChange={(e) => {
            setimageLink(e.target.value);
          }}
        />
        <FormGroup
          style={{
            width: "20px",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={(e) => {
                  setIsChecked(e.target.checked);
                }}
              />
            }
            label="Publish"
          />
        </FormGroup>
        <br />
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            fetch("http://localhost:3000/admin/courses/" + props.courseId, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                authorization:
                  "Bearer " + localStorage.getItem("authorization"),
              },
              body: JSON.stringify({
                title: title,
                description: description,
                published: isChecked,
                imageLink: imageLink,
              }),
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  alert("unable to update " + title + " course");
                }
              })
              .then(() => {
                let updatedCourses = [];
                for (let i = 0; i < courseList.length; i++) {
                  if (courseList[i].id == currentCourse.id) {
                    updatedCourses.push({
                      title,
                      description,
                      imageLink,
                      published: isChecked,
                      id: currentCourse.id,
                    });
                  } else {
                    updatedCourses.push(courseList[i]);
                  }
                }
                setCourseList(updatedCourses);
                //
              });
          }}
        >
          Update course
        </Button>
      </div>
    </Card>
  );
}


//TODO: add course prop strictness(proptypes)
export default Course;

const coursesState = atom({
  key: "coursesState", //should be unique for every atom
  default: " ",
});

