import { OrderInterface } from "./order";
import { ShoppingBagInterface } from "./shoppingBag";

export interface User {
    id?: number;
    name: string;
    last_name?: string;
    email: string;
    orders?: OrderInterface[];
    shopping_bag?: number | ShoppingBagInterface;
    phone?: string;
    address?: string;
}

export interface AuthResponse {
    jwt: string;
    user: User;
}