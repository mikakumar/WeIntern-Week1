import { Routes, Route, Navigate } from "react-router-dom";
import { createRoot } from 'react-dom/client';

import Home from "./components/Home.components";
import Navbar from "./components/Navbar.components";
import AuthCheck from "./components/AuthCheck.components";
import MakePost from "./components/MakePost.components";
import { UserContextProvider } from "./UserContext";

const App = () =>{
  return(
    <>
    <UserContextProvider>
    <Navbar/>
      <Routes>
      <Route>
          <Route path="signin" element={<AuthCheck type="signin"/>}/>
          <Route path="signup" element={<AuthCheck type="signup"/>}/>
          </Route>
          <Route path="write" element={<MakePost/>}/>
          <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
      </UserContextProvider>
      </>
      
  );
}

export default App;