import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../shared/redux/store';
import { fetchCategoryById, updateCategoryAction } from '../../../../shared/redux/slices/categoriesSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { categoryValidationSchema } from '../../utils/validationsSchemas/categoryValidation';
import { Category } from '../../../../shared/types/category';
import Snackbar from '../../../../shared/components/UI/Snackbar';

const EditCategory: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        const fetchCategory = async () => {
            if (id) {
                try {
                    const actionResult = await dispatch(fetchCategoryById(id));
                    if (fetchCategoryById.fulfilled.match(actionResult)) {
                        setCategory(actionResult.payload);
                    } else {
                        setError('Category not found');
                    }
                } catch (err) {
                    setError('Category not found');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCategory();
    }, [id, dispatch]);

    const handleSave = async (values: { name: string; image: string }) => {
        if (!id) return;

        try {
            const actionResult = await dispatch(updateCategoryAction({ id, name: values.name, image: values.image }));

            if (updateCategoryAction.fulfilled.match(actionResult)) {
                setSnackbarMessage("Category updated successfully");
                setSnackbarType("success");
                setSnackbarOpen(true);
                setTimeout(() => navigate("/categories"), 1000);
            } else {
                setSnackbarMessage("Failed to update category.");
                setSnackbarType("error");
                setSnackbarOpen(true);
            }
        } catch (err) {
            setSnackbarMessage("Failed to update category.");
            setSnackbarType("error");
            setSnackbarOpen(true);
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

            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                type={snackbarType}
            />
        </div>
    );
};

export default EditCategory;
