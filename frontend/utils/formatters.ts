import { ProductInterface } from "../types/product";

export const formatSum = (sum: number, currency: string) =>
    typeof sum === 'number' && `${sum.toLocaleString("ru")} ${currency}`;

export const getActualSum = (sum: number, discount?: number) =>
    discount ? sum - sum * 0.01 * discount : sum;

export const formatDate = (date: string) =>
    new Date(date).toLocaleString('ru', {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

export const formatDimensions = ({ product_width,
    product_height,
    product_length, }: ProductInterface) => `${product_length} х ${product_width} х ${product_height}`