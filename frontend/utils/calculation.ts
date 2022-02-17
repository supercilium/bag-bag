import { ProductInterface } from "../types/product";

export const getTotalSumAndDiscount = (products: ProductInterface[]) => products?.reduce<[number, number]>(
    (sum, item) => {
        sum[0] = sum[0] + item.price;
        sum[1] = sum[1] + item.discount * 0.01 * item.price;
        return sum;
    },
    [0, 0]
) || [0, 0]