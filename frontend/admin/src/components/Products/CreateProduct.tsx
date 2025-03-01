import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthHeaders } from '../../utils/authUtils';
import axios from 'axios';
import { getApiUrl } from "../../../../shared/apiConfig";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { productValidationSchema } from '../../utils/validationsSchemas/productValidation';

const CreateProduct: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const { title, price, description, category, images } = values;

        const newProduct = {
            title,
            price,
            description,
            category,
            images
        };

        try {
            const API_URL = await getApiUrl();
            await axios.post(`${API_URL}/admin/products`, newProduct, {
                headers: getAuthHeaders(),
            });
            navigate('/products');
        } catch (err) {
            console.error("Error creating the product", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create Product</h2>

            <Formik
                initialValues={{
                    title: '',
                    price: '',
                    description: '',
                    category: '',
                    images: []
                }}
                validationSchema={productValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values }) => (
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700">Product Title</label>
                            <Field
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Product Title"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="price" className="block text-gray-700">Price</label>
                            <Field
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Price"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700">Description</label>
                            <Field
                                as="textarea"
                                id="description"
                                name="description"
                                placeholder="Description"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="category" className="block text-gray-700">Category</label>
                            <Field
                                as="select"
                                id="category"
                                name="category"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select Category</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="home">Home</option>
                                <option value="beauty">Beauty</option>
                            </Field>
                            <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="images" className="block text-gray-700">Image URLs</label>
                            <Field
                                type="text"
                                id="images"
                                name="images"
                                placeholder="Image URLs (comma separated)"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <ErrorMessage name="images" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Save Product"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateProduct;
