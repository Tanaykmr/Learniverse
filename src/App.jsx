import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";


import {RecoilRoot, useRecoilState} from "recoil";
import userState from "./store/atoms/User";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import AppBar from "./components/AppBarRecoil";
import LandingPage from "./components/Landing";
import AddCourse from "./components/admin/AddCourse.jsx";
import Courses from "./components/admin/AdminCourses.jsx";
import EditCourse from "./components/admin/EditCourse";
import PublishedCourses from "./components/user/PublishedCourses.jsx"
import {BASE_URL} from "./config.js";
import BuyCourse from "./components/user/BuyCourse.jsx";
import PurchasedCourses from "./components/user/PurchasedCourses.jsx";
import ViewCourse from "./components/user/ViewCourse.jsx";

function App() {
    return (<RecoilRoot>
        <Router>
            <div
                style={{
                    width: "100vw", height: "100vh", background: "#F3F3F3", overflowX: "hidden",
                }}
            >
                <InitUser/>
                <AppBar/>
                <Routes>
                    {/*common pages*/}
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/landing" element={<LandingPage/>}/>
                    {/*admin pages*/}
                    <Route path="/addcourse" element={<AddCourse/>}/>
                    <Route path="/courses" element={<Courses/>}/>
                    <Route path="/courses/:courseId" element={<EditCourse/>}/>
                    {/*user pages*/}
                    <Route path="/publishedCourses" element={<PublishedCourses/>}/>
                    <Route path="/buycourse/:courseId" element={<BuyCourse/>}/>
                    <Route path="/purchasedCourses" element={<PurchasedCourses/>}/>
                    <Route path="/viewCourse/:courseId" element={<ViewCourse/>}/>
                </Routes>
            </div>
        </Router>
    </RecoilRoot>);
}

export default App;

function InitUser() {
    const [user, setUser] = useRecoilState(userState);
    console.log("in inituser, user is: ", user)
    console.log("USER PROFILE IS: ", user.userProfile);
    if (!user.userEmail) console.log("userEmail does not exist")

    const init = async () => {
        console.log("inside init");
        try {
            console.log("trying inside init")
            if (!user.userEmail) {
                await axios
                    .get(`${BASE_URL}/me`, {
                        headers: {
                            authorization: "Bearer " + localStorage.getItem("authorization"),
                        },
                    })
                    .then((response) => {
                        console.log("in initUser after the me request, the response is: ", response)
                        setUser({
                            isLoading: false, userEmail: response.data.username, userProfile: response.data.userProfile
                        });
                    })
                    .catch((e) => {
                        console.log("error inside else in app.jsx: ", e);
                        setUser({isLoading: false, userEmail: null, userProfile: null});
                    });
            }
        } catch (error) {
            console.log("unable to init: ", error);
            setUser({isLoading: false, userEmail: null, userProfile: null});
        }
    };
    useEffect(() => {
        init();
    }, [user.userProfile]);


}
