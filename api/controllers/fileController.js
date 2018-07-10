import helpers from '../helpers'

const { db, queries } = helpers

const post = (req, res) => {
  if (req.file === undefined) {
    res.send({status: 400, message: 'No file found!'})
  }
  
  console.log(req.file);
  
  db.connect().then(obj => {
    obj.any(queries.user['updateUserPic'], [req.file.path, req.user.user_id])
      .then(data => {
        res.send({status: 200, message: 'Profile picture updated!', data})
        obj.done()
      })
      .catch(e => {
        console.log(e.message || e)
        res.send({status: 400, error: e.message || e})
        obj.done()
      })
  }).catch(e => {
    console.log(e.message || e)
    res.send({status: 500, error: e.message || e})
  })
}

export default { post }