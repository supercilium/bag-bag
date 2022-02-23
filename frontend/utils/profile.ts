import { DefaultTheme } from "styled-components";
import { ORDER_STATUSES_GREEN, ORDER_STATUSES_RED } from "../constants/order";
import { OrderInterface } from "../types/order";

export const getStatusColor = (
    status: OrderInterface["status"]
): keyof DefaultTheme["colors"] => {
    if (ORDER_STATUSES_RED.includes(status)) {
        return "red";
    }
    if (ORDER_STATUSES_GREEN.includes(status)) {
        return "green";
    }
    return "grey2";
};