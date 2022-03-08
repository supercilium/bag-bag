import { BreadcrumbsRoot, BreadcrumbsItem } from "./Breadcrumbs.styles";

export interface BreadcrumbsProps {
  items: {
    title: string;
    active: boolean;
  }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <BreadcrumbsRoot>
      {items.map((item, i) => (
        <BreadcrumbsItem key={item.title} $active={item.active}>
          {`${i + 1}. ${item.title}`}
        </BreadcrumbsItem>
      ))}
    </BreadcrumbsRoot>
  );
};
