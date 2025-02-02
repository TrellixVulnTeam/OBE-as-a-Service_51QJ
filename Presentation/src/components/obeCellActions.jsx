import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import "./css/teacherCourse.css";
import axios from "axios";
import Footer from "./footer";
import RealNavbar from "./realNavbar";

const OBEcellActions = () => {
  const location = useLocation();
  const history = useHistory();
  const [programName, setProgramName] = useState("");
  const [userName, setUserName] = useState("");
  const [obeData, setObeData] = useState("");
  const getTokken = localStorage.getItem("token");

  const getData = async () => {
    try {
      await axios
        .get("https://20.204.30.1/api/cds/view_name", {
          headers: {
            "X-Access-Token": getTokken,
          },
        })
        .then((response) => {
          setObeData(response.data.data);
          console.log(programName);
          console.log(userName);
        });
    } catch (error) {}
  };

  const handleOnClickAddCLO = () => {
    history.push({
      pathname: "/add-clo",
    });
  };
  const handleOnClickUpdateCLO = () => {
    history.push({
      pathname: "/update-clo",
    });
  };
  const handleOnClickDeleteCLO = () => {
    history.push({
      pathname: "/delete-clo",
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (obeData.length != 0) {
      setProgramName(obeData[0].programName);
      setUserName(obeData[0].obeName);
    }
  });

  return (
    <React.Fragment>
      <RealNavbar />
      <div className="container mt-4">
        <h2 className="heading">
          {userName} - {programName} department
        </h2>
        <button
          onClick={handleOnClickAddCLO}
          type="button"
          className="course-btn"
        >
          Add CLO
        </button>
        <button
          onClick={handleOnClickUpdateCLO}
          type="button"
          className="course-btn"
        >
          Update CLO
        </button>
        <button
          onClick={handleOnClickDeleteCLO}
          type="button"
          className="course-btn"
        >
          Delete CLO
        </button>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default OBEcellActions;
