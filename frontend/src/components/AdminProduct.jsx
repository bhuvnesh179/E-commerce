import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useNavigate } from "react-router-dom"

export const  AdminProduct = ({product}) => {
const naviagte = useNavigate();

    
    async function deleteHandler(){
        try{
            const response = await axios.delete(`${BACKEND_URL}/api/v1/admin/deleteProduct/${product.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            alert(`Product deleted successfully`);
            naviagte(0); 
        }catch(error){
            console.log(error);
        }
    }


   
    return <div>
        <div className="h-90 w-80 border-2 border-black m-4">
            <div className="flex justify-center">
                <img src={product.image} alt="" className="object-cover h-48 w-48"/>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div>Product Name: {product.name}</div>
                <div>Price : {product.price}</div>
                <div>Description: {product.description}</div>
                <div>Category: {product.category}</div>
            </div>
            
            <div className="flex  justify-between">
            <button onClick={(e)=>{
                naviagte(`/updateProduct/${product.id}`);
            }} type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-2">Edit</button>


            <button onClick={async(e)=>{
                await deleteHandler();
            }} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>

            </div>
        </div>
    </div>
}