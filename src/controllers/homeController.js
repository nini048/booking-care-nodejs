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
let message =  await CRUDService.createNewUser(req.body);
  console.log ('>>>message: ', message)
  return res.send("post crud");
};

// export default { getHomePage };
