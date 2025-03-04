import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../shared/redux/store';
import { addCategory } from '../../../../shared/redux/slices/categoriesSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { categoryValidationSchema } from '../../utils/validationsSchemas/categoryValidation';
import Snackbar from '../../../../shared/components/UI/Snackbar';

const CreateCategory: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');

    const handleCreate = async (values: { name: string; image: string }) => {
        try {
            const actionResult = await dispatch(addCategory(values));
            if (addCategory.fulfilled.match(actionResult)) {
                setSnackbarMessage('Category created successfully');
                setSnackbarType('success');
                setSnackbarOpen(true);
                setTimeout(() => navigate('/categories'), 1000);
            } else {
                setSnackbarMessage('Failed to create category.');
                setSnackbarType('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            setSnackbarMessage('Failed to create category.');
            setSnackbarType('error');
            setSnackbarOpen(true);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
            <Formik
                initialValues={{ name: '', image: '' }}
                validationSchema={categoryValidationSchema}
                onSubmit={handleCreate}
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
                            {isSubmitting ? 'Saving...' : 'Save Category'}
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

export default CreateCategory;
