// import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Users from "../Components/Users.js";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function Index({demoProfiles}) {


  return (
    <div className="match">
      {/* <span>
      <h1 id="matches">Matches</h1>
      </span> */}

      <div className="cards">
      <Container>
        <Grid container spacing={4}>
        <Grid item xs={8} sm={4}>
        {demoProfiles.map(profile => {
          return (
            <Paper>
              <Users profile={profile} />
            </Paper>
          );
        })}
        </Grid>
        </Grid>

      </Container>
      </div>
    </div>
  );
}

export default Index;
