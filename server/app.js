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

app.get("/individualvsProgramaverage", (req,res) => {
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
  GROUP BY p.PLOID;`

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
  `
  db.query(sql1, (err, result) => {
    res.send(result);
  });
  db.query(sql2, (err, result) => {
    res.send(result);
  });

})

app.get("/school/CGPA", (req, res) => {
  const sqlInsert = `SELECT s.schoolName, ROUND(AVG(t.CGPA), 2) AS AVG_CGPA, COUNT(t.studentID) as noOfStudents
  FROM spm.school s
  JOIN spm.student t ON t.schoolID = s.schoolID
  GROUP BY s.schoolName;`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.get("/individual/coursewisePLO", (req, res) => {
  const sqlInsert = `SELECT s.schoolName, ROUND(AVG(t.CGPA), 2) AS AVG_CGPA, COUNT(t.studentID) as noOfStudents
  FROM spm.school s
  JOIN spm.student t ON t.schoolID = s.schoolID
  GROUP BY s.schoolName;`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.get("/program/CGPA", (req, res) => {
  const sqlInsert = `SELECT s.programName, ROUND(AVG(t.CGPA), 2) AS AVG_CGPA, COUNT(t.studentID) as noOfStudents
  FROM spm.program s
  JOIN spm.student t ON t.programID = s.programID
  GROUP BY s.programName;`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.get("/department/CGPA", (req, res) => {
  const sqlInsert = `SELECT s.departmentName, ROUND(AVG(t.CGPA), 2) AS AVG_CGPA, COUNT(t.studentID) as noOfStudents
  FROM spm.department s
  JOIN spm.student t ON t.departmentID = s.departmentID
  GROUP BY s.departmentName;`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.get("/department/enrollment", (req, res) => {
  const sqlInsert =
    "SELECT d.departmentName, COUNT(s.studentID) AS noOfStudents, CONCAT(c.semesterName, ' ', c.year) AS Semester FROM spm.department d LEFT JOIN spm.student s ON d.departmentID = s.departmentID INNER JOIN spm.semester c ON c.semesterID = d.semesterID GROUP by d.departmentID ORDER by COUNT(s.studentID) DESC, d.departmentName ASC";
  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.get("/program/enrollment", (req, res) => {
  const sqlInsert =
    "SELECT d.programName, COUNT(s.studentID) as noOfStudents, CONCAT(c.semesterName, ' ', c.year) AS Semester FROM spm.program d LEFT JOIN spm.student s ON d.programID = s.programID INNER JOIN spm.semester c ON c.semesterID = d.semesterID GROUP by d.programID ORDER by COUNT(s.studentID) DESC, d.programName ASC";
  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.get("/school/enrollment", (req, res) => {
  const sqlInsert =
    "SELECT d.schoolName, COUNT(s.studentID) as noOfStudents, CONCAT(c.semesterName, ' ', c.year) AS Semester FROM spm.school d LEFT JOIN spm.student s ON d.schoolID = s.schoolID INNER JOIN spm.semester c ON c.semesterID = d.semesterID GROUP by d.schoolID ORDER by COUNT(s.studentID) DESC, d.schoolName ASC";
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
  WHERE R.courseName = ${c}`;

  db.query(grades, (err, result) => {
    res.send(result);
  });
});

app.listen(5000, () => {
  console.log("running on Port 5000");
});
