import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../shared/redux/store';
import { fetchProducts, deleteProductAction } from '../../../../shared/redux/slices/productsSlice';
import Table from '../../../src/components/UI/Table';
import Button from '../../../src/components/UI/Button';
import ConfirmationModal from '../../../../shared/components/UI/ConfirmationModal';
import Snackbar from '../../../../shared/components/UI/Snackbar';
import SearchBar from '../../../../shared/components/UI/SearchBar';

const ProductTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { items: products, status, error } = useSelector((state: RootState) => state.products);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    const handleDelete = async () => {
        if (!selectedProductId || isDeleting) return;
        setIsDeleting(true);

        try {
            await dispatch(deleteProductAction(selectedProductId));
            setSnackbarMessage('Product deleted successfully');
            setSnackbarType('success');
            setOpenSnackbar(true);
        } catch (error: any) {
            setSnackbarMessage('Error deleting the product');
            setSnackbarType('error');
            setOpenSnackbar(true);
        } finally {
            setIsModalOpen(false);
            setSelectedProductId(null);
            setIsDeleting(false);
        }
    };

    const openDeleteModal = (id: string) => {
        setSelectedProductId(id);
        setIsModalOpen(true);
    };

    const handleEdit = (id: string) => {
        navigate(`/products/edit/${id}`);
    };

    const filteredProducts = products.filter((product) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            product.title.toLowerCase().includes(searchLower) ||
            product._id.toLowerCase().includes(searchLower)
        );
    });

    if (status === 'loading') return <p>Loading products...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Products</h2>

            <div className="flex justify-between mb-4">
                <Button variant="primary" size="sm" onClick={() => navigate('/products/create-product')}>
                    Create Product
                </Button>
                <SearchBar setSearchQuery={setSearchQuery} />
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
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
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
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="p-3 text-center text-gray-600">
                            No products found.
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this product?"
            />

            <Snackbar
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
                type={snackbarType}
            />
        </div>
    );
};

export default ProductTable;
