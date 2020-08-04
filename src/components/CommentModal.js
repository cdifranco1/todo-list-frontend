import React, { useState, useEffect } from "react"
import { Modal, TextField, Button } from "@material-ui/core";
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
      width: "40%",
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    button: {
      padding: "2%",
      margin: "2% 0",
      fontSize: "0.75rem"
    },
    heading: {
      padding: "2% 0",
      marginBottom: "3%",
      fontSize: "1.25rem",
      fontWeight: "600"
    }, 
    input: {
      fontSize: "1.15rem",
      padding: "3% 1%",
    },
    label: {
      fontSize: "1.0rem",
      padding: "0.5% 0"
    }
  }
});

const initialState = {
  details: ''
}

const CommentModal = ({ toggleOpen, open, task, handleUpdate }) => {
  const classes = useStyles()
  const [ formValues, setFormValues ] = useState(initialState)

  useEffect(() => {
    const details = task.details || ""
    setFormValues({
      ...task,
      details: details
    })
  }, [ task ]) 

  const handleClose = (e) => {
    e.preventDefault()
    toggleOpen()
  }

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name] : e.target.value
    })
    console.log(formValues)
  }

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      BackdropProps={{
        classes: {
          root: classes.backDrop
        }
      }}
    >
      <div className={classes.paper}>
        <h2 className={classes.heading}>{task.task}</h2>
        <form>
          <TextField 
            label="Comments:"
            InputLabelProps={{
              className: classes.label
            }}
            multiline
            rows='10'
            fullWidth
            variant="filled"
            value={formValues.details}
            inputProps={{
              name: "details",
              className: classes.input,
              onChange: handleChange
            }}
          />
          <Button 
            onClick={() => handleUpdate(formValues)}
            className={classes.button}
          >
            Save Comments
          </ Button>
        </form>
      </div>
    </Modal>
  )
}

export default CommentModal

