import { CommonProps } from './common';
import { ProductInterface } from './product';

export interface ShoppingBagInterface extends Omit<CommonProps, 'slug'> {
    products: ProductInterface[];
}
