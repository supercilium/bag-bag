import { CommonProps, Dimension } from "./common";
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
    dimension: Dimension;
    year: number;
}
