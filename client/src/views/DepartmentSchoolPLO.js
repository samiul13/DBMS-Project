import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Dropdown, Table } from "react-bootstrap";
import { Pie } from 'react-chartjs-2';
import "../assets/css/FormGroup.css";

class DepartmentSchoolPLO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facultyID: "",
      studentID: "",
      course: "CSE303",
      school1: "",
      school2: "",
      school3: "",
      department1: "",
      department2: "",
      department3: "",
      semesterStart: "",
      semesterEnd: "",
      data: [],
      data1: [],
    };

    this.handleSchool1Change = this.handleSchool1Change.bind(this);
    this.handleSchool2Change = this.handleSchool2Change.bind(this);
    this.handleSchool3Change = this.handleSchool3Change.bind(this);
    this.handleDepartment1Change = this.handleDepartment1Change.bind(this);
    this.handleDepartment2Change = this.handleDepartment2Change.bind(this);
    this.handleDepartment3Change = this.handleDepartment3Change.bind(this);
    this.handleSemesterStartChange = this.handleSemesterStartChange.bind(this);
    this.handleSemesterEndChange = this.handleSemesterEndChange.bind(this);
  }

  handleSchool1Change(e) {
    this.setState({ school1: e.target.value });
  }
  handleSchool2Change(e) {
    this.setState({ school2: e.target.value });
  }
  handleSchool3Change(e) {
    this.setState({ school3: e.target.value });
  }
  handleDepartment1Change(e) {
    this.setState({ department1: e.target.value });
  }
  handleDepartment2Change(e) {
    this.setState({ department2: e.target.value });
  }
  handleDepartment3Change(e) {
    this.setState({ department3: e.target.value });
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
      studentID,
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
    const data1 = {
        labels: ['Department1', 'Department2',],
        datasets: [
          {
            label: 'Department wise PLO comparison',
            data: [70, 60],
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
      const data = {
        labels: ['School1', 'School2'],
        datasets: [
          {
            label: 'School wise PLO comparison',
            data: [60, 80],
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
      
      
    let options = [
      {
        label: "School of Engineering and Computer Science",
        value: "School of Engineering and Computer Science",
      },
      {
        label: "School of Business and Entrepreneurship",
        value: "School of Business and Entrepreneurship",
      },
  
    ];
    let options1 = [
        {
          label: "Department of Computer Science and Engineering",
          value: "Department of Computer Science and Engineering",
        },
        {
          label: "Department of Electrical and Electronic Engineering",
          value: "Department of Electrical and Electronic Engineering",
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
      <p style={{ marginTop: "50px" }}>
          Compare School wise PLO of students who achieved all the PLOs:
        </p>
        <Form onSubmit={this.handleSubmit}>
          <div className="FormGroup">
            <div>
              <Form.Group controlId="formBasicEmail" key="2">
                <Form.Label>School1</Form.Label>
                <div className="select-container">
                  <select
                    value={this.state.school1}
                    onChange={this.handleSchool1Change}
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
                <Form.Label>School2</Form.Label>
                <div className="select-container">
                  <select
                    value={this.state.school2}
                    onChange={this.handleSchool2Change}
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

          <Button variant="success" type="submit" style={{ marginTop: "50px" }}>
            Submit
          </Button>
        </Form>
        {this.state.data.length >= 0 ? (
            <Pie data={data} width={80} height={80} />
        ) : null}

        <p style={{ marginTop: "50px" }}>
          Compare Department wise PLO of students who achieved all the PLOs:
        </p>
        <Form onSubmit={this.handleInputSubmit}>
        <div className="FormGroup">
            <div>
              <Form.Group controlId="formBasicEmail" key="2">
                <Form.Label>Department1</Form.Label>
                <div className="select-container">
                  <select
                    value={this.state.department1}
                    onChange={this.handleDepartment1Change}
                    style={{
                      width: "250px",
                      height: "40px",
                      border: "1px solid grey",
                    }}
                  >
                    {options1.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </Form.Group>
            </div>
            <div>
              <Form.Group controlId="formBasicEmail" key="2">
                <Form.Label>Department2</Form.Label>
                <div className="select-container">
                  <select
                    value={this.state.department2}
                    onChange={this.handleDepartment2Change}
                    style={{
                      width: "250px",
                      height: "40px",
                      border: "1px solid grey",
                    }}
                  >
                    {options1.map((option) => (
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

          <Button variant="success" type="submit" style={{ marginTop: "50px" }}>
            Submit
          </Button>
        </Form>
        {this.state.data1.length >= 0 ? (
            <Pie data={data1} width={80} height={80} />
        ) : null}
      </>
    );
  }
}

export default DepartmentSchoolPLO;
