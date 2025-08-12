import express from 'express'
import { getHomePage, getCRUD } from '../controllers/homeController';

let router = express.Router();
const initWebRoutes = (app) => {
  router.get('/', getHomePage)
  router.get('/crud', getCRUD)
  return app.use('/', router)
}
export default initWebRoutes



