import React, { useState} from 'react'
import { makeStyles } from "@material-ui/core/styles" 
import { Button } from "@material-ui/core" 
import { axiosInstance } from '../axios'
import { TextField } from "@material-ui/core"
import { NavLink, useHistory } from 'react-router-dom'


const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "15%",
    width: "40%",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "2%",
    borderRadius: "10px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  },
  heading: {
    color: "#2b6cb0",
  },
  textField: {
    padding: "1% 0",
    "& input": {
      fontSize: "1.5rem"
    }
  },
  navDiv: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  navLink: {
    padding: "3%",
    display: "block"
  },
  button: {
    margin: "3% 0"
  }
})


const validators = {
  minLength: (value, minLength) => value.length < minLength, 
  required: (value) => value.length === 0
}

// const createValidator = (type) => validators[type]


export const Login = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const [ isAuthError, setIsAuthError ] = useState(false)
  const [ touched, setTouched ] = useState({
    username: false,
    password: false
  })
  const [ formValues, setFormValues ] = useState({
    username: '',
    password: ''
  })
  
  const [ validationErrors, setValidationErrors ] = useState({
    username: {
      minLength: false,
      required: false
    },
    password: {
      minLength: false,
      required: false
    }
  })
  
  const authErrorMessage = "Invalid username or password."

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name] : true
    })
  }

  const handleChange = (e) => {
    setFormValues({
      ...formValues, 
      [ e.target.name ] : e.target.value
    })

    setValidationErrors({
      ...validationErrors,
      [ e.target.name ] : {
        minLength: validators.minLength(e.target.value, 5),
        required: validators.required(e.target.value)
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (props.registration){
      return axiosInstance()
              .post('/api/users/register', formValues)
              .then(res => {
                  history.push('/')
              })
    }

    axiosInstance()
        .post('/api/users/login', formValues)
        .then(res => {
          history.push('/home')
        })
        .catch(err => {
          setIsAuthError(true)
        })
  }

  return (
    <div>
      <form 
        className={classes.form}
        onSubmit={handleSubmit} 
      >
        <h1 className={classes.heading}>{props.registration ? "Register" : "Login"}</h1>
          
          <TextField
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField} 
            name="username" 
            placeholder="Username"
            helperText={props.registration ? (touched.username && ((validationErrors.username.required && "Username is required.") || (validationErrors.username.minLength && "Username must be at least 3 characters."))) : isAuthError && authErrorMessage}   
          />

          <TextField
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField} 
            type="password" 
            name="password" 
            placeholder="Password"
            helperText={props.registration ? (touched.password && ( (validationErrors.password.required && "Password is required.") || (validationErrors.password.minLength && "Password must be at least 5 characters."))) : isAuthError && authErrorMessage} 
          />

          <Button 
            type="submit"
            variant="contained"
            className={classes.button}
            >
              {props.registration ? "Register" : "Login"}
          </Button>

          <div className={classes.navDiv}>
            <NavLink className={classes.navLink} to="/register">Register</NavLink>
            <NavLink className={classes.navLink} exact to="/">Login</NavLink>
          </div>
      </form>
    </div>
  )
}

export default Login