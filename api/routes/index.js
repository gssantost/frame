import express from 'express';
import UserRoutes from './users';
import MediaRoutes from './media';
import LikesRoutes from './likes';
import CommentRoutes from './comment';

const router = express.Router();

router.use('/users', UserRoutes);
router.use('/posts', MediaRoutes);
router.use('/likes', LikesRoutes);
router.use('/comment', CommentRoutes);

export default router;