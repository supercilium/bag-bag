import { getStrapiMedia } from "../utils/medias";
import NextImage, { ImageProps } from "next/image";
import { FC } from "react";

interface NextImageProps extends Partial<ImageProps> {
  media?: {
    url: string;
    alternativeText: string;
    width: number;
    height: number;
  };
}

const Image: FC<NextImageProps> = ({ media, ...props }) => {
  if (!media) {
    return <NextImage {...(props as ImageProps)} />;
  }

  const { url, alternativeText } = media;

  const loader = ({ src }) => {
    return getStrapiMedia(src);
  };

  return (
    <NextImage
      loader={loader}
      layout={props.layout || "responsive"}
      objectFit={props.objectFit || "contain"}
      width={media.width}
      height={media.height}
      src={url}
      alt={alternativeText || ""}
    />
  );
};

export default Image;
