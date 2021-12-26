export const formatSum = (sum: number, currency: string) =>
    sum && `${sum.toLocaleString("ru")} ${currency}`;
