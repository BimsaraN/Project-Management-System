import React, { useState, useEffect } from "react"
import "../App.css"
import { Grid, Button, Card, CardContent, Typography } from '@material-ui/core'

function Co_supervisors() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div className="App">
      <br />
      <Typography gutterBottom variant="h3" align="center">
        Co-supervisors Dashboard
      </Typography>
      <Grid>
            <Typography gutterBottom variant="h5">
              Co-supervisors
            </Typography>
            <br />
            <Grid container spacing={2}>
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
                <Button
                  href="/all_presentation"
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}>All Presentation</Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  href="/all_Presentation"
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }} >All Presentation</Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  href="/all_Schedule"
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }} >
                  All Schedule
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: '#ff5722', color: '#FFFFFF', width: '40%' }}
                >Logout</Button>
              </Grid>

            </Grid>
      </Grid>
      <br />
    </div>
  );
}

export default Co_supervisors;