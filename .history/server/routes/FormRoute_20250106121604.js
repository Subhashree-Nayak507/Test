import express from 'express';
import { upload }  from '../middleware/FormMiddleware.js';
import { FormController } from '../controller/FormController.js';
import { protectRoute } from '../middleware/UserMiddleware.js';

const router = express.Router();

router.post('/form',protectRoute, upload.single('File'), FormController);

export default router;
