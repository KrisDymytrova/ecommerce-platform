import * as Yup from "yup";

export const categoryValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    image: Yup.string().url("Invalid URL").required("Image URL is required"),
});
