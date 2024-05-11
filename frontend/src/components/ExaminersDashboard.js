import React, { useState, useEffect } from "react"
import "../App.css"
import { Grid, Button, Card, CardContent, Typography } from '@material-ui/core'

function Examiners() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div className="App">
      <br />

      <div style={{ maxWidth: 80 + '%', padding: "20px 5px", margin: "0 auto", align: "center", marginLeft: 15 + '%' }}>

        <Typography gutterBottom variant="h5">
          Examiner Dashboard
        </Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              href="/marks"
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}>Add Marks</Button>
          </Grid>
          <Grid item xs={12}>
            <Button href="/all_marks"
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}>All Marks</Button>
          </Grid>
          <Grid item xs={12}>
            <Button href="/all_Schedule"
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}>All Schedule</Button>
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
      </div>
      <br />
    </div>
  );
}

export default Examiners;