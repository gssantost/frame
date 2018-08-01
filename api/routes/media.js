import express from 'express'
import { Media as MediaController } from '../controllers'
import postsUpload from '../middlewares/postsUpload'

let router = express.Router();

router.get('/', MediaController.get)
router.get('/:mediaId', MediaController.getById)
router.get('/:userId/all', MediaController.getThisPosts)
router.get('/:items/:page', MediaController.getByItems)
router.post('/', postsUpload, MediaController.post)
//router.post('/', MediaController.testPost)
router.put('/', MediaController.put)
router.delete('/:mediaId', MediaController.deleteById)


export default router