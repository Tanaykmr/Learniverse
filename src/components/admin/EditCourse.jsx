import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography, Card, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Unstable_Grid2";
import { BASE_URL } from "../../config";

//edits the courses
function Course() {
  let { courseId } = useParams();
  const [currentCourse, setCurrentCourse] = useState(null);
  //   const [currentCourse, setCurrentCourse] = useState([]); we cannot let currentCourse be a state variable because "objects are not a valid react child"

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/courses/` + courseId, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("authorization"),
        },
      })
      .then((response) => {
        console.log("the current course is: ", response.data.course);
        setCurrentCourse(response.data.course);
        console.log("currentCourse: ", currentCourse);
        // this currentCourse will be null in the console because it is running synchronously, and hence is printed before currentCourse is populated. However, the rest of the code works because currentCourse is populated by then
      })
      .catch((error) => {
        console.error("Error fetching course data: ", error);
      });
  }, []);

  if (!currentCourse) {
    return <div>loading...</div>;
  } else {
    return (
      <div>
        <GrayTopper title={currentCourse.title} />
        <Grid container>
          <Grid item lg={8} md={12} sm={12}>
            <UpdateCard
              currentCourse={currentCourse}
              setCurrentCourse={setCurrentCourse}
            />
          </Grid>
          <Grid item lg={4} md={12} sm={12}>
            <CourseCard currentCourse={currentCourse} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

function GrayTopper({ title }) {
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function UpdateCard({ currentCourse, setCurrentCourse }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(currentCourse.title);
  const [description, setDescription] = useState(currentCourse.description);
  const [imageLink, setImageLink] = useState(currentCourse.imageLink);
  const [price, setPrice] = useState(currentCourse.price);
  const [isChecked, setIsChecked] = useState(currentCourse.published);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card varint={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
        <div style={{ padding: 20 }}>
          <Typography style={{ marginBottom: 10 }}>
            Update course details
          </Typography>
          <TextField
            value={title}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            value={description}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <TextField
            value={imageLink}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setImageLink(e.target.value);
            }}
            fullWidth={true}
            label="Youtube Video Id"
            variant="outlined"
          />
          <TextField
            value={price}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />

          <FormGroup
            style={{
              width: "20px",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={(e) => {
                    setIsChecked(e.target.checked);
                  }}
                />
              }
              label="Publish"
            />
          </FormGroup>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              size="large"
              variant="contained"
              onClick={async () => {
                await axios
                  .put(
                    `${BASE_URL}/admin/courses/` + currentCourse._id,
                    {
                      title: title,
                      description: description,
                      published: isChecked,
                      imageLink: imageLink,
                      price: price,
                    },
                    {
                      headers: {
                        authorization:
                          "Bearer " + localStorage.getItem("authorization"),
                      },
                    }
                  )
                  .then((response) => {
                    let updatedCourse = {
                      _id: currentCourse._id,
                      title: title,
                      description: description,
                      imageLink: imageLink,
                      published: isChecked,
                      price: price,
                    };
                    setCurrentCourse(updatedCourse);
                    alert(response.data.message);
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
                    .delete(`${BASE_URL}/admin/courses/` + currentCourse._id, {
                      headers: {
                        authorization:
                          "Bearer " + localStorage.getItem("authorization"),
                      },
                    })
                    .then(() => {
                      navigate("/courses");
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
    </div>
  );
}

function CourseCard({ currentCourse }) {
  const imageUrl = `https://img.youtube.com/vi/${currentCourse.imageLink}/maxresdefault.jpg`;
  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        <img src={imageUrl} style={{ width: 350 }}></img>
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{currentCourse.title}</Typography>
          <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
          </Typography>
          <Typography variant="subtitle1">
            <b>Rs {currentCourse.price} </b>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

CourseCard.propTypes = {
  currentCourse: PropTypes.object.isRequired,
}; //
//TODO: add course prop strictness(proptypes)
export default Course;
