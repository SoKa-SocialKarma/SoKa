// import React, { useEffect, useState } from "react";
import React from "react";
import { Container } from "@material-ui/core";
import Users from "../Components/Users.js";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function Index() {
  // const [users, setUsers] = useState([])

  return (
    <div className="index">
      <h1>Matches</h1>
      {/* <UserMatches /> */}
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <Paper>
              <Users />
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper>
              <Users />
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper>
              <Users />
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper>
              <Users />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper>
              <Users />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Index;
