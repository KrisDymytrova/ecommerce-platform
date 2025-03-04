import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../shared/redux/store';
import { addUser } from '../../../../shared/redux/slices/usersSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createUserValidationSchema } from '../../utils/validationsSchemas/userValidation';
import Snackbar from '../../../../shared/components/UI/Snackbar';

const CreateUser: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');

    const handleCreate = async (values: { email: string; username: string; password: string; role: string }) => {
        try {
            const actionResult = await dispatch(addUser(values));

            if (addUser.fulfilled.match(actionResult)) {
                console.log('✅ User created:', actionResult.payload);

                setSnackbarMessage('User created successfully!');
                setSnackbarType('success');
                setSnackbarOpen(true);

                setTimeout(() => navigate('/users'), 1000);
            } else {
                console.error('❌ Ошибка при добавлении пользователя:', actionResult.error.message);

                setSnackbarMessage('Failed to create user. Please try again.');
                setSnackbarType('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('❌ Ошибка при добавлении пользователя:', error);

            setSnackbarMessage('Failed to create user. Please try again.');
            setSnackbarType('error');
            setSnackbarOpen(true);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create User</h2>

            <Formik
                initialValues={{
                    email: '',
                    username: '',
                    password: '',
                    role: 'user',
                }}
                validationSchema={createUserValidationSchema}
                onSubmit={handleCreate}
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
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
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

            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                type={snackbarType}
            />
        </div>
    );
};

export default CreateUser;
