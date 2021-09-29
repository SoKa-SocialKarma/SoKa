import { useState } from "react";
import {
  makeStyles,
  Backdrop,
  IconButton,
  Paper,
  Fade,
  Modal,
} from "@material-ui/core";
import viewMoreC from "../Assets/viewMoreC.png";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    minWidth: "300px",
    maxWidth: "800px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  viewMoreC: {
    height: "100%",
    placeSelf: "center",
  },
}));

// const { name, lastname, location, karma, experience, availabledays } = profile;

export default function UserModal({ }) {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <img src={viewMoreC} alt="view more button" />
      </IconButton>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper>
            <div className={classes.paper}>
              <h4 className={classes.root}>{/* {name} {lastname} */}</h4>{" "}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                accumsan odio enim. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Morbi accumsan odio enim. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Morbi accumsan odio enim.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                accumsan odio enim. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Morbi accumsan odio enim. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Morbi accumsan odio enim.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                accumsan odio enim.
              </p>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
}
