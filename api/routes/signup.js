import express from 'express';
import { Signup as SignupController } from '../controllers';

const router = express.Router();

router.post('/', SignupController.post);

export default router;