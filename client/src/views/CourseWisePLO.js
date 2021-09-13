import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Form, Button, Container, Row } from "react-bootstrap";

const data = {
  labels: ["CSE303", "CSE206", "CSE201", "CSE203", "CSE317", "CSE405"],
  datasets: [
    {
      label: "Course-wise PLO",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
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

class CourseWisePLO extends Component {
    constructor(props) {
        super(props);
        this.state = {
         plo: "",
         semesterStart: "",
         semesterEnd: "",
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSemesterStartChange = this.handleSemesterStartChange.bind(this);
    this.handleSemesterEndChange = this.handleSemesterEndChange.bind(this);
     
      }
      handleChange(e) {
        this.setState({ plo: e.target.value });
      }
      handleSemesterStartChange(e) {
        this.setState({ semesterStart: e.target.value });
      }
      handleSemesterEndChange(e) {
        this.setState({ semesterEnd: e.target.value });
      }
      handleSubmit = (e) => {
        e.preventDefault();
    
        const { plo, semesterStart, semesterEnd } = this.state;
    
        const newData = {
            plo, semesterStart, semesterEnd
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
    const columns = [
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
            <Form.Label>Select a PLO</Form.Label>
            <div className="select-container">
              <select
                value={this.state.plo}
                onChange={this.handleChange}
                style={{
                  width: "250px",
                  height: "40px",
                  border: "1px solid grey",
                }}
              >
                {columns.map((option) => (
                  <option value={option.key}>{option.title}</option>
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
          <Button variant="primary" type="submit" style={{ marginTop: "50px" }}>
            Submit
          </Button>
        </Form>
        <div className="header">
          <h6 className="title">
            The follwoing chart shows a comparison of PLO achievement percentage
            among courses which have the same PLO/s that was/were selected for
            selected PLO/s, within the timeframe of chosen semester/s.
          </h6>
        </div>
        <Row md={2} style={{ justifyContent: "center", alignItems: "center" }}>
        <Bar data={data} options={options} />
        </Row>
      </Container>
    );
  }
}

export default CourseWisePLO;
