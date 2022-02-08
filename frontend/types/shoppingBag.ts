import { CommonProps } from "./common";
import { ProductInterface } from "./product";
import { PromocodeInterface } from "./promocode";

export interface ShoppingBagInterface extends Omit<CommonProps, 'slug'> {
    products: ProductInterface[];
    promocode?: PromocodeInterface;
}