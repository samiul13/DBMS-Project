import DepartmentHeadDashboard from "views/DepartmentHeadDashboard.js";
import StudentPerformance from "views/StudentPerformance.js";
import FacultyStudentPerformance from "views/FacultyStudentPerformance.js";
import ProgressView from "views/ProgressView.js";
import CourseStudentPerformance from "views/CourseStudentPerformance.js";
import DeanStudentPerformance from "views/DeanStudentPerformance.js";
import PLO from "views/PLO.js";
import DataEntry from "views/DataEntry.js";

const departmentHeadRoutes = [
 
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: DepartmentHeadDashboard,
    layout: "/departmenthead",
  },
  {
    path: "/studentPerformance",
    name: "Student Performance",
    icon: "nc-icon nc-chart",
    component: StudentPerformance,
    layout: "/departmenthead",
  },
  {
    path: "/facultyStudentPerformance",
    name: "Faculty-Student-GPA",
    icon: "nc-icon nc-tablet-2",
    component: FacultyStudentPerformance,
    layout: "/departmenthead",
  },
  {
    path: "/courseStudentPerformance",
    name: "Course-Student-GPA",
    icon: "nc-icon nc-paper-2",
    component: CourseStudentPerformance,
    layout: "/departmenthead",
  },
  {
    path: "/deanStudentPerformance",
    name: "Dean-Student-GPA",
    icon: "nc-icon nc-single-copy-04",
    component: DeanStudentPerformance,
    layout: "/departmenthead",
  },
  {
    path: "/plo",
    name: "PLO Analysis",
    icon: "nc-icon nc-ruler-pencil",
    component: PLO,
    layout: "/departmenthead",
  },
  {
    path: "/progressView",
    name: "Progress View",
    icon: "nc-icon nc-chart-pie-35",
    component: ProgressView,
    layout: "/departmenthead",
  },
];

export default departmentHeadRoutes;
