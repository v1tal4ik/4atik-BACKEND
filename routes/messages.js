import express from 'express';
import messages from '../controllers/messages';

const router = express.Router();

router.get('/', messages.fetchMessagesByDialogId);
router.post('/', messages.createMessageForDialog);

export default router;
