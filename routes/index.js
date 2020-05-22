import express from 'express';
import { checkTokensFunc } from '../util/validationRequest';
import user from '../controllers/user';

const router = express.Router();

router.get('/user', checkTokensFunc, user.getDataById);
router.post('/user/register', user.addNewUser);
router.post('/user/login', user.getDataByCredential);
router.post('/password', user.changePassword);

router.post('/secret', user.refreshTokens);

export default router;
