import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Dropdown, Table } from "react-bootstrap";

class DeanStudentPerformance extends Component {
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

    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group
            controlId="formBasicEmail"
            style={{ width: "20vw" }}
            key="1"
          >
            <Form.Label>School ID</Form.Label>
            <input
              type="text"
              className="form-control"
              name="schoolID"
              placeholder="1234"
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group
            controlId="formBasicEmail"
            style={{ width: "20vw" }}
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

          <Button variant="success" type="submit" style={{ marginTop: "50px" }}>
            Submit
          </Button>
        </Form>

        
        {this.state.data.length > 0 ? (
          <Table striped bordered hover style={{ marginTop: "50px" }}>
            <thead>
              <tr>
                <th>Dean Name</th>
                <th>StudentID</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((items, index) =>
                items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.dean}</td>
                    <td>{item.studentID}</td>
                    <td>{item.grade}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        ) : null}
      </>
    );
  }
}

export default DeanStudentPerformance;
