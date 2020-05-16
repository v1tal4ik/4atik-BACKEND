import express from 'express';
import { checkTokensFunc } from '../util/validationRequest';
import user from '../controllers/user';

const router = express.Router();

router.get('/users', checkTokensFunc, user.getDataById);
router.post('/users/register', user.addNewUser);
router.post('/users/login', user.getDataByCredential);

router.post('/foo', checkTokensFunc, (req, res) => {
  res.status(200).json();
});

router.post('/secret', user.refreshTokens);

export default router;
