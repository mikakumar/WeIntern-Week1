import { useContext, useState } from 'react'
import { Navigate } from "react-router-dom";
import { UserContext } from '../UserContext';

const Signin = () =>{

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');    
    const [redirect, setRedirect] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false)

    const {setUser} =useContext(UserContext)

    async function sendLoginDetails(data){
        data.preventDefault();
        const response = await fetch('http://localhost:3000/back/api/signin', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({email, password}),
            credentials: 'include'
        });
        if(response.ok){
            response.json().then(user=>{
                setUser(user);
                setRedirect(true);
            })

        } else {
            alert('Invalid login!')
        }

    }

    if(redirect){
        return <Navigate to={"/"}/>
    }

    return(
        <div className="signup-form">
        <form action="" onSubmit={sendLoginDetails}>
            <div className="email-input">
            <input type="email" className="input-box" onChange={data=>setEmail(data.target.value)} />
            <i className="fi fi-rr-at input-icon"></i>
            </div>
            <div className="password-input" onChange={data=>setPassword(data.target.value)}>
            {
                passwordVisible ? 
                <input type="text" className="input-box" />
                :
                <input type="password" className="input-box" />
            }
            <i className="fi fi-ss-lock input-icon"></i>
            {
                passwordVisible ? 
                <i className="fi fi-sr-eye eye-icon clicker" onClick={()=>setPasswordVisible(currentVal=>!currentVal)}></i>
                :
                <i className="fi fi-sr-eye-crossed eye-icon clicker" onClick={()=>setPasswordVisible(currentVal=>!currentVal)}></i>

            }
            </div>

                    <button type="submit" className="auth-sign-up">Sign In</button>
                    <div>
                    <hr className="mb-5" />
                    <p className="sign-up-alt-link">Not a member?  
                        <a className="underline  relative" href="/signin "> Sign up here!</a>
                    </p>
                    </div>
        </form>
    </div>
    )
}

export default Signin