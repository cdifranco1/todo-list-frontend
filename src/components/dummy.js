import randomWords from "random-words"

//generating some dummy data
const createList = (range) => {
  const result = []

  for (let i = 0; i < range; i++){
    const name = randomWords(5).join(" ")
    const id = i + 1
    const dueDate = "2020-12-31"

    const entry = { id, name, dueDate }
    result.push(entry)
  }

  return result
}

const list = createList(5)
console.log(list)

export default list 
