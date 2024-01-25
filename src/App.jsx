import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./Signin";
import AppBar from "./AppBar";
import LandingPage from "./Landing";
import AddCourse from "./AddCourse";
import Courses from "./Courses";
import EditCourse from "./EditCourse";

function App() {
  return (
    <Router>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "#F3F3F3	",
          overflowX: "hidden",
        }}
        id="ogdiv"
        //TODO: remove div id
      >
        <AppBar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<EditCourse />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;

