import Dashboard from "views/Dashboard.js";
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
    component: Dashboard,
    layout: "/student",
  },
  {
    path: "/studentPerformance",
    name: "Student Performance",
    icon: "nc-icon nc-chart",
    component: StudentPerformance,
    layout: "/student",
  },
  {
    path: "/facultyStudentPerformance",
    name: "Faculty-Student-GPA",
    icon: "nc-icon nc-tablet-2",
    component: FacultyStudentPerformance,
    layout: "/student",
  },
  {
    path: "/courseStudentPerformance",
    name: "Course-Student-GPA",
    icon: "nc-icon nc-paper-2",
    component: CourseStudentPerformance,
    layout: "/student",
  },
  {
    path: "/deanStudentPerformance",
    name: "Dean-Student-GPA",
    icon: "nc-icon nc-single-copy-04",
    component: DeanStudentPerformance,
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
