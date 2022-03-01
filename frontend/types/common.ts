export interface CommonProps {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface Filters {
    brands: CommonProps[];
    categories: CommonProps[];
    collections: CommonProps[];
}

export interface ErrorRequest {
    error: string;
    message: string;
    statusCode: number;
}