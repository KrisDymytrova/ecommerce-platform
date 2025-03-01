import * as React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { User } from "../../../../shared/types/User";
import { getAuthHeaders } from "../../utils/authUtils";
import { getApiUrl } from "../../../../shared/apiConfig";
import { userValidationSchema } from "../../utils/validationsSchemas/userValidation";

const EditUser: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id && !user) {
            fetchUser(id);
        }
    }, [id, user]);

    const fetchUser = async (id: string) => {
        try {
            const API_URL = await getApiUrl();
            const response = await axios.get(`${API_URL}/admin/users/${id}`, { headers: getAuthHeaders() });
            setUser(response.data);
        } catch (err) {
            console.error("Error fetching user:", err);  // Логирование ошибки
            setError("User could not be loaded.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (values: { name: string; email: string; role: string }) => {
        if (!id) return;

        try {
            const API_URL = await getApiUrl();
            await axios.put(
                `${API_URL}/admin/users/${id}`,
                { name: values.name, email: values.email, role: values.role },
                { headers: getAuthHeaders() }
            );
            navigate("/users");
        } catch (err) {
            setError("Failed to update user.");
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
                validationSchema={userValidationSchema}
                onSubmit={handleSave}
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
        </div>
    );
};

export default EditUser;
