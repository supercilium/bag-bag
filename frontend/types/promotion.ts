import { CommonProps } from "./common";
import { ProductInterface } from "./product";
import { Image } from './image'

export interface PromotionInterface extends CommonProps {
    products: ProductInterface[];
    banner: Image;
    title?: string;
}
