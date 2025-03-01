import * as React from 'react';
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationRegisterForm } from "../../utils/validationsSchemas/validationRegisterForm";
import { Eye, EyeOff } from "lucide-react";

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="container mx-auto flex justify-center items-center pt-16 pb-16">
            <div className="w-[400px] border p-8 rounded-lg shadow-md space-y-6">
                <h1 className="text-3xl font-semibold text-center">Sign Up</h1>

                <Formik
                    initialValues={{ username: "", email: "", password: "" }}
                    validationSchema={validationRegisterForm}
                    onSubmit={(values) => {
                        console.log("Register Data:", values);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Username</label>
                                <Field
                                    type="text"
                                    name="name"
                                    className="w-full border px-4 py-2 rounded-md focus:ring focus:ring-gray-300"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

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
                                {isSubmitting ? "Creating account..." : "Sign Up"}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="text-sm text-center text-gray-600">
                    Already have an account? <a href="/frontend/admin/src/components/Login" className="text-black font-semibold">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
