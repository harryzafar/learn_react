import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Signup() {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // for navigation

    // Validation schema
    const validationSchema = Yup.object({
        name: Yup.string()
            .max(50, "Name should not be more than 50 characters")
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    // Formik configuration
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(
                    'http://localhost/tools_new/api/auth/register',
                    values
                );
                if (response.data.status === 'success') {

                    // 2. Check for tokens and user data
                    const { access_token, refresh_token} = response.data.authorisation;
                    const user = response.data.user;
                    if( access_token && refresh_token && user) {
                        // 3. Save tokens and user data to localStorage
                        localStorage.setItem('token', access_token);
                        localStorage.setItem('refresh_token', refresh_token);
                        localStorage.setItem('user', JSON.stringify(user));
                    }
                    // 4. Redirect to home or login page
                    navigate('/home');
                    
                } else {
                    setErrorMessage(response.data.message || 'Registration failed');
                }

            } catch (error) {
                if (error.status === 422) {
                    // Handle validation errors
                    const errors = error.response?.data?.errors || {};
                    setErrorMessage(Object.values(errors).flat().join(', '));
                }
                else {
                    // Handle other errors
                    setErrorMessage(error.message || 'An error occurred during registration');
                }
            }
        },
    });

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="login_wrapper p-4 border rounded shadow-sm">
                        <h2 className="text-center mb-4">Register</h2>
                        {errorMessage && (
                            <div className="alert alert-danger">{errorMessage}</div>
                        )}
                        <form onSubmit={formik.handleSubmit} noValidate>
                            <div className="form-group mb-3">
                                <label htmlFor="name">Username</label>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div className="invalid-feedback">{formik.errors.name}</div>
                                )}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="invalid-feedback">{formik.errors.email}</div>
                                )}
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="invalid-feedback">{formik.errors.password}</div>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Sign Up
                            </button>
                            <div className="text-center mt-3">
                                <span className="text-muted">Already have an account? <Link to="/">Login</Link></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
