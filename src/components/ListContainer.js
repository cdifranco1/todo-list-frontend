import React, { useState } from "react"
import { ListItem } from "./ListItem"
import todoList from './dummy'

export const ListContainer = () => {
  const [ list, setList ] = useState(todoList)

  return (
    list.map((el, i) => {
      console.log(el)
      return <ListItem name={el.name} />
    })
  )
}