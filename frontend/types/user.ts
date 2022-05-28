import { OrderInterface } from "./order";
import { ProductInterface } from "./product";
import { ShoppingBagInterface } from "./shoppingBag";

export interface User {
    id?: number;
    last_name?: string;
    email: string;
    orders?: OrderInterface[];
    shopping_bag?: ShoppingBagInterface;
    phone?: string;
    address?: string;
    favorites?: ProductInterface[];
}

export interface AuthResponse {
    jwt: string;
    user: User;
    message?: Array<{ messages: Array<Record<string, string>> }>
}