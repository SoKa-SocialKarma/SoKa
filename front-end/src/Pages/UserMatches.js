import { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router";
import { useAPI } from "../Context/AuthContext";

import UserCard from "../Components/UserCard.js";
import { Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import { apiURL } from "../Util/apiURL.js";

import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled.section`
  display: flex;
  height: 30px;
`;

const API = apiURL();

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "2%",
    gap: "20px",
  },
  paper: {
    width: "40%",
    height: "70vh",
    padding: "10px",
    display: "grid",
    gridTemplateRows: "10% 32% 13% 2% 18% 12% 8%",
  },
});

// toast.configure();

function UserMatches() {
  const classes = useStyles();
  const [currentUserMatches, setCurrentUserMatches] = useState([]);
  const [sameUser, setSameUser] = useState(false);
  const { currentUserData } = useAPI();
  const { id } = useParams();

  useEffect(() => {
    const unSubscribe = async () => {
      try {
        const { data } = await axios.get(`${API}/users/${currentUserData.id}/feed/matches`);
        setCurrentUserMatches(data);
        setSameUser(id === currentUserData.id);
      } catch (err) {
        console.log(err);
      }
    };

    return unSubscribe();
  }, [currentUserData, id]);

  const topFade = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, x: -40 },
  };
  return (
    <>
      <Section>
        <motion.h1 variants={topFade} initial="hidden" animate="visible" transition={{ duration: 1 }}>
          Ready to hustle for that muscle?
        </motion.h1>
      </Section>
      <br />
      <br />
      <Container className={classes.root}>
        {sameUser ? (
          currentUserMatches.map((profile) => {
            return (
              <Paper className={classes.paper} key={`${profile.id}-mui-matches`}>
                <UserCard profile={profile} key={profile.id} />
                {/* new component to show card view  */}
              </Paper>
            );
          })
        ) : (
          <Redirect to={`/users/${currentUserData.id}/feed/matches`} />
        )}
      </Container>
    </>
  );
}

export default UserMatches;
