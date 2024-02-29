import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import {Typography, Card, TextField, Button} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {BASE_URL} from "../../config";

//edits the courses
function BuyCourse() {
    let {courseId} = useParams();
    const [currentCourse, setCurrentCourse] = useState(null);
    //   const [currentCourse, setCurrentCourse] = useState([]); we cannot let currentCourse be a state variable because "objects are not a valid react child"

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
        return (<div>
            <GrayTopper title={currentCourse.title}/>
            <Grid container>
                <Grid item lg={8} md={12} sm={12}>
                    <PurchaseCard
                        currentCourse={currentCourse} courseId={courseId}
                    />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <CourseCard currentCourse={currentCourse}/>
                </Grid>
            </Grid>
        </div>);
    }
}

function GrayTopper({title}) {
    return (<div
        style={{
            height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250,
        }}
    >
        <div
            style={{
                height: 250, display: "flex", justifyContent: "center", flexDirection: "column",
            }}
        >
            <div>
                <Typography
                    style={{color: "white", fontWeight: 600}}
                    variant="h3"
                    textAlign={"center"}
                >
                    {title}
                </Typography>
            </div>
        </div>
    </div>);
}

function PurchaseCard({currentCourse, courseId}) {

    const handlePurchase = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/user/courses/${courseId}`, undefined, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("authorization")
                }
            });
            if (response.status >= 200) {
                alert("Purchase successful!");
            }
        } catch (error) {
            console.error("Error occurred during purchase:", error);
            if(error.response.status === 409)
            {
                alert("Course already purchased");
            }
        }
    };

    return (<div style={{display: "flex", justifyContent: "center"}}>
        <Card varint={"outlined"} style={{maxWidth: 600, marginTop: 200}}>
            <div style={{padding: 20}}>
                <Typography style={{marginBottom: 10}}>
                    Course details
                </Typography>
                <TextField
                    id="outlined-read-only-input"
                    label="Title"
                    defaultValue={currentCourse.title}
                    InputProps={{
                        readOnly: true,
                    }}
                    style={{marginBottom: "10px"}}
                    fullWidth={true}
                />
                <TextField
                    id="outlined-read-only-input"
                    label="Description"
                    defaultValue={currentCourse.description}
                    InputProps={{
                        readOnly: true,
                    }}
                    style={{marginBottom: "10px"}}
                    fullWidth={true}
                />

                <TextField
                    id="outlined-read-only-input"
                    label="Price"
                    defaultValue={currentCourse.price}
                    InputProps={{
                        readOnly: true,
                    }}
                    style={{marginBottom: "10px"}}
                />

                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Button
                        size="large"
                        variant="contained"
                        onClick={handlePurchase}
                    >
                        Purchase course
                    </Button>

                </div>
            </div>
        </Card>
    </div>);
}

function CourseCard({currentCourse}) {
    const imageUrl = `https://img.youtube.com/vi/${currentCourse.imageLink}/maxresdefault.jpg`

    return (<div
        style={{
            display: "flex", marginTop: 50, justifyContent: "center", width: "100%",
        }}
    >
        <Card
            style={{
                margin: 10, width: 350, minHeight: 200, borderRadius: 20, marginRight: 50, paddingBottom: 15, zIndex: 2,
            }}
        >
            <img src={imageUrl} style={{width: 350}}></img>
            <div style={{marginLeft: 10}}>
                <Typography variant="h5"><b>{currentCourse.title}</b></Typography>
                <Typography variant="subtitle2" style={{color: "gray"}}>
                    Price
                </Typography>
                <Typography variant="subtitle1">
                    Rs {currentCourse.price}
                </Typography>
            </div>
        </Card>
    </div>);
}

CourseCard.propTypes = {
    currentCourse: PropTypes.object.isRequired,
}; //
//TODO: add course prop strictness(proptypes)
export default BuyCourse;

