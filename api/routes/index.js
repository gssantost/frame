import express from 'express';
import UserRoutes from './users';
import MediaRoutes from './media';

const router = express.Router();

router.use('/users', UserRoutes);
router.use('/posts', MediaRoutes);

export default router;