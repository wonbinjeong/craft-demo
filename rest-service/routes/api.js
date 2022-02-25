import express from 'express';
import * as apiController from '../api/api.js'
const apiRoutes = express.Router({mergeParams: true});

apiRoutes.post("/networth", apiController.calculateNetworth);
apiRoutes.post("/currency", apiController.calculateNetworthWithCurrency);

export default apiRoutes;