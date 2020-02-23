import React from "react";
import { database } from "./MyFirebase";
import "../App.css";
import "firebase/app";
import _ from "lodash";

class StudentAccess extends React.Component {
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
      })
      .catch(function(error) {
        alert("That record doesnt exist");
        document.getElementById("studentID").value = "";
        console.log("Error getting document:", error);
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
      })
      .catch(function(error) {
        alert("That record doesnt exist");
        document.getElementById("studentID").value = "";
        console.log("Error getting document:", error);
      });
  };

  fillAllinput = () => {
    document.getElementById("firstname").value = this.records.firstname;
    document.getElementById("middlename").value = this.records.middlename;
    document.getElementById("surname").value = this.records.lastname;

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
      <div
        className="container"
        style={{
          width: 500,
          height: 500,
          paddingTop: 0,
          marginTop: 69,
          marginRight: 256,
          backgroundColor: "#8793ff"
        }}
      >
        <img
          style={{
            marginTop: 28,
            backgroundImage: 'url("components/logo.png")'
          }}
        />
        <form onSubmit={this.getGrades}>
          <input
            type="text"
            name="studentID"
            id="studentID"
            style={{ marginLeft: 35 }}
          />
          <button
            className="btn btn-primary btn-sm"
            style={{ marginLeft: 4, marginTop: "-8px" }}
          >
            Button
          </button>
        </form>
        <div className="row" style={{ height: 109 }}>
          <div className="col justify-content-center" style={{ height: 140 }}>
            <input
              type="text"
              name="firstname"
              id="firstname"
              readOnly
              required
              placeholder="FN"
              style={{
                width: 130,
                margin: 5,
                backgroundColor: "rgb(124,206,241)",
                marginLeft: 26
              }}
            />
            <input
              type="text"
              name="middlename"
              id="middlename"
              readOnly={true}
              placeholder="MN"
              style={{
                width: 130,
                margin: 5,
                backgroundColor: "rgb(124,206,241)"
              }}
            />
            <input
              type="text"
              name="surname"
              id="surname"
              readOnly={true}
              placeholder="LN"
              style={{
                width: 130,
                margin: 5,
                backgroundColor: "rgb(124,206,241)"
              }}
            />
            <input
              type="text"
              name="birthday"
              id="birthday"
              placeholder="BD"
              readOnly={true}
              autoFocus
              style={{
                width: 100,
                margin: 5,
                backgroundColor: "rgb(124,206,241)",
                marginLeft: 76
              }}
            />
            <input
              type="text"
              name="course"
              id="course"
              readOnly
              placeholder="COURSE"
              style={{
                width: 90,
                margin: 5,
                backgroundColor: "rgb(124,206,241)"
              }}
            />
            <input
              type="text"
              name="year"
              id="year"
              readOnly
              placeholder="YEAR"
              style={{
                width: 90,
                margin: 5,
                backgroundColor: "rgb(124,206,241)"
              }}
            />
            <input
              type="text"
              name="semester"
              id="semester"
              readOnly
              placeholder="SEMESTER"
              style={{
                margin: 5,
                backgroundColor: "rgb(124,206,241)",
                marginLeft: 126,
                width: 90
              }}
            />
            <input
              type="text"
              name="semesterYear"
              id="semesterYear"
              readOnly
              placeholder="S.Y"
              style={{
                margin: 5,
                backgroundColor: "rgb(124,206,241)",
                width: 90
              }}
            />
          </div>
        </div>
        <div
          className="row"
          style={{
            height: 238,
            width: 450,
            marginRight: 0,
            marginLeft: 11,
            marginTop: 20
          }}
        >
          <div className="col">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "#02709f" }}>Subject</th>
                    <th style={{ backgroundColor: "#02709f" }}>Grade</th>
                  </tr>
                </thead>
                <tbody>
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
        </div>
      </div>
    );
  }
}
export default StudentAccess;
