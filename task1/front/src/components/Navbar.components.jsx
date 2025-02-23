import { useContext, useEffect, useState } from 'react'
import {UserContext} from '../UserContext'

import { Link, Outlet } from 'react-router-dom'
import blog_icon from '../assets/blog.png'
import search_icon from '../assets/search.png'



const Navbar = () => {

    const {setUser, user} = useContext(UserContext);
    const [searchBarVisibility, setSearchBarVisibility] = useState(false)


    useEffect(()=>{
        fetch('http://localhost:3000/profile', {
            credentials: 'include'
        }).then(response=>{ 
            response.json().then(user=>{
                setUser(user.username);
            });
        })
    }, []);

    const username = user?.username;

    function logout(){
       fetch("http://localhost:3000/logout", {
        credentials: 'include',
        method: 'POST'
       });
       setUsername(null); 
    }

    return(
        <>
        <nav className="navbar">
            <Link to="/home " className="link-click">
                <img src={blog_icon} alt="" className="navbar-icon" />
            </Link>
            <div className={"search-div " + (searchBarVisibility?"show":"hide")}>
                <input type="text" placeholder="Search..."
                className="search-bar" />
                <img src={search_icon} alt="search-icon" className="search-icon" />
            </div>
            <div className="buttons-div">
                <button className="search-button" onClick={()=>setSearchBarVisibility(currentVal => !currentVal)}>
                    <i className='fi fi-rr-search '></i>
                </button>
                {!username && (<>
                <Link to="/signin" className="sign-in"  >
                    Sign In
                </Link>
                <Link to="/signup" className="sign-up">
                    Sign Up
                </Link>
                </>)
                }
{username && (<>
                <Link to="/write" className="edit-button"  >
                    Write new post
                </Link>
                <a onClick={logout}>Sign out</a>
                </>)}
            </div>
        </nav>
        <Outlet />
        </>
    )
}

export default Navbar;