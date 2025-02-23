import Signup from '../components/Signup.components'
import Signin from './Signin.components'

const AuthCheck = ({ type }) =>{
    return(
        <div className="auth-check-main">
                <h1 className="text-4xl font-dm mt-20 md:ml-14 mr-20 mb-8">
                    {type == "signin" ? "Welcome back!" : "Sign up today!"}
                </h1>
                {
                    type !== "signin"?
                  <Signup /> : <Signin />
                }

        </div>
    )
}

export default AuthCheck