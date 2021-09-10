import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Card, Container, Row, Col } from "react-bootstrap";
import Table from 'rc-table';


function PLO() {
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
  

  return (
    <>
      <Container fluid>
          <Row>
      <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">PLO Achievement Percentage</Card.Title>
              </Card.Header>
              <Card.Body>
              <Table columns={columns} data={data} />
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
          
     
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Student wise PLO</Card.Title>
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
              <Card.Footer>
                <div className="legend">
                  <h6>Year 2020</h6>
                </div>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Department wise PLO</Card.Title>
              </Card.Header>
              <Card.Body>
              <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={departmentData}
                    options={departmentOptions}
                    type={type}
                  />
                </div>

                <div className="legend">
                  <h6>Year 2020</h6>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Course wise PLO</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={courseData}
                    options={courseOptions}
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

export default PLO;
