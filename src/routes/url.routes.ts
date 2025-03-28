import express from 'express';
import { shortenUrlValidations } from '../validations/url.validations';
import { shortenUrl } from '../controllers/url.controllers';

const router = express.Router();

router.route('/shorten').post(shortenUrlValidations(), shortenUrl);

export default router;