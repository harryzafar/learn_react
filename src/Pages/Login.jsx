import { useState } from "react";
import { Link } from "react-router";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!email || !password){
            console.log('not ready to submit')
            return ;
        }
        console.log('submitting with',{username, password});


    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="login_wrapper">
                        <h2 className="text-center">Login</h2>
                        <form  onSubmit={handleSubmit} >
                            <div className="form-group mt-2">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input type="text" className="form-control" id="email" />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input type="password" className="form-control" id="password" />
                            </div>
                            <div className="form-group mt-3">
                              <button className="btn btn-primary">Login</button>
                            </div>
                            <span className="text-muted">Don't Have an account <Link to={'/registration'}>Registration</Link></span>
                            
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
export default Login;
