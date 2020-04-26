import express from 'express';
import user from '../controllers/user';

const router = express.Router();

router.post('/user', user.addNewUser);

export default router;
