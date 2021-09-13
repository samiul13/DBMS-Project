import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Form, Button, Dropdown } from "react-bootstrap";
import { Card, Container, Row, Col } from "react-bootstrap";
import Table from "rc-table";

class IndividualPLOAchieved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: "",
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

    const { studentID } = this.state;

    const newData = {
      studentID,
    };
    this.setState({ data: [...this.state.data, ...[1, 2, 3]] });

    /*   axios
      .post("http://localhost:5000/individualploforcourses", newData)

      .then((res) =>
        this.setState((prevState) => ({
          data: [...prevState.data, res.data],
        }))
      ); */
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
        plo1: "76%",
        plo2: "84%",
        plo3: "92%",
        plo4: "85%",
        plo5: "90%",
        plo6: "87%",
        plo7: "81%",
        plo8: "N/A",
        plo9: "N/A",
        plo10: "N/A",
        plo11: "N/A",
        plo12: "89%",
      },
      {
        course: "CSE213",
        plo1: "81%",
        plo2: "90%",
        plo3: "75%",
        plo4: "62.5%",
        plo5: "85%",
        plo6: "68%",
        plo7: "90%",
        plo8: "84%",
        plo9: "70%",
        plo10: "92%",
        plo11: "83%",
        plo12: "95%",
      },
      {
        course: "CSE211",
        plo1: "80%",
        plo2: "90%",
        plo3: "88.5%",
        plo4: "81%",
        plo5: "95%",
        plo6: "92%",
        plo7: "91%",
        plo8: "N/A",
        plo9: "N/A",
        plo10: "N/A",
        plo11: "N/A",
        plo12: "90%",
      },
      {
        course: "CSE203",
        plo1: "82.5%",
        plo2: "81.5%",
        plo3: "90%",
        plo4: "92%",
        plo5: "85%",
        plo6: "80%",
        plo7: "91%",
        plo8: "N/A",
        plo9: "75%",
        plo10: "78%",
        plo11: "N/A",
        plo12: "92%",
      },
      {
        course: "CSE201",
        plo1: "75%",
        plo2: "N/A",
        plo3: "81%",
        plo4: "92.5%",
        plo5: "85%",
        plo6: "78%",
        plo7: "90%",
        plo8: "N/A",
        plo9: "N/A",
        plo10: "95%",
        plo11: "87%",
        plo12: "N/A",
      },
      {
        course: "CSE101",
        plo1: "90%",
        plo2: "90%",
        plo3: "92%",
        plo4: "95%",
        plo5: "87%",
        plo6: "91%",
        plo7: "90%",
        plo8: "N/A",
        plo9: "95%",
        plo10: "N/A",
        plo11: "N/A",
        plo12: "95%",
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

          <Button
            variant="primary"
            type="submit"
            style={{ marginTop: "20px", marginBottom: "30px" }}
          >
            Submit
          </Button>
        </Form>
        {this.state.data.length > 0 ? (
          <Container fluid>
            <Row>
              <Col md="12">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">
                      PLO Achievement Percentage Table For All Courses Taken So
                      Far:
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Table columns={columns} data={data} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        ) : null}
      </>
    );
  }
}

export default IndividualPLOAchieved;
