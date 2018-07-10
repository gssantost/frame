import { File as Controller } from '../controllers';
import helpers from '../helpers';
import express from 'express';
import multer from 'multer';
import fs from 'fs';

const { config } = helpers;

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest = config.baseDir + '/uploads/' + req.user.user_id + '/'
    fs.mkdir(dest, err => cb(err, dest))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

router.post('/up', upload.single('file'), Controller.post)

export default router;