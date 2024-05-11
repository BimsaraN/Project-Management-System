import "./App.css";
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ButterToast, { POS_CENTER , POS_TOP } from "butter-toast";

import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import Co_supervisorsDashboard from "./components/Co_supervisorsDashboard";
import SupervisorsDashboard from "./components/SupervisorsDashboard";
import ExaminersDashboard from "./components/ExaminersDashboard";
import ProjectMemberDashboard from "./components/ProjectMemberDashboard";
import CoordinatorDashboard from "./components/CoordinatorDashboard";

import All_Groups from "./components/All_Groups";
import All_Users from "./components/All_Users";
import All_Marks from "./components/All_Marks";
import All_Presentation from "./components/All_Presentation";
import All_Schedule from "./components/All_Schedule";
import All_Topic from "./components/All_Topic";
import All_ResearchPaper from "./components/All_ResearchPaper";

import Marks from "./components/Marks";
import Group from "./components/Group";
import Rubric from "./components/Rubric";
import Supervisor_Marks from "./components/Supervisor_Marks";
import Schedule from "./components/Schedule";
import Presentation from "./components/Presentation";
import ResearchPaper from "./components/ResearchPaper";

import Topic_UserSide from "./components/Topic_UserSide";
import Marks_UserSide from "./components/Marks_UserSide";
import Schedule_UserSide from "./components/Schedule_UserSide";

import Footer from "./components/footer";
import Nav from "./components/nav";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage: "url(/bg.png)",
          height: "100vh",
        }}
      >
        <Nav />
        <Switch>
          <Route path="/all_marks" component={All_Marks}></Route>
          <Route path="/all_presentation" component={All_Presentation}></Route>
          <Route path="/all_Topic" component={All_Topic}></Route>
          <Route path="/all_Schedule" component={All_Schedule}></Route>
          <Route path="/all_ResearchPaper" component={All_ResearchPaper}></Route>
          <Route path="/all_users" component={All_Users}></Route>
          <Route path="/all_groups" component={All_Groups}></Route>
          <Route path="/student" component={StudentDashboard}></Route>
          <Route path="/co_supervisors" component={Co_supervisorsDashboard}></Route>
          <Route path="/examiners" component={ExaminersDashboard}></Route>
          <Route path="/supervisors" component={SupervisorsDashboard}></Route>
          <Route path="/admin" component={AdminDashboard}></Route>
          <Route path="/coordinator" component={CoordinatorDashboard}></Route>
          <Route path="/project_member" component={ProjectMemberDashboard}></Route>
          <Route path="/marks" component={Marks}></Route>
          <Route path="/supervisor_Marks" component={Supervisor_Marks}></Route>
          <Route path="/schedule" component={Schedule}></Route>
          <Route path="/rubric" component={Rubric}></Route>
          <Route path="/topic" component={Topic_UserSide}></Route>
          <Route path="/research_paper" component={ResearchPaper}></Route>
          <Route path="/viewMarks" component={Marks_UserSide}></Route>
          <Route path="/viewSchedule" component={Schedule_UserSide}></Route>
          <Route path="/group" component={Group}></Route>
          <Route path="/presentation" component={Presentation}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/" component={Login}></Route>
        </Switch>
        <ButterToast position={{ vertical: POS_TOP, horizontal: POS_CENTER }} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
