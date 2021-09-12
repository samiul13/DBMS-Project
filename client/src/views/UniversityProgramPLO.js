import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Dropdown, Table } from "react-bootstrap";
import { Bar, Radar } from "react-chartjs-2";
import "../assets/css/FormGroup.css";

const data = {
  labels: ['PLO1', 'PLO2', 'PLO3', 'PLO4', 'PLO5', 'PLO6', 'PLO7', 'PLO8', 'PLO9', 'PLO10', 'PLO11', 'PLO12'],
  datasets: [
    {
      label: 'University-Program Wise PLO',
      data: [2, 9, 3, 5, 2, 3, 7, 12, 14, 4, 16, 8],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  scale: {
    ticks: { beginAtZero: true },
  },

};
  

class UniversityProgramPLO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: "",
      schoolID: "",
      university: "",
      program: "",
      semesterStart: "",
      semesterEnd: "",
      data: [],
    };

    this.handleProgramChange = this.handleProgramChange.bind(this);
    this.handleUniversityChange = this.handleUniversityChange.bind(this);
    this.handleSemesterStartChange = this.handleSemesterStartChange.bind(this);
    this.handleSemesterEndChange = this.handleSemesterEndChange.bind(this);
  }

  handleProgramChange(e) {
    this.setState({ program: e.target.value });
  }
  handleUniversityChange(e) {
    this.setState({ university: e.target.value });
  }
  handleSemesterStartChange(e) {
    this.setState({ semesterStart: e.target.value });
  }
  handleSemesterEndChange(e) {
    this.setState({ semesterEnd: e.target.value });
  }



  handleSubmit = (e) => {
    e.preventDefault();

    const { university, program, semesterStart, semesterEnd } = this.state;

    const newData = {
      university,
      program,
      semesterStart,
      semesterEnd,
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
    let universityOptions = [
      {
        label: "IUB",
        value: "IUB",
      },
      {
        label: "BRAC",
        value: "BRAC",
      },
      {
        label: "NSU",
        value: "NSU",
      },
    ];
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
        <div className="FormGroup">
          <div>
          <Form.Group controlId="formBasicEmail" key="2">
            <Form.Label>Select a University</Form.Label>
            <div className="select-container">
              <select
                value={this.state.university}
                onChange={this.handleUniversityChange}
                style={{
                  width: "250px",
                  height: "40px",
                  border: "1px solid grey",
                }}
              >
                {universityOptions.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </Form.Group>
          </div>
          <div>
          <Form.Group controlId="formBasicEmail" key="2">
            <Form.Label>Select a Program</Form.Label>
            <div className="select-container">
              <select
                value={this.state.program}
                onChange={this.handleProgramChange}
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          </div>
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
            Following chart shows a radar chart showing the PLO achieved count
comparison for each PLO within a chosen time frame for a choosen progam and university.
          </h6>
        </div>
        <Radar data={data} options={chartOptions} width={50}
	height={20} />
      </>
    );
  }
}

export default UniversityProgramPLO;
