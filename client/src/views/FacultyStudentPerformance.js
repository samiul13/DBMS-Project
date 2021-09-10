import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Dropdown, Table } from "react-bootstrap";


class FacultyStudentPerformance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facultyID: "",
      studentID: "",
      course: "CSE303",
      data: [],
      data1: [],
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

    const { facultyID, course } = this.state;

    const newData = {
      facultyID,
      course,
    };

    axios
      .post("http://localhost:5000/faculty/studentGrades", newData)

      .then((res) =>
        this.setState((prevState) => ({
          data: [...prevState.data, res.data],
        }))
      );
     
  };

  handleInputSubmit = (e) => {
    e.preventDefault();

    const { facultyID, course, studentID } = this.state;

    const newData = {
      facultyID,
      course,
      studentID
    };

    axios
      .post("http://localhost:5000/faculty/studentGrade", newData)

      .then((res) =>
        this.setState((prevState) => ({
          data1: [...prevState.data, res.data],
        }))
      );
      console.log(this.state.data1);
     
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
        <p>Monitor All Students Performance:</p>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group
            controlId="formBasicEmail"
            style={{ width: "20vw" }}
            key="1"
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

          <Form.Group controlId="formBasicEmail" key="2">
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

          <Button variant="success" type="submit" style={{ marginTop: "50px" }}>
            Submit
          </Button>
        </Form>
       {this.state.data.length > 0 ? 
        (<Table striped bordered hover style={{marginTop: '50px'}}>
          <thead>
            <tr>
              <th>FacultyID</th>
              <th>Faculty Name</th>
              <th>Course Name</th>
              <th>StudentID</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((items, index) => (
              
              
                  items.map((item, i) => (
                    <tr key={i}> 
                  <td>{item.facultyId}</td>
                  <td>{item.FacultyName}</td>
                  <td>{item.courseName}</td>
                  <td>{item.studentID}</td>
                  <td>{item.grade}</td>
                  </tr>
                  ))
              
            ))}
            
          </tbody>
        </Table>) : null }

        <p style={{marginTop: '50px'}}>Monitor Individual Student Performance:</p>
        <Form onSubmit={this.handleInputSubmit}>
          <Form.Group
            controlId="formBasicEmail"
            style={{ width: "20vw" }}
            key="1"
          >
            <Form.Label>Faculty ID</Form.Label>
            <input
              type="text"
              className="form-control"
              name="facultyID"
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

          <Form.Group controlId="formBasicEmail" key="2">
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

          <Button variant="success" type="submit" style={{ marginTop: "50px" }}>
            Submit
          </Button>
        </Form>
       {this.state.data1.length > 0 ? 
        (<Table striped bordered hover style={{marginTop: '50px'}}>
          <thead>
            <tr>
              <th>FacultyID</th>
              <th>Faculty Name</th>
              <th>Course Name</th>
              <th>StudentID</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data1.map((items, index) => (
              
              
                  items.map((item, i) => (
                    <tr key={i}> 
                  <td>{item.facultyId}</td>
                  <td>{item.FacultyName}</td>
                  <td>{item.courseName}</td>
                  <td>{item.studentID}</td>
                  <td>{item.grade}</td>
                  </tr>
                  ))
              
            ))}
            
          </tbody>
        </Table>) : null }
      </>
    );
  }
}

export default FacultyStudentPerformance;
