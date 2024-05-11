import React from "react";
import "../App.css";
import { Grid, Button, Typography } from "@material-ui/core";

function StudentDashboard() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div className="App">
      <br />

      <div style={{ maxWidth: 80 + '%', padding: "20px 5px", margin: "0 auto", align: "center", marginLeft: 15 + '%' }}>

        <Typography gutterBottom variant="h3" align="center">
          Student Dashboard
        </Typography>

        <Grid item xs={12}>
          <Button
            href="/viewMarks"
            type="submit"
            variant="contained"
            style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}
          >
            View Marks
          </Button>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Button
            href="/presentation"
            variant="contained"
            style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}
          >
            Submit Presentation
          </Button>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Button
            href="/research_paper"
            type="submit"
            variant="contained"
            style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}
          >
            Publish Research Paper
          </Button>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Button
            href="/group"
            type="submit"
            variant="contained"
            style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}
          >
            Create Group
          </Button>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Button
            href="/viewSchedule"
            variant="contained"
            style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}
          >
            View Schedule
          </Button>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Button
            onClick={() => logout()}
            variant="contained"
            style={{ backgroundColor: '#ff5722', color: '#FFFFFF', width: '40%' }}
          >
            Logout
          </Button>
        </Grid>

      </div>

      <br />
    </div>
  );
}

export default StudentDashboard;
