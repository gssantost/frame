import helpers from '../helpers';

const { db, queries } = helpers;

/** GET: get all stats for profile (number of personal posts, followers and followings) */
const get = (req, res) => {
  const { user_id } = req.user;
  db.task(t => {
    return t.batch([
      t.one(queries.follows['postsCount'], user_id),
      t.one(queries.follows['followings'], user_id),
      t.one(queries.follows['followers'], user_id)
    ]);
  }).then(data => {
    res.send({status: 200, data: data})
  }).catch(e => {
    console.log(e.message || e)
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
        res.send({status: 402, error: e.message || e});
      })
  }).catch(e => {
    res.send({status: 500, error: e.message || e})
  })
}

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