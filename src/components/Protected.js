import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"


const Protected = ({ children }) => {
  const [ authenticated, setAuthenticated ] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const jwt = localStorage.getItem("token")
    
    if (jwt){
      setAuthenticated(true)
    } else {
      history.push("/")
    }
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