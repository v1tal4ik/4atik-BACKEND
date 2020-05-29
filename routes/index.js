import express from 'express';

import { checkTokensFunc } from '../util/validationRequest';

import UserRouter from './user';
import DialogRouter from './dialog';
import MessagesRouter from './messages';

const RootRouter = express.Router();

RootRouter.use('/user', UserRouter);

RootRouter.use('/dialog', checkTokensFunc, DialogRouter);
RootRouter.use('/messages', checkTokensFunc, MessagesRouter);

export default RootRouter;
