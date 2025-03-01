import * as Yup from "yup";

export const userValidationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    role: Yup.string().oneOf(["user", "admin"], "Invalid role").required("Role is required"),
});
