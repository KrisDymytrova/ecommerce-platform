import * as React from 'react';
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationLoginForm } from "../../../shared/utils/validationsSchemas/validationLoginForm";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../../shared/apiConfig";

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [tokenError, setTokenError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (accessToken || refreshToken) {
            setTokenError("You are already logged in.");
        }
    }, []);

    const handleLogin = async (values: { email: string, password: string }) => {
        try {
            const API_URL = await getApiUrl();
            console.log('API URL for the request:', API_URL);
            const response = await axios.post(`${API_URL}/admin/auth/login`, values);

            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            navigate("/dashboard");
        } catch (error) {
            console.error("Authorization error:", error.response ? error.response.data : error);
            setErrorMessage("Invalid email or password.");
        }
    };

    return (
        <div className="container mx-auto flex justify-center items-center pt-16 pb-16">
            <div className="w-[400px] border p-8 rounded-lg shadow-md space-y-6">
                <h1 className="text-3xl font-semibold text-center">Sign In</h1>

                {tokenError && (
                    <div className="bg-yellow-100 text-yellow-600 p-2 rounded-md text-center">
                        {tokenError}
                    </div>
                )}

                {errorMessage && (
                    <div className="bg-red-100 text-red-600 p-2 rounded-md text-center">
                        {errorMessage}
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
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Signing in..." : "Sign In"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
