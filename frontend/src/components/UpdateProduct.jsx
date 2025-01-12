import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "./Spinner";
import { useState } from "react";
import axios from "axios";

export const UpdateProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const  {id}  = useParams(); 

    async function handler() {
        console.log(`${id}`);
        try {
            const response = await axios.put(`http://localhost:8001/api/v1/admin/updateProduct/${id}`, {
                id:id,
                name: name,
                price: parseFloat(price),
                description: description,
                category: category,
                image: image,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            alert("Product details updated successfully");
            navigate("/dashboard");
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error in handler:", error);
        }
    }

    return <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    
            <div>
                 <label  className="block mb-2 text-sm font-medium text-gray-900 pt-2">
                     Name
                 </label>
    
            <input onChange={(e) => {
                setName(e.target.value);
            }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 " placeholder="product name" required />
    
            </div>
    
            <div>
                 <label  className="block mb-2 text-sm font-medium text-gray-900 pt-2">
                     Price
                 </label>
    
            <input onChange={(e) => {
                setPrice(e.target.value);
            }} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 " placeholder="price" required />
    
            </div>
    
            <div>
                 <label  className="block mb-2 text-sm font-medium text-gray-900 pt-2">
                     category
                 </label>
    
            <input onChange={(e) => {
                setCategory(e.target.value);
            }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 " placeholder="category" required />
    
            </div>
    
            <div>
                 <label  className="block mb-2 text-sm font-medium text-gray-900 pt-2">
                     description
                 </label>
    
            <input onChange={(e) => {
                setDescription(e.target.value);
            }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 " placeholder="description" required />
    
            </div>
    
            <div>
                 <label  className="block mb-2 text-sm font-medium text-gray-900 pt-2">
                     Image
                 </label>
    
            <input onChange={(e) => {
                setImage(e.target.value);
            }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 " placeholder="Image-link" required />
    
            </div>
    
            <div>
                <button onClick={async (e)=>{
                    setLoading(true);
                    try {
                        await handler();
                       
                    } catch (error) {
                        console.error("Error in handler:", error);
                    } finally {
                        setLoading(false);
                    }
                }}   type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-6">{loading ? <Spinner/> : "Change"}</button>
    
            </div>
    
             
        </div>
}