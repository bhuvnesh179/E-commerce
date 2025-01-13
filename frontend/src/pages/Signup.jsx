import { Link, useNavigate } from "react-router-dom"
import {  useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { Spinner } from "../components/Spinner";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import  jwt_decode from 'jwt-decode';

export const Signup = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handler() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });
           localStorage.setItem("token", response.data.token);
           navigate("/user");
        } catch (error) {
            console.log(error);
        }
    }

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const decoded = jwt_decode(credentialResponse.credential);
            
            const response = await axios.post(`${BACKEND_URL}api/v1/user/google-auth`, {
                email: decoded.email,
                firstName: decoded.given_name,
                lastName: decoded.family_name,
            }, { withCredentials: true });
            
            localStorage.setItem("token", response.data.token);
            navigate("/user");
        } catch (error) {
            console.error("Google auth failed:", error);
        }
    };
    

    return <div>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
            
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
            <div className="font-bold text-2xl">
               E-commerce
            </div>   
            <div className="text-gray-500 font-medium">
                Already have an account? <Link to="/signin" className="font-bold underline cursor-pointer">Login</Link>
            </div>
            <div>
                <label  className="block mb-2 text-sm font-medium text-gray-900 pt-2">First Name</label>

                <input onChange={(e) => {
                    setFirstName(e.target.value);
                }} type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 " placeholder="John" required /> 
            </div> 
            <div>
                <label  className="block mb-2 text-sm font-medium text-gray-900 pt-2">Last name</label>

                <input onChange={(e) => {
                    setLastName(e.target.value);
                }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 " placeholder="Doe" required /> 
            </div> 
           
            <div>
                <label  className="block mb-2 text-sm font-medium text-gray-900 pt-2">Email address</label>
                 <input onChange={(e)=>{
                   setEmail(e.target.value); 
                 }} type="email"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 " placeholder="john.doe@gmail.com" required />
            </div>

            <div>
                 <label  className="block mb-2 text-sm font-medium text-gray-900 pt-2">Password</label>
                 <input onChange={(e)=>{
                     setPassword(e.target.value);
                 }} type="password"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 " placeholder="•••••••••" required />
            </div>

            <div>
            <button onClick={async () => {
                    setLoading(true);
                    await handler();
                    setLoading(false);
              }} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-6">
            {loading ? <Spinner/> : "Signup"}
            </button>
            </div>
            <div className="mt-4">
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => console.log("Login Failed")}
                        useOneTap
                        size="large"
                        theme="filled_blue"
                        text="continue_with"
                        shape="rectangular"
                        width="300"
                    />
                </GoogleOAuthProvider>
            </div>

        </div>
       
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white font-extrabold text-2xl	">
           "Work hard , have fun , make history" - Jeff Bezos
        </div>
    </div>
    </div>
}

