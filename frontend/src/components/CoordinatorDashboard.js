import React, { useState, useEffect } from "react"
import "../App.css"
import { Grid, Button, Card, CardContent, Typography } from '@material-ui/core'

function CoordinatorDashboard() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div className="App">
      <br />
      <Typography gutterBottom variant="h3" align="center">
        Project Coordinator Dashboard
      </Typography>
      <Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button href="/all_users"
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}>Users Manage</Button>
          </Grid>
          <Grid item xs={12}>
            <Button href="/schedule"
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}>Add Schedule</Button>
          </Grid>
          <Grid item xs={12}>
            <Button href="/all_schedule"
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}>All Schedule</Button>
          </Grid>
          <Grid item xs={12}>
            <Button href="/rubric"
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}>Rubric</Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={() => logout()}
              variant="contained"
              style={{ backgroundColor: '#ff5722', color: '#FFFFFF', width: '40%' }}
            >
              Logout
            </Button>
          </Grid>

        </Grid>
      </Grid>
      <br />
    </div>
  );
}

export default CoordinatorDashboard;