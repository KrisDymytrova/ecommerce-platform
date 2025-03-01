import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from "../../../src/components/UI/Table";
import Button from "../../../src/components/UI/Button";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../../../shared/redux/slices/productsSlice';
import { RootState, AppDispatch } from '../../../../shared/redux/store';
import { getAuthHeaders } from '../../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from "../../../../shared/apiConfig";
import ConfirmationModal from "../../../../shared/components/UI/ConfirmationModal";

const ProductTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { items: products, status, error } = useSelector((state: RootState) => state.products);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    const handleDelete = async () => {
        if (!selectedProductId) return;
        try {
            await dispatch(deleteProduct(selectedProductId));
        } catch (error) {
            alert("Error deleting the product");
        } finally {
            setIsModalOpen(false);
            setSelectedProductId(null);
        }
    };

    const openDeleteModal = (id: string) => {
        setSelectedProductId(id);
        setIsModalOpen(true);
    };

    const handleEdit = (id: string) => {
        navigate(`/products/edit/${id}`);
    };

    // Удален handleCreate

    if (status === 'loading') return <p>Loading products...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Products</h2>
            <div className="mb-4">
                <Button variant="primary" size="sm" onClick={() => navigate('/products/create')}>
                    Create Product
                </Button>
            </div>
            <Table>
                <thead>
                <tr className="bg-gray-100 text-center">
                    <th className="p-3">ID</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Image</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product._id} className="border-b">
                        <td className="p-3 text-gray-600">{product._id}</td>
                        <td className="p-3 text-gray-600">{product.title}</td>
                        <td className="p-3 flex justify-center items-center">
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-12 h-12 object-cover rounded"
                            />
                        </td>
                        <td className="p-3 text-gray-600">${product.price}</td>
                        <td className="flex gap-2 p-3 justify-center">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(product._id)}>
                                Edit
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => openDeleteModal(product._id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this product?"
            />
        </div>
    );
};

export default ProductTable;

