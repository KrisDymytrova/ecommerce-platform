import * as React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from "../../../../shared/types/User";
import { getAuthHeaders } from "../../utils/authUtils";
import { getApiUrl } from "../../../../shared/apiConfig";
import { userValidationSchema } from "../../utils/validationsSchemas/userValidation";

const CreateUser: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const { email, username, role } = values;

        const newUser = {
            email,
            username,
            role,
        };

        try {
            const API_URL = await getApiUrl();
            await axios.post(`${API_URL}/admin/users/create-user`, newUser, {
                headers: getAuthHeaders(),
            });
            navigate('/users');  // Перенаправляем на страницу списка пользователей
        } catch (err) {
            console.error("Error creating the user", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create User</h2>

            <Formik
                initialValues={{
                    email: '',
                    username: '',
                    role: 'user', // Устанавливаем роль по умолчанию
                }}
                validationSchema={userValidationSchema} // Используем схему валидации для пользователя
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700">Username</label>
                            <Field
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="role" className="block text-gray-700">Role</label>
                            <Field
                                as="select"
                                id="role"
                                name="role"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Field>
                            <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Save User"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateUser;
