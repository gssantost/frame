import helpers from '../helpers';

const { db, queries } = helpers;

/** GET: check if user follows other user */
const get = (req, res) => {
  const { user: { user_id }, params: { userId } } = req;
  db.connect().then(obj => {
    obj.oneOrNone(queries.follows['check'], [userId, user_id])
      .then(data => {
        let result = { 
          has_follow: true,
        };
        if (data === null) {
          result['has_follow'] = false;
        }
        res.send({status: 200, data: result});
      }).catch(e => { 
        console.log(e.message || e);
        res.send({status: 402, error: ''});
      })
  }).catch(e => {
    res.send({status: 500, error: e.message || e})
  })
}

/** POST: follow other user */
const post = (req, res) => {
  const { user: { user_id }, body: { followId } } = req;
  db.connect().then(obj => {
    obj.one(queries.follows['create'], [followId, user_id])
      .then(data => {
        console.log(data);
        res.send({status: 200, message: `Now you follow ${data.follow_id}!`});
      }).catch(e => { 
        console.log(e.message || e);
        res.send({status: 402, error: 'User already followed'});
      })
  }).catch(e => {
    res.send({status: 500, error: e.message || e})
  })
}

/** DELETE: */
const deleteFollow = (req, res) => {
  const { user: { user_id }, params: { followId } } = req;
  db.connect().then(obj => {
    obj.oneOrNone(queries.follows['delete'], [followId, user_id])
      .then(data => {
        console.log(data);
        res.send({status: 200, message: `You don't follow this user anymore`});
      }).catch(e => { 
        console.log(e.message || e);
        res.send({status: 402, error: e.message || e});
      })
  }).catch(e => {
    res.send({status: 500, error: e.message || e})
  })
}

export default { get, post, deleteFollow };