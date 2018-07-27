import multer from 'multer'
import mkdirp from 'mkdirp'
import helpers from '../helpers'

const { config, fileFilter } = helpers

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //let dest = config.baseDir + '/uploads/' + req.user.user_id + '/posts/'
    let dest = 'uploads/' + req.user.user_id + '/posts/'
    mkdirp.sync(dest)
    cb(null, dest)
  },
  filename: (req, file, cb) => {
    let newFileName = '';
    if (file.originalname.match(/^.|,|;/)) {
      newFileName = file.originalname.replace(/^.|,|;/, '');
    }
    cb(null, newFileName)
  }
})

const postsUpload = multer({storage: storage}).single('file')

export default postsUpload