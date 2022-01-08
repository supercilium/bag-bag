import { CommonProps } from "./common";

export interface CommonImageProps {
    ext: string;
    hash: string;
    height: number;
    mime: string;
    name: string;
    path: string;
    size: number;
    url: string;
    width: number;
}

export type Formats = 'medium' | 'small' | 'thumbnail';

export interface Image extends CommonProps {
    alternativeText: string;
    caption: string;
    ext: string;
    hash: string;
    height: number;
    mime: string;
    previewUrl: string;
    provider: string;
    provider_metadata: string;
    size: number;
    url: string;
    width: number;
    formats: Record<Formats, CommonImageProps>
}