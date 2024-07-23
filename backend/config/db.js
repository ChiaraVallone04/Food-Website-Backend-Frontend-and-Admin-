import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://chiaravallone04:chiara06@cluster0.qacmmt8.mongodb.net/food-del')
    .then(()=>console.log("DB Connected"));
}