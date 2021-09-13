import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Dropdown, Table } from "react-bootstrap";


class CourseStudentPerformance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      course: "CSE303",
      data: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ course: e.target.value });
  }



  handleSubmit = (e) => {
    e.preventDefault();

    const {course } = this.state;
    
    const newData = {
      course
    };

    axios
      .post("http://localhost:5000/course/studentGrades", newData)

      .then((res) =>
        this.setState((prevState) => ({
          data: [...prevState.data, res.data],
        }))
      );
     console.log(this.state.data)
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

          <Button variant="primary" type="submit" style={{ marginTop: "50px" }}>
            Submit
          </Button>
        </Form>
        {this.state.data.length > 0 ? 
        (<Table striped bordered hover style={{marginTop: '50px'}}>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>StudentID</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
           {this.state.data.map.length > 0 ? ( this.state.data.map((items, index) => (
              
              
                  items.map((item, i) => (
                    <tr key={i}> 
                  <td>{item.courseName}</td>
                  <td>{item.studentID}</td>
                  <td>{item.grade}</td>
                  </tr>
                  ))
              
            ))) : null} 
            
          </tbody>
        </Table>) : null }
      </>
    );
  }
}

export default CourseStudentPerformance;
