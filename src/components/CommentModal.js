import React, { useState } from "react"
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"




const useStyles = makeStyles((theme) => {

  return {
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    backDrop: {
      opacity: "0.2"
    },
    paper: {
      width: "50%",
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  }
});

// const classes = useStyles()

const CommentModal = (props) => {
  const classes = useStyles()
  const [ open, setOpen ] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={toggleOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      BackdropProps={{
        classes: {
          root: classes.backDrop
        }
      }}
    >
      <div className={classes.paper}>
        <h1>Form to be updated</h1>
      </div>
    </Modal>
  )
}

export default CommentModal

