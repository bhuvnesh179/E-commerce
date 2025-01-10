import { useState, useEffect } from "react";
import { AdminBar } from "../components/AdminBar";
import { AdminProduct } from "../components/AdminProduct";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/admin/products`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setProducts(response.data.products); 
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="bg-gradient-to-r from-[#feb47b] to-[#9fff5f]">
            <div>
                <AdminBar />
            </div>
            <div>
                <div className="flex flex-wrap justify-center">
                    {products.map((product) => (
                        <AdminProduct key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};
