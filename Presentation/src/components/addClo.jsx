import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import "./css/addAssessmentTool.css";

const AddCLO = () => {
  const history = useHistory();
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseType, setCourseType] = useState("");
  const [isPractical, setIsPractical] = useState("");
  const [batchId, setBatchId] = useState("");
  const [taxonomyLevelDomain, setTaxonomyLevelDomain] = useState("");
  const [taxonomyLevelName, setTaxonomyLevelName] = useState("");
  const [ploId, setPloId] = useState("");
  const [description, setDescription] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const getTokken = localStorage.getItem("token");

  let axiosHeader = {
    headers: {
      "X-Access-Token": getTokken,
    },
  };

  const data = {
    courseCode: courseCode,
    courseName: courseName,
    isPractical: isPractical,
    batchId: batchId,
    taxonomyDomain: taxonomyLevelDomain,
    taxonomyLevelName: taxonomyLevelName,
    ploId: ploId,
    cloDescription: description,
    additionalNotes: additionalNotes,
  };

  const handleAdd = () => {
    axios
      .post(
        "https://20.204.30.1/api/clo_request/obe_cell/add_clo",
        data,
        axiosHeader
      )
      .then(
        (response) => {
          console.log(response);
          try {
            if (response.data.data.Success === 1) {
              toast.success(response.data.data.Message);
              history.push({
                pathname: "/obe-cell",
              });
              console.log("CLO added");
            } else if (response.data.data.Success === 0) {
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

  const handleCancel = () => {
    history.push({
      pathname: "/obe-cell",
    });
  };

  const handleCourseType = () => {
    if (courseType === "practical") setIsPractical("1");
    else if (courseType === "Practical") setIsPractical("1");
    else if (courseType === "PRACTICAL") setIsPractical("1");
    else setIsPractical("0");
  };

  useEffect(() => {
    handleCourseType();
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
                    placeholder="SE-301"
                    id="courseCode"
                    name="courseCode"
                    className="add-txt-field-input"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                  />
                  <br></br>
                  <label className="add-login-label">Course Name</label>
                  <br></br>
                  <input
                    required
                    placeholder="Software Quality Engineering"
                    id="courseName"
                    name="courseName"
                    className="add-txt-field-input"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                  <br></br>
                  <label className="add-login-label">Course Type </label>
                  <br></br>
                  <input
                    required
                    placeholder="Theory / Practical"
                    id="courseType"
                    name="courseType"
                    className="add-txt-field-input"
                    value={courseType}
                    onChange={(e) => setCourseType(e.target.value)}
                  />
                  <br></br>
                  <label className="add-login-label">Batch Id</label>
                  <br></br>
                  <input
                    required
                    placeholder="2021"
                    id="batchId"
                    name="batchId"
                    className="add-txt-field-input"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                  />
                  <br></br>
                  <label className="add-login-label">
                    Taxonomy Level Domain
                  </label>
                  <br></br>
                  <input
                    required
                    placeholder="Cognitive / Affective / Psychomotor"
                    id="taxonomyLevelDomain"
                    name="taxonomyLevelDomain"
                    className="add-txt-field-input"
                    value={taxonomyLevelDomain}
                    onChange={(e) => setTaxonomyLevelDomain(e.target.value)}
                  />
                  <br></br>
                  <label className="add-login-label">Taxonomy Level Name</label>
                  <br></br>
                  <input
                    required
                    placeholder="Knowledge"
                    id="taxonomyLevelName"
                    name="taxonomyLevelName"
                    className="add-txt-field-input"
                    value={taxonomyLevelName}
                    onChange={(e) => setTaxonomyLevelName(e.target.value)}
                  />
                  <br></br>
                  <label className="add-login-label">Mapping to PLO</label>
                  <br></br>
                  <input
                    required
                    placeholder="PLO-01"
                    id="mappingToPLO"
                    name="mappingToPLO"
                    className="add-txt-field-input"
                    value={ploId}
                    onChange={(e) => setPloId(e.target.value)}
                  />
                  <label className="add-login-label">CLO Description</label>
                  <br></br>
                  <input
                    required
                    placeholder="CLO description here"
                    id="CLODescription"
                    name="CLODescription"
                    className="add-txt-field-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <br></br>
                  <label className="add-login-label">Additional Notes</label>
                  <br></br>
                  <input
                    placeholder="optional"
                    id="additionalNotes"
                    name="additionalNotes"
                    className="add-txt-field-input"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                  />
                </div>
              </div>
              <DialogActions>
                <Button onClick={handleCancel} className="dialog-button">
                  Cancel
                </Button>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  disabled={
                    !courseCode ||
                    !courseName ||
                    !courseType ||
                    !isPractical ||
                    !batchId ||
                    !taxonomyLevelDomain ||
                    !taxonomyLevelName ||
                    !ploId ||
                    !description
                  }
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
    </React.Fragment>
  );
};

export default AddCLO;
