export interface User {
    _id: string;
    email: string;
    username: string;
    role: string;
    createdAt: string;
}

export interface UsersState {
    items: User[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    currentUser: User | null;
}