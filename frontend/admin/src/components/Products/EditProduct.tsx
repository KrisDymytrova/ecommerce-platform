import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../shared/redux/store';
import { fetchProductById, updateProductAction } from '../../../../shared/redux/slices/productsSlice';
import { fetchCategories } from '../../../../shared/redux/slices/categoriesSlice';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { productValidationSchema } from '../../utils/validationsSchemas/productValidation';
import { Product } from '../../../../shared/types/product';
import { Category } from '../../../../shared/types/Category';
import Snackbar from '../../../../shared/components/UI/Snackbar';

const EditProduct: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const actionResult = await dispatch(fetchProductById(id));
                    if (fetchProductById.fulfilled.match(actionResult)) {
                        setProduct(actionResult.payload);
                    } else {
                        setError('Product not found');
                    }
                } catch (err) {
                    setError('Product not found');
                } finally {
                    setLoading(false);
                }
            }
        };

        const fetchCategoriesData = async () => {
            try {
                const actionResult = await dispatch(fetchCategories());
                if (fetchCategories.fulfilled.match(actionResult)) {
                    setCategories(actionResult.payload);
                } else {
                    setError('Failed to load categories.');
                }
            } catch (err) {
                setError('Failed to load categories.');
            }
        };

        fetchProduct();
        fetchCategoriesData();
    }, [id, dispatch]);

    const handleSave = async (values: { title: string; price: number; description: string; category: string; images: string[] }) => {
        if (!id) return;

        try {
            const actionResult = await dispatch(updateProductAction({
                id,
                title: values.title,
                price: values.price,
                description: values.description,
                categoryId: values.category,
                images: values.images,
            }));

            if (updateProductAction.fulfilled.match(actionResult)) {
                setSnackbarMessage("Product updated successfully");
                setSnackbarType("success");
                setSnackbarOpen(true);
                setTimeout(() => navigate("/products"), 1000);
            } else {
                setSnackbarMessage("Failed to update product.");
                setSnackbarType("error");
                setSnackbarOpen(true);
            }
        } catch (err) {
            setSnackbarMessage("Failed to update product.");
            setSnackbarType("error");
            setSnackbarOpen(true);
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
                                                        <FaTrash size={16} />
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

            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                type={snackbarType}
            />
        </div>
    );
};

export default EditProduct;
