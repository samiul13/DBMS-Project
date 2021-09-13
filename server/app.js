var express = require("express");
const mysql = require("mysql");
const cors = require("cors");
var app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "CSE303Spring2021",
  database: "usms",
});

app.get("/individualCoursePLO", (req, res) => {
  const sql1 = `
  SELECT p.PLONumber as ploNumber,co.CourseID,sum(e.MarksObtained),sum(a.
  TotalMarks), Data.Total
  FROM usms.enrollment r,
  usms.assessment a,
  usms.evaluation e,
  usms.co co,
  usms.plo p,
  (
  SELECT p.ploNumber as ploNumber,sum(a.TotalMarks) as Total, r.StudentID as StudentID
  FROM usms.enrollment r,
  usms.assessment a,
  usms.evaluation e,
  usms.co co,
  usms.plo p
  WHERE r.EnrollmentID = e.EnrollmentID
  and e.AssessmentID = a.AssessmentID
  and a.COID=co.COID
  and co.PLOID = p.PLOID
  and co.courseID = ${req.body.courseID}
  and r.StudentID = ${req.body.studentID}
  GROUP BY r.StudentID, p.PLOID) Data
  WHERE r.StudentID = Data.StudentID
  and e.EnrollmentID = r.EnrollmentID
  and e.AssessmentID = a.AssessmentID
  and a.COID=co.COID
  and co.PLOID = p.PLOID
  and p.PLONumber = Data.PLONumber
  GROUP BY p.PLOID,co.CourseID;`;

  const sql2 = `
  SELECT Data.ploNumber, avg(coursePercentage)
  FROM(
  SELECT p.PLOID as PLOID,p.PLONumber as ploNumber, 100*sum(e.MarksObtained)/sum(a.TotalMarks) as coursePercentage
  FROM usms.enrollment r,
  usms.evaluation e,
  usms.student st,
  usms.program prog,
  usms.course c,
  usms.assessment a,
  usms.co co,
  usms.plo p
  WHERE r.StudentID = st.StudentID
  and st.DepartmentID = d.DepartmentID
  and e.EnrollmentID = r.EnrollmentID
  and a.AssessmentID = e.AssessmentID
  and a.COID = co.COID
  and co.PLOID = p.PLOID
  and st.ProgramID = prog.ProgramID
  and prog.ProgramID = c.ProgramID
  and c.CourseID = ${req.body.courseID}
  GROUP BY p.ploNumber,r.StudentID) Data
  GROUP BY Data.ploNumber;
  `;
  db.query(sql1, (err, result) => {
    res.send(result);
  });
  db.query(sql2, (err, result) => {
    res.send(result);
  });
});

app.get("/individualvsProgramaverage", (req, res) => {
  const sql1 = `SELECT p.PLONumber as plonumber,100*(sum( e.MarksObtained)/sum( a.TotalMarks)) as plopercent
  FROM usms.enrollment r,
  usms.assessment a,
  usms.evaluation e,
  usms.co co,
  usms.plo p
  WHERE r.EnrollmentID = e.EnrollmentID
  and e.AssessmentID = a.AssessmentID
  and a.COID=co.COID
  and co.PLOID = p.PLOID
  and r.StudentID = ${req.body.StudentID}
  GROUP BY p.PLOID;`;

  const sql2 = `SELECT Data.ploNumber, avg(perProgram)
  FROM(
  SELECT p.PLOID as PLOID, p.PLONumber as ploNumber, 100*sum(e.MarksObtained)/sum(a.TotalMarks) as perProgram
  FROM usms.enrollment r,
  usms.evaluation e,
  usms.student st,
  usms.program prog,
  usms.assessment a,
  usms.co c,
  usms.plo p
  WHERE st.ProgramID = prog.ProgramID
  and r.StudentID = st.StudentID
  and e.EnrollmentID = r.EnrollmentID
  and a.AssessmentID = e.AssessmentID
  and a.COID = c.COID
  and c.PLOID = p.PLOID
  GROUP BY p.PLOID,r.StudentID) Data
  GROUP BY Data.PLOID;
  `;
  db.query(sql1, (err, result) => {
    res.send(result);
  });
  db.query(sql2, (err, result) => {
    res.send(result);
  });
});

app.get("/individualploachievementofcourses", (req, res) => {
  const sqlInsert = `SELECT p.PLONumber as ploNumber,co.CourseID,sum(e.MarksObtained),sum(a.
    TotalMarks), Data.T
    FROM usms.enrollment r,
    usms.assessment a,
    usms.evaluation e,
    usms.co co,
    usms.plo p,
    (
    SELECT p.PLONumber as ploNumber,sum(a.TotalMarks) as T, 
    r.StudentID as StudentID
    FROM usms.enrollment r,
    usms.assessment a,
    usms.evaluation e,
    usms.co co,
    usms.plo p
    WHERE r.EnrollmentID = e.EnrollmentID
    and e.AssessmentID = a.AssessmentID
    and a.COID =co.COID
    and co.PLOID= p.PLOID
    and r.StudentID= ${req.body.studentID}
    GROUP BY r.StudentID,p.PLOID) Data
    WHERE r.StudentID = Data.StudentID
    and e.EnrollmentID = r.EnrollmentID
    and e.AssessmentID= a.AssessmentID
    and a.COID=co.PLOID
    and p.ploNumber = Data.PLONumber
    GROUP BY p.PLOID,co.CourseID;`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.get("/instructorcoursewisePLO", (req, res) => {
  const sqlInsert = `
  SELECT 
    p.PLONumber AS ploNumber,
    f.FacultyID,
    co.CourseID,
    SUM(e.MarksObtained),
    SUM(a.TotalMarks),
    Data.T
FROM
    (SELECT 
            f.FacultyID AS FacultyID,
            st.studentID AS StudentID,
            c.courseID AS CourseID,
            100 * SUM(e.MarksObtained) / SUM(a.TotalMarks) AS perPLO
    FROM
        usms.enrollment r, usms.assessment a, usms.evaluation e, usms.co co, usms.plo p, usms.student st, usms.section sc, usms.course c, usms.faculty f
    WHERE
        st.StudentID = r.StudentID
            AND r.SectionID = sc.sectionID
            AND r.enrollmentID = e.enrollmentID
            AND e.AssessmentID = a.AssessmentID
            AND sc.CourseID = 1234
            AND r.SemesterID = 1234
    GROUP BY sc.FacultyID, st.StudentID , a.AssessmentTitle) Data
GROUP BY FacultyID
  `;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.get("/coursewiseplo", (req, res) => {

  const sqlInsert = `
  SELECT Data.PLONumber, avg(perCourse)
  FROM(
  SELECT p.PLOID as PLOID, p.PLONumber as ploNumber, 100*sum(e.MarksObtained)/sum(a.TotalMarks) as perCourse
  FROM usms.enrollment r,
  usms.evaluation e,
  usms.student st,
  usms.program prog,
  usms.assessment a,
  usms.co c,
  usms.plo p
  WHERE r.StudentID = st.StudentID
  and st.ProgramID = prog.ProgramID
  and e.EnrollmentID= r.EnrollmentID
  and a.AssessmentID = e.AssessmentID
  and a.COID = c.COID
  and c.PLOID = p.PLOID
  and st.ProgramID = 1234
  and p.PLONumber = 1234
  GROUP BY p.PLOID,r.StudentID) Data
  GROUP BY Data.PLOID
  `;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });

});

app.get("/ploachievement", (req, res) => {
  const sqlInsert = `SELECT p.ploNum as ploNum,100*sum(e.obtainedMarks)/sum(a.totalMarks)
  as perPLO
  FROM 
  usms.enrollment r
  usms.evaluation e,
  usms.student st,
  usms.program prog,
  usms.assessment a,
  usms.co c,
  usms.plo p
  WHERE r.EnrollmentID = r.EnrollmentID
  and e.AssessmentID = a.AssessmentID
  and a.COID = c.COID
  and c.PLOID = p.PLOID
  and r.SemesterID = ${req.body.SemesterID}
  GROUP BY p.ploNumber,c.CourseID) Data1;
  
  SELECT p.ploNum as ploNum,100*sum(e.obtainedMarks)/sum(a.totalMark
  s) as Data2
  usms.enrollment r
  usms.evaluation e,
  usms.student st,
  usms.program prog,
  usms.assessment a,
  usms.co c,
  usms.plo p
  WHERE r.EnrollmentID = r.EnrollmentID
  and e.AssessmentID = a.AssessmentID
  and a.COID = c.COID
  and c.PLOID = p.PLOID
  and r.SemesterID = ${req.body.SemesterID}
  GROUP BY p.ploNumber,c.CourseID) Data2;
  HAVING 100*sum(e.MarksObtained)/sum(a.TotalMarks)>=40) Data1`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.get("/attempetedvsachievedplo", (req, res) => {
  const sqlInsert =`
    SELECT Data.plonum, avg(perPLO)
  FROM(
  SELECT p.ploID as PLOID, p.ploNum as ploNum, 100*sum(e.MarksObtained)/sum(a.TotalMarks) as perPLO
  FROM usms.enrollment r,
    usms.evaluation e,
    usms.student st,
    usms.program prog,
    usms.assessment a,
    usms.co c,
    usms.plo p
  WHERE r.StudentID = st.StudentID
  and st.ProgramID = prog.ProgramID
  and e.registration_id = r.registrationID
  and a.AssessmentID = e.AssesmentID
  and a.COID = c.COID
  and c.PLOID = p.PLOID
  and st.ProgramID = '{}'
  GROUP BY r.StudentID, p.PLOID) Data
  GROUP BY Data.PLOID
  `;
  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.get("/universityprogramplo", (req, res) => {
  const sqlInsert =`
  SELECT Data.plonum, avg(perPLO)
  FROM(
  SELECT p.ploID as PLOID, p.ploNum as ploNum, 100*sum(e.MarksObtained)/sum(a.TotalMarks) as perPLO
  FROM 
    usms.univeristy u,
    usms.enrollment r,
    usms.evaluation e,
    usms.student st,
    usms.program prog,
    usms.assessment a,
    usms.co c,
    usms.plo p
  WHERE r.StudentID = st.StudentID
  and st.ProgramID = prog.ProgramID
  and e.registration_id = r.registrationID
  and a.AssessmentID = e.AssesmentID
  and a.COID = c.COID
  and c.PLOID = p.PLOID
  and st.UniversityID = ${req.body.universityID}
  and st.programID = ${req.body.ProgramID}
  GROUP BY r.StudentID, p.PLOID, u.UniversityID) Data
  GROUP BY Data.UniversityiD;
  `
  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });

});

app.get("/universityprogramploofgraduates", (req, res) => {

  const sqlInsert =`
  SELECT Data1.plonumber, Data2.ploNumber, Data3.ploNumber avg(perPLO1), avg(perPLo2), avg(perPLo3)
  FROM(
  SELECT p.ploID as PLOID, p.ploNum as ploNum, 100*sum(e.MarksObtained)/sum(a.TotalMarks) as perPLO1
  FROM 
    usms.univeristy u,
    usms.enrollment r,
    usms.evaluation e,
    usms.student st,
    usms.program prog,
    usms.assessment a,
    usms.co c,
    usms.plo p
  WHERE r.StudentID = st.StudentID
  and st.ProgramID = prog.ProgramID
  and e.registration_id = r.registrationID
  and a.AssessmentID = e.AssesmentID
  and a.COID = c.COID
  and c.PLOID = p.PLOID
  and st.UniversityID = ${req.body.universityID}
  and st.programID = ${req.body.ProgramID}
  GROUP BY r.StudentID, p.PLOID, u.UniversityID) Data1
  FROM(
  SELECT p.ploID as PLOID, p.ploNum as ploNum, 100*sum(e.MarksObtained)/sum(a.TotalMarks) as perPLO2
  FROM 
    usms.univeristy u,
    usms.enrollment r,
    usms.evaluation e,
    usms.student st,
    usms.program prog,
    usms.assessment a,
    usms.co c,
    usms.plo p
  WHERE r.StudentID = st.StudentID
  and st.ProgramID = prog.ProgramID
  and e.registration_id = r.registrationID
  and a.AssessmentID = e.AssesmentID
  and a.COID = c.COID
  and c.PLOID = p.PLOID
  and st.UniversityID = ${req.body.universityID}
  and st.programID = ${req.body.ProgramID}
  GROUP BY r.StudentID, p.PLOID, u.UniversityID) Data2
  FROM(
  SELECT p.ploID as PLOID, p.ploNum as ploNum, 100*sum(e.MarksObtained)/sum(a.TotalMarks) as perPLO3
  FROM 
    usms.univeristy u,
    usms.enrollment r,
    usms.evaluation e,
    usms.student st,
    usms.program prog,
    usms.assessment a,
    usms.co c,
    usms.plo p
  WHERE r.StudentID = st.StudentID
  and st.ProgramID = prog.ProgramID
  and e.EnrollmentID = r.EnrollmentID
  and a.AssessmentID = e.AssesmentID
  and a.COID = c.COID
  and c.PLOID = p.PLOID
  and st.UniversityID = ${req.body.universityID}
  and st.programID = ${req.body.ProgramID}
  GROUP BY r.StudentID, p.PLOID, u.UniversityID) Data3
  GROUP BY Data1.UniversityID, Data2.UniversityID, Data3.UniversityID
  `;
    
  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.get("universitywiseAttvsachievedplo", (req, res) => {
  const ploNumber = req.body.ploNumber;
  const universityID = req.body.universityID;
  const sqlInsert = `
  SELECT Data.plonum, avg(perPLO)
  FROM(
  SELECT p.ploID as PLOID, p.ploNum as ploNum, 100*sum(e.MarksObtained)/sum(a.TotalMarks) as perPLO
  FROM 
    usms.univeristy u,
    usms.enrollment r,
    usms.evaluation e,
    usms.student st,
    usms.program prog,
    usms.assessment a,
    usms.co c,
    usms.plo p
  WHERE r.StudentID = st.StudentID
  and st.ProgramID = prog.ProgramID
  and e.registration_id = r.registrationID
  and a.AssessmentID = e.AssesmentID
  and a.COID = c.COID
  and c.PLOID = p.PLOID
  and st.UniversityID = ${ploNumber}
  and st.PLONumber = ${universityID}
  GROUP BY r.StudentID, p.PLOID, u.UniversityID) Data
  GROUP BY Data.StudentID;
  `;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.get("/departmentplocomparison", (req, res) => {

  const sqlInsert = `
  SELECT Data1.PLONumber, Data2.PLONumber, avg(perPLO1), avg(perPLO2)
  FROM(
  SELECT p.ploID as PLOID, p.ploNumber as ploNum, 100*sum(e.MarksObtained)/sum(a.TotalMarks) as perPLO1
      usms.enrollment r,
      usms.evaluation e,
      usms.student st,
      usms.program prog,
      usms.assessment a,
      usms.co c,
      usms.plo p
    WHERE r.StudentID = st.StudentID
    and st.ProgramID = prog.ProgramID
    and e.EnrollmentID = r.EnrollmentID
    and a.AssessmentID = e.AssesmentID
    and a.COID = c.COID
    and c.PLOID = p.PLOID
  and st.DepartmentID= ${req.body.departmentID}
  GROUP BY p.ploNum,r.student_id) Data1

  SELECT p.ploID as PLOID, p.ploNumber as ploNum, 100*sum(e.MarksObtained)/sum(a.TotalMarks) as perPLO2
      usms.enrollment r,
      usms.evaluation e,
      usms.student st,
      usms.program prog,
      usms.assessment a,
      usms.co c,
      usms.plo p
    WHERE r.StudentID = st.StudentID
    and st.ProgramID = prog.ProgramID
    and e.EnrollmentID = r.EnrollmentID
    and a.AssessmentID = e.AssesmentID
    and a.COID = c.COID
    and c.PLOID = p.PLOID
  and st.DepartmentID = ${req.body.departmentID}
  GROUP BY p.ploNum,r.student_id) Data2

  GROUP BY Data1.PLoNumber, Data2.PLoNumber;
  `;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});
app.get("schoolplocomparison", (req, res) => {

  const sqlInsert = `
    SELECT Data1.PLONumber, Data2.PLONumber, avg(perPLO1), avg(perPLO2)
  FROM(
  SELECT p.ploID as PLOID, p.ploNumber as ploNum, 100*sum(e.MarksObtained)/sum(a.TotalMarks) as perPLO1
      usms.enrollment r,
      usms.evaluation e,
      usms.student st,
      usms.program prog,
      usms.department d,
      usms.assessment a,
      usms.co c,
      usms.plo p
    WHERE r.StudentID = st.StudentID
    and st.ProgramID = prog.ProgramID
    and e.EnrollmentID = r.EnrollmentID
    and a.AssessmentID = e.AssesmentID
    and a.COID = c.COID
    and c.PLOID = p.PLOID
  and st.DepartmentID= ${req.body.departmentID}
  and d.departmentID = st.DepartmentID
  and d.schoolID = ${req.body.schoolID}

  GROUP BY p.ploNum,r.student_id) Data1

  SELECT p.ploID as PLOID, p.ploNumber as ploNum, 100*sum(e.MarksObtained)/sum(a.TotalMarks) as perPLO2
      usms.enrollment r,
      usms.evaluation e,
      usms.student st,
      usms.program prog,
      usms.department d
      usms.assessment a,
      usms.co c,
      usms.plo p
    WHERE r.StudentID = st.StudentID
    and st.ProgramID = prog.ProgramID
    and e.EnrollmentID = r.EnrollmentID
    and a.AssessmentID = e.AssesmentID
    and a.COID = c.COID
    and c.PLOID = p.PLOID
  and st.DepartmentID= ${req.body.departmentID}
  and d.departmentID = st.DepartmentID
  and d.schoolID = ${req.body.schoolID}

  GROUP BY p.ploNum,r.student_id) Data2

  GROUP BY Data1.PLoNumber, Data2.PLoNumber;

  `;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});
app.get("/faculty/studentGrades", (req, res) => {
  const sqlInsert = `
  SELECT f.facultyId, CONCAT(f.first_name, " ", f.last_name) AS FacultyName,
  s.courseName, s.studentID, s.grade
  FROM spm.faculty f
  LEFT JOIN spm.course_grade s ON f.facultyID = s.facultyID
  WHERE f.facultyID = ${req.body.facultyID}`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});


app.post("/assessment", (req, res) => {
  const courseName = JSON.stringify(req.body.course);
  const CO1 = req.body.co1;
  const CO2 = req.body.co2;
  const CO3 = req.body.co3;
  const CO4 = req.body.co4;
  const semesterID = req.body.semesterID;
  const sectionID = req.body.sectionID;
  const studentID = req.body.studentID;
  const facultyID = req.body.facultyID;

  const sqlInsert = `INSERT INTO spm.course_grade (studentID, courseName, CO1, CO2, CO3, CO4, facultyID, sectionID) VALUES (${studentID}, ${courseName}, ${CO1}, ${CO2}, ${CO3}, ${CO4}, ${facultyID}, ${sectionID});`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
      res.send("Failed to upload assessment data");
    } else {
      res.send("Assessment data uploaded successfully");
    }
  });
});

app.post("/faculty/studentGrades", (req, res) => {
  const sqlInsert = `
  SELECT f.facultyId, CONCAT(f.first_name, " ", f.last_name) AS FacultyName,
  s.courseName, s.studentID, s.grade
  FROM spm.faculty f
  LEFT JOIN spm.course_grade s ON f.facultyID = s.facultyID
  WHERE f.facultyID = ${req.body.facultyID}`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.post("/faculty/studentGrade", (req, res) => {
  const sqlInsert = `SELECT f.facultyId, CONCAT(f.first_name, " ", f.last_name) AS FacultyName,
  s.courseName, s.studentID, s.grade
  FROM spm.faculty f
  LEFT JOIN spm.course_grade s ON f.facultyID = s.facultyID
  WHERE f.facultyID = ${req.body.facultyID} AND s.studentID = ${req.body.studentID};`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.post("/dean/studentGrades", (req, res) => {
  const sqlInsert = `select s.dean, t.studentID, c.grade
  FROM spm.school s LEFT JOIN spm.student t ON t.schoolID = s.schoolID
  INNER JOIN spm.course_grade c ON c.studentID = t.studentID
  WHERE t.studentID = ${req.body.studentID}
  AND s.schoolID = ${req.body.schoolID};`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.post("/ploCoMapping", (req, res) => {
  const id = req.body.courseID;
  const progID = req.body.programID;
  const credits = req.body.noOfCredits;
  const coList = req.body.mappedCoList;
  const course = spm.course(id, progID, credits);
  course.save();

  coList.map((co, index) => {
    co = spm.CO(
      (spm.CoNo = index + 1),
      (courseID = id),
      (PLOID = coList[index])
    );
    co.save();
  });
});

app.post("/course/updateGrades", (req, res) => {
  const updateGrade =
    "UPDATE spm.course_grade R SET R.grade = CASE WHEN (R.CO1+R.CO2+R.CO3+R.CO4)/4 >= 85 THEN 'A' WHEN (R.CO1+R.CO2+R.CO3+R.CO4)/4 < 85 AND (R.CO1+R.CO2+R.CO3+R.CO4)/4 >= 80 THEN 'B+' WHEN (R.CO1+R.CO2+R.CO3+R.CO4)/4 < 80 AND (R.CO1+R.CO2+R.CO3+R.CO4)/4 >= 75 THEN 'B' WHEN (R.CO1+R.CO2+R.CO3+R.CO4)/4 < 75 AND (R.CO1+R.CO2+R.CO3+R.CO4)/4 >= 70 THEN 'B-' WHEN (R.CO1+R.CO2+R.CO3+R.CO4)/4 < 70 AND (R.CO1+R.CO2+R.CO3+R.CO4)/4 >= 65 THEN 'C+' WHEN (R.CO1+R.CO2+R.CO3+R.CO4)/4 < 65 AND (R.CO1+R.CO2+R.CO3+R.CO4)/4 >= 60 THEN 'C' WHEN (R.CO1+R.CO2+R.CO3+R.CO4)/4 < 60 AND (R.CO1+R.CO2+R.CO3+R.CO4)/4 >= 55 THEN 'C-' WHEN (R.CO1+R.CO2+R.CO3+R.CO4)/4 < 55 AND (R.CO1+R.CO2+R.CO3+R.CO4)/4 >= 50 THEN 'D+' WHEN (R.CO1+R.CO2+R.CO3+R.CO4)/4 < 50 AND (R.CO1+R.CO2+R.CO3+R.CO4)/4 >= 45 THEN 'D' ELSE 'F' END WHERE R.gradeID > 0;";
  const updategradePoint = `UPDATE spm.course_grade R 
  SET R.gradePoint = CASE 
  WHEN R.grade = 'A'
  THEN 4.0
  WHEN R.grade = 'B+'
  THEN 3.7
  WHEN R.grade = 'B'
  THEN 3.3
  WHEN R.grade = 'B-'
  THEN 3.0
  WHEN R.grade = 'C+'
  THEN 2.7
  WHEN R.grade = 'C'
  THEN 2.3
  WHEN R.grade = 'C-'
  THEN 2.0
  WHEN R.grade = 'D+'
  THEN 1.7
  WHEN R.grade = 'D'
  THEN 1.3
  ELSE 0.0
  END
  WHERE R.gradeID > 0;`;

  db.query(updateGrade, async (err, result) => {
    if (err) {
      console.log(err);
    } else {
      await db.query(updategradePoint, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
});

app.post("/course/studentGrades", (req, res) => {
  var c = JSON.stringify(req.body.course);
  const grades = `SELECT R.studentID, R.courseName, R.grade
  FROM spm.course_grade R
  WHERE R.courseName = ${c} and R.studentID=${2022053}`;

  db.query(grades, (err, result) => {
    res.send(result);
  });
});

app.listen(5000, () => {
  console.log("running on Port 5000");
});
