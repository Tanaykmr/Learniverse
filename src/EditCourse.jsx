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
import Grid from "@mui/material/Unstable_Grid2";
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
  const [isChecked, setIsChecked] = useState(true);

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
            label="Image link"
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
                  defaultChecked
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
                    "http://localhost:3000/admin/courses/" + currentCourse._id,
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
                    console.log(response.data.message);
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
                    .delete(
                      "http://localhost:3000/admin/courses/" +
                        currentCourse._id,
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
          {/* <Button
            variant="contained"
            onClick={async () => {
              axios.put(
                "http://localhost:3000/admin/courses/" +
                  props.currentCourse._id,
                {
                  title: title,
                  description: description,
                  imageLink: image,
                  published: isChecked,
                  price,
                },
                {
                  headers: {
                    Authorization:
                      "Bearer " + localStorage.getItem("Authorization"),
                  },
                }
              );
              let updatedCourse = {
                _id: props.currentCourse._id,
                title: title,
                description: description,
                imageLink: image,
                price: price,
              };
              props.setCurrentCourse(updatedCourse);
            }}
          >
            Update course
          </Button> */}
        </div>
      </Card>
    </div>
  );
}

// function UpdateCard(props) {
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isChecked, setIsChecked] = useState(true);
//   const [imageLink, setimageLink] = useState("");
//   const [courseList, setcourseList] = useState([]);
//   return (
//     <Card
//       sx={{ borderRadius: "8px" }}
//       style={{
//         width: "400px",
//         padding: "20px",
//       }}
//       id="mainCard"
//     >
//       <div>
//         <Typography
//           textAlign={"center"}
//           variant="h5"
//           style={{ margin: "10px" }}
//         >
//           Update course here
//         </Typography>
//         <TextField
//           fullWidth={true}
//           label="Title"
//           variant="outlined"
//           onChange={(e) => {
//             setTitle(e.target.value);
//           }}
//         />
//         <TextField
//           fullWidth={true}
//           label="Description"
//           multiline
//           maxRows={4}
//           style={{ margin: "10px 0" }}
//           onChange={(e) => {
//             setDescription(e.target.value);
//           }}
//         />
//         <TextField
//           fullWidth={true}
//           label="Image Link"
//           multiline
//           maxRows={4}
//           style={{ margin: "10px 0" }}
//           onChange={(e) => {
//             setimageLink(e.target.value);
//           }}
//         />
//         <FormGroup
//           style={{
//             width: "20px",
//           }}
//         >
//           <FormControlLabel
//             control={
//               <Checkbox
//                 defaultChecked
//                 onChange={(e) => {
//                   setIsChecked(e.target.checked);
//                 }}
//               />
//             }
//             label="Publish"
//           />
//         </FormGroup>
//         <br />
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <Button
//             size="large"
//             variant="contained"
//             onClick={async () => {
//               await axios
//                 .put(
//                   "http://localhost:3000/admin/courses/" +
//                     props.currentCourse._id,
//                   {
//                     title: title,
//                     description: description,
//                     published: isChecked,
//                     imageLink: imageLink,
//                   },
//                   {
//                     headers: {
//                       authorization:
//                         "Bearer " + localStorage.getItem("authorization"),
//                     },
//                   }
//                 )
//                 .then((response) => {
//                   console.log(response.data.message);
//                   let updatedCourse = {
//                     _id: props.currentCourse._id,
//                     title: title,
//                     description: description,
//                     imageLink: imageLink,
//                     published: isChecked,
//                   };
//                   props.setCurrentCourse(updatedCourse);
//                   alert(response.data.message);
//                 })
//                 .catch((error) => {
//                   console.log("unable to update the course");
//                   console.log("the error is: ", error);
//                   alert("unable to update the course");
//                 });
//             }}
//           >
//             Update course
//           </Button>
//           <Button
//             size="large"
//             variant="contained"
//             startIcon={<DeleteIcon />}
//             color="error"
//             onClick={async () => {
//               try {
//                 await axios
//                   .delete(
//                     "http://localhost:3000/admin/courses/" +
//                       props.currentCourse._id,
//                     {
//                       headers: {
//                         authorization:
//                           "Bearer " + localStorage.getItem("authorization"),
//                       },
//                     }
//                   )
//                   .then(() => {
//                     // window.location = "/courses";
//                     navigate("/courses");
//                     console.log("deleted the course");
//                   });
//               } catch (error) {
//                 console.log("error deleting course: ", error);
//               }
//             }}
//           >
//             Delete course
//           </Button>
//         </div>
//       </div>
//     </Card>
//   );
// }

function CourseCard({currentCourse}) {
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
        <img src={currentCourse.imageLink} style={{ width: 350 }}></img>
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

// function CourseCard(props) {
//   // currentCourse card here
//   console.log("hello from CourseCard");
//   return (
//     <Card
//       sx={{ borderRadius: "15px" }}
//       style={{
//         width: "300px",
//         padding: "10px",
//         minHeight: "200px",
//         marginLeft: "200px",
//         marginBottom: "200px",
//         display: "flex",
//         justifyContent: "center",
//         flexDirection: "column",
//         zIndex: 2,
//       }}
//       id="mainCard"
//       elevation={4}
//     >
//       <Typography textAlign={"center"} variant="h4">
//         {props.currentCourse.title}
//       </Typography>

//       <Typography textAlign={"center"} variant="subtitle1">
//         {props.currentCourse.description}
//       </Typography>

//       <img
//         src={props.currentCourse.imageLink}
//         style={{
//           // height: "300px",
//           // width: "300px",
//           // padding: "5px",
//           // display: "flex",
//           // justifyContent: "center",
//           // marginRight: "190px",
//           width: "250px",
//           padding: "5px",
//           border: "5px solid black",
//           display: "flex",
//           marginLeft: "auto",
//           marginRight: "auto",
//           marginBottom: "5px",
//         }}
//       ></img>
//     </Card>
//   );
// }

CourseCard.propTypes = {
  currentCourse: PropTypes.object.isRequired,
}; //
//TODO: add course prop strictness(proptypes)
export default Course;
