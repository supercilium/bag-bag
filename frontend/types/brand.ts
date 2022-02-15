import { CommonProps } from "./common";

export interface Brand extends CommonProps { }

export interface BrandWithCount extends CommonProps {
    products: number;
}