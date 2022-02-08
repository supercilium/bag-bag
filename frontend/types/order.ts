import { CommonProps } from "./common";
import { ProductInterface } from "./product";
import { PromocodeInterface } from "./promocode";

export interface OrderInterface extends Omit<CommonProps, 'slug'> {
    products: ProductInterface[];
    status: "new" | "paid" | "processing" | "delivering" | "declined";
    total: number;
    paymentMethod: 'cash' | 'card';
    promocode?: PromocodeInterface;
}