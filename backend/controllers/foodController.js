import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image_filename = req.file ? req.file.filename : null;

        
        if (!name || !description || !price || !category || !image_filename) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const food = new foodModel({
            name,
            description,
            price,
            category,
            image: image_filename
        });

        await food.save();
        res.status(201).json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error('Error adding food:', error);
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};

// All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.error('Error fetching food list:', error);
        res.status(500).json({ success: false, message: "Error fetching food list" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error('Error deleting image file:', err);
            }
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        console.error('Error removing food:', error);
        res.status(500).json({ success: false, message: "Error removing food" });
    }
};

export { addFood, listFood, removeFood };
