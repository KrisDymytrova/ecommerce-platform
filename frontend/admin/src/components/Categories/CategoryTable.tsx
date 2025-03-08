import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../shared/redux/store';
import { fetchCategories, deleteCategoryAction } from '../../../../shared/redux/slices/categoriesSlice';
import Table from '../../../src/components/UI/Table';
import Button from '../../../src/components/UI/Button';
import ConfirmationModal from '../../../../shared/components/UI/ConfirmationModal';
import Snackbar from '../../../../shared/components/UI/Snackbar';
import SearchBar from '../../../../shared/components/UI/SearchBar';

const CategoryTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { items: categories, status, error } = useSelector((state: RootState) => state.categories);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const isFetched = useRef(false);

    useEffect(() => {
        if (!isFetched.current && status === 'idle') {
            dispatch(fetchCategories());
            isFetched.current = true;
        }
    }, [dispatch, status]);

    const handleCreate = () => {
        navigate('/categories/create-category');
    };

    const handleEdit = (id: string) => {
        navigate(`/categories/edit/${id}`);
    };

    const handleDelete = async () => {
        if (!selectedCategoryId || isDeleting) return;
        setIsDeleting(true);

        try {
            await dispatch(deleteCategoryAction(selectedCategoryId)).unwrap();
            setSnackbarMessage('Category deleted successfully');
            setSnackbarType('success');
            setOpenSnackbar(true);
        } catch (error) {
            setSnackbarMessage('Error deleting the category');
            setSnackbarType('error');
            setOpenSnackbar(true);
        } finally {
            setIsModalOpen(false);
            setSelectedCategoryId(null);
            setIsDeleting(false);
        }
    };

    const openDeleteModal = (id: string) => {
        setSelectedCategoryId(id);
        setIsModalOpen(true);
    };

    const filteredCategories = categories.filter((category) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            category.name.toLowerCase().includes(searchLower) ||
            category._id.toLowerCase().includes(searchLower)
        );
    });

    if (status === 'loading') return <p>Loading categories...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>

            <div className="flex justify-between mb-4">
                <Button variant="primary" size="sm" onClick={handleCreate}>
                    Create Category
                </Button>
                <SearchBar setSearchQuery={setSearchQuery} />
            </div>

            <Table>
                <thead>
                <tr className="bg-gray-100 text-center">
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Image</th>
                    <th className="p-3">Created At</th>
                    <th className="p-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <tr key={category._id} className="border-b">
                            <td className="p-3 text-gray-600">{category._id}</td>
                            <td className="p-3 text-gray-600">{category.name}</td>
                            <td className="p-3 flex justify-center items-center">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-12 h-12 object-cover rounded"
                                />
                            </td>
                            <td className="p-3 text-gray-600">
                                {new Date(category.createdAt).toLocaleDateString()}
                            </td>
                            <td className="flex gap-2 p-3 justify-center">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(category._id)}>
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => openDeleteModal(category._id)}
                                    disabled={isDeleting}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="p-3 text-center text-gray-600">
                            No categories found.
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this category?"
            />

            <Snackbar
                key={snackbarMessage}
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
                type={snackbarType}
            />
        </div>
    );
};

export default CategoryTable;
