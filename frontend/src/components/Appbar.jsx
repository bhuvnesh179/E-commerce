import { LandingPage } from "../pages/LandingPage"
import { Cart } from "./Cart"

export const Appbar = () => {
    return <div className="flex justify-between border-b-2">
        <div className="font-bold text-3xl">
            E-commerce
        </div>
        <div>
            <Cart/>
        </div>
       
    </div>
}