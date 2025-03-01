import * as React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { Product } from "../../../../shared/types/Product";
import { Category } from "../../../../shared/types/Category";
import { getAuthHeaders } from "../../utils/authUtils";
import { getApiUrl } from "../../../../shared/apiConfig";
import { productValidationSchema } from "../../utils/validationsSchemas/productValidation";

const EditProduct: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchProduct(id);
            fetchCategories();
        }
    }, [id]);

    const fetchProduct = async (id: string) => {
        try {
            const API_URL = await getApiUrl();
            const response = await axios.get(`${API_URL}/products/${id}`, { headers: getAuthHeaders() });
            setProduct(response.data);
        } catch (err) {
            setError("The product could not be loaded");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const API_URL = await getApiUrl();
            const response = await axios.get(`${API_URL}/categories`, { headers: getAuthHeaders() });
            setCategories(response.data);
        } catch (err) {
            setError("Failed to load categories.");
        }
    };

    const handleSave = async (values: { title: string; price: number; description: string; category: string; images: string[] }) => {
        if (!id) return;

        try {
            const API_URL = await getApiUrl();
            await axios.put(
                `${API_URL}/admin/products/${id}`,
                { title: values.title, price: values.price, description: values.description, category: values.category, images: values.images },
                { headers: getAuthHeaders() }
            );
            navigate("/admin/products");
        } catch (err) {
            setError("Failed to update product.");
        }
    };

    if (loading) return <p>Loading product...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!product) return <p className="text-red-500">Product not found</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <Formik
                initialValues={{
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    images: product.images,
                }}
                validationSchema={productValidationSchema}
                onSubmit={handleSave}
            >
                {({ values, isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label className="block">Title</label>
                            <Field
                                type="text"
                                name="title"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="mb-4">
                            <label className="block">Price</label>
                            <Field
                                type="number"
                                name="price"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="mb-4">
                            <label className="block">Description</label>
                            <Field
                                as="textarea"
                                name="description"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="mb-4">
                            <label className="block">Category</label>
                            <Field as="select" name="category" className="w-full p-2 border border-gray-300 rounded">
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="mb-4">
                            <label className="block">Images</label>
                            <FieldArray
                                name="images"
                                render={(arrayHelpers) => (
                                    <div>
                                        {values.images && values.images.length > 0 ? (
                                            values.images.map((image, index) => (
                                                <div key={index} className="flex items-center mb-2">
                                                    <Field
                                                        type="text"
                                                        name={`images[${index}]`}
                                                        className="w-3/4 p-2 border border-gray-300 rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => arrayHelpers.remove(index)}
                                                        className="ml-2 text-red-500"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No images added</p>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => arrayHelpers.push("")}
                                            className="text-blue-500"
                                        >
                                            Add Image
                                        </button>
                                    </div>
                                )}
                            />
                            <ErrorMessage name="images" component="div" className="text-red-500 text-sm" />
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

export default EditProduct;
