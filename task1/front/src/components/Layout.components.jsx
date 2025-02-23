import { Outlet } from "react-router-dom"
import Navbar from "./Navbar.components"

const Layout = () =>{
    return(
        <main>
            <Navbar />
            <Outlet />
        </main>
    )
}

export default Layout;