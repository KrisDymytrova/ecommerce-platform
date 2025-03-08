import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../shared/redux/store';
import { login } from '../../../shared/redux/slices/authSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validationLoginForm } from '../../../shared/utils/validationsSchemas/validationLoginForm';
import { Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { isAuthenticated, error, loading } = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (values: { email: string, password: string }) => {
        dispatch(login(values));
    };

    return (
        <div className="container mx-auto flex justify-center items-center pt-16 pb-16">
            <div className="w-[400px] border p-8 rounded-lg shadow-md space-y-6">
                <h1 className="text-3xl font-semibold text-center">Sign In</h1>

                {error && (
                    <div className="bg-red-100 text-red-600 p-2 rounded-md text-center">
                        {error}
                    </div>
                )}

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationLoginForm}
                    onSubmit={handleLogin}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="w-full border px-4 py-2 rounded-md focus:ring focus:ring-gray-300"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Password</label>
                                <div className="relative">
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="w-full border px-4 py-2 rounded-md focus:ring focus:ring-gray-300"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <button
                                type="submit"
                                className="button-dark block mx-auto"
                                disabled={isSubmitting || loading}
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
