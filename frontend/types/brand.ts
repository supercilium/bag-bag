import { CommonProps } from "./common";
import { Image } from "./image";

export interface Brand extends CommonProps {
    preview: Image['formats'];
}

export interface BrandWithCount extends Brand {
    products: number;
}