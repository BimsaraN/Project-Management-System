import React, { useState, useEffect } from "react"
import "../App.css"
import { Grid, Button, Card, CardContent, Typography } from '@material-ui/core'

function Admin() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div className="App">
      <br />
      <Typography gutterBottom variant="h3" align="center">
        Supervisor Dashboard
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 50 + '%', padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Hello Supervisor
            </Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button href="/all_users"
                  type="submit"
                  variant="contained"
                  style={{ backgroundcolor: '#4C5DCB', color: '#ffffff', width: '50%' }}>Users Manage</Button>
              </Grid>
              <Grid item xs={12}>
                <Button href="/supervisor_Marks"
                  type="submit"
                  variant="contained"
                  style={{ backgroundcolor: '#2196f3', color: '#ffffff', width: '50%' }}>Add Marks</Button>
              </Grid>
              <Grid item xs={12}>
                <Button href="/all_marks"
                  type="submit"
                  variant="contained"
                  style={{ backgroundcolor: '#2196f3', color: '#ffffff', width: '50%' }}>All Marks</Button>
              </Grid>
              <Grid item xs={12}>
                <Button href="/all_groups"
                  type="submit"
                  variant="contained"
                  style={{ backgroundcolor: '#2196f3', color: '#ffffff', width: '50%' }}>All Groups</Button>
              </Grid>
              <Grid item xs={12}>
                <Button href="/all_Presentation"
                  type="submit"
                  variant="contained"
                  style={{ backgroundcolor: '#2196f3', color: '#ffffff', width: '50%' }}>All Presentation</Button>
              </Grid>
              <Grid item xs={12}>
                <Button href="/all_Schedule"
                  type="submit"
                  variant="contained"
                  style={{ backgroundcolor: '#2196f3', color: '#ffffff', width: '50%' }}>All Schedule</Button>
              </Grid>
              <Grid item xs={12}>
                <Button href="/all_ResearchPaper"
                  type="submit"
                  variant="contained"
                  style={{ backgroundcolor: '#2196f3', color: '#ffffff', width: '50%' }}>All Research Paper</Button>
              </Grid>
              <Grid item xs={12}>
                <Button href="/all_Topic"
                  type="submit"
                  variant="contained"
                  style={{ backgroundcolor: '#2196f3', color: '#ffffff', width: '50%' }}>All Topics</Button>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: '#ff5722', color: '#FFFFFF', width: '40%' }}
                  onClick={() => logout()}
                >Clear</Button>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <br />
    </div>
  );
}

export default Admin;