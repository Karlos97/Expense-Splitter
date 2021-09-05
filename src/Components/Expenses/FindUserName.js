const findUserName = (arrayOfObjects, id) =>{
    let name = "Unknown"
    arrayOfObjects.forEach((user) => {
      if (user.id === id) {
        name = user.name
      }
    })
  
    return name
}

  export default findUserName