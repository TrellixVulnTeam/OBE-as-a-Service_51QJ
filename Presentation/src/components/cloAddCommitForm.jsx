import React from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import "./css/addAssessmentTool.css";

const CLOAddCommitForm = () => {
  const location = useLocation();
  const history = useHistory();
  const getTokken = localStorage.getItem("token");
  const [courseType, setCourseType] = useState("");

  let axiosHeader = {
    headers: {
      "X-Access-Token": getTokken,
    },
  };

  const handleAdd = () => {
    axios
      .put(
        "https://20.204.30.1/api/clo_commit/add_clo/" +
          location.state.selectedRequestData.cloIdPotential,
        "",
        axiosHeader
      )
      .then(
        (response) => {
          try {
            if (response.data.data.Success == 1) {
              toast.success(response.data.data.Message);
              history.push({
                pathname: "/add-clo-commit",
              });
            } else if (response.data.data.Success == 0) {
              toast.error(response.data.data.Message);
            }
          } catch (ex) {
            toast.error("Invalid request");
          }
        },
        (error) => {
          toast.error(error);
        }
      );
  };

  const HandleCourseType = () => {
    if (location.state.selectedRequestData.isPractical == "0")
      setCourseType("Theory");
    else if (location.state.selectedRequestData.isPractical == "1")
      setCourseType("Practical");
  };

  const handleCancel = () => {
    history.push({
      pathname: "/add-clo-commit",
    });
  };

  useEffect(() => {
    HandleCourseType();
  });

  return (
    <React.Fragment>
      <div className="add-background">
        <div className="container mt-4">
          <div className="add-center">
            <h2>Add CLO</h2>
            <form>
              <div className="add-txt-field">
                <div>
                  <label className="add-login-label">Course Code </label>
                  <br></br>
                  <input
                    required
                    id="courseCode"
                    name="courseCode"
                    className="add-txt-field-input"
                    defaultValue={location.state.selectedRequestData.courseCode}
                    disabled
                  />
                  <br></br>
                  <label className="add-login-label">Course Name</label>
                  <br></br>
                  <input
                    required
                    id="courseName"
                    name="courseName"
                    className="add-txt-field-input"
                    defaultValue={location.state.selectedRequestData.courseName}
                    disabled
                  />
                  <br></br>
                  <label className="add-login-label">Course Type </label>
                  <br></br>
                  <input
                    required
                    id="courseType"
                    name="courseType"
                    className="add-txt-field-input"
                    defaultValue={courseType}
                    disabled
                  />
                  <br></br>
                  <label className="add-login-label">Batch Id</label>
                  <br></br>
                  <input
                    required
                    id="batchId"
                    name="batchId"
                    className="add-txt-field-input"
                    defaultValue={location.state.selectedRequestData.batchId}
                    disabled
                  />
                  <br></br>
                  <label className="add-login-label">Taxonomy Level</label>
                  <br></br>
                  <input
                    required
                    id="taxonomyLevelDomain"
                    name="taxonomyLevelDomain"
                    className="add-txt-field-input"
                    defaultValue={
                      location.state.selectedRequestData.taxonomyLevelShortHand
                    }
                    disabled
                  />
                  <br></br>
                  <label className="add-login-label">Mapping to PLO</label>
                  <br></br>
                  <input
                    required
                    id="mappingToPLO"
                    name="mappingToPLO"
                    className="add-txt-field-input"
                    defaultValue={location.state.selectedRequestData.ploId}
                    disabled
                  />
                  <label className="add-login-label">CLO Description</label>
                  <br></br>
                  <input
                    required
                    id="CLODescription"
                    name="CLODescription"
                    className="add-txt-field-input"
                    defaultValue={
                      location.state.selectedRequestData.cloDescription
                    }
                    disabled
                  />
                  <br></br>
                  <label className="add-login-label">Additional Notes</label>
                  <br></br>
                  <input
                    id="additionalNotes"
                    name="additionalNotes"
                    className="add-txt-field-input"
                    defaultValue={
                      location.state.selectedRequestData.additionalNotes
                    }
                    disabled
                  />
                </div>
              </div>
              <DialogActions>
                <Button onClick={handleCancel} className="dialog-button">
                  Cancel
                </Button>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={handleAdd} className="dialog-button">
                  Commit Add
                </Button>
              </DialogActions>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CLOAddCommitForm;
