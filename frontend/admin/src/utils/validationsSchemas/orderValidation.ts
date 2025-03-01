import * as Yup from "yup";

export const orderValidationSchema = Yup.object({
    status: Yup.string().oneOf(["pending", "completed", "shipped", "cancelled"]).required("Status is required."),
});
