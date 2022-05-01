import { ProductInterface } from "./product";

export interface RequestBagInterface {
    data: {
        commentary?: string;
        brand: { value: number };
        model: string;
        condition: { value: ProductInterface['condition'] };
        price: number;
        status: 'new' | 'confirmed' | 'refused';
        name: string;
        email: string;
        phone: string;
    }
    files: {
        photo_serial_number: FileList;
        photo_logo: FileList;
        photo_inside: FileList;
        photo_front: FileList;
        photo_back: FileList;
        photo_side: FileList;
        photo_bottom: FileList;
        photo_fastener: FileList;
        photo_logo_inside: FileList;
        photo_damage?: FileList;
    }
}
