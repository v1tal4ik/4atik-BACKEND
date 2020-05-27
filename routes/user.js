import express from 'express';
import { checkTokensFunc } from '../util/validationRequest';
import user from '../controllers/user';

const router = express.Router();

router.get('/', checkTokensFunc, user.getDataById);
router.post('/register', user.createNewUser);
router.post('/login', user.getDataByCredential);
router.post('/password', checkTokensFunc, user.changePassword);

router.post('/secret', user.refreshTokens);

export default router;
