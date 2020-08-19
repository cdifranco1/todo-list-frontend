import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { axiosInstance } from "../axios"

const Protected = ({ children }) => {
  const [ authenticated, setAuthenticated ] = useState(false)
  const history = useHistory()

  useEffect(() => {
    axiosInstance()
      .get("/api/users/auth")
      .then(res => {
        setAuthenticated(true)
      })
      .catch(err => {
        history.push("/")
      })
  }, [])

  return (
    authenticated ?
    <div>
      { children }
    </div> :
    null
  )
}

export default Protected