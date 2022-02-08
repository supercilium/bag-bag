import { CommonProps } from "./common"

export interface PromocodeInterface extends Omit<CommonProps, "slug"> {
    code: string
    validTill: string
    discount: number
}
