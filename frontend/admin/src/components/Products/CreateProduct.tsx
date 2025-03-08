import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../shared/redux/store';
import { addProduct } from '../../../../shared/redux/slices/productsSlice';
import { fetchCategories } from '../../../../shared/redux/slices/categoriesSlice';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { productValidationSchema } from '../../utils/validationsSchemas/productValidation';
import { Category } from '../../../../shared/types/Category';
import Snackbar from '../../../../shared/components/UI/Snackbar';

const CreateProduct: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState<"success" | "error">("success");

    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                const actionResult = await dispatch(fetchCategories());
                if (fetchCategories.fulfilled.match(actionResult)) {
                    setCategories(actionResult.payload);
                } else {
                    setError("Failed to load categories.");
                }
            } catch (err) {
                setError("Failed to load categories.");
            }
        };

        fetchCategoriesData();
    }, [dispatch]);

    const handleSubmit = async (
        values: { title: string; price: number; description: string; category: string; images: string[] },
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        const { title, price, description, category, images } = values;

        try {
            const actionResult = await dispatch(
                addProduct({
                    title,
                    price,
                    description,
                    categoryId: category,
                    images
                })
            );

            if (addProduct.fulfilled.match(actionResult)) {
                setSnackbarMessage("Product created successfully");
                setSnackbarType("success");
                setSnackbarOpen(true);
                navigate("/products");
            } else {
                setSnackbarMessage("Failed to create product.");
                setSnackbarType("error");
                setSnackbarOpen(true);
            }
        } catch (err) {
            setSnackbarMessage("Error creating product.");
            setSnackbarType("error");
            setSnackbarOpen(true);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create Product</h2>

            <Formik
                initialValues={{
                    title: "",
                    price: 0,
                    description: "",
                    category: "",
                    images: [] as string[],
                }}
                validationSchema={productValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label className="block">Title</label>
                            <Field type="text" name="title" className="w-full p-2 border border-gray-300 rounded" />
                            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label className="block">Price</label>
                            <Field type="number" name="price" className="w-full p-2 border border-gray-300 rounded" />
                            <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label className="block">Description</label>
                            <Field as="textarea" name="description" className="w-full p-2 border border-gray-300 rounded" />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label className="block">Category</label>
                            <Field as="select" name="category" className="w-full p-2 border border-gray-300 rounded">
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label className="block">Images</label>
                            <FieldArray name="images">
                                {({ push, remove }) => (
                                    <div>
                                        {values.images.map((_, index) => (
                                            <div key={index} className="flex items-center mb-2">
                                                <Field type="text" name={`images[${index}]`} className="w-3/4 p-2 border border-gray-300 rounded" />
                                                <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">
                                                    <FaTrash size={16} />
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => push("")} className="text-blue-500">
                                            Add Image
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md">
                            {isSubmitting ? "Saving..." : "Save Product"}
                        </button>
                    </Form>
                )}
            </Formik>

            <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} type={snackbarType} />
        </div>
    );
};

export default CreateProduct;
