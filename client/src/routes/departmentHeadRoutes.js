import Dashboard from "views/DepartmentHeadDashboard.js";
import IndividualAveragePLo from "views/IndividualAveragePLO.js";
import IndividualProgramAveragePLo from "views/IndividualProgramAveragePLO.js";
import IndividualPLOAchieved from "views/IndividualPLOAchieved.js";
import CourseWisePLO from "views/CourseWisePLO";
import CourseInstructorPLO from "views/CourseInstructorPLO.js";
import PLOAchievement from "views/PLOAchievement.js";
import ProgramwiseAttemptedVsAchieved from "views/ProgramwiseAttemptedVsAchieved";
import UniversityProgramPLO from "views/UniversityProgramPLO.js";
import UniversityProgramsGraduatesPLO from "views/UniversityProgramsGraduatesPLO.js";
import UniversityWiseAttemptedVsAchievedPLO from "views/UniversityWiseAttemptedVsAchievedPLO";
import DepartmentSchoolPLO from "views/DepartmentSchoolPLO.js";
import FacultyCoursePLO from "views/FacultyCoursePLO.js";
import FacultyPLOComparison from "views/FacultyPLOComparison.js";
import DepartmentSchoolAveragePLO from "views/DepartmentSchoolAveragePLO.js";
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
    component: Dashboard,
    layout: "/departmenthead",
  },

  {
    path: "/individual-average-plo",
    name: "Invididual Vs. Average PLO",
    icon: "nc-icon nc-chart",
    component: IndividualAveragePLo,
    layout: "/departmenthead",
  },
  {
    path: "/individual-program-average-plo",
    name: "Invididual Vs. Program Average PLO",
    icon: "nc-icon nc-grid-45",
    component: IndividualProgramAveragePLo,
    layout: "/departmenthead",
  },
  {
    path: "/individual-plo-achieved",
    name: "Individual Course-Wise PLO",
    icon: "nc-icon nc-tablet-2",
    component: IndividualPLOAchieved,
    layout: "/departmenthead",
  },
  {
    path: "/course-instructor-plo",
    name: "Course-Wise PLO Among instructors",
    icon: "nc-icon nc-paper-2",
    component: CourseInstructorPLO,
    layout: "/departmenthead",
  },
  {
    path: "/coursewise-plo",
    name: "Course-Wise PLO Comparison",
    icon: "nc-icon nc-notes",
    component: CourseWisePLO,
    layout: "/departmenthead",
  },
  {
    path: "/semesterwise-plo",
    name: "Semester-Wise PLO Achievement",
    icon: "nc-icon nc-ruler-pencil",
    component: PLOAchievement,
    layout: "/departmenthead",
  },
  {
    path: "/programwise-attempted-vs-achieved",
    name: "Program-Wise Att. Vs. Achv. PLO",
    icon: "nc-icon nc-mobile",
    component: ProgramwiseAttemptedVsAchieved,
    layout: "/departmenthead",
  },
  {
    path: "/university-program-wise-plo",
    name: "University-Program Wise PLO",
    icon: "nc-icon nc-support-17",
    component: UniversityProgramPLO,
    layout: "/departmenthead",
  },
  {
    path: "/university-programs-graduates-plo",
    name: "Uni./Programs PLO of Graduates",
    icon: "nc-icon nc-tag-content",
    component: UniversityProgramsGraduatesPLO,
    layout: "/departmenthead",
  },
  {
    path: "/university-wise-attempted-vs-achieved-plo",
    name: "University-wise Att. Vs. Achv. PLO",
    icon: "nc-icon nc-circle",
    component: UniversityWiseAttemptedVsAchievedPLO,
    layout: "/departmenthead",
  },
  {
    path: "/department-school-plo",
    name: "Department/School-Wise PLO",
    icon: "nc-icon nc-app",
    component: DepartmentSchoolPLO,
    layout: "/departmenthead",
  },
  {
    path: "/department-school-average-plo",
    name: "Department/School-Wise Avg. PLO",
    icon: "nc-icon nc-align-center",
    component: DepartmentSchoolAveragePLO,
    layout: "/departmenthead",
  },
  {
    path: "/dean-course-PLO",
    name: "Faculty-Course wise PLO",
    icon: "nc-icon nc-compass-05",
    component: FacultyCoursePLO,
    layout: "/departmenthead",
  },
  {
    path: "/dean-pLO-comparison",
    name: "Faculty-PLO Comparison",
    icon: "nc-icon nc-map-big",
    component: FacultyPLOComparison,
    layout: "/departmenthead",
  },
 
];

export default departmentHeadRoutes;
