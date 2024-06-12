import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import StudentLogin from "./pages/StudentLogin";
import StudentHome from "./pages/StudentHome";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherHome from "./pages/TeacherHome";
import StudentWeeklySchedule from "./components/StudentWeeklySchedule";
import ClassEvaluation from "./components/ClassEvaluation";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/student/:id" element={<StudentHome />} />
        <Route path="/teacher" element={<TeacherLogin />} /> 
        <Route path="/teacher/:id" element={<TeacherHome />} />
        <Route path="/" element={<StudentWeeklySchedule  />} />
        <Route path="/classEvaluation" element={<ClassEvaluation />} />
      </Routes>
    </div>
  );
}

export default App;
