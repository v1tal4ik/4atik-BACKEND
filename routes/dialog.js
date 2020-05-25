import express from 'express';
import dialog from '../controllers/dialog';

const router = express.Router();

router.get('/', dialog.fetchDialogsByUserId);
router.post('/', dialog.createNewDialogByUserId);

export default router;
