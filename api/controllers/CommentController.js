import helpers from '../helpers';

const { db, queries, config, mapResult } = helpers;

/** GET: get all comments of a post with respective pics and username of each comment's author */
const getByMediaId = (req, res) => {
  db.connect().then(obj => {
    obj.any(queries.comments['select'], [req.user.user_id, req.params.mediaId])
      .then(data => {
        const mapped = data.map(post => mapResult.mapUrls(post));
        res.send({status: 200, data: mapped});
      })
      .catch(e => {
        res.send({status: 404, error: e.message || e});
      })
  }).catch(e => {
    res.send({status: 500, error: e.message || e});
  })
}

/** GET: total of comments in a post */
const getCount = (req, res) => {
  db.connect().then(obj => {
    obj.one(queries.comments['commentsCount'], req.params.mediaId)
      .then(data => {
        res.send({status: 200, data: data});
      })
      .catch(e => {
        res.send({status: 404, error: e.message || e});
      })
  }).catch(e => {
    res.send({status: 500, error: e.message || e});
  })
}

/** POST: */
const post = (req, res) => {
  const { body: { text, mediaId }, user: { user_id } } = req;
  doComment(text, mediaId, user_id)
  .then((data) => {
    console.log(data);
    res.send({status: 200, data: mapResult.mapUrls(data), message: 'Your comment has been posted!'});
  }).catch((e) => {
    res.send({status: 402, error: e.message || e});
  })
}

/** PUT: */
const update = (req, res) => {
  const { body: { text, commentId }, user: { user_id } } = req;
  db.connect().then(obj => {
    obj.one(queries.comments['update'], [text.trim(), commentId, user_id])
      .then(data => {
        res.send({status: 200, data: data, message: 'Done!'});
      })
      .catch(e => {
        res.send({status: 404, error: e.message || e});
      })
  }).catch(e => {
    res.send({status: 500, error: e.message || e});
  })
}

/** DELETE: */
const deleteComment = (req, res) => {
  db.connect().then(obj => {
    obj.oneOrNone(queries.comments['delete'], req.params.commentId)
      .then(data => {
        res.send({status: 200, message: 'Comment deleted'});
      })
      .catch(e => {
        res.send({status: 404, error: e.message || e});
      })
  }).catch(e => {
    res.send({status: 500, error: e.message || e});
  })
}

/** resuming functions */
function doComment(text, media, user) {
  return db.task(async t => {
    const rs = await t.one(queries.comments['create'], [text.trim(), parseInt(media), user]);
    if (rs.hasOwnProperty('comment_id')) {
      return await t.one(queries.comments['selectComment'], [user, rs.comment_id]);
    }
    return [];
  });
}

export default { getByMediaId, getCount, post, update, deleteComment }