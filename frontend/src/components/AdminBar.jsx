import { useNavigate } from "react-router-dom"

export const AdminBar = () => {
    const navigate = useNavigate();
    return <div className="bg-[#6f7a8b]">
        <div className="flex justify-between border-b-2 ">

            <button onClick={(e) => {
                navigate("/")
            }} type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-4 mt-2">Dashboard</button>
            
            <div className="flex ">
            <button onClick={ (e)=>{    
                navigate("/createproduct")
            }} type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2 mr-4 ">Add a product</button>

                     
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 me-4 mt-1">
              <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            </div>
     
            </div>
            
        </div>
        
    
    </div>
}