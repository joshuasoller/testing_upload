import React, { Component } from "react";
import { database } from "./MyFirebase";
import "../App.css";
import "firebase/app";
import _ from "lodash";
//////////////////this is the student access
class RetrieveData extends React.Component {
  constructor(props) {
    super(props);

    this.records = {};
    this.grades = {};

    this.studentID = {
      id: ""
    };
  }

  getGrades = e => {
    e.preventDefault();
    let studentID = document.getElementById("studentID").value;
    database
      .ref("students/" + studentID + "/grades")
      .once("value")
      .then(doc => {
        const data = doc.val();

        this.grades = data;

        console.log(this.grades);
        this.getRecords(studentID);
      });
  };

  getRecords = ID => {
    database
      .ref("students/" + ID)
      .once("value")
      .then(doc => {
        const data = doc.val();

        this.records = data;
        this.forceUpdate();
        console.log(this.records);
        this.fillAllinput();
      });
  };

  fillAllinput = () => {
    document.getElementById("firstname").value = this.records.firstname;
    document.getElementById("middlename").value = this.records.middlename;
    document.getElementById("surname").value = this.records.surname;

    document.getElementById("course").value = this.records.course;
    document.getElementById("year").value = this.records.year;
    document.getElementById("semester").value = this.records.semester;
    document.getElementById("birthday").value = this.records.birthday;
    document.getElementById("semesterYear").value = this.records.semesterYear;
  };

  render() {
    let arrayKeys, arrayValues, arrayTest, a;
    if (this.grades != null) {
      arrayKeys = Object.keys(this.grades);
      arrayValues = Object.values(this.grades);
      arrayTest = [...arrayValues];
      a = -1;
    }
    return (
      <div name="main-doesnt-need-to-be-modified">
        <div
          name="main-resizeable-container"
          className="container"
          style={({ backgroundColor: "blue" }, { maxWidth: 500 })}
        >
          <form onSubmit={this.getGrades}>
            <label htmlFor="studentID">ID</label>
            <input name="studentID" type="text" id="studentID" required></input>
            <button>push</button>
          </form>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Name
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="e.g. Joe"
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="firstname"
              autocomplete="off"
              required
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Middle Name
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="e.g. Joe"
              aria-label="Username"
              aria-describedby="basic-addon1"
              autocomplete="off"
              id="middlename"
              required
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Surname
              </span>
            </div>
            <input
              id="surname"
              autocomplete="off"
              type="text"
              class="form-control"
              placeholder="e.g. Joe"
              aria-label="Username"
              aria-describedby="basic-addon1"
              required
            />
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                BirthDay
              </span>
            </div>
            <input
              type="date"
              id="birthday"
              name="birthday"
              className="shortFieldWidth browser-default"
              defaultValue="1900-01-01"
              autocomplete="off"
              onChange={this.handleChange}
              required
            />
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Course
              </span>
            </div>
            <input
              id="course"
              className="browser-default"
              style={{ width: 150 }}
              list="courseList"
              autocomplete="off"
              placeholder="course"
              onclick="selectText()"
              required
            />
            <datalist id="courseList">
              <option value="">Select...</option>
              <option value="BSCS" />
              <option value="BSBA" />
              <option value="BSED" />
              <option value="BSN" />
            </datalist>

            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Year Level
              </span>
            </div>
            <input
              id="year"
              className="browser-default"
              style={{ width: 150 }}
              list="yearLevel"
              placeholder="year"
              autocomplete="off"
              required
            />
            <datalist id="yearLevel">
              <option value="">Select...</option>
              <option value="1st" />
              <option value="2nd" />
              <option value="3rd" />
              <option value="4th" />
              <option value="Masteral" />
            </datalist>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Semester
                </span>
              </div>
              <input
                id="semester"
                className="browser-default"
                style={{ width: 150 }}
                list="currentSemester"
                placeholder="current sem"
                autocomplete="off"
                required
              />
              <datalist id="currentSemester">
                <option value="">Select...</option>
                <option value="1st" />
                <option value="2nd" />
                <option value="Summer" />
              </datalist>
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  School Year
                </span>
              </div>
              <input
                class="shortFieldWidth"
                onChange={this.handleChange}
                autocomplete="off"
                type="number"
                id="semesterYear"
                name="semesterYear"
                min="1975"
                max="3000"
                placeholder={new Date().getFullYear()}
                required
              ></input>
            </div>
          </div>
        </div>

        <div>
          <table key={this.grades}>
            <tbody>
              <tr>
                <th className="is-italic">Subject</th>
                <th className="is-italic">Grade</th>
              </tr>
              {arrayKeys && // if it exist
                arrayKeys.map(subjectGrade => {
                  if (subjectGrade !== "null") {
                    a = a + 1;
                    if (arrayTest[a] > 75) {
                      // then map it
                      return (
                        <tr key={a + "tr"}>
                          <td key={arrayKeys[a]}>
                            <input
                              defaultValue={subjectGrade}
                              id={arrayValues[a]}
                              style={{ color: "black" }}
                              disabled={true}
                            />
                          </td>
                          <td key={subjectGrade + a}>
                            <input
                              defaultValue={arrayTest[a]}
                              name={subjectGrade}
                              onChange={this.handleChange}
                              disabled={true}
                              type="number"
                            />
                          </td>
                        </tr>
                      );
                    } else if (arrayTest[a] < 75) {
                      // then map it
                      return (
                        <tr key={a + "tr"}>
                          <td
                            key={arrayKeys[a]}
                            style={{ backgroundColor: "#f88a8a" }}
                          >
                            <input
                              defaultValue={subjectGrade}
                              id={arrayValues[a]}
                              style={{ color: "black" }}
                              disabled={true}
                            />
                          </td>
                          <td
                            key={subjectGrade + a}
                            style={{ backgroundColor: "#f88a8a" }}
                          >
                            <input
                              defaultValue={arrayTest[a]}
                              name={subjectGrade}
                              onChange={this.handleChange}
                              disabled={true}
                              type="text"
                            />
                          </td>
                        </tr>
                      );
                    } else {
                      // then map it
                      return (
                        <tr key={a + "tr"}>
                          <td
                            key={arrayKeys[a]}
                            style={{ backgroundColor: "#b0b0b0" }}
                          >
                            <input
                              defaultValue={subjectGrade}
                              id={arrayValues[a]}
                              style={{ color: "black" }}
                              disabled={true}
                            />
                          </td>
                          <td
                            key={subjectGrade + a}
                            style={{ backgroundColor: "#b0b0b0" }}
                          >
                            <input
                              defaultValue={arrayTest[a]}
                              name={subjectGrade}
                              onChange={this.handleChange}
                              disabled={true}
                              type="text"
                            />
                          </td>
                        </tr>
                      );
                    }
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default RetrieveData;
