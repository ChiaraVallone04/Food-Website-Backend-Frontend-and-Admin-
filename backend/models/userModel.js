import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, requiered:true},
    email:{type:String, requiered:true, unique:true},
    password:{type:String, requiered:true},
    cartData: { type: mongoose.Schema.Types.Mixed, default: {} }
}, {minimize:false});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;