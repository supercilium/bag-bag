import { OrderInterface } from "../types/order";

export const ORDER_DESCRIPTIONS: Record<OrderInterface['status'], string> = {
    new: "Ожидает оплаты",
    paid: "Готовится к отправке",
    processing: "Готовится к отправке",
    pending_issuance: "Ожидает выдачи",
    delivering: "Выдан курьеру",
    return: "Возврат",
    cancelled: "Отменен",
    done: "Выполнен",
}

export const ORDER_STATUSES_RED: OrderInterface['status'][] = ['cancelled', 'return']
export const ORDER_STATUSES_GREEN: OrderInterface['status'][] = ['done']

export const SHIPPING_METHODS: Record<OrderInterface['shippingMethod'], string> = {
    pickup: 'Самовывоз',
    shipping: 'Доставка курьером'
}

export const SHIPPING_ADDRESS = 'г. Москва, ул. Королева 20, к1, 2 этаж, 230 бутик';

export const DELIVERY_COST = 1200;