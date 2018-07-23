import helpers from '../helpers';

const { db, queries } = helpers;

/** GET: get all comments of a post with respective pics and username of each comment's author */
const getByMediaId = (req, res) => {
  db.connect().then(obj => {
    obj.any(queries.comments['select'], req.params.mediaId)
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
  db.connect().then(obj => {
    obj.one(queries.comments['create'], [text.trim(), mediaId, user_id])
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

/** PUT: */
const update = (req, res) => {
  const { body: { text, commentId }, user: { user_id } } = req;
  db.connect().then(obj => {
    obj.oneOrNone(queries.comments['update'], [text.trim(), commentId, user_id])
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

/** DELETE: */
const deleteComment = (req, res) => {
  db.connect().then(obj => {
    obj.oneOrNone(queries.comments['delete'], req.params.commentId)
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

export default { getByMediaId, getCount, post, update, deleteComment }