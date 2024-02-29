import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../config.js";
import Grid from "@mui/material/Unstable_Grid2";
import {Button, Card, Typography} from "@mui/material";

function PurchasedCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/user/purchasedCourses`, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("authorization"),
                },
            })
            .then((response) => {
                setCourses(response.data.purchasedCourses);
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
                    <Typography textAlign={"center"} variant="h5" style={{marginBottom: "5px"}}>
                        {props.coursee.title}
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

                                navigate("/viewCourse/" + props.coursee._id);
                            }}
                        >
                            View course
                        </Button>
                    </div>
                </Card>
            </Grid>
        </Grid>
    );
}
export default PurchasedCourses;
