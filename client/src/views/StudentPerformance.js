import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function StudentPerformance() {
  const [programLabels, setProgramLabels] = useState([]);
  const [programSeries, setProgramSeries] = useState([]);

  const [schoolLabels, setSchoolLabels] = useState([]);
  const [schoolSeries, setSchoolSeries] = useState([]);

  
  const [percentageLabels, setPercentageLabels] = useState([]);
  const [percentageSeries, setPercentageSeries] = useState([]);

  const [departmentLabels, setDepartmentLabels] = useState([]);
  const [departmentSeries, setDepartmentSeries] = useState([]);

  var programData = {
    labels: programLabels,
    series: programSeries,
  };

  var programOptions = {
    seriesBarDistance: 10,
    
  };

  var schoolData = {
    labels: schoolLabels,
    series: schoolSeries,
  };

  var schoolOptions = {
    seriesBarDistance: 10,
    
  };

  var departmentData = {
    labels: departmentLabels,
    series: departmentSeries,
  };

  var departmentOptions = {
    seriesBarDistance: 10,
  };

    var type = "Bar";
 

    var programStudents = [];
    var programCGPA = [];
    useEffect(() => {
        fetch("http://localhost:5000/program/CGPA")
          .then((response) => response.json())
          .then((res) =>
            res.map((val) => {
              setProgramLabels((oldArray) => [...oldArray, val.programName]);
              programStudents.push(val.noOfStudents);
              programCGPA.push(val.AVG_CGPA);
            })
          );
     
          setProgramSeries((oldArray) => [...oldArray, programStudents, programCGPA]);
          
      }, []);

  
  var schoolStudents = [];
  var schoolCGPA = [];
  useEffect(() => {
    fetch("http://localhost:5000/school/CGPA")
      .then((response) => response.json())
      .then((res) =>
        res.map((val) => {
          setSchoolLabels((oldArray) => [...oldArray, val.schoolName]);
          schoolStudents.push(val.noOfStudents);
          schoolCGPA.push(val.AVG_CGPA);
        })
      );
 
      setSchoolSeries((oldArray) => [...oldArray, schoolStudents, schoolCGPA]);
      
  }, []);


var departmentStudents = [];
var departmentCGPA = [];
useEffect(() => {
    fetch("http://localhost:5000/department/CGPA")
      .then((response) => response.json())
      .then((res) =>
        res.map((val) => {
          setDepartmentLabels((oldArray) => [...oldArray, val.departmentName]);
          departmentStudents.push(val.noOfStudents);
          departmentCGPA.push(val.AVG_CGPA);
        })
      );
 
      setDepartmentSeries((oldArray) => [...oldArray, departmentStudents, departmentCGPA]);
      
  }, []);

 


  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">School wise CGPA</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph data={schoolData} options={schoolOptions} type={type} />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <h3>Year 2020</h3>
                  <p>The following graph shows the number of students and Average CGPA of each school</p>
                </div>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
         
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Program wise CGPA</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                <ChartistGraph data={programData} options={programOptions} type={type}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
              <div className="legend">
                  <h3>Year 2020</h3>
                  <p>The following graph shows the number of students and Average CGPA of each program</p>
                </div>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Department wise CGPA</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                <ChartistGraph data={departmentData} options={departmentOptions} type={type}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
              <div className="legend">
                  <h3>Year 2020</h3>
                  <p>The following graph shows the number of students and Average CGPA of each department</p>
                </div>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default StudentPerformance;
