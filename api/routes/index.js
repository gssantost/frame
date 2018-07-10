import express from 'express';
import upload from './upload';
import UserRoutes from './users';

const router = express.Router();

router.use('/users', UserRoutes);
router.use('/upload', upload);

export default router;