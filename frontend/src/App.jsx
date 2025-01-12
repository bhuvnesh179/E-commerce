import React, { Suspense } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { Signup } from "./pages/Signup";
import { LandingPage } from "./pages/LandingPage";
import { Signin } from "./pages/Singin";
import { Admin } from "./pages/Admin";
import { Dashboard } from "./pages/Dashboard";
import { CreateProduct } from "./components/CreateProduct";
import { UserView } from "./components/UserView";
import { UpdateProduct } from "./components/UpdateProduct";

function App() {
  return (  
    <div>
      <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route path="/"   element={<LandingPage/>} />
          <Route path="/admin"   element={<Admin/>}/>
          <Route path="/dashboard"   element={<Dashboard/>}/>
          <Route path="/createproduct"   element={<CreateProduct/>}/>
          <Route path="/updateProduct/:id"   element={<UpdateProduct/>}/>
          <Route path="/signup"  element={<Signup/>} />
          <Route path="/signin"  element={<Signin/>} />
          <Route path="/user" element={<UserView/>}/>
        </Routes>
      </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App;