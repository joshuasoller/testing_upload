import React, { Component } from "react";
import "firebase/app";
import { database } from "./MyFirebase";

class AddData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentID: "",
      firstname: "",
      middlename: "",
      lastname: "",
      currentSemester: "",
      semesterYear: "",
      birthday: "",
      yearLevel: "",
      course: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      firstname,
      middlename,
      lastname,
      studentID,
      currentSemester,
      yearLevel,
      course,
      birthday,
      semesterYear
    } = this.state;

    database
      .ref("students/" + studentID)
      .once("value")
      .then(function(doc) {
        const data = doc.val();
        if (data !== null) {
          alert("Student ID already Exist");
        } else {
          // doc.data() will be undefined in this case

          database.ref("students/" + studentID).set({
            firstname: firstname,
            middlename: middlename,
            lastname: lastname,
            birthday: birthday,
            course: course,
            year: yearLevel,
            semester: currentSemester,
            semesterYear: semesterYear
          });
          database
            .ref("students/" + studentID + "/grades")
            .set({
              null: "null"
            })
            .catch(function(error) {
              alert("fuuuuuuck!");
              console.log("Error getting document:", error);
            });

          alert("Student successfully created");
          //window.location.reload();
        }
      })
      .catch(function(error) {
        alert("fuuuuuuck!");
        console.log("Error getting document:", error);
      });
  };

  render() {
    return (
      <div>
        <div
          className="container-fluid"
          style={({ backgroundColor: "blue" }, { minWidth: 500 })}
        >
          <h3>Testing</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                onChange={this.handleChange}
                value={this.state.id}
                type="text"
                className="form-control no-border"
                placeholder="ID"
                required
                autocomplete="off"
                id="studentID"
                name="studentID"
              />
            </div>

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
                aria-describedby="basic-addon1"
                name="firstname"
                id="firstname"
                autocomplete="off"
                onChange={this.handleChange}
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
                aria-describedby="basic-addon1"
                name="middlename"
                id="middlename"
                autocomplete="off"
                onChange={this.handleChange}
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
                type="text"
                class="form-control"
                placeholder="e.g. Joe"
                aria-describedby="basic-addon1"
                name="lastname"
                id="lastname"
                autocomplete="off"
                onChange={this.handleChange}
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
                name="course"
                onChange={this.handleChange}
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
                id="yearLevel"
                name="yearLevel"
                className="browser-default"
                style={{ width: 150 }}
                list="yearlevels"
                placeholder="year"
                autocomplete="off"
                onChange={this.handleChange}
                required
              />
              <datalist id="yearlevels">
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
                  id="currentSemester"
                  name="currentSemester"
                  className="browser-default"
                  style={{ width: 150 }}
                  list="currentSemesters"
                  placeholder="current sem"
                  autocomplete="off"
                  onChange={this.handleChange}
                  required
                />
                <datalist id="currentSemesters">
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
                  onChange={this.handleChange}
                  required
                ></input>
              </div>
            </div>

            <button>Submit Record</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddData;
