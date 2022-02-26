import { GetServerSideProps } from "next";
import Head from "next/head";
import get from "lodash-es/get";
import pick from "lodash-es/pick";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Item } from "../../components/Item";
import { Filters } from "../../types/common";
import { ProductInterface } from "../../types/product";
import { getProducts } from "../../utils/api";
import {
  CatalogueGrid,
  CatalogueItem,
  FiltersRow,
  SortBy,
  FiltersForm,
  FiltersRoot,
  SelectedFilters,
} from "../../styles/pages/Catalogue.styles";
import { GRID_TEMPLATES } from "../../constants/catalogueGridTemplate";
import { StyledHeader } from "../../styles/layout";

export interface FilterObjInterface {
  "brand-id"?: string | string[];
  "category-id"?: string | string[];
  condition: string | string[];
  price_gte?: string | string[];
  price_lte?: string | string[];
  _sort?: string | string[];
}

export type OpenedFilter =
  | "brand"
  | "category"
  | "condition"
  | "price"
  | "sort";

const QUERY_KEYS: Array<keyof FilterObjInterface> = [
  "brand-id",
  "category-id",
  "condition",
  "price_gte",
  "price_lte",
  "_sort",
];

export const SORT_OPTIONS = {
  "created_at:DESC": "По новизне",
  "views:DESC": "По популярности",
  "price:ASC": "Цена по возрастанию",
  "price:DESC": "Цена по убыванию",
};

const Catalogue: FC<{ products: ProductInterface[]; filters: Filters }> = ({
  products,
  filters,
}) => {
  const { query, isFallback, push } = useRouter();
  const [openedFilter, setOpenedFilter] = useState<OpenedFilter>(null);
  const { register, handleSubmit, reset, watch, setValue, resetField } =
    useForm<FilterObjInterface>({
      shouldFocusError: false,
      defaultValues: {
        "brand-id": query?.["brand.id"] || null,
        "category-id": query?.["category.id"] || null,
        condition: query.condition || "",
        price_gte: query.price_gte || null,
        price_lte: query.price_lte || null,
        _sort: query._sort || "views:DESC",
      },
    });

  useEffect(() => {
    // https://stackoverflow.com/a/64307087/15152568
    // TODO make util
    reset({
      "brand-id": query?.["brand.id"] || null,
      "category-id": query?.["category.id"] || null,
      condition: query.condition || "",
      price_gte: query.price_gte || null,
      price_lte: query.price_lte || null,
      _sort: query._sort || "views:DESC",
    });
  }, [query, reset]);

  const onSubmit: SubmitHandler<FilterObjInterface> = useCallback(
    (values) => {
      const query = QUERY_KEYS.reduce((acc, key) => {
        const value = get(values, key);

        if (value) {
          // претендент в номинации костыль года
          // use-form преобразует ключи вида brand.id=1 в объекты  brand: { id: 1 },
          // что криво вставляется в query
          // кастомизировать эндпоинт или ставить qs не хочется
          return `${acc ? acc + "&" : acc}${key.replace("-", ".")}=${value}`;
        }
        return acc;
      }, "");

      push(
        {
          pathname: "/catalogue",
          query: query?.length > 0 ? query : "",
        },
        undefined
        // { shallow: true }
      );
      setOpenedFilter(null);
    },
    [push]
  );

  if (isFallback) {
    return <div>Loading category...</div>;
  }

  const values = watch();

  return (
    <div>
      <Head>
        <title>Каталог (ex)bags</title>
      </Head>
      <div className="container m32">
        <StyledHeader>
          <h1>
            каталог <span>catalog</span>
          </h1>
        </StyledHeader>

        <FiltersRoot>
          <FiltersRow>
            {/* TODO make buttons */}
            <div onClick={() => setOpenedFilter("condition")}>Все</div>
            <div onClick={() => setOpenedFilter("category")}>тип</div>
            <div onClick={() => setOpenedFilter("brand")}>бренд</div>
            <div onClick={() => setOpenedFilter("price")}>цена</div>
            <SortBy onClick={() => setOpenedFilter("sort")}>
              <span>сортировать по:</span>
              {
                SORT_OPTIONS[
                  Array.isArray(values._sort) ? values._sort[0] : values._sort
                ]
              }
            </SortBy>
          </FiltersRow>
          {openedFilter && (
            <FiltersForm onSubmit={handleSubmit(onSubmit)}>
              {openedFilter === "condition" && (
                <select {...register("condition")}>
                  <option value="">Все</option>
                  <option value="ex">(ex)</option>
                  <option value="new">new</option>
                </select>
              )}
              {openedFilter === "brand" && (
                <select {...register("brand-id")}>
                  {filters?.brands?.map(({ name, id }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              )}
              {openedFilter === "category" && (
                <select {...register("category-id")}>
                  <option key="all" value="">
                    Все категории
                  </option>
                  {filters?.categories?.map(({ name, id }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              )}
              {openedFilter === "price" && (
                <>
                  <input type="number" {...register("price_gte")} />
                  <input type="number" {...register("price_lte")} />
                </>
              )}
              {openedFilter === "sort" && (
                <select {...register("_sort")}>
                  {Object.keys(SORT_OPTIONS).map((item) => (
                    <option key={item} value={item}>
                      {SORT_OPTIONS[item]}
                    </option>
                  ))}
                </select>
              )}
              <button>submit</button>
            </FiltersForm>
          )}
        </FiltersRoot>
        {!openedFilter && Object.keys(values).length > 0 && (
          <SelectedFilters>
            {Object.keys(pick(values, "brand-id", "category-id")).map((item) =>
              values[item] ? (
                <button
                  onClick={() => setValue(item as keyof FilterObjInterface, "")}
                  key={item}
                >
                  {
                    (item === "brand-id"
                      ? filters?.brands
                      : filters?.categories
                    )?.find(({ id }) => id == values[item])?.name
                  }
                </button>
              ) : null
            )}
            {values.condition && (
              <button onClick={() => setValue("condition", "")}>
                {values.condition}
              </button>
            )}
            {values.price_gte && values.price_lte && (
              <button
                onClick={() => {
                  setValue("price_gte", "");
                  setValue("price_lte", "");
                }}
              >{`${values.price_gte} - ${values.price_lte}`}</button>
            )}
          </SelectedFilters>
        )}
        <CatalogueGrid>
          {products.map((item, i) => (
            <CatalogueItem key={item.id} $gridArea={GRID_TEMPLATES[i]}>
              <Item {...item} />
            </CatalogueItem>
          ))}
        </CatalogueGrid>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const products = await getProducts(ctx.query);
  return { props: { products } };
};

export default Catalogue;
