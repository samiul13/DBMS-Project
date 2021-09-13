import React, { useState, useEffect, useCallback } from "react";
import ChartistGraph from "react-chartist";
import { Pie } from "react-chartjs-2";
import { Card, Container, Row, Col } from "react-bootstrap";

const data = {
  labels: ["CSE201", "CSE101", "CSE303"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function FacultyDashboard() {
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
          var n = Math.round((val.noOfStudents / totalEnrollment) * 100);
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
                      <p className="card-category">Courses</p>
                      <Card.Title as="h4">1</Card.Title>
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
                      <p className="card-category">Sections</p>
                      <Card.Title as="h4">2</Card.Title>
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
                      <p className="card-category">Success Rate</p>
                      <Card.Title as="h4">60%</Card.Title>
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
                      <p className="card-category">PLOs taught</p>
                      <Card.Title as="h4">5</Card.Title>
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
        <Row style={{ justifyContent: "center", alignItems: "center" }}>
          <div className="header">
            <h5 className="title">
              The Following Pie Chart shows the PLO achievement percentage:
            </h5>
          </div>
        </Row>
        <Row md={2} style={{ justifyContent: "center", alignItems: "center" }}>
          <div style={{ height: "50vh" }}>
            <Pie data={data} />
          </div>
        </Row>
      </Container>
    </>
  );
}

export default FacultyDashboard;
