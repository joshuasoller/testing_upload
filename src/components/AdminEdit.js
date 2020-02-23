import React, { Component } from "react";
import "firebase/app";
import { database } from "./MyFirebase";

class AdminEdit extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.test = {};
    this.grades = {};
    this.record = {};
    this.isTBA = {
      status: true
    };

    this.ID = {
      id: null
    };

    ////bind functions here
  }

  //////// FETCHING THE GRADE FUNCTION
  showAlert = () => {
    this.snackbarManager.current.create({
      message: "Hello World!"
    });
  };

  jump = e => {
    e.preventDefault();
    this.getGrades();
    this.getGrades();
  };

  getRecord = e => {
    e.preventDefault();
    this.ID.id = document.getElementById("studentID").value;

    this.record = {};
    let studentID = this.ID.id;

    database
      .ref("students/" + studentID)
      .once("value")
      .then(doc => {
        this.record = doc.val();

        this.fillAllinput();
        this.forceUpdate();
      })
      .catch(function(error) {
        alert("ID or Record doesnt exist");
        console.log("Error getting document:", error);
        //window.location.reload();
      });
    //this.enablesAddNew();
  };

  fillAllinput = () => {
    const {
      firstname,
      middlename,
      lastname,
      course,
      year,
      birthday,
      semester,
      semesterYear
    } = this.record;

    document.getElementById("firstname").value = firstname;
    document.getElementById("middlename").value = middlename;
    document.getElementById("lastname").value = lastname;

    document.getElementById("course").value = course;
    document.getElementById("yearLevel").value = year;
    document.getElementById("semester").value = semester;
    document.getElementById("birthday").value = birthday;
    document.getElementById("semesterYear").value = semesterYear;
    this.enablesAddNew();
  };

  updateInfo = () => {
    let studentID = this.ID.id;

    let firstname = document.getElementById("firstname").value;
    let middlename = document.getElementById("middlename").value;
    let lastname = document.getElementById("lastname").values;

    let course = document.getElementById("course").value;
    let yearLevel = document.getElementById("yearLevel").value;
    let semester = document.getElementById("semester").value;
    let birthday = document.getElementById("birthday").value;
    let semesterYear = document.getElementById("semesterYear").value;
    this.enablesAddNew();

    database
      .ref("students/" + studentID)
      .child("firstname")
      .setValue(firstname);
    ///////////////
    database
      .ref("students/" + studentID)
      .child("middlename")
      .setValue(middlename);
    //////////////
    database
      .ref("students/" + studentID)
      .child("lastname")
      .setValue(lastname);
    /////////////
    database
      .ref("students/" + studentID)
      .child("course")
      .setValue(course);
    ////////////////
    database
      .ref("students/" + studentID)
      .child("year")
      .setValue(yearLevel);
    ///////////////
    database
      .ref("students/" + studentID)
      .child("birthday")
      .setValue(birthday);
    ///////////////
    database
      .ref("students/" + studentID)
      .child("semesterYear")
      .setValue(semesterYear);
    ///////////////
    database
      .ref("students/" + studentID)
      .child("semester")
      .setValue(semester);
    ///////////////
  };

  getGrades = e => {
    e.preventDefault();
    let studentID = document.getElementById("studentID").value;
    this.state = {};
    database
      .ref("students/" + studentID + "/grades")
      .once("value")
      .then(doc => {
        const data = doc.val();

        this.state = data;
        this.grades = data;

        console.log("this state", this.state);
        this.getRecord(e);
      })
      .catch(function(error) {
        //alert("ID or Record doesnt exist");
        console.log("Error getting document:", error);
      });
  };

  ///////////CHECKS THE CHANGES IN THE INPUT FIELDS//////////
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  ///////////////////SUBMITS THE GRADES///////////////////
  submitGrades = e => {
    e.preventDefault();

    let arrayKeys = Object.keys(this.state);
    let arrayValues = Object.values(this.state);

    for (let i = 0; i < arrayKeys.length; i++) {
      /*
        database
        .ref("students/" + this.ID.id + "/grades")
        .child(arrayKeys[i])
        .setValue(arrayValues[i]);
        */

      database
        .ref("students/" + this.ID.id + "/grades")
        .update({ [arrayKeys[i]]: arrayValues[i] })
        .then()
        .catch();
    }
    alert("saved successfully");
  };
  ///////////////enables fields that lets you add new subject//////////////////////
  enablesAddNew = () => {
    console.log("Reaches here");
    document.getElementById("saveChanges").disabled = false;
    document.getElementById("newGrade").disabled = false;
    document.getElementById("newSubject").disabled = false;
    document.getElementById("newButton").disabled = false;
    document.getElementById("refresh").disabled = false;
    document.getElementById("deleteAll").disabled = false;

    //////enable save button

    /////////////// also the delete buttons
    document.getElementById("deleteButton").disabled = false;
    document.getElementById("deleteSubject").disabled = false;
    document.getElementById("TBA").disabled = false;
  };
  /////////////add new subject/////////////
  tba = () => {
    if (this.isTBA.status) {
      console.log("the newgrade is disabled");
      document.getElementById("newGrade").value = "TBA";
      document.getElementById("newGrade").disabled = true;
      this.isTBA.status = false;
    } else {
      console.log("the newgrade is enabled");
      document.getElementById("newGrade").disabled = false;
      document.getElementById("newGrade").value = "";
      this.isTBA.status = true;
    }
  };

  addNewSubject = e => {
    e.preventDefault();
    let canAdd = true;
    let newSubject = document.getElementById("newSubject").value;
    let newGrade = document.getElementById("newGrade").value;
    let arrayKeys = Object.keys(this.grades);

    if (newGrade !== "TBA") {
      newGrade = Number(newGrade);
    }

    //this loop will check if the subject code is already existing or not
    for (let i = 0; i < arrayKeys.length; i++) {
      if (newSubject === arrayKeys[i]) {
        canAdd = false;
      }
    }

    if (!canAdd) {
      alert("The subject " + newSubject + " already exist");
    } else {
      database
        .ref("students/" + this.ID.id + "/grades")
        .update({ [newSubject]: newGrade })
        .then()
        .catch();

      this.getGrades(e);
      this.forceUpdate();
      document.getElementById("newSubject").value = null;
      document.getElementById("newGrade").value = null;
    }
  };
  //////////////////
  deleteSubject = e => {
    e.preventDefault();
    let newSubject = document.getElementById("deleteSubject");
    let deleteSub = newSubject[newSubject.selectedIndex].value;

    database
      .ref("students/" + this.ID.id + "/grades")
      .child(deleteSub)
      .remove()
      .catch(e);
    {
    }
    alert("The subject " + deleteSub + " has been deleted");
    this.getGrades(e);
    this.forceUpdate();
  };

  deleteAlls = e => {
    e.preventDefault();
    let arrayKeys = Object.keys(this.grades);
    console.log("getting here?");
    for (let i = 0; i < arrayKeys.length; i++) {
      if (arrayKeys[i] !== "null") {
        database
          .ref("students/" + this.ID.id + "/grades")
          .child(arrayKeys[i])
          .remove()
          .catch(e);
      }
    }

    this.grades(e);
    this.forceUpdate();
  };

  render() {
    let arrayKeys, arrayValues;

    arrayKeys = Object.keys(this.grades); //this is for
    arrayValues = Object.values(this.grades);

    let arrayTest = [...arrayValues];
    let adding = false;
    var a = -1;
    return (
      <div>
        <div
          className="container"
          style={{
            width: 400,
            maxWidth: 500,
            marginRight: 18,
            marginTop: 68,
            height: 500,
            marginBottom: "-28px",
            marginLeft: 32,
            paddingTop: 5
          }}
        >
          <form onSubmit={this.getGrades}>
            <div class="input-group mb-3" style={{ marginTop: 35 }}>
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  ID
                </span>
              </div>
              <input
                className="form-control"
                type="text"
                id="studentID"
                required
              />

              <button
                className="btn btn-primary"
                style={{ backgroundColor: "rgb(255,0,0)" }}
              >
                search!
              </button>
            </div>
          </form>
          <form onSubmit={this.updateInfo}>
            <div className="input-group mb-3" style={{ paddingTop: 20 }}>
              <div className="input-group-prepend">
                <span className="input-group-text">Firstname</span>
              </div>
              <input
                className="form-control"
                type="text"
                name="firstname"
                required
                id="firstname"
                onChange={this.handleChange}
                autocomplete="off"
              />
            </div>
            <div className="input-group" style={{ paddingTop: 20 }}>
              <div className="input-group-prepend">
                <span className="input-group-text">Middlename</span>
              </div>
              <input
                className="form-control"
                type="text"
                name="middlename"
                required
                id="middlename"
                onChange={this.handleChange}
                autocomplete="off"
              />
            </div>
            <div className="input-group" style={{ paddingTop: 20 }}>
              <div className="input-group-prepend">
                <span className="input-group-text">Surname</span>
              </div>
              <input
                className="form-control"
                type="text"
                name="lastname"
                required
                id="lastname"
                onChange={this.handleChange}
                autocomplete="off"
              />
            </div>
            <input
              type="date"
              name="birthday"
              id="birthday"
              onChange={this.handleChange}
              required
              style={{ marginTop: 16 }}
            />
            <div className="input-group" style={{ width: 170 }}>
              <div className="input-group-prepend">
                <span className="input-group-text">Course</span>
              </div>
              <input
                className="form-control"
                type="text"
                name="course"
                required
                id="course"
                onChange={this.handleChange}
                list="courseList"
                autocomplete="off"
              />
              <datalist id="courseList">
                <option value="">Select...</option>
                <option value="BSCS" />
                <option value="BSBA" />
                <option value="BSED" />
                <option value="BSN" />
              </datalist>
            </div>
            <div className="input-group" style={{ width: 170 }}>
              <div className="input-group-prepend">
                <span className="input-group-text">Year</span>
              </div>
              <input
                className="form-control"
                type="text"
                name="yearLevel"
                required
                id="yearLevel"
                onChange={this.handleChange}
                list="yearlevels"
                autocomplete="off"
              />
              <datalist id="yearlevels">
                <option value="">Select...</option>
                <option value="1st" />
                <option value="2nd" />
                <option value="3rd" />
                <option value="4th" />
                <option value="Masteral" />
              </datalist>
            </div>
            <div className="input-group" style={{ width: 170 }}>
              <div className="input-group-prepend">
                <span className="input-group-text">Semester</span>
              </div>
              <input
                className="form-control"
                type="text"
                name="semester"
                required
                id="semester"
                onChange={this.handleChange}
                list="currentSemesters"
                autocomplete="off"
              />
              <datalist id="currentSemesters">
                <option value="">Select...</option>
                <option value="1st" />
                <option value="2nd" />
                <option value="Summer" />
              </datalist>
            </div>
            <div className="input-group" style={{ width: 170 }}>
              <div>
                <span className="input-group-text">SchoolYear</span>
              </div>
              <input
                className="form-control"
                type="text"
                name="semesterYear"
                required
                id="semesterYear"
                onChange={this.handleChange}
                min="1975"
                max="3000"
                placeholder={new Date().getFullYear()}
                autocomplete="off"
              />
            </div>
            <button
              className="btn btn-primary"
              id="saveChanges"
              style={{ backgroundColor: "rgb(19,94,0)" }}
              disabled={true}
            >
              Save
            </button>
          </form>
        </div>
        <div
          className="container"
          style={{
            width: 481,
            margin: 0,
            marginTop: "-494px",
            marginRight: 0,
            marginLeft: 494,
            height: 500
          }}
        >
          <form onSubmit={this.submitGrades}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Grade </th>
                  </tr>
                </thead>
                <tbody>
                  {arrayKeys && // if it exist
                    arrayKeys.map(subjectGrade => {
                      if (subjectGrade !== "null") {
                        a = a + 1;

                        // then map it
                        return (
                          <tr key={a + "tr"}>
                            <td key={arrayKeys[a]}>
                              <input
                                className="form-control"
                                defaultValue={subjectGrade}
                                id={arrayValues[a]}
                                style={{ color: "black" }}
                                type="text"
                                disabled={true}
                                required
                              />
                            </td>
                            <td key={subjectGrade + a}>
                              <input
                                className="form-control"
                                defaultValue={arrayTest[a]}
                                name={subjectGrade}
                                id={subjectGrade}
                                onChange={this.handleChange}
                                input
                                type="text"
                                required
                              />
                            </td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-primary"
              type="button"
              style={{ backgroundColor: "rgb(7,116,25)" }}
              disabled={true}
              id="refresh"
              onClick={this.grades}
            >
              Refresh
            </button>
            <button className="btn btn-primary">SaveChanges</button>
          </form>
          <form onSubmit={this.deleteAlls}>
            <button
              className="btn btn-primary"
              id="deleteAll"
              disabled={true}
              style={{ backgroundColor: "rgb(143,9,9)" }}
            >
              DeleteAll
            </button>
          </form>

          <form onSubmit={this.addNewSubject}>
            <div className="input-group" style={{ marginTop: 46 }}>
              <div className="input-group-prepend">
                <span className="input-group-text">Subject</span>
              </div>
              <input
                className="form-control"
                id="newSubject"
                placeholder="SUBJECT CODE"
                disabled={true}
                required
                type="text"
                autocomplete="off"
              />
              <div className="input-group-append" />
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Grade</span>
              </div>
              <input
                className="form-control"
                id="newGrade"
                placeholder="e.g. 96.4"
                disabled={true}
                type="text"
                step=".01"
                autocomplete="off"
              />
              <div className="input-group-append" />
            </div>
            <button
              className="btn btn-primary"
              id="newButton"
              disabled={true}
              style={{ marginTop: 11 }}
            >
              Add
            </button>
          </form>
          <div
            className="form-check"
            style={{ width: 100, marginTop: "-23px", marginLeft: 93 }}
          >
            <input
              type="checkbox"
              onChange={this.tba}
              id="TBA"
              disabled={true}
            />
            <label className="form-check-label" htmlFor="formCheck-1">
              TBA
            </label>
          </div>

          <form onSubmit={this.deleteSubject}>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Delete</span>
              </div>
              <select
                className="browser-default shortFieldWidth"
                selected="selected"
                id="deleteSubject"
                disabled={false}
                required
              >
                {arrayKeys.map(subject => {
                  if (subject !== "null") {
                    return <option value={subject}> {subject} </option>;
                  }
                })}
              </select>
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  id="deleteButton"
                  disabled={true}
                >
                  DELETE
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AdminEdit;
