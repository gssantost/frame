import multer from 'multer'
import mkdirp from 'mkdirp'
import helpers from '../helpers'

const { config } = helpers

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest = config.baseDir + '/uploads/' + req.user.user_id + '/posts/'
    mkdirp.sync(dest)
    cb(null, dest)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const postsUpload = multer({storage: storage}).single('file')

export default postsUpload