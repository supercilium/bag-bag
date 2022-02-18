import { CommonProps } from "./common";
import { Image } from './image';

export interface ProductInterface extends CommonProps {
    title: string;
    brand: CommonProps;
    category: CommonProps;
    description: string;
    discount?: number;
    images: Image[];
    price: number;
    condition: "ex" | "new";
    status: "published" | "draft";
    color: CommonProps;
    product_width: number;
    product_height: number;
    product_length: number;
    year: number;
}
