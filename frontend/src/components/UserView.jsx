import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import {Appbar} from "./Appbar";
import { Userproducts } from "./Userproducts";

export const UserView = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/v1/user/products`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                setProducts(response.data || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="bg-gradient-to-r from-[#feb47b] to-[#9fff5f] ">
            <div>
                <Appbar />
            </div>
            <div className="flex flex-wrap justify-center">
               {products.map((product) => (
                 <Userproducts key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};
