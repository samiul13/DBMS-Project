import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Form, Button, Dropdown} from "react-bootstrap";
import { Card, Container, Row, Col } from "react-bootstrap";
import Table from "rc-table";

class IndividualPLOAchieved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: "",
      schoolID: "",
      data: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ course: e.target.value });
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { studentID, schoolID } = this.state;

    const newData = {
      studentID,
      schoolID,
    };

    axios
      .post("http://localhost:5000/dean/studentGrades", newData)

      .then((res) =>
        this.setState((prevState) => ({
          data: [...prevState.data, res.data],
        }))
      );
  };

  render() {
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
      style: "stroke-width: 30px",
    };

    const columns = [
      {
        title: "Course",
        dataIndex: "course",
        key: "course",
        width: 100,
      },
      {
        title: "PLO1",
        dataIndex: "plo1",
        key: "plo1",
        width: 100,
      },
      {
        title: "PLO2",
        dataIndex: "plo2",
        key: "plo2",
        width: 100,
      },
      {
        title: "PLO3",
        dataIndex: "plo3",
        key: "plo3",
        width: 100,
      },
      {
        title: "PLO4",
        dataIndex: "plo4",
        key: "plo4",
        width: 100,
      },
      {
        title: "PLO5",
        dataIndex: "plo5",
        key: "plo5",
        width: 100,
      },
      {
        title: "PLO6",
        dataIndex: "plo6",
        key: "plo6",
        width: 100,
      },
      {
        title: "PLO7",
        dataIndex: "plo7",
        key: "plo7",
        width: 100,
      },
      {
        title: "PLO8",
        dataIndex: "plo8",
        key: "plo8",
        width: 100,
      },
      {
        title: "PLO9",
        dataIndex: "plo9",
        key: "plo9",
        width: 100,
      },
      {
        title: "PLO10",
        dataIndex: "plo10",
        key: "plo10",
        width: 100,
      },
      {
        title: "PLO11",
        dataIndex: "plo11",
        key: "plo11",
        width: 100,
      },
      {
        title: "PLO12",
        dataIndex: "plo12",
        key: "plo12",
        width: 100,
      },
    ];

    const data = [
      {
        course: "CSE303",
        plo1: "N/A",
        plo2: "N/A",
        plo3: "N/A",
        plo4: "N/A",
        plo5: "N/A",
        plo6: "N/A",
        plo7: "N/A",
        plo8: "62.5%",
        plo9: "50%",
        plo10: "12.5%",
        plo11: "90%",
        plo12: "N/A",
      },
      {
        course: "CSE211",
        plo1: "N/A",
        plo2: "N/A",
        plo3: "N/A",
        plo4: "32.5%",
        plo5: "65%",
        plo6: "18%",
        plo7: "90%",
        plo8: "N/A",
        plo9: "N/A",
        plo10: "N/A",
        plo11: "N/A",
        plo12: "N/A",
      },
      {
        course: "CSE206",
        plo1: "50%",
        plo2: "90%",
        plo3: "N/A",
        plo4: "N/A",
        plo5: "N/A",
        plo6: "N/A",
        plo7: "N/A",
        plo8: "N/A",
        plo9: "N/A",
        plo10: "N/A",
        plo11: "N/A",
        plo12: "N/A",
      },
      {
        course: "CSE317",
        plo1: "50%",
        plo2: "90%",
        plo3: "N/A",
        plo4: "N/A",
        plo5: "N/A",
        plo6: "N/A",
        plo7: "N/A",
        plo8: "N/A",
        plo9: "N/A",
        plo10: "N/A",
        plo11: "N/A",
        plo12: "N/A",
      },
      {
        course: "CSE203",
        plo1: "22.5%",
        plo2: "8.5%",
        plo3: "90%",
        plo4: "N/A",
        plo5: "N/A",
        plo6: "N/A",
        plo7: "N/A",
        plo8: "N/A",
        plo9: "N/A",
        plo10: "N/A",
        plo11: "N/A",
        plo12: "N/A",
      },
      {
        course: "CSE201",
        plo1: "N/A",
        plo2: "N/A",
        plo3: "N/A",
        plo4: "32.5%",
        plo5: "65%",
        plo6: "18%",
        plo7: "90%",
        plo8: "N/A",
        plo9: "N/A",
        plo10: "N/A",
        plo11: "N/A",
        plo12: "N/A",
      },
      {
        course: "CSE101",
        plo1: "50%",
        plo2: "90%",
        plo3: "N/A",
        plo4: "N/A",
        plo5: "N/A",
        plo6: "N/A",
        plo7: "N/A",
        plo8: "N/A",
        plo9: "N/A",
        plo10: "N/A",
        plo11: "N/A",
        plo12: "N/A",
      },
    ];

    return (
      <>
      <Form onSubmit={this.handleSubmit}>
          <Form.Group
            controlId="formBasicEmail"
            style={{ width: "13vw" }}
            key="1"
          >
            <Form.Label>Student ID</Form.Label>
            <input
              type="text"
              className="form-control"
              name="studentID"
              placeholder="2022053"
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Button variant="success" type="submit" style={{ marginTop: "20px", marginBottom: '30px' }}>
            Submit
          </Button>
        </Form>
        <Container fluid>
          <Row>
            <Col md="12">
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
        </Container>
      </>
    );
  }
}

export default IndividualPLOAchieved;
