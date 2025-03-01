import * as React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../shared/redux/store';
import { addCategory } from '../../../../shared/redux/slices/categoriesSlice';
import { categoryValidationSchema } from '../../utils/validationsSchemas/categoryValidation';

const CreateCategory: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleCreate = async (values: { name: string; image: string }) => {
        try {
            const resultAction = await dispatch(addCategory(values)).unwrap();
            console.log('Category created:', resultAction);
            navigate('/categories');
        } catch (error) {
            console.error('Error creating category:', error);
            alert('Failed to create category. Please try again.');
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
        </div>
    );
};

export default CreateCategory;

