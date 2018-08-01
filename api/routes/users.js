import express from 'express';
import { User as UserController, Follow as FollowController } from '../controllers';
import profileUpload from '../middlewares/profileUpload';

const router = express.Router();

router.post('/follow', FollowController.post);
router.get('/follow/:userId', FollowController.get);
router.get('/', UserController.getUser);
router.get('/:userId', UserController.getByUserId);
router.put('/', UserController.putUser);
router.post('/', profileUpload, UserController.postPicture);
router.post('/login', UserController.login);
router.post('/signup', UserController.signUp);
router.delete('/:followId', FollowController.deleteFollow);


//router.get('/', UserController.getUserId);

export default router;