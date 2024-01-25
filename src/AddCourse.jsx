import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
// import Input from "@mui/material/Input";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
// import FormControl from "@mui/material/FormControl";
// import RupeeLogo from "./component-assets/rupee.png";

function AddCourse() {
  // attributes of a course:
  //   {
  //     "title": "Full stack development",
  //     "description": "Full stack dev course by harkirat",
  //     "price": 5999,
  //     "imageLink": "https://d33g7sdvsfd029.cloudfront.net/subject/2023-01-17-0.3698267942851394.jpg",
  //     "published": true
  // }
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [imageLink, setimageLink] = useState("");
  const [price, setPrice] = useState(0);
  return (
    <div>
      <div
        style={{
          paddingTop: "150px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">
          Welcome Admin, Create a course below
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            width: "400px",
            padding: "20px",
          }}
          id="mainCard"
        >
          <div>
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
            <TextField
              fullWidth={true}
              label="Price"
              multiline
              maxRows={4}
              style={{ margin: "10px 0" }}
              onChange={(e) => {
                setPrice(e.target.value);
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
              onClick={async () => {
                await axios
                  .post(
                    "http://localhost:3000/admin/courses",
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
                  .then(() => {
                    console.log(title, "created successfully");
                    alert(title + " created successfully");
                  })
                  .catch((error) => {
                    console.log("encountered an error: ", error);
                    alert("unable to create " + title + " course");
                  });

                // fetch("http://localhost:3000/admin/courses", {
                //   method: "POST",
                //   headers: {
                //     "Content-Type": "application/json",
                //     authorization:
                //       "Bearer " + localStorage.getItem("authorization"),
                //   },
                //   body: JSON.stringify({
                //     title: title,
                //     description: description,
                //     published: isChecked,
                //     imageLink: imageLink,
                //   }),
                // }).then((response) => {
                //   if (response.ok) {
                //     alert(title + " created successfully");
                //   } else {
                //     alert("unable to create " + title + " course");
                //   }
                // });
              }}
            >
              Create course
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default AddCourse;
