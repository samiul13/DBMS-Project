import React, { Component } from "react";
import axios from "axios";
import cogoToast from "cogo-toast";
import {
  Form,
  Button,
  Dropdown,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

class DataEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: "CSE303",
      co1: 0,
      co2: 0,
      co3: 0,
      co4: 0,
      semesterID: "",
      sectionID: "",
      studentID: "",
      facultyID: "",
      data: [],
      plo1: "PLO1",
      plo2: "PLO2",
      plo3: "PLO3",
      plo4: "PLO4",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePLOChange1 = this.handlePLOChange1.bind(this);
    this.handlePLOChange2 = this.handlePLOChange2.bind(this);
    this.handlePLOChange3 = this.handlePLOChange3.bind(this);
    this.handlePLOChange4 = this.handlePLOChange4.bind(this);
  }

  handleChange(e) {
    this.setState({ course: e.target.value });
  }
  handlePLOChange1(e) {
    this.setState({ plo1: e.target.value });
  }
  handlePLOChange2(e) {
    this.setState({ plo2: e.target.value });
  }
  handlePLOChange3(e) {
    this.setState({ plo3: e.target.value });
  }
  handlePLOChange4(e) {
    this.setState({ plo4: e.target.value });
  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { course, co1, co2, co3, co4, semesterID, sectionID, studentID, facultyID } = this.state;

    const newData = {
        course, co1, co2, co3, co4, semesterID, sectionID, studentID, facultyID
    };

    await axios
      .post("http://localhost:5000/assessment", newData)
      .then((res) =>
        cogoToast.success(res.data, {
            position: "top-right",
          })
      );
     await axios
      .post("http://localhost:5000/course/updateGrades");
   
  };

  render() {
    let options = [
      {
        label: "CSE303",
        value: "CSE303",
      },
      {
        label: "CSE301",
        value: "CSE301",
      },
      {
        label: "CSE212",
        value: "CSE212",
      },
      {
        label: "CSE203",
        value: "CSE203",
      },
    ];

    let PLOoptions = [
        {
          label: "PLO1",
          value: "PLO1",
        },
        {
          label: "PLO2",
          value: "PLO2",
        },
        {
          label: "PLO3",
          value: "PLO3",
        },
        {
          label: "PLO4",
          value: "PLO4",
        },
        {
            label: "PLO5",
            value: "PLO5",
          },
          {
            label: "PLO6",
            value: "PLO6",
          },
          {
            label: "PLO7",
            value: "PLO7",
          },
          {
            label: "PLO8",
            value: "PLO8",
          },
          {
            label: "PLO9",
            value: "PLO9",
          },
          {
            label: "PLO10",
            value: "PLO10",
          },
          {
            label: "PLO11",
            value: "PLO11",
          },
          {
            label: "PLO12",
            value: "PLO12",
          },
          
      ];

    let COoptions = [
      {
        label: "1",
        value: "1",
      },
      {
        label: "2",
        value: "2",
      },
      {
        label: "3",
        value: "3",
      },
      {
        label: "4",
        value: "4",
      },
    ];

    return (
      <>
        <Container fluid>
          <h4 style={{marginBottom:'35px'}}>Enter Data for Assessment</h4>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md="2">
                <Form.Group controlId="formBasicEmail" key="1">
                  <Form.Label>Select a Course</Form.Label>
                  <div className="select-container">
                    <select
                      value={this.state.course}
                      onChange={this.handleChange}
                      style={{
                        width: "250px",
                        height: "40px",
                        border: "1px solid grey",
                      }}
                    >
                      {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group controlId="formBasicEmail" key="2">
                  <Form.Label>CO1 Total</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="co1"
                    placeholder="enter co1 value"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group controlId="formBasicEmail" key="3">
                  <Form.Label>CO2 Total</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="co2"
                    placeholder="enter co2 value"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group controlId="formBasicEmail" key="4">
                  <Form.Label>CO3 Total</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="co3"
                    placeholder="enter co3 value"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group controlId="formBasicEmail" key="4">
                  <Form.Label>CO4 Total</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="co4"
                    placeholder="enter co4 value"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="2">
                <Form.Group
                  controlId="formBasicEmail"
                  style={{ width: "20vw" }}
                  key="5"
                >
                  <Form.Label>Student ID</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="studentID"
                    placeholder="Student ID"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="2">
                <Form.Group
                  controlId="formBasicEmail"
                  style={{ width: "20vw" }}
                  key="6"
                >
                  <Form.Label>Section ID</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="sectionID"
                    placeholder="Section ID"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="2">
                <Form.Group
                  controlId="formBasicEmail"
                  style={{ width: "20vw" }}
                  key="7"
                >
                  <Form.Label>Faculty ID</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="facultyID"
                    placeholder="Faculty ID"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="2">
                <Form.Group
                  controlId="formBasicEmail"
                  style={{ width: "20vw" }}
                  key="1"
                >
                  <Form.Label>Semester ID</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="semesterID"
                    placeholder="Semester ID"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="success"
              type="submit"
              style={{ marginTop: "50px" }}
            >
              Submit
            </Button>
          </Form>


          <h5 style={{marginTop:'350px'}}>PLO-CO Mapping</h5>
          <Row>
              <Col md="2">
                <Form.Group controlId="formBasicEmail" key="1">
                  <Form.Label>CO1 maps To:</Form.Label>
                  <div className="select-container">
                    <select
                      value={this.state.plo1}
                      onChange={this.handlePLOChange1}
                      style={{
                        width: "250px",
                        height: "40px",
                        border: "1px solid grey",
                      }}
                    >
                      {PLOoptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group controlId="formBasicEmail" key="1">
                  <Form.Label>CO2 maps To:</Form.Label>
                  <div className="select-container">
                    <select
                      value={this.state.plo2}
                      onChange={this.handlePLOChange2}
                      style={{
                        width: "250px",
                        height: "40px",
                        border: "1px solid grey",
                      }}
                    >
                      {PLOoptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group controlId="formBasicEmail" key="1">
                  <Form.Label>CO3 maps To:</Form.Label>
                  <div className="select-container">
                    <select
                      value={this.state.plo3}
                      onChange={this.handlePLOChange3}
                      style={{
                        width: "250px",
                        height: "40px",
                        border: "1px solid grey",
                      }}
                    >
                      {PLOoptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group controlId="formBasicEmail" key="1">
                  <Form.Label>CO4 maps To:</Form.Label>
                  <div className="select-container">
                    <select
                      value={this.state.plo4}
                      onChange={this.handlePLOChange4}
                      style={{
                        width: "250px",
                        height: "40px",
                        border: "1px solid grey",
                      }}
                    >
                      {PLOoptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </Form.Group>
              </Col>
              
            </Row>
            <Button
              variant="success"
              type="submit"
              style={{ marginTop: "50px" }}
            >
              Submit
            </Button>
        </Container>
      </>
    );
  }
}

export default DataEntry;
