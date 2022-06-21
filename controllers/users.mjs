export default function initUsersController(db) {

  // render something
  const index = (req, res) => {
    res.render('main')
  }
  // verify user login with issha or something
  const someDataFunction = (req, res) => {
    
  }

  return {
    index, someDataFunction
  };
}