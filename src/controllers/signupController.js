import helpers from '../helpers';
import bcrypt from 'bcryptjs';

const { db, queries } = helpers;

const post = (req, res) => {
  const { fullname, username, email, password } = req.body;

  if ((fullname && username && email && password) != '') {
    let passwordAsHash = bcrypt.hashSync(password.trim(), 10);
    db.connect()
      .then(obj => {
        obj.any(queries.user['create'], [fullname.trim(), username.trim(), email.trim(), passwordAsHash])
          .then((data) => {
            console.log(data)
            res.send({status: 200, message: 'Done!', data})
            obj.done()
          })
          .catch((e) => {
            console.log(e.message || e)
            res.send({status: 500, error: e.message || e})
            obj.done()
          }
        )
      })
      .catch((e) => {
        console.log(e.message || e)
        res.send({status: 500, error: e.message || e})
      });
  } else {
    res.send({status: 400, error: 'Can´t process while there are empty fields'});
  } 
}
 
export default { post };