import multer from 'multer'
import mkdirp from 'mkdirp'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest = 'uploads/' + req.user.user_id + '/posts/'
    mkdirp.sync(dest)
    cb(null, dest)
  },
  filename: (req, file, cb) => {
    let newFileName = String(Date.now() + Math.random()).split('.')[0] + '.jpg';
    cb(null, newFileName);
  }
})

const postsUpload = multer({storage: storage}).single('file')

export default postsUpload