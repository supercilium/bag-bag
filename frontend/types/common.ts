import { Image } from './image';
export interface CommonProps {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface CategoryInterface extends CommonProps {
    preview: Image;
}

export interface Filters {
    brands: CommonProps[];
    categories: CategoryInterface[];
    collections: CommonProps[];
}

export interface ErrorRequest {
    error: string;
    message: string;
    statusCode: number;
}