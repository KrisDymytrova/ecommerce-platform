import * as Yup from 'yup';

export const createUserValidationSchema = Yup.object().shape({
    username: Yup.string().min(2, "Username must be at least 2 characters").required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
    role: Yup.string().oneOf(["user", "admin"], "Invalid role").required("Role is required"),
});

export const editUserValidationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Username must be at least 2 characters").required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    role: Yup.string().oneOf(["user", "admin"], "Invalid role").required("Role is required"),
});
