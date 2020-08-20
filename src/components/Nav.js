import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { axiosInstance } from "../axios"

const styles = {
  container: {
    padding: "2%"
  },
  button: {
    padding: "0.5%",
    textDecoration: "none",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    borderRadius: "5px",
    border: "1px solid blue",
    color: "white",
    backgroundColor: "#2b6cb0",
    "&:hover": {
      cursor: "pointer"
    } 
  }
}


const Nav = (props) => {
  const [ authenticated, setAuthenticated ] = useState(false)
  const history = useHistory()
  const location = useLocation()

  const handleLogout = () => {
    setAuthenticated(false)
    localStorage.removeItem("token")
    history.push("/")
  }

  useEffect(() => {
    axiosInstance()
      .get("/api/users/auth")
      .then(res => {
        setAuthenticated(true)
      })
      .catch(err => console.log(err))
  }, [location])

  return (
    <div style={styles.container}>
      {authenticated ?
      <button style={styles.button} onClick={handleLogout}>Logout</button> :
      null}
    </div>
  )
}

export default Nav