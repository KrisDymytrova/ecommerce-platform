export interface Category {
    _id: string;
    name: string;
    image: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface CategoriesState {
    items: Category[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    currentCategory: Category | null;
}
