export interface CommonProps {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface Dimension {
    width: number;
    height: number;
    lgth: number;
}

export interface Filters {
    brands: CommonProps[];
    categories: CommonProps[];
}