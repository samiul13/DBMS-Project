import DeanDashboard from "views/DeanDashboard.js";
import StudentPerformance from "views/StudentPerformance.js";
import FacultyStudentPerformance from "views/FacultyStudentPerformance.js";
import ProgressView from "views/ProgressView.js";
import CourseStudentPerformance from "views/CourseStudentPerformance.js";
import DeanStudentPerformance from "views/DeanStudentPerformance.js";
import PLO from "views/PLO.js";
import DataEntry from "views/DataEntry.js";



const deanRoutes = [
 
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: DeanDashboard,
    layout: "/dean",
  },
  {
    path: "/studentPerformance",
    name: "Student Performance",
    icon: "nc-icon nc-chart",
    component: StudentPerformance,
    layout: "/dean",
  },
  {
    path: "/facultyStudentPerformance",
    name: "Faculty-Student-GPA",
    icon: "nc-icon nc-tablet-2",
    component: FacultyStudentPerformance,
    layout: "/dean",
  },
  {
    path: "/courseStudentPerformance",
    name: "Course-Student-GPA",
    icon: "nc-icon nc-paper-2",
    component: CourseStudentPerformance,
    layout: "/dean",
  },
  {
    path: "/deanStudentPerformance",
    name: "Dean-Student-GPA",
    icon: "nc-icon nc-single-copy-04",
    component: DeanStudentPerformance,
    layout: "/dean",
  },
  {
    path: "/plo",
    name: "PLO Analysis",
    icon: "nc-icon nc-ruler-pencil",
    component: PLO,
    layout: "/dean",
  },
  {
    path: "/progressView",
    name: "Progress View",
    icon: "nc-icon nc-chart-pie-35",
    component: ProgressView,
    layout: "/dean",
  }
  
  
];

export default deanRoutes;
