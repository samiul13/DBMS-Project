import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Container, Row} from "react-bootstrap";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["PLO1", "PLO2", "PLO3", "PLO4", "PLO5", "PLO6", "PLO7", "PLO8", "PLO9", "PLO10", "PLO11", "PLO12"],
  datasets: [
    {
      label: "Individual Percentage PLO",
      data: [85, 90, 83, 92, 95, 80, 75, 93, 79, 90, 86, 81],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Program Average PLO",
      data: [70, 80, 81, 75, 65, 60, 62, 80, 81, 68, 72, 78],
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

class IndividualProgramAveragePLO extends Component {
    constructor(props) {
        super(props);
        this.state = {
          studentID: "",
          schoolID: "",
          data: [],
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    
        const { studentID } = this.state;
    
        const newData = {
          studentID,
          
        };
      
        this.setState({ data: [...this.state.data, ...[1,2,3] ] })
    
     /*    axios
          .post("http://localhost:5000/dean/studentGrades", newData)
    
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
        ];
    return (
      <Container fluid>
      <Form onSubmit={this.handleSubmit}>
    
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
    
          <Button variant="primary" type="submit" style={{ marginTop: "20px", marginBottom: '30px' }}>
            Submit
          </Button>
        </Form>
        {this.state.data.length > 0 ? (
          <>
        <div className="header">
          <h6 className="title">
            Following chart shows percentage score in each PLO against the program average
            (from the students in the same program).
          </h6>
        </div>
         
        <Bar data={data} options={options} /> </>) : null}
 
      </Container>
    );
  }
}

export default IndividualProgramAveragePLO;
