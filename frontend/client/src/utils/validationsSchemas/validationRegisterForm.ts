import * as Yup from "yup";

export const validationRegisterForm = Yup.object({
    username: Yup.string().required("Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Password is required"),
});
