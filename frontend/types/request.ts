import { ProductInterface } from "./product";

export interface RequestBagInterface {
    data: {
        commentary?: string;
        brand: number;
        model: string;
        condition: ProductInterface['condition'];
        price: number;
        status: 'new' | 'confirmed' | 'refused';
        name: string;
        email: string;
        phone: string;
    }
    files: {
        photo_serial_number: File;
        photo_logo: File;
        photo_inside: File;
        photo_front: File;
        photo_back: File;
        photo_side: File;
        photo_bottom: File;
        photo_fastener: File;
        photo_logo_inside: File;
        photo_damage?: File;
    }
}
