import db from "../models/index";
import CRUDService from "../services/CRUDService";
export const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log("e: ", e);
  }
};
export const getCRUD = async (req, res) => {
  return await res.render("crud.ejs");
};
export const postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(">>>message: ", message);
  return res.send("post crud");
};
export const displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUsers();
  return res.render("getCRUD.ejs", { data });
};
export const getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    console.log(userData);
    return res.render('editCRUD.ejs', {userData});
  } else {
    return res.send("not found user");
  }
};
export const putEditCRUD = async (req, res) => {
let data = req.body
let allUsers =  await CRUDService.updateUserData(data)
  return res.render("getCRUD.ejs", { data:allUsers });
}

// export default { getHomePage };
