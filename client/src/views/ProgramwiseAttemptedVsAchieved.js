import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Dropdown, Table } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

const data = {
    labels: ['Number of students Attempted', 'Number of students Achieved'],
    datasets: [
      {
        label: 'Attempted Vs. Achieved PLO',
        data: [120, 70],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
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

class ProgramwiseAttemptedVsAchieved extends Component {
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSemesterStartChange = this.handleSemesterStartChange.bind(this);
    this.handleSemesterEndChange = this.handleSemesterEndChange.bind(this);
  }

  handleChange(e) {
    this.setState({ course: e.target.value });
  }
  handleSemesterStartChange(e) {
    this.setState({ semesterStart: e.target.value });
  }
  handleSemesterEndChange(e) {
    this.setState({ semesterEnd: e.target.value });
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
        label: "B.Sc in EEE",
        value: "B.Sc in EEE",
      },
      {
        label: "B.Sc in EEE",
        value: "B.Sc in EEE",
      },
      {
        label: "B.Sc in EEE",
        value: "B.Sc in EEE",
      },
      {
        label: "B.Sc in EEE",
        value: "B.Sc in EEE",
      },
      {
        label: "B.Sc in EEE",
        value: "B.Sc in EEE",
      },
      {
        label: "B.Sc in EEE",
        value: "B.Sc in EEE",
      },
    ];
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
            <Form.Label>Select a Program</Form.Label>
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
            variant="success"
            type="submit"
            style={{ marginTop: "20px", marginBottom: "30px" }}
          >
            Submit
          </Button>
        </Form>
        <div className="header">
          <h6 className="title">
            Following chart shows the count of students who attempted each PLO
            against that of those who achieved.
          </h6>
        </div>
        <Bar data={data} options={options} />
      </>
    );
  }
}

export default ProgramwiseAttemptedVsAchieved;
