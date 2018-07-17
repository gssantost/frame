import helpers from '../helpers'

const { db, queries } = helpers

/** GET: get all the user's posts */
const get = (req, res) => {
  db.connect().then((obj) => {
    obj.any(queries.media['selectByUserId'], req.user.user_id)
      .then((data) => {
        res.send({status: 200, data: data})
        obj.done()
      }).catch(e => {
        res.send({status: 404, error: e.message || e})
        obj.done()
      })
  }).catch(e => {
    res.send({status: 500, error: e.message || e})
  })
}

/** GET: get post full post by id */
const getById = (req, res) => {
  db.connect().then((obj) => {
    obj.one(queries.media['selectById'], req.params.mediaId)
      .then((data) => {
        res.send({status: 200, data: data})
        obj.done()
      }).catch(e => {
        res.send({status: 404, error: e.message || e})
        obj.done()
      })
  }).catch(e => {
    res.send({status: 500, error: e.message || e})
  })
}

/** GET: do pagination! */
const getByItems = (req, res) => {
  console.log(req.params)
  db.connect().then((obj) => {
    obj.any(queries.media['pagination'], [req.params.items, req.params.page])
      .then(data => {
        res.send({status: 200, data: data})
        obj.done()
      }).catch(e => {
        res.send({status: 404, error: e.message || e})
        obj.done()
      })
  }).catch(e => {
    res.send({status: 500, error: e.message || e})
  })
}

/** POST: make a post! */
const post = (req, res) => {

  if (req.file === undefined) {
    res.send({status: 400, message: 'No file found!'})
  }

  const { body: { description }, file: { path }, user } = req
  console.log(req.body)

  db.connect().then((obj) => {
    obj.none(queries.media['create'], [description, path, user.user_id])
      .then((data) => {
        console.log(data)
        res.send({status: 200, message: 'Done!'})
        obj.done()
      }).catch((e) => {
        console.log(e.message || e)
        res.send({status: 400, error: e.message || e})
        obj.done()
      })
  }).catch((e) => {
    res.send({status: 500, error: e.message || e})
  })
}

/** UPDATE: update your post caption */
const put = (req, res) => {
  const { description, media_id } = req.body
  db.connect().then((obj) => {
    obj.oneOrNone(queries.media['update'], [description, media_id])
      .then((data) => {
        console.log(data)
        res.send({status: 200, message: 'Post updated!'})
        obj.done()
      }).catch((e) => {
        res.send({status: 400, error: e.message || e})
        obj.done()
      })
  }).catch((e) => {
    res.send({status: 500, error: e.message || e})
  })
}

/** DELETE: */
const deleteById = (req, res) => {
  db.connect().then((obj) => {
    obj.none(queries.media['delete'], [req.params.mediaId])
      .then((data) => {
        res.send({status: 200, message: 'This post has been erased from history...'})
        obj.done()
      }).catch((e) => {
        res.send({status: 400, error: e.message || e})
        obj.done()
      })
  }).catch((e) => {
    res.send({status: 500, error: e.message || e})
  })
}

export default { get, getById, getByItems, post, put, deleteById }