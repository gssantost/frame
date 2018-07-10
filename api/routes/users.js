import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { User as UserController } from '../controllers';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest = config.baseDir + '/uploads/' + req.user.user_id + '/'
    fs.mkdir(dest, err => cb(err, dest))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage}).single('file')

const router = express.Router();

router.get('/', UserController.getUser);
router.put('/', UserController.putUser);
router.post('/', upload, UserController.postPicture);

router.post('/login', UserController.login);
router.post('/signup', UserController.signUp);

//router.get('/', UserController.getUserId);

export default router;