import helpers from '../helpers';

const { db, queries } = helpers;

/** GET:  */
const get = (req, res) => {
  db.connect().then((obj) => {
    obj.one(queries.likes['likesCount'], req.params.mediaId)
      .then((data) => {
        console.log(data)
        res.send({status: 200, data: data})
      }).catch((e) => {
        res.send({status: 402, message: e.message || e})
      })
  }).catch((e) => {
    res.send({status: 500, message: e.message || e})
  })
}

/** POST: set your like of a post, updates to the contrary depending on the likes state */
const post = (req, res) => {
  const { user: { user_id }, body: { mediaId } } = req;

  db.task(async t => {
    const like = await t.oneOrNone(queries.likes['select'], [user_id, mediaId]);
    console.log(like);
    if (like !== null) {
     return await t.oneOrNone(queries.likes['update'], [user_id, mediaId]);
    }
    return await t.oneOrNone(queries.likes['create'], [user_id, mediaId]);
  }).then((data) => {
    console.log(data);
    res.send({status: 200, message: 'Done'});
  }).catch((e) => {
    res.send({status: 500, error: e.message || e});
  })
}


export default { post, get }