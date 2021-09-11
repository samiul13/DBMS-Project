import Dashboard from "views/Dashboard.js";
import IndividualAveragePLo from "views/IndividualAveragePLO.js";
import IndividualProgramAveragePLo from "views/IndividualProgramAveragePLO.js";
import IndividualPLOAchieved from "views/IndividualPLOAchieved.js";
import CourseWisePLO from "views/CourseWisePLO";
import CourseInstructorPLO from "views/CourseInstructorPLO.js";
import PLOAchievement from "views/PLOAchievement.js";
import ProgramwiseAttemptedVsAchieved from "views/ProgramwiseAttemptedVsAchieved";
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
    path: "/individual-average-plo",
    name: "Invididual Vs. Average PLO",
    icon: "nc-icon nc-vector",
    component: IndividualAveragePLo,
    layout: "/faculty",
  },
  {
    path: "/individual-program-average-plo",
    name: "Invididual Vs. Program Average PLO",
    icon: "nc-icon nc-vector",
    component: IndividualProgramAveragePLo,
    layout: "/faculty",
  },
  {
    path: "/individual-plo-achieved",
    name: "Individual Course-Wise PLO",
    icon: "nc-icon nc-vector",
    component: IndividualPLOAchieved,
    layout: "/faculty",
  },
  {
    path: "/course-instructor-plo",
    name: "Course-Wise PLO Among instructors",
    icon: "nc-icon nc-vector",
    component: CourseInstructorPLO,
    layout: "/faculty",
  },
  {
    path: "/coursewise-plo",
    name: "Course-Wise PLO Comparison",
    icon: "nc-icon nc-vector",
    component: CourseWisePLO,
    layout: "/faculty",
  },
  {
    path: "/semesterwise-plo",
    name: "Semester-Wise PLO Achievement",
    icon: "nc-icon nc-vector",
    component: PLOAchievement,
    layout: "/faculty",
  },
  {
    path: "/programwise-attempted-vs-achieved",
    name: "Program-Wise Att. Vs. Achv. PLO",
    icon: "nc-icon nc-vector",
    component: ProgramwiseAttemptedVsAchieved,
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
