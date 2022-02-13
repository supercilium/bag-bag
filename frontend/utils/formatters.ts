export const formatSum = (sum: number, currency: string) =>
    sum && `${sum.toLocaleString("ru")} ${currency}`;

export const getActualSum = (sum: number, discount?: number) =>
    discount ? sum - sum * 0.01 * discount : sum;