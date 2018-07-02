import express from 'express';
import signup from './signup';
import auth from './auth';

const router = express.Router();

router.use('/signup', signup);
router.use('/auth', auth);

export default router;