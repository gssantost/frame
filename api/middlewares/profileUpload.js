import multer from 'multer';
import mkdirp from 'mkdirp';
import helpers from '../helpers';

const { config } = helpers

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest = 'uploads/' + req.user.user_id + '/';
    mkdirp.sync(dest)
    cb(null, dest)
  },
  filename: (req, file, cb) => {
    let rexp = /^.|,|;/
    if (file.originalname.match(rexp)) {
      file.originalname.replace(rexp, '');
    }
    cb(null, file.originalname)
  }
})

const profileUpload = multer({storage: storage}).single('file')

export default profileUpload