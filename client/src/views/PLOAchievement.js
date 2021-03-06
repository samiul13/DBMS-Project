import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Dropdown, Table } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["PLO1", "PLO2", "PLO3", "PLO4", "PLO5", "PLO6", "PLO7", "PLO8", "PLO9", "PLO10", "PLO11", "PLO12"],
  datasets: [
    {
      label: "Achieved Percentage",
      data: [72, 55, 80, 59, 71, 55, 85, 68, 45, 81, 69, 80],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Failed Percentage",
      data: [28, 45, 20, 31, 29, 45, 15, 32, 55, 19, 31, 20],
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

class PLOAchievement extends Component {
    constructor(props) {
        super(props);
        this.state = {
          studentID: "",
          schoolID: "",
          course: "",
          semesterStart: "",
          semesterEnd: "",
          data: [],
        };
        this.handleSemesterStartChange = this.handleSemesterStartChange.bind(this);
        this.handleSemesterEndChange = this.handleSemesterEndChange.bind(this);
      }
      handleSemesterStartChange(e) {
        this.setState({ semesterStart: e.target.value });
      }
      handleSemesterEndChange(e) {
        this.setState({ semesterEnd: e.target.value });
      }


  handleSubmit = (e) => {
    e.preventDefault();

    const { studentID, schoolID } = this.state;

    const newData = {
      studentID,
      schoolID,
    };
    this.setState({ data: [...this.state.data, ...[1, 2, 3]] });
    axios
      .post("http://localhost:5000/ploachievement", newData)

      .then((res) =>
        this.setState((prevState) => ({
          data: [...prevState.data, res.data],
        }))
      );
  };

  render() {
    let semesterOptions = [
        {
          label: "Spring2019",
          value: "Spring2019",
        },
        {
          label: "Summer2019",
          value: "Summer2019",
        },
        {
          label: "Autumn2019",
          value: "Autumn2019",
        },
        {
          label: "Spring2020",
          value: "Spring2020",
        },
        {
          label: "Summer2020",
          value: "Summer2020",
        },
        {
          label: "Autumn2020",
          value: "Autumn2020",
        },
        {
          label: "Spring2021",
          value: "Spring2021",
        },
      ];
    return (
      <>
      <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail" key="2">
            <Form.Label>From</Form.Label>
            <div className="select-container">
              <select
                value={this.state.semesterStart}
                onChange={this.handleSemesterStartChange}
                style={{
                  width: "250px",
                  height: "40px",
                  border: "1px solid grey",
                }}
              >
                {semesterOptions.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </Form.Group>
          <Form.Group controlId="formBasicEmail" key="2">
            <Form.Label>To</Form.Label>
            <div className="select-container">
              <select
                value={this.state.semesterEnd}
                onChange={this.handleSemesterEndChange}
                style={{
                  width: "250px",
                  height: "40px",
                  border: "1px solid grey",
                }}
              >
                {semesterOptions.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
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
          <>
        <div className="header">
          <h6 className="title">
            Following chart shows the percentage of students who achieved each
            of the PLOs and that of those who failed
          </h6>
        </div>
        <Bar data={data} options={options} /></>):null}
      </>
    );
  }
}

export default PLOAchievement;
