import express from 'express';

import { checkTokensFunc } from '../util/validationRequest';

import UserRouter from './user';
import DialogRouter from './dialog';

const RootRouter = express.Router();

RootRouter.use('/user', UserRouter);
// RootRouter.use('/dialog', checkTokensFunc, DialogRouter);
RootRouter.use('/dialog', DialogRouter);

export default RootRouter;
