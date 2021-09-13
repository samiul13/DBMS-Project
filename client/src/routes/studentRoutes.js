import StudentDashboard from "views/StudentDashboard.js";
import StudentPerformance from "views/StudentPerformance.js";
import FacultyStudentPerformance from "views/FacultyStudentPerformance.js";
import ProgressView from "views/ProgressView.js";
import CourseStudentPerformance from "views/CourseStudentPerformance.js";
import DeanStudentPerformance from "views/DeanStudentPerformance.js";
import PLO from "views/PLO.js";
import DataEntry from "views/DataEntry.js";



const studentRoutes = [
 
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: StudentDashboard,
    layout: "/student",
  },
 
  {
    path: "/plo",
    name: "PLO Analysis",
    icon: "nc-icon nc-ruler-pencil",
    component: PLO,
    layout: "/student",
  },
  {
    path: "/progressView",
    name: "Progress View",
    icon: "nc-icon nc-chart-pie-35",
    component: ProgressView,
    layout: "/student",
  }
  
];

export default studentRoutes;
