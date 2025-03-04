import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../shared/redux/store';
import { fetchUserById, updateUserAction } from '../../../../shared/redux/slices/usersSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { editUserValidationSchema } from '../../utils/validationsSchemas/userValidation';
import { User } from '../../../../shared/types/User';
import Snackbar from '../../../../shared/components/UI/Snackbar';

const EditUser: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                try {
                    const actionResult = await dispatch(fetchUserById(id));
                    if (fetchUserById.fulfilled.match(actionResult)) {
                        setUser(actionResult.payload);
                    } else {
                        setError('User not found');
                    }
                } catch (err) {
                    setError('User could not be loaded.');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUser();
    }, [id, dispatch]);

    const handleSave = async (values: { name: string; email: string; role: string; }) => {
        if (!id) return;

        try {
            const actionResult = await dispatch(updateUserAction({
                id,
                email: values.email,
                username: values.name,
                role: values.role,
            }));

            if (updateUserAction.fulfilled.match(actionResult)) {
                setSnackbarMessage("User updated successfully");
                setSnackbarType("success");
                setSnackbarOpen(true);
                setTimeout(() => navigate("/users"), 1000);
            } else {
                setSnackbarMessage("Error updating user");
                setSnackbarType("error");
                setSnackbarOpen(true);
            }
        } catch (err) {
            setSnackbarMessage("Error updating user");
            setSnackbarType("error");
            setSnackbarOpen(true);
        }
    };

    if (loading) return <p>Loading user...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!user) return <p className="text-red-500">User not found</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <Formik
                initialValues={{ name: user.username, email: user.email, role: user.role }}
                validationSchema={editUserValidationSchema}
                onSubmit={handleSave}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label className="block">Name</label>
                            <Field
                                type="text"
                                name="name"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="mb-4">
                            <label className="block">Email</label>
                            <Field
                                type="email"
                                name="email"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="mb-4">
                            <label className="block">Role</label>
                            <Field
                                as="select"
                                name="role"
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Field>
                            <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
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

export default EditUser;
