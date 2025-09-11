import express from "express";
const app = express();
import { getHomePage, getCRUD, postCRUD, displayGetCRUD, getEditCRUD, putEditCRUD, deleteCRUD } from '../controllers/homeController';
import { handleLogin, handleGetAllUsers, getAllCode, handleCreateNewUser, handleEditUser, handleDeleteUser } from '../controllers/userController'
import upload from "../uploads/upload";



let router = express.Router();
const initWebRoutes = (app) => {
  router.get('/', getHomePage)
  router.get('/crud', getCRUD)
  router.post('/post-crud', postCRUD)
  router.get('/get-crud', displayGetCRUD)
  router.get('/edit-crud', getEditCRUD)
  router.post('/put-crud', putEditCRUD)
  router.get('/delete-crud', deleteCRUD)
  router.post('/api/login', handleLogin)
  router.get('/api/get-all-users', handleGetAllUsers)
  router.post('/api/create-new-user', upload.single("image"), handleCreateNewUser)
  router.put('/api/edit-user/:id', handleEditUser)
  router.delete('/api/delete-user/:id', handleDeleteUser)
  router.get('/allcode', getAllCode)
  return app.use('/', router)

}
export default initWebRoutes



