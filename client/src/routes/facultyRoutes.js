import Dashboard from "views/Dashboard.js";
import StudentPerformance from "views/StudentPerformance.js";
import FacultyStudentPerformance from "views/FacultyStudentPerformance.js";
import ProgressView from "views/ProgressView.js";
import CourseStudentPerformance from "views/CourseStudentPerformance.js";
import DeanStudentPerformance from "views/DeanStudentPerformance.js";
import PLO from "views/PLO.js";
import DataEntry from "views/DataEntry.js";



const facultyRoutes = [
 
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/faculty",
  },

  {
    path: "/dataEntry",
    name: "Invididual Vs. Average PLO",
    icon: "nc-icon nc-vector",
    component: DataEntry,
    layout: "/faculty",
  },
  {
    path: "/dataEntry",
    name: "Invididual Vs. Program Average PLO",
    icon: "nc-icon nc-vector",
    component: DataEntry,
    layout: "/faculty",
  },
  {
    path: "/dataEntry",
    name: "Individual Course-Wise PLO",
    icon: "nc-icon nc-vector",
    component: DataEntry,
    layout: "/faculty",
  },
  {
    path: "/dataEntry",
    name: "Course-Wise PLO Among instructors",
    icon: "nc-icon nc-vector",
    component: DataEntry,
    layout: "/faculty",
  },
  {
    path: "/dataEntry",
    name: "Course-Wise PLO Comparison",
    icon: "nc-icon nc-vector",
    component: DataEntry,
    layout: "/faculty",
  },
  {
    path: "/dataEntry",
    name: "Program-Wise Att. Vs. Achv. PLO",
    icon: "nc-icon nc-vector",
    component: DataEntry,
    layout: "/faculty",
  },
  {
    path: "/dataEntry",
    name: "University-Wise PLO Comparison",
    icon: "nc-icon nc-vector",
    component: DataEntry,
    layout: "/faculty",
  },
  {
    path: "/dataEntry",
    name: "Uni./Program-Wise PLO Comparison",
    icon: "nc-icon nc-vector",
    component: DataEntry,
    layout: "/faculty",
  },
  {
    path: "/dataEntry",
    name: "Department/School-Wise PLO",
    icon: "nc-icon nc-vector",
    component: DataEntry,
    layout: "/faculty",
  },
  {
    path: "/dataEntry",
    name: "Department/School-Wise Avg. PLO",
    icon: "nc-icon nc-vector",
    component: DataEntry,
    layout: "/faculty",
  },

  
];

export default facultyRoutes;
