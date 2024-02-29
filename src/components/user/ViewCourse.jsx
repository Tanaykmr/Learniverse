import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { Typography, Card, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ViewCourse() {
  let { courseId } = useParams();
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/courses/` + courseId, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("authorization"),
        },
      })
      .then((response) => {
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

        <PurchaseCard currentCourse={currentCourse} courseId={courseId} />
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

function PurchaseCard({ currentCourse, courseId }) {
  const navigate = useNavigate();
  const videoLink = `https://www.youtube.com/embed/${currentCourse.imageLink}`;
  return (
    <div id="view card" style={{ display: "flex", justifyContent: "center" }}>
      <Card
        varint={"outlined"}
        style={{
          maxWidth: 900,
          marginTop: 200,
          marginBottom: 200,
          background: "#F5DD61",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "30px",
            paddingBottom: "0",
          }}
        >
          <iframe
            width="800"
            height="452"
            src={videoLink}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />

          <Button
            size="large"
            variant="contained"
            startIcon={<DeleteIcon />}
            color="error"
            style={{ margin: "20px auto" }}
            onClick={async () => {
              try {
                await axios
                  .delete(`${BASE_URL}/user/courses/${courseId}`, {
                    headers: {
                      authorization:
                        "Bearer " + localStorage.getItem("authorization"),
                    },
                  })
                  .then(() => {
                    navigate("/purchasedCourses");
                  });
              } catch (error) {
                console.log("error deleting course: ", error);
              }
            }}
          >
            Delete course
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ViewCourse;
