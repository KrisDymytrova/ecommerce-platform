import * as React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Order } from "../../../../shared/types/Order";
import { getAuthHeaders } from "../../utils/authUtils";
import { getApiUrl } from "../../../../shared/apiConfig";
import { orderValidationSchema } from "../../utils/validationsSchemas/orderValidation";

const EditOrder: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchOrder(id);
        }
    }, [id]);

    const fetchOrder = async (id: string) => {
        try {
            const API_URL = await getApiUrl();
            const response = await axios.get(`${API_URL}/orders/${id}`, { headers: getAuthHeaders() });
            setOrder(response.data);
        } catch (err) {
            setError("The order could not be loaded.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (values: { status: string }) => {
        if (!id) return;

        try {
            const API_URL = await getApiUrl();
            await axios.put(
                `${API_URL}/admin/orders/${id}`,
                { status: values.status },
                { headers: getAuthHeaders() }
            );
            navigate("/orders");
        } catch (err) {
            setError("Failed to update order.");
        }
    };

    if (loading) return <p>Loading order...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!order) return <p className="text-red-500">Order not found</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Edit Order</h2>
            <Formik
                initialValues={{ status: order.status }}
                validationSchema={orderValidationSchema} // Используйте соответствующую схему для валидации статуса
                onSubmit={handleSave}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label className="block">Status</label>
                            <Field
                                as="select"
                                name="status"
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="shipped">Shipped</option>
                                <option value="cancelled">Cancelled</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
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

export default EditOrder;
