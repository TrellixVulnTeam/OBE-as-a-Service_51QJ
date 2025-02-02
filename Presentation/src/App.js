import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import CourseActions from "./components/courseActions";
import CourseClo from "./components/courseClo";
import AssessmentToolsActions from "./components/assessmentToolsActions";
import ViewAssessmentTool from "./components/viewAssessmentTool";
import AddAssessmentTool from "./components/addAssessmentTool";
import EditAssessmentTool from "./components/editAssessmentToolList";
import DeleteAssessmentTool from "./components/deleteAssessmentToolList";
import DeleteAssessmentToolForm from "./components/deleteAssessmentToolForm";
import EditAssessmentToolForm from "./components/editAssessmentToolForm";
import GradeAssessmentTool from "./components/gradeAssessmentToolList";
import FutureUpgradeAlert from "./components/futureUpgradeAlert";
import OBEcellActions from "./components/obeCellActions";
import AddCLO from "./components/addClo";
import UpdateCLO from "./components/updateClo";
import DeleteCLO from "./components/deleteClo";
import PEODescription from "./components/peoDescription";
import PLODescription from "./components/ploDescription";
import AdminActions from "./components/adminActions";
import TeacherCourse from "./components/teacherCourse";
import AddCLOCommit from "./components/addCloCommit";
import UpdateCLOCommit from "./components/updateCloCommit";
import DeleteCLOCommit from "./components/deleteCloCommit";
import CLOAddCommitForm from "./components/cloAddCommitForm";
import CLOUpdateCommitForm from "./components/cloUpdateCommitForm";
import CLODeleteCommitForm from "./components/cloDeleteCommitForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="content">
        <Switch>
          <Route path="/" exact component={LoginForm} />
          <Route path="/login" exact component={LoginForm} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/courses" component={TeacherCourse} />
          <Route path="/course/course-details" component={CourseActions} />
          <Route path="/course/course-detail/clo" component={CourseClo} />
          <Route
            path="/course/course-detail/assessment-tools"
            component={AssessmentToolsActions}
          />
          <Route
            path="/course/course-detail/assessment-tool/view-assessment-tool"
            component={ViewAssessmentTool}
          />
          <Route
            path="/course/course-detail/assessment-tool/add-assessment-tool"
            component={AddAssessmentTool}
          />
          <Route
            path="/course/course-detail/assessment-tool/edit-assessment-tool"
            component={EditAssessmentTool}
          />
          <Route
            path="/course/course-detail/assessment-tool/delete-assessment-tool"
            component={DeleteAssessmentTool}
          />
          <Route
            path="/course/course-detail/assessment-tool/delete-assessment-tool-form"
            component={DeleteAssessmentToolForm}
          />
          <Route
            path="/course/course-detail/assessment-tool/edit-assessment-tool-form"
            component={EditAssessmentToolForm}
          />
          <Route
            path="/course/course-detail/assessment-tool/grade-assessment-tool"
            component={GradeAssessmentTool}
          />
          <Route
            path="/course/course-detail/assessment-tool/grade-assessment-tools/grade"
            component={FutureUpgradeAlert}
          />
          <Route path="/peo" component={PEODescription} />
          <Route path="/plo" component={PLODescription} />
          <Route path="/obe-cell" component={OBEcellActions} />
          <Route path="/add-clo" component={AddCLO} />
          <Route path="/update-clo" component={UpdateCLO} />
          <Route path="/delete-clo" component={DeleteCLO} />
          <Route path="/admin" component={AdminActions} />
          <Route path="/add-clo-commit" component={AddCLOCommit} />
          <Route path="/update-clo-commit" component={UpdateCLOCommit} />
          <Route path="/delete-clo-commit" component={DeleteCLOCommit} />
          <Route path="/add-clo-commits/form" component={CLOAddCommitForm} />
          <Route
            path="/update-clo-commits/form"
            component={CLOUpdateCommitForm}
          />
          <Route
            path="/delete-clo-commits/form"
            component={CLODeleteCommitForm}
          />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
