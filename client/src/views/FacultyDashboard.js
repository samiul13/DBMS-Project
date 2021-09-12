import React, { useState, useEffect, useCallback } from "react";
import ChartistGraph from "react-chartist";
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";

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
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">School wise enrollment</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph data={schoolData} options={schoolOptions} type={type} />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <h6>Year 2020</h6>
                </div>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">School wise enrollment comparison</Card.Title>
                
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                <ChartistGraph data={percentageData} options={percentageOptions} type={type1} />
                </div>
                
                <div className="legend">
                  <h6>Year 2020</h6>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Program wise enrollment</Card.Title>
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
                  <h6>Year 2020</h6>
                </div>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Department wise enrollment</Card.Title>
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
                  <h6>Year 2020</h6>
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

export default FacultyDashboard;
