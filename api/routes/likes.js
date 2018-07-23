import { Likes } from '../controllers';
import express from 'express';

let router = express.Router();

router.get('/:mediaId', Likes.get);
router.post('/', Likes.post);

export default router;