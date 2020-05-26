import React from "react"
import "./ListItem.css"

export const ListItem = ({ name }) => {
  return (
    <div className="list-item">
      <span>{name}</span>
      <button type="checkbox" />
    </div>
  )
}
