import express from 'express'
import { Search } from '../controllers';

let router = express.Router();

router.get('/tag/:term', Search.byTag);
router.get('/term/:term', Search.byUser);
router.get('/:tagId', Search.get);

export default router;