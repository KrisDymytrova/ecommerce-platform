import * as Yup from "yup";

export const productValidationSchema = Yup.object({
    title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title cannot be longer than 100 characters")
        .required("Title is required"),

    price: Yup.number()
        .positive("Price must be a positive number")
        .required("Price is required")
        .typeError("Price must be a number"),

    description: Yup.string()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description cannot be longer than 500 characters")
        .required("Description is required"),

    category: Yup.string()
        .required("Category is required")
        .uuid("Invalid category ID"),

    images: Yup.array()
        .of(Yup.string().url("Each image must be a valid URL"))
        .min(1, "At least one image is required")
        .max(5, "You can add a maximum of 5 images")
});
