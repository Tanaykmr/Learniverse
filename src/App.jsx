import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import userState from "./store/atoms/user";
import { useEffect } from "react";
import axios from "axios";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import AppBar from "./components/AppBarRecoil";
import LandingPage from "./components/Landing";
import AddCourse from "./components/AddCourse";
import Courses from "./components/Courses";
import EditCourse from "./components/EditCourse";
import {BASE_URL} from "./config.js";


function App() {
  return (
    <RecoilRoot>
      <Router>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            background: "#F3F3F3",
            overflowX: "hidden",
          }}
        >
          <InitUser />
          <AppBar />
          <Routes>
          <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<EditCourse />} />
          </Routes>
        </div>
      </Router>
    </RecoilRoot>
  );
}
export default App;

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      await axios
        .get(`${BASE_URL}/admin/me`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("authorization"),
          },
        })
        .then((response) => {

          setUser({ isLoading: false, userEmail: response.data.username });
        })
        .catch((e) => {
          console.log("error inside else in app.jsx");
          setUser({ isLoading: false, userEmail: null });
        });
    } catch (error) {
      console.log("unable to init: ", error);
      setUser({ isLoading: false, userEmail: null });
    }
  };
  useEffect(() => {
    init();
  }, []);
}
