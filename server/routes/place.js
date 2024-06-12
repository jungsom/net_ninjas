import express from 'express';
import { allDataPerPage } from '../controllers/placeController.js';

const placeRoutes = express.Router();
placeRoutes.get('/', allDataPerPage);

export default placeRoutes;
