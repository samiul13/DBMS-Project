-- Student wise plo:
SELECT AVG(TotalPlo.PLOpercentage) AS ActualPlo
FROM (
SELECT (PLO / COTotal * 100) AS PLOpercentage
FROM (
SELECT SUM(DISTINCT e.marksObtained) AS PLO, SUM(DISTINCT
a.marksObtained) AS CoTotal
FROM spm.enrollment en,
spm.evaluation e,
spm.assessment a,
spm.co c,
spm.plo p
WHERE en.studentID = {}
AND e.assessmentID = a.assessmentID
AND en.enrollmentID = e.enrollmentID
AND a.COID = c.COID
AND c.PLOID = {}
GROUP BY en.sectionID
) perPLO
) TotalPlo;

-- Department wise PLO
SELECT AVG(PLOTotal.PLOpercentage) AS ActualPlo
FROM (
SELECT (PLO / COTotal * 100) AS PLOpercentage
FROM (
SELECT SUM(e.marksObtained) AS PLO, SUM(a.marksObtained) AS
COTotal
FROM spm.enrollment en,
spm.evaluation e,
spm.assessment a,
spm.co c,
spm.plo p,
spm.student st
WHERE st.departmentID = 100
AND st.studentID = en.studentID
AND e.assessmentID = a.assessmentID
AND en.enrollmentID = e.enrollmentID
AND a.COID = c.COID
AND c.PLOID = 1
GROUP BY en.sectionID
) perPLO
) PLOTotal;


-- Course wise PLO
SELECT DISTINCT co.courseID, co.CONo, p.PLONo, (PLO / TotalCO * 100) AS
PLOpercentage
FROM spm.PLO p, spm.CO co, (
SELECT DISTINCT c.courseID, c.CONo, c.PLOID, SUM(DISTINCT
e.marksObtained) AS PLO, SUM(DISTINCT a.marksObtained) AS TotalCO
FROM spm.enrollment en,
spm.evaluation e,
spm.assessment a,
spm.CO c,
spm.PLO p
WHERE en.studentID = 2022053
AND en.enrollmentID = e.enrollmentID
AND e.assessmentID = a.assessmentID
AND a.COID = c.COID
AND c.PLOID = p.PLONo
GROUP BY en.sectionID, c.PLOID
ORDER BY c.PLOID
) perPLO
WHERE CO.CONo = perPLO.CONo
AND CO.courseID = perPLO.courseID
AND p.PLONo = perPLO.PLOID;



-- PLO Achievent Table
SELECT DISTINCT co.courseID, co.CONo, p.PLONo, (PLO / CoTotal * 100) AS
PLOpercentage
FROM spm.PLO p, spm.CO co, (
SELECT DISTINCT c.courseID, c.CONo, c.PLOID, SUM(DISTINCT
e.marksObtained) AS PLO, SUM(DISTINCT a.marksObtained) AS CoTotal
FROM spm.enrollment en,
spm.evaluation e,
spm.assessment a,
spm.CO c,
spm.PLO p
WHERE en.studentID = 2022053
AND en.enrollmentID = e.enrollmentID
AND e.assessmentID = a.assessmentID
AND c.PLOID = p.PLONO
AND a.COID = c.COID
GROUP BY en.sectionID, c.PLOID
ORDER BY c.PLOID
) perPLO
WHERE co.CONo = perPLO.CONo
AND p.PLONo = perPLO.PLOID
AND co.courseID = perPLO.courseID;


-- Student Progress View
SELECT COUNT(Acheived.ActualPLO) AS isPLOAchieved
FROM(
SELECT AVG(PLOTotal.PLOpercentage) AS ActualPLO
FROM (
SELECT (PLO / COTotal * 100) AS PLOpercentage
FROM (
SELECT SUM(DISTINCT e.marksObtained) AS PLO,
SUM(DISTINCT a.marksObtained) AS COTotal
FROM spm.enrollment en,
spm.evaluation e,
spm.assessment a,
spm.CO c,
spm.PLO p
WHERE en.studentID = 2022053
AND en.semester = 'Spring'
AND en.year = 2020
AND en.enrollmentID = e.enrollmentID
AND e.assessmentID = a.assessmentID
AND a.COID = c.COID
AND c.PLOID = 1
GROUP BY en.semester
) perPLO
) PLOTotal
) Acheived
WHERE Acheived.ActualPlo >=40;

SELECT COUNT(Acheived.ActualPlo) AS isPLOAchieved
FROM(
SELECT AVG(PLOTotal.PLOpercentage) AS ActualPlo
FROM (
SELECT (PLO / COTotal * 100) AS PLOpercentage
FROM (
SELECT SUM(DISTINCT e.marksObtained) AS PLO,
SUM(DISTINCT a.marksObtained) AS COTotal
FROM spm.enrollment en,
spm.evaluation e,
spm.assessment a,
spm.CO c,
spm.PLO p
WHERE en.studentID = 2022053
AND en.semester = 'Spring'
AND en.year = 2021
AND en.enrollmentID = e.enrollmentID
AND e.assessmentID = a.assessmentID
AND a.COID = c.COID
AND c.PLOID = 1
GROUP BY en.semester
) perPLO
) PLOTotal
) Acheived;


-- Program Progress View

SELECT COUNT(Acheived.ActualPLO)
FROM (
SELECT AVG(PLoTotal.PLOpercentage) AS ActualPLO
FROM (
SELECT studentID, (PLO / TotalComark * 100) AS
PLOpercentage
FROM (
SELECT en.studentID, SUM(DISTINCT
e.marksObtained) AS PLO, SUM(DISTINCT a.marksObtained) AS COTotal
FROM spm.enrollment en,
spm.evaluation e,
spm.assessment a,
spm.CO c,
spm.PLO p,
spm.program pr
WHERE p.programID = pr.programID
AND pr.programID = '{}'
AND en.enrollmentID = e.enrollmentID
AND e.assessmentID = a.assessmentID
AND a.COID = c.COID
AND c.PLOID = '{}'
GROUP BY en.studentID
) perPLO
GROUP BY studentID
) PLOTotal
GROUP BY studentID) Acheived
WHERE Acheived.ActualPlo >= 40;
SELECT COUNT(Acheived.ActualPlo)
FROM (
SELECT AVG(PLOTotal.PLOpercentage) AS ActualPlo
FROM (
SELECT studentID,(PLO / COTotal * 100) AS
PLOpercentage
FROM (
SELECT en.studentID,SUM(DISTINCT
e.marksObtained) AS PLO, SUM(DISTINCT a.marksObtained) AS COTotal
FROM spm.enrollment en,
spm.evaluation e,
spm.assessment a,
spm.CO c,
spm.PLO p,
spm.Program pr
WHERE p.programID = pr.programID
AND pr.programID = '{}'
AND en.enrollmentID = e.enrollmentID
AND e.assessmentID = a.assessmentID
AND a.COID = c.COID
AND c.PLOID = '{}'
GROUP BY en.studentID
) perPLO
GROUP BY studentID
) PLOTotal
GROUP BY studentID
) Acheived;


-- Semester Progress View
SELECT COUNT(Acheived.ActualPLO)
FROM (
SELECT AVG(PLOTotal.PLOpercentage) AS ActualPLO
FROM (SELECT studentID,(PLO / COTotal * 100) AS PLOpercentage
FROM (SELECT en.studentID, SUM(e.marksObtained) AS PLO, SUM( a.marksObtained) AS COTotal
FROM spm.enrollment en,
spm.evaluation e,
spm.assessment a,
spm.CO c,
spm.PLO p
WHERE en.enrollmentID = e.enrollmentID
AND en.semester = '{}'
AND en.year = '{}'
AND e.assessmentID = a.assessmentID
AND a.COID = c.COID
AND c.PLOID = '{}'
GROUP BY en.studentID
) perPLO
GROUP BY studentID
) PLOTotal
GROUP BY studentID
) Acheived
WHERE Acheived.ActualPLO >= 40;

SELECT COUNT(Acheived.ActualPLO)
FROM (SELECT AVG(PLOTotal.PLOpercentage) AS ActualPLO
FROM (SELECT studentID, (PLO / CoTotal * 100) AS PLOpercentage
FROM (
SELECT en.studentID, SUM(
e.marksObtained) AS PLO, SUM( a.marksObtained) AS COTotal

FROM spm.enrollment en,
spm.evaluation e,
spm.assessment a,
SPM.CO c,
SPM.PLO p
WHERE en.enrollmentID = e.enrollmentID
AND en.semester = '{}'
AND en.year = '{}'
AND e.assessmentID = a.assessmentID
AND a.COID = c.COID
AND c.PLOID = '{}'
GROUP BY en.studentID
) perPLO
GROUP BY studentID
) PLOTotal
GROUP BY studentID
) Acheived;


-- Course Success Rate
SELECT CONo, PLONo, COUNT(PLOTotal.PLOpercentage) AS Acheived
FROM (
SELECT CO.courseID, CO.CONo, p.PLONo,(PLO / COTotal * 100)
AS PLOpercentage
FROM spm.PLO p,
spm.CO CO,
(
SELECT
en.studentID, c.courseID, c.CONo, c.PLOID, SUM(DISTINCT e.marksObtained) AS
PLO, SUM(DISTINCT a.marksObtained) AS COTotal
FROM spm.enrollment en,
spm.evaluation e,
spm.assessment a,
spm.CO c,
spm.PLO p
WHERE en.enrollmentID = e.enrollmentID
AND e.assessmentID = a.assessmentID
AND a.COID = c.COID
AND c.PLOID = p.PLONo
AND c.courseID = '{}'
GROUP BY studentID, c.courseID, c.CONo, p.PLONo
) perPLO
WHERE CO.CONo = perPLO.CONo
AND CO.courseID = perPLO.courseID
AND p.PLONo = perPLO.PLOID
GROUP BY studentID, CO.courseID, CO.CONo, PLONo
HAVING PLOpercentage >=40
) PLOTotal
GROUP BY courseID, CONo, PLONo;
SELECT CONo, PLONo, COUNT(PLOTotal.PLOpercentage) AS Acheived
FROM (
SELECT CO.courseID, CO.CONo, p.PLONo, (PLO / COTotal * 100) AS PLOpercentage
FROM spm.PLO p,
spm.CO CO,
(
SELECT
en.studentID, c.courseID, c.CONo, c.PLOID, SUM(DISTINCT e.marksObtained) AS PLO, SUM(DISTINCT a.marksObtained) AS COTotal
FROM spm.enrollment en,
spm.evaluation e,
spm.assessment a,
spm.CO c,
spm.PLO p
WHERE en.enrollmentID = e.enrollmentID
AND e.assessmentID = a.assessmentID
AND c.PLOID = p.PLONo
AND a.COID = c.COID
AND c.courseID = '{}'
GROUP BY studentID, c.courseID, c.CONo, p.PLONo
) perPLO
WHERE CO.CONo = perPLO.CONo
AND co.courseID = perPLO.courseID
AND p.PLONo = perPLO.PLOID
GROUP BY studentID, CO.courseID, CO.CONo, PLONo
)PLOTotal
GROUP BY courseID, CONo, PLONo;

