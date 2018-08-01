import helpers from '../helpers';

const { db, queries, mapResult } = helpers;

const get = (req, res) => {
  const { tagId } = req.params;
  console.log(tagId);
  db.connect().then(obj => {
    obj.any(queries.search['select'], tagId)
      .then(data => {
        const mapped = data.map(media => mapResult.mapMedia(media));
        res.send({status: 200, data: mapped});
        obj.done();
      }).catch(e => {
        console.log(e || e.message);
        res.send({status: 404, error: e.message || e});
        obj.done();
      })
  }).catch((e) => {
    res.send({status: 500, error: e.message || e});
  })
}

const byUser = (req, res) => {
  const { term } = req.params;
  db.connect().then(obj => {
    obj.any(queries.search['byUsername'], term)
      .then(data => {
        const mapped = data.map(users => mapResult.mapUrls(users));
        res.send(mapped);
        obj.done();
      }).catch(e => {
        console.log(e || e.message);
        res.send({status: 404, error: e.message || e});
        obj.done();
      })
  }).catch((e) => {
    res.send({status: 500, error: e.message || e});
  })
}

const byTag = (req, res) => {
  const { term } = req.params;
  console.log(term);
  db.connect().then(obj => {
    obj.any(queries.search['byTag'], term)
      .then(data => {
        res.send(data);
        obj.done();
      })
      .catch(e => {
        console.log(e.message || e);
        res.send({status: 404, error: e.message || e});
        obj.done();
      })
  }).catch((e) => {
    res.send({status: 500, error: e.message || e});
  })
}

export default { get, byUser, byTag };