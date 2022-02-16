import { CommonProps } from "./common"
import { ProductInterface } from "./product"
import { PromocodeInterface } from "./promocode"

export interface OrderInterface extends Omit<CommonProps, "slug"> {
    products: ProductInterface[]
    status: "new" | "paid" | "processing" | "pending_issuance" | "delivering" | "return" | "cancelled" | "done"
    total: number
    paymentMethod: "cash" | "card"
    promocode?: PromocodeInterface
    shippingMethod: 'pickup' | 'shipping'
    discount?: number
    delivery_cost?: number
}
