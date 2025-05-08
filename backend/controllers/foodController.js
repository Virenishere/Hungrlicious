const foodModel = require("../models/foodModel");
const cloudinary = require("cloudinary").v2;

// Add food item
const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    console.log(name, description, price, category);

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json({ error: "All fields are required except image." });
    }

    // Validate file upload
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "food-images", // Optional: Folder name on Cloudinary
    });

    console.log("Cloudinary upload result:", result);

    // Create a new food item
    const newFood = new foodModel({
      name,
      description,
      price,
      image: result.secure_url, // Use Cloudinary's secure URL
      category,
    });

    await newFood.save();

    res.status(200).json({
      message: "Food item added successfully",
      food: newFood,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add food item." });
  }
};

//all foodlist
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    
    if(!food){
      return res.status(404).json({error: "Food item not found"});
    }

    const imageUrl = food.image;
    const publicId = imageUrl.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(`food-images/${publicId}`);

    //remove the food item from the database

    await foodModel.findByIdAndDelete(req.body.id);

    res.status(200).json({message: "Food item removed successfully"});
  } catch (error) {
    console.error(error);
    res.json({error: "Failed to remove the food item."})
  }
};


module.exports = { addFood, listFood, removeFood };
