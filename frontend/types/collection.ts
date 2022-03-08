import { CommonProps } from "./common";
import { Image } from './image';
import { ProductInterface } from "./product";

export interface CollectionInterface extends CommonProps {
    description: string;
    season: string;
    preview: Image;
    products: ProductInterface[];
}
