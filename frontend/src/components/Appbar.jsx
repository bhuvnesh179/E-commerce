import { use } from "react"
import { LandingPage } from "../pages/LandingPage"
import { Cart } from "./Cart"
import { useNavigate } from "react-router-dom"

export const Appbar = () => {
    const navigate = useNavigate();
    return <div className="flex justify-between border-b-2">
        <div className="font-bold text-3xl">
            E-commerce
        </div>
        <div className="flex mt-2">
        <button onClick={(e)=>{
            navigate("/signup");
        }} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Log out</button>

        </div>
       
    </div>
}