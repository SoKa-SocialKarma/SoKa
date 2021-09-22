import MousePopOver from "./MousePopOver";

import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import defaultProfile from "../Assets/defaultProfile.png";
const useStyles = makeStyles({
  root: {
    margin: "0",
    textAlign: "center",
    padding: "10px",
  },
  image: {
    width: "75%",
    padding: "20px",
    margin: "0",
    display: "flex",
    alignSelf: "center",
    justifySelf: "center",
  },
  flex: {
    margin: "0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  flex45: {
    display: "flex",
    width: "45%",
  },
  button: {
    borderRadius: "40px",
  },
  box: {
    display: "grid",
    gridRow: "3 / 4",
    placeItems: "center",
    width: "100%",
    paddingTop: "8px",
  },
});

function UserCard({ profile }) {
  const classes = useStyles();

  const { name, lastname, location, karma, experience, goals, availabledays } =
    profile;

  return (
    <>
      <h4 className={classes.root}>
        {name} {lastname}
      </h4>
      <img
        className={classes.image}
        src={defaultProfile}
        alt="buddypic"
      />
      <Box
        component="fieldset"
        mb={3}
        borderColor="transparent"
        className={classes.box}
      >
        <Typography component="legend" variant="h6" className={classes.box}>
          Social Karma
        </Typography>
        <Rating name="read-only" value={Number(karma)} readOnly />
      </Box>
      <div className={classes.flex}>
        <MousePopOver prop={Object.assign({ value: availabledays })}>
          <Button variant="outlined" className={classes.button}>
            Availability
          </Button>
        </MousePopOver>
        <MousePopOver prop={Object.assign({ value: location })}>
          <Button variant="outlined" className={classes.button}>
            Location
          </Button>
        </MousePopOver>
        <MousePopOver prop={Object.assign({ value: experience })}>
          <Button variant="outlined" className={classes.button}>
            Experience
          </Button>
        </MousePopOver>
        <MousePopOver prop={Object.assign({ value: goals })}>
          <Button variant="outlined" className={classes.button}>
            Goals
          </Button>
        </MousePopOver>
      </div>

      <div className={classes.flex}>
        <Button variant="contained" color="primary" className={classes.flex45}>
          Match
        </Button>
        <Button variant="contained" color="primary" className={classes.flex45}>
          Message
        </Button>
      </div>
    </>
  );
}
export default UserCard;
