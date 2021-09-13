import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Container, Row } from "react-bootstrap";
import { Bar, Radar } from "react-chartjs-2";
import "../assets/css/FormGroup.css";

const data = {
  labels: ["Program1", "Program2", "Program3"],
  datasets: [
    {
      label: "University-Programs PLO of Graduates",
      data: [70, 80, 65],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
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
      university: "",
      program1: "",
      program2: "",
      program3: "",
      data: [],
    };

    this.handleProgram1Change = this.handleProgram1Change.bind(this);
    this.handleProgram2Change = this.handleProgram2Change.bind(this);
    this.handleProgram3Change = this.handleProgram3Change.bind(this);
    this.handleUniversityChange = this.handleUniversityChange.bind(this);
  }

  handleProgram1Change(e) {
    this.setState({ program1: e.target.value });
  }
  handleProgram2Change(e) {
    this.setState({ program2: e.target.value });
  }
  handleProgram3Change(e) {
    this.setState({ program3: e.target.value });
  }
  handleUniversityChange(e) {
    this.setState({ university: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { university, program1, program2, program3 } = this.state;

    const newData = {
      university,
      program1,
      program2,
      program3,
    };
    this.setState({ data: [...this.state.data, ...[1, 2, 3]] });

 /*    axios
      .post("http://localhost:5000/universityprogramploofgraduates", newData)

      .then((res) =>
        this.setState((prevState) => ({
          data: [...prevState.data, res.data],
        }))
      ); */
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
        label: "B.Sc in CSE",
        value: "B.Sc in CSE",
      },
      {
        label: "B.Sc in CS",
        value: "B.Sc in CS",
      },
      {
        label: "BBA in Finance",
        value: "BBA in Finance",
      },
    ];

    return (
      <Container fluid>
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
                <Form.Label>Select First Program</Form.Label>
                <div className="select-container">
                  <select
                    value={this.state.program1}
                    onChange={this.handleProgram1Change}
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
                <Form.Label>Select Second Program</Form.Label>
                <div className="select-container">
                  <select
                    value={this.state.program2}
                    onChange={this.handleProgram2Change}
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
                <Form.Label>Select Third Program</Form.Label>
                <div className="select-container">
                  <select
                    value={this.state.program3}
                    onChange={this.handleProgram3Change}
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
          </div>
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
            Following chart shows a radar chart showing the percentage of
            graduates who have achieved all PLOs of the chosen programs.
          </h6>
        </div>
        <Row md={2} style={{ justifyContent: "center", alignItems: "center", marginBottom: '20vh' }}>
          <div style={{height: '50vh'}}>
        <Radar data={data} />
        </div>
        </Row></> ): null}
      </Container>
    );
  }
}

export default UniversityProgramPLO;
