import express from 'express';
import { Comment as CommentController } from '../controllers';

let router = express.Router();

router.get('/:mediaId', CommentController.getByMediaId);
router.get('/totals/:mediaId', CommentController.getCount);
router.post('/', CommentController.post);
router.put('/', CommentController.update);
router.delete('/:commentId', CommentController.deleteComment);

export default router;