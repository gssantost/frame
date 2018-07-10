import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { User as UserController } from '../controllers';
import helpers from '../helpers';

const { config } = helpers

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest = config.baseDir + '/uploads/' + req.user.user_id + '/';
    fileCheck(dest)
    cb(null, dest)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const fileCheck = (path) => {
  fs.exists(path, (exists) => {
    if (!exists) {
      fs.mkdir(path, (e) => {
        if (e) {
          console.log(e || e.message)
        }
        return
      })
    } else {
      return
    }
  })
}

const upload = multer({storage: storage})

const router = express.Router();

router.get('/', UserController.getUser);
router.put('/', UserController.putUser);
router.post('/', upload.single('file'), UserController.postPicture);

router.post('/login', UserController.login);
router.post('/signup', UserController.signUp);

//router.get('/', UserController.getUserId);

export default router;