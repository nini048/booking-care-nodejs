import express from "express";
const app = express();
import { getHomePage, getCRUD, postCRUD } from '../controllers/homeController';

let router = express.Router();
const initWebRoutes = (app) => {
  router.get('/', getHomePage)
  router.get('/crud', getCRUD)
  router.post('/post-crud', postCRUD)
  return app.use('/', router)
}
export default initWebRoutes



