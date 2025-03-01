import * as React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Category } from "../../../../shared/types/Category";
import { getAuthHeaders } from "../../utils/authUtils";
import { getApiUrl } from "../../../../shared/apiConfig";
import { categoryValidationSchema } from "../../utils/validationsSchemas/categoryValidation";

const EditCategory: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            // Используем асинхронную функцию внутри useEffect
            const fetchData = async () => {
                try {
                    const API_URL = await getApiUrl();
                    const response = await axios.get(`${API_URL}/categories/${id}`, {
                        headers: getAuthHeaders(),
                    });
                    setCategory(response.data);
                } catch (err) {
                    setError("The category could not be loaded");
                } finally {
                    setLoading(false);
                }
            };

            fetchData(); // Вызываем асинхронную функцию
        }
    }, [id]); // Зависимость от id

    const handleSave = async (values: { name: string; image: string }) => {
        if (!id) return;

        try {
            const API_URL = await getApiUrl();
            await axios.put(
                `${API_URL}/admin/categories/${id}`,
                { name: values.name, image: values.image },
                { headers: getAuthHeaders() }
            );
            navigate("/categories");
        } catch (err) {
            setError("Failed to update category.");
        }
    };

    if (loading) return <p>Loading category...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!category) return <p className="text-red-500">Category not found</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
            <Formik
                initialValues={{ name: category.name, image: category.image }}
                validationSchema={categoryValidationSchema}
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
                            <label className="block">URL Image</label>
                            <Field
                                type="text"
                                name="image"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
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

export default EditCategory;
