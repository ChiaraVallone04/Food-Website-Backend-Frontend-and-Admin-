import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
    
        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            console.log('Response data:', response.data); 
    
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad",
                });
                setImage(null);
                toast.success(response.data.message);
    
                const fileInput = document.getElementById("image");
                if (fileInput) {
                    fileInput.value = null;
                }
            } else {
                toast.error(response.data.message || "Failed to add product");
            }
        } catch (error) {
            toast.error("Error: " + error.message);
        }
    };

    return (
        <div className="add">
            <form className="flex-col" onSubmit={handleFormSubmit}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload area" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={handleInputChange} value={data.name} type="text" name="name" placeholder="Type Here" />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={handleInputChange} value={data.description} name="description" rows="6" placeholder="Write content here"></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={handleInputChange} value={data.category} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={handleInputChange} value={data.price} type="number" name="price" placeholder="$20" />
                    </div>
                </div>
                <button type="submit" className="add-btn">ADD</button>
            </form>
        </div>
    );
};

export default Add;
