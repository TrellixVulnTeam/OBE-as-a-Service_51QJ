import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import "./css/addAssessmentTool.css";

const AddAssessmentTool = () => {
  const [courseType, setCourseType] = useState("");
  const [toolType, setToolType] = useState("");
  const [toolName, setToolName] = useState("");
  const [cloName, setCloName] = useState("");
  const [totalMarks, setTotalMarks] = useState();
  const location = useLocation();
  const history = useHistory();
  const getTokken = localStorage.getItem("token");
  // const handle = location.state.isPractical;

  //Header to be send through post request
  let axiosHeader = {
    headers: {
      "X-Access-Token": getTokken,
    },
  };

  //Date to be send through post request
  const data = {
    programName: location.state.programName,
    batchId: location.state.batchId,
    courseName: location.state.courseName,
    courseCode: location.state.courseCode,
    sectionName: location.state.sectionName,
    toolName,
    cloName,
    totalMarks,
  };

  const handleAdd = () => {
    if (
      (toolType === "sessional" ||
        toolType === "Sessional" ||
        toolType === "SESSIONAL") &&
      location.state.isPractical === 0
    ) {
      axios
        .post(
          "https://20.204.30.1/api/assessment_tool_definition/teacher/sessional/theory/",
          data,
          axiosHeader
        )
        .then(
          (response) => {
            try {
              if (response.data.data[0].Success === 1) {
                toast.success(response.data.data[0].Message);
                history.push({
                  pathname: "/courses/course-detail/assessment-tools",
                });
              } else if (response.data.data[0].Success === 0) {
                toast.error(response.data.data[0].Message);
              }
            } catch (ex) {
              toast.error("Invalid request");
            }
          },
          (error) => {
            toast.error(error);
          }
        );
    }
    if (
      (toolType === "final" || toolType === "Final" || toolType === "FINAL") &&
      location.state.isPractical === 0
    ) {
      axios
        .post(
          "https://20.204.30.1/api/assessment_tool_definition/teacher/final/theory/",
          data,
          axiosHeader
        )
        .then(
          (response) => {
            try {
              if (response.data.data[0].Success === 1) {
                toast.success(response.data.data[0].Message);
                history.push({
                  pathname: "/courses/course-detail/assessment-tools",
                });
              } else if (response.data.data[0].Success === 0) {
                toast.error(response.data.data[0].Message);
              }
            } catch (ex) {
              toast.error("Invalid request");
            }
          },
          (error) => {
            toast.error(error);
          }
        );
    }

    if (
      (toolType === "sessional" ||
        toolType === "Sessional" ||
        toolType === "SESSIONAL") &&
      location.state.isPractical === 1
    ) {
      axios
        .post(
          "https://20.204.30.1/api/assessment_tool_definition/teacher/sessional/practical/",
          data,
          axiosHeader
        )
        .then(
          (response) => {
            try {
              if (response.data.data[0].Success === 1) {
                toast.success(response.data.data[0].Message);
                history.push({
                  pathname: "/courses/course-detail/assessment-tools",
                });
              } else if (response.data.data[0].Success === 0) {
                toast.error(response.data.data[0].Message);
              }
            } catch (ex) {
              toast.error("Invalid request");
            }
          },
          (error) => {
            toast.error(error);
          }
        );
    }

    if (
      (toolType === "final" || toolType === "Final" || toolType === "FINAL") &&
      location.state.isPractical === 1
    ) {
      axios
        .post(
          "https://20.204.30.1/api/assessment_tool_definition/teacher/final/practical/",
          data,
          axiosHeader
        )
        .then(
          (response) => {
            try {
              if (response.data.data[0].Success === 1) {
                toast.success(response.data.data[0].Message);
                history.push({
                  pathname: "/courses/course-detail/assessment-tools",
                });
              } else if (response.data.data[0].Success === 0) {
                toast.error(response.data.data[0].Message);
              }
            } catch (ex) {
              toast.error("Invalid request");
            }
          },
          (error) => {
            toast.error(error);
          }
        );
    }
  };

  const handleCancel = () => {
    history.push({
      pathname: "/courses/course-detail/assessment-tools",
    });
  };

  const handleCourseType = () => {
    {
      location.state.isPractical === 1
        ? setCourseType("Practical")
        : setCourseType("Theory");
    }
  };

  useEffect(() => {
    handleCourseType();
  });

  return (
    <>
      <div className="add-background">
        <div className="container mt-4">
          <div className="add-center">
            <h2>Add Assessment Tool</h2>
            <form>
              <div className="add-txt-field">
                <div>
                  <label className="add-login-label">Program Name</label>
                  <br></br>
                  <input
                    defaultValue={location.state.programName}
                    disabled
                    id="programName"
                    name="programName"
                    className="add-txt-field-input"
                  />
                  <br></br>
                  <label className="add-login-label">BatchId</label>
                  <br></br>
                  <input
                    defaultValue={location.state.batchId}
                    disabled
                    id="batchId"
                    name="batchId"
                    className="add-txt-field-input"
                  />
                  <label className="add-login-label">Course Name</label>
                  <br></br>
                  <input
                    defaultValue={location.state.courseName}
                    disabled
                    id="courseName"
                    name="courseName"
                    className="add-txt-field-input"
                  />
                  <label className="add-login-label">Course Code </label>
                  <br></br>
                  <input
                    defaultValue={location.state.courseCode}
                    disabled
                    id="courseCode"
                    name="courseCode"
                    className="add-txt-field-input"
                  />
                  <br></br>
                  <label className="add-login-label">Course Type </label>
                  <br></br>
                  <input
                    value={courseType}
                    disabled
                    id="courseCode"
                    name="courseCode"
                    className="add-txt-field-input"
                  />
                  <br></br>
                  <label className="add-login-label">Section Name</label>
                  <br></br>
                  <input
                    defaultValue={location.state.sectionName}
                    disabled
                    id="sectionName"
                    name="sectionName"
                    className="add-txt-field-input"
                    placeholder="B"
                  />
                  <br></br>
                  <label className="add-login-label">Tool Type</label>
                  <br></br>
                  <input
                    value={toolType}
                    required
                    placeholder="Sessional / Final"
                    id="toolType"
                    name="toolType"
                    className="add-txt-field-input"
                    onChange={(e) => setToolType(e.target.value)}
                  />
                  <br></br>

                  <label className="add-login-label">Tool Name</label>
                  <br></br>
                  <input
                    value={toolName}
                    required
                    id="toolName"
                    name="toolName"
                    className="add-txt-field-input"
                    placeholder="Quiz 01"
                    onChange={(e) => setToolName(e.target.value)}
                  />
                  <br></br>
                  <label className="add-login-label">CLO Name</label>
                  <br></br>
                  <input
                    value={cloName}
                    required
                    placeholder="CLO-01"
                    pattern="CLO-[\d]{2}"
                    id="cloName"
                    name="cloName"
                    className="add-txt-field-input"
                    onChange={(e) => setCloName(e.target.value)}
                  />
                  <br></br>
                  <label className="add-login-label">Total Marks </label>
                  <br></br>
                  <input
                    value={totalMarks}
                    required
                    id="totalMarks"
                    name="totalMarks"
                    pattern="^(?!00)[0-9]{2}$"
                    className="add-txt-field-input"
                    placeholder="09"
                    onChange={(e) => setTotalMarks(e.target.value)}
                  />
                  <br></br>
                </div>
              </div>
              <DialogActions>
                <Button onClick={handleCancel} className="dialog-button">
                  Cancel
                </Button>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  disabled={!toolType || !toolName || !cloName || !totalMarks}
                  onClick={handleAdd}
                  className="dialog-button"
                >
                  Add
                </Button>
              </DialogActions>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAssessmentTool;
