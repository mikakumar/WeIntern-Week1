import { useState } from 'react'

const Signup = () =>{

    async function sendRegisterDetails(data){
        data.preventDefault();
        try{
            console.log(data);
            const response = await fetch('http://localhost:3000/back/api/signup', {
                method: 'POST',
                body: JSON.stringify({fullname, email, password}),    
                headers: {'Content-Type': 'application/json'}
            });
            if(response.status===200){
                alert('Registration successful!');
            }
            else{
                alert('Registration failed. Please try again');
            }
        }
        catch(error){
            alert('Registration failed. Please try again');
        }


    }

    const[fullname, setFullname] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false)

    return(
        <div className="signup-form">
        <form action="" onSubmit={sendRegisterDetails}>
            <div className="name-input">
            <input type="text" className="input-box font-mark" placeholder="Full Name" onChange={data=>setFullname(data.target.value)}/>
            <i className="fi fi-rr-user input-icon"></i>
            </div>
            <div className="email-input">
            <input type="email" className="input-box font-mark"
            placeholder="Email"
            onChange={data=>setEmail(data.target.value)} />
            <i className="fi fi-rr-at input-icon"></i>
            </div>
            <div className="password-input">
            {
                passwordVisible ? 
                <input type="text" className="input-box font-mark" placeholder="Password" />
                :
                <input type="password" className="input-box font-mark" placeholder="Password" onChange={data=>setPassword(data.target.value)} />
            }
            <i className="fi fi-ss-lock input-icon"></i>
            {
                passwordVisible ? 
                <i className="fi fi-sr-eye eye-icon clicker" onClick={()=>setPasswordVisible(currentVal=>!currentVal)}></i>
                :
                <i className="fi fi-sr-eye-crossed eye-icon clicker" onClick={()=>setPasswordVisible(currentVal=>!currentVal)}></i>

            }
            </div>
                    <button type="submit" className="auth-sign-in">Sign Up</button>
        </form>
        <hr className="mb-5" />
                    <p className="sign-in-alt-link">Already a member?   
                        <a className="underline  relative" href="/signin "> Sign in here!</a>
                    </p>
    </div>
    )
}

export default Signup