import { Link, useNavigate } from "react-router-dom"; // assuming React Router v6+
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

function Login() {
     const navigate = useNavigate();
     const [errorMessage, setErrorMessage] = useState('');
    // Define validation schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(4, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
           
            try{
                const response  = await axios.post('http://localhost/tools_new/api/auth/login', values);
                  // Save token to localStorage
                localStorage.setItem('token', response.data.authorisation.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                 // Redirect to dashboard or home
                navigate('/home');
            }
            catch (error){
                setErrorMessage(error.message);

            }


        }
    });

  

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="login_wrapper mt-5">
                        <h2 className="text-center">Login</h2>
                          {errorMessage && (
                            <div className="alert alert-danger">{errorMessage}</div>
                        )}
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group mt-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="invalid-feedback">{formik.errors.email}</div>
                                )}
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="invalid-feedback">{formik.errors.password}</div>
                                )}
                            </div>

                            <div className="form-group mt-3">
                                <button type="submit" className="btn btn-primary w-100" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? 'Logging In...' : 'Login'}
                                </button>
                            </div>

                            <div className="text-center mt-3">
                                <span className="text-muted">
                                    Don't have an account? <Link to="/registration">Register</Link>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
