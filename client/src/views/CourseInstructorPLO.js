import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Container, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["PLO1", "PLO2", "PLO3", "PLO4", "PLO5", "PLO6", "PLO7", "PLO12"],
  datasets: [
    {
      label: "Sadita Ahmed",
      data: [72, 59, 65, 81, 60, 84, 61, 60],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Abu Syed",
      data: [78, 60, 61, 75, 71, 79, 68, 70],
      backgroundColor: "rgb(54, 162, 235)",
    },
    {
      label: "Mahadi Hasan",
      data: [62, 55, 60, 78, 62, 74, 60, 65],
      backgroundColor: "rgb(0,128,0)",
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

class CourseInstructorPLO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: "",
      schoolID: "",
      course: "",
      courseID: "",
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
    const { courseID } = this.state;
    const newData = {
      courseID,
    };
    this.setState({ data: [...this.state.data, ...[1, 2, 3]] });

    /*   axios
      .post("http://localhost:5000/instructorcourseplo", newData)

      .then((res) =>
        this.setState((prevState) => ({
          data: [...prevState.data, res.data],
        }))
      ); */
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
      {
        label: "CSE201",
        value: "CSE201",
      },
      {
        label: "CSE101",
        value: "CSE101",
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
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Row>
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
          </Row>
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
                Following chart shows the comparison of the PLO achieved
                percentage for each PLO among the instructors who have taken the
                course for a choosen time period.
              </h6>
            </div>
            <Row
              md={2}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Bar data={data} options={options} />
            </Row>
          </>
        ) : null}
      </Container>
    );
  }
}

export default CourseInstructorPLO;
