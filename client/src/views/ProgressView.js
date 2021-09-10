import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Card, Container, Row, Col } from "react-bootstrap";
import Table from 'rc-table';


function ProgressView() {
  var type = "Bar";
  var type1 = "Line";
  var studentProgress = {
    labels: [
      "Spring",
      "Summer",
      "Autumn",
    ],
    series: [[1, 5, 2],
    [1, 4, 2],
    ]
  };
  var studentOptions = {
    low: 0,
  showArea: true,
  showPoint: false,
  fullWidth: true
  };

  var programData = {
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
    series: [[85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85],
    [55, 45, 65, 35, 40, 75, 50, 60, 32, 47, 61, 32]]
  };
  var programOptions = {
    seriesBarDistance: 10,
  axisX: {
    offset: 60
  },
  axisY: {
    offset: 80,
    labelInterpolationFnc: function(value) {
      return value
    },
    scaleMinSpace: 15
  }
  };

  var semesterData = {
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
    series: [[85, 85, 85, 85, 0, 85, 85, 85, 85, 0, 0, 0],
    [45, 65, 32, 50, 0, 65, 55, 42, 57, 0, 0, 0]]
  };
  var semesterOptions = {
    seriesBarDistance: 10,
  axisX: {
    offset: 60
  },
  axisY: {
    offset: 80,
    labelInterpolationFnc: function(value) {
      return value
    },
    scaleMinSpace: 15
  }
  };

  const columns = [
    {
      title: 'CO',
      dataIndex: 'co',
      key: 'co',
      width: 100,
    },
    {
      title: 'PLO',
      dataIndex: 'plo',
      key: 'plo',
      width: 100,
    },
    {
        title: 'Sucessfully Achieved',
        dataIndex: 'success',
        key: 'success',
        width: 200,
      },
      {
        title: 'Success Percentage',
        dataIndex: 'sp',
        key: 'sp',
        width: 200,
      },
      
  ];
  
  const data = [
    {co: 1, plo: 'PLO8', success: 55, sp: '62.5%' },
    {co: 2, plo: 'PLO9', success: 44, sp: '50%' },
    {co: 3, plo: 'PLO10', success: 11, sp: '12.5%' },
    {co: 4, plo: 'PLO11', success: 79, sp: '90%' },
  ];

  return (
    <>
      <Container fluid>
      <Row>
      <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Course Success Rate</Card.Title>
              </Card.Header>
              <Card.Body>
              <Table columns={columns} data={data} />
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <h6>Number of students: 88</h6>
                </div>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
          </Row> 
          
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Student's Semester wise Progress View</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={studentProgress}
                    options={studentOptions}
                    type={type1}
                  />
                </div>
              </Card.Body>
              
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Semester wise Progress View</Card.Title>
              </Card.Header>
              <Card.Body>
              <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={semesterData}
                    options={semesterOptions}
                    type={type}
                  />
                </div>

                
              </Card.Body>
            </Card>
          </Col>

          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Program wise Progress View</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={programData}
                    options={programOptions}
                    type={type}
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
              
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProgressView;

