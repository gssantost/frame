import multer from 'multer';
import mkdirp from 'mkdirp';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest = 'uploads/' + req.user.user_id + '/';
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

const profileUpload = multer({storage: storage}).single('file')

export default profileUpload