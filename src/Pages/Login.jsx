import { Link } from "react-router";

function Login() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="login_wrapper">
                        <h2 className="text-center">Login</h2>
                        <form action="/home">
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
