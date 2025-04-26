import { Link } from "react-router";
function Signup() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="login_wrapper">
                        <h2 className="text-center">Registration</h2>
                        <form action="">
                        <div className="form-group mt-2">
                                <label htmlFor="email" className="form-label">
                                    Username
                                </label>
                                <input type="text" className="form-control" id="username" />
                            </div>
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
                              <button className="btn btn-primary">Signup</button>
                            </div>
                            <span className="text-muted">Already Have an account <Link to={'/'}>Login</Link></span>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Signup;
