import React, { useState, useEffect, useCallback } from "react";
import ChartistGraph from "react-chartist";
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
var type = "Bar";
  var studentData = {
    labels: [
      "PLO1",
      "PLO2",
      "PLO3",
      "PLO4",
      "PLO5",
      "PLO6",
      "PLO7",
      "PLO8",
      "PLO9",
      "PLO10",
      "PLO11",
      "PLO12",
    ],
    series: [50, 40, 70, 35, 60, 50, 100, 55, 80, 90, 30, 85],
  };
  var studentOptions = {
    distributeSeries: true,
  };

  var departmentData = {
    labels: [
      "PLO1",
      "PLO2",
      "PLO3",
      "PLO4",
      "PLO5",
      "PLO6",
      "PLO7",
      "PLO8",
      "PLO9",
      "PLO10",
      "PLO11",
      "PLO12",
    ],
    series: [40, 58, 46, 32, 47, 59, 51, 48, 35, 55, 60, 45],
  };
  var departmentOptions = {
    distributeSeries: true,
  };

  var courseData = {
    labels: [
        "PLO1",
        "PLO2",
        "PLO3",
        "PLO4",
        "PLO5",
        "PLO6",
        "PLO7",
        "PLO8",
        "PLO9",
        "PLO10",
        "PLO11",
        "PLO12",
      ],
    series: [
      [30, 60, 50, 10, 20, 50, 30, 50, 40, 10, 40, 25],
      [20, 10, 40, 20, 30, 20, 60, 35, 35, 55, 25, 50],
      [50, 30, 10, 70, 50, 30, 10, 15, 25, 35, 35, 25],
    ],
  };

  var courseOptions = {
    stackBars: true,
    style: 'stroke-width: 30px' 
  };

  const columns = [
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      width: 100,
    },
    {
      title: 'PLO1',
      dataIndex: 'plo1',
      key: 'plo1',
      width: 100,
    },
    {
        title: 'PLO2',
        dataIndex: 'plo2',
        key: 'plo2',
        width: 100,
      },
      {
        title: 'PLO3',
        dataIndex: 'plo3',
        key: 'plo3',
        width: 100,
      },
      {
        title: 'PLO4',
        dataIndex: 'plo4',
        key: 'plo4',
        width: 100,
      },
      {
        title: 'PLO5',
        dataIndex: 'plo5',
        key: 'plo5',
        width: 100,
      },
      {
        title: 'PLO6',
        dataIndex: 'plo6',
        key: 'plo6',
        width: 100,
      },
      {
        title: 'PLO7',
        dataIndex: 'plo7',
        key: 'plo7',
        width: 100,
      },
      {
        title: 'PLO8',
        dataIndex: 'plo8',
        key: 'plo8',
        width: 100,
      },
      {
        title: 'PLO9',
        dataIndex: 'plo9',
        key: 'plo9',
        width: 100,
      },
      {
        title: 'PLO10',
        dataIndex: 'plo10',
        key: 'plo10',
        width: 100,
      },
      {
        title: 'PLO11',
        dataIndex: 'plo11',
        key: 'plo11',
        width: 100,
      },
      {
        title: 'PLO12',
        dataIndex: 'plo12',
        key: 'plo12',
        width: 100,
      },
    
  ];
  
  const data = [
    { course: 'CSE303', plo1: 'N/A', plo2: 'N/A', plo3: 'N/A', plo4: 'N/A', plo5: 'N/A', plo6: 'N/A', plo7: 'N/A', plo8: '62.5%', plo9: '50%', plo10: '12.5%', plo11: '90%', plo12: 'N/A' },
    { course: 'CSE211', plo1: 'N/A', plo2: 'N/A', plo3: 'N/A', plo4: '32.5%', plo5: '65%', plo6: '18%', plo7: '90%', plo8: 'N/A', plo9: 'N/A', plo10: 'N/A', plo11: 'N/A', plo12: 'N/A' },
    { course: 'CSE203', plo1: '22.5%', plo2: '8.5%', plo3: '90%', plo4: 'N/A', plo5: 'N/A', plo6: 'N/A', plo7: 'N/A', plo8: 'N/A', plo9: 'N/A', plo10: 'N/A', plo11: 'N/A', plo12: 'N/A' },
    { course: 'CSE101', plo1: '50%', plo2: '90%', plo3: 'N/A', plo4: 'N/A', plo5: 'N/A', plo6: 'N/A', plo7: 'N/A', plo8: 'N/A', plo9: 'N/A', plo10: 'N/A', plo11: 'N/A', plo12: 'N/A' },
   
  ];
  

function StudentDashboard() {
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
    seriesBarDistance: 1,
    distributeSeries: true,
  };

  var schoolData = {
    labels: schoolLabels,
    series: schoolSeries,
  };

  var schoolOptions = {
    seriesBarDistance: 1,
    distributeSeries: true,
  };
  var percentageData = {
    labels: percentageLabels,
    series: percentageSeries,
  };

  var percentageOptions = {
    seriesBarDistance: 1,
    distributeSeries: true,
  };


  var departmentData = {
    labels: departmentLabels,
    series: departmentSeries,
  };

  var departmentOptions = {
    seriesBarDistance: 1,
    distributeSeries: true,
  };


  var type = "Bar";
  var type1 = "Pie";

  useEffect(() => {
    fetch("http://localhost:5000/program/enrollment")
      .then((response) => response.json())
      .then((res) =>
        res.map((val) => {
          setProgramLabels((oldArray) => [...oldArray, val.programName]);
          setProgramSeries((oldArray) => [...oldArray, val.noOfStudents]);
        })
      );
  }, []);

  var totalEnrollment = 0;
  useEffect(() => {
    fetch("http://localhost:5000/school/enrollment")
      .then((response) => response.json())
      .then((res) =>
        res.map((val) => {
          setSchoolLabels((oldArray) => [...oldArray, val.schoolName]);
          setSchoolSeries((oldArray) => [...oldArray, val.noOfStudents]);
          totalEnrollment += val.noOfStudents;
        })
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/department/enrollment")
      .then((response) => response.json())
      .then((res) =>
        res.map((val) => {
          setDepartmentLabels((oldArray) => [...oldArray, val.departmentlName]);
          setDepartmentSeries((oldArray) => [...oldArray, val.noOfStudents]);
        })
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/school/enrollment")
      .then((response) => response.json())
      .then((res) =>
        res.map((val) => {
          var n = Math.round((val.noOfStudents/totalEnrollment)*100);
          var p = n.toString() + "%";
          setPercentageLabels((oldArray) => [...oldArray, p]);
          setPercentageSeries((oldArray) => [...oldArray, n]);
          console.log(p);
        })
      );
  }, []);



  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Major</p>
                      <Card.Title as="h4">Computer Science</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Minor</p>
                      <Card.Title as="h4">Computational Mathematics</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-spaceship text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Credits Completed</p>
                      <Card.Title as="h4">89</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart-pie-36 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Major Credits Completed</p>
                      <Card.Title as="h4">9</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart-pie-36 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Minor Credits Completed</p>
                      <Card.Title as="h4">9</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">My PLO Analysis</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={studentData}
                    options={studentOptions}
                    type={type}
                  />
                </div>
              </Card.Body>
              
            </Card>
          </Col>
         
        </Row>
      </Container>
    </>
  );
}

export default StudentDashboard;
