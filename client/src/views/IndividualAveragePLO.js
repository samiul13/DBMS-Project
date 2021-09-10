import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Dropdown, Table } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "Individual Percentage PLO",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Average PLO",
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: "rgb(54, 162, 235)",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

class IndividualAveragePLO extends Component {
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
        <div className="header">
          <h6 className="title">
            Following chart shows percentage score in each PLO in a selected
            course against the average score for individual students
          </h6>
        </div>
        <Bar data={data} options={options} />
      </>
    );
  }
}

export default IndividualAveragePLO;
