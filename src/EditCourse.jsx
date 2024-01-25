import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography, Card, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//edit the courses
function Course() {
  let { courseId } = useParams();
  const [currentCourse, setCurrentCourse] = useState(null);
  //   const [currentCourse, setCurrentCourse] = useState([]); we cannot let currentCourse be a state variable because "objects are not a valid react child"

  useEffect(() => {
    console.log("hello from useEffect");
    axios
      .get("http://localhost:3000/admin/courses/" + courseId, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("authorization"),
        },
      })
      .then((response) => {
        console.log("the current course is: ", response.data.course);
        setCurrentCourse(response.data.course);
        console.log("currentCourse: ", currentCourse);
      })
      .catch((error) => {
        console.error("Error fetching course data: ", error);
      });
  }, []);

  if (!currentCourse) {
    return <div>loading...</div>;
  } else {
    return (
      <div
        style={{
          margin: "10px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CourseCard currentCourse={currentCourse}></CourseCard>
        <UpdateCard
          currentCourse={currentCourse}
          setCurrentCourse={setCurrentCourse}
        ></UpdateCard>
      </div>
    );
  }
}

function CourseCard(props) {
  // currentCourse card here
  console.log("hello from CourseCard");
  return (
    <Card
      sx={{ borderRadius: "15px" }}
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
        {props.currentCourse.title}
      </Typography>

      <Typography textAlign={"center"} variant="subtitle1">
        {props.currentCourse.description}
      </Typography>

      <img
        src={props.currentCourse.imageLink}
        style={{
          // height: "300px",
          // width: "300px",
          // padding: "5px",
          // display: "flex",
          // justifyContent: "center",
          // marginRight: "190px",
          width: "250px",
          padding: "5px",
          border: "5px solid black",
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "5px",
        }}
      ></img>
    </Card>
  );
}

function UpdateCard(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [imageLink, setimageLink] = useState("");
  const [courseList, setcourseList] = useState([]);
  return (
    <Card
      sx={{ borderRadius: "8px" }}
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            size="large"
            variant="contained"
            onClick={async () => {
              await axios
                .put(
                  "http://localhost:3000/admin/courses/" +
                    props.currentCourse._id,
                  {
                    title: title,
                    description: description,
                    published: isChecked,
                    imageLink: imageLink,
                  },
                  {
                    headers: {
                      authorization:
                        "Bearer " + localStorage.getItem("authorization"),
                    },
                  }
                )
                .then((response) => {
                  alert(response.data.message);
                  console.log(response.data.message);
                  let updatedCourse = {
                    _id: props.currentCourse._id,
                    title: title,
                    description: description,
                    imageLink: imageLink,
                    published: isChecked,
                  };
                  props.setCurrentCourse(updatedCourse);
                })
                .catch((error) => {
                  console.log("unable to update the course");
                  console.log("the error is: ", error);
                  alert("unable to update the course");
                });
            }}
          >
            Update course
          </Button>
          <Button
            size="large"
            variant="contained"
            startIcon={<DeleteIcon />}
            color="error"
            onClick={async () => {
              try {
                await axios
                  .delete(
                    "http://localhost:3000/admin/courses/" +
                      props.currentCourse._id,
                    {
                      headers: {
                        authorization:
                          "Bearer " + localStorage.getItem("authorization"),
                      },
                    }
                  )
                  .then(() => {
                    // window.location = "/courses";
                    navigate("/courses");
                    console.log("deleted the course");
                  });
              } catch (error) {
                console.log("error deleting course: ", error);
              }
            }}
          >
            Delete course
          </Button>
        </div>
      </div>
    </Card>
  );
}

CourseCard.propTypes = {
  currentCourse: PropTypes.object.isRequired,
}; //
//TODO: add course prop strictness(proptypes)
export default Course;
