const express = require("express");
const { addFood , listFood, removeFood} = require("../controllers/foodController.js");
const upload = require("../middlewares/multer.js");

const foodRouter = express.Router();


foodRouter.post("/add", upload.single("image") , addFood)
foodRouter.get("/list" , listFood);
foodRouter.post("/remove", removeFood);


module.exports = foodRouter;
