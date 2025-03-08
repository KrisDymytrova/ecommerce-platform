import * as Yup from 'yup';
import { OrderStatus } from '../../../../shared/types/Order';

export const orderValidationSchema = Yup.object({
    status: Yup.string()
        .oneOf(Object.values(OrderStatus))
        .required("Status is required."),
});
