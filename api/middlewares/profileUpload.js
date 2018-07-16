import multer from 'multer';
import mkdirp from 'mkdirp';
import helpers from '../helpers';

const { config, fileCheck } = helpers

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest = config.baseDir + '/uploads/' + req.user.user_id + '/';
    mkdirp.sync(dest)
    cb(null, dest)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const profileUpload = multer({storage: storage}).single('file')

export default profileUpload