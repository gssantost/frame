import express from 'express';
import { User as UserController } from '../controllers';
import profileUpload from '../middlewares/profileUpload';

const router = express.Router();

router.get('/', UserController.getUser);
router.get('/:userId', UserController.getByUserId);
router.put('/', UserController.putUser);
router.post('/', profileUpload, UserController.postPicture);
router.post('/login', UserController.login);
router.post('/signup', UserController.signUp);

//router.get('/', UserController.getUserId);

export default router;