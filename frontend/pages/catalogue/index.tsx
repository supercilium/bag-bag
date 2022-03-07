import { GetServerSideProps } from "next";
import Head from "next/head";
import get from "lodash-es/get";
import pick from "lodash-es/pick";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
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
  CatalogButton,
  CatalogFieldset,
  LabelCondition,
  InputField,
  PriceRow,
  BrandsFilters,
  KeyTitle,
  SortFieldset,
} from "../../styles/pages/Catalogue.styles";
import { GRID_TEMPLATES } from "../../constants/catalogueGridTemplate";
import { StyledHeader } from "../../styles/layout";
import Arrow from "../../components/icons/arrow-simple-right.svg";
import Check from "../../components/icons/check-outline.svg";
import Close from "../../components/icons/close.svg";
import { Button } from "../../components/Button";
import { debounce } from "lodash-es";
import { formatSum } from "../../utils/formatters";

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
  const { register, handleSubmit, reset, watch, setValue } =
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

  const filtersByAlphabet = useMemo(
    () =>
      filters.brands.reduce((acc, item) => {
        const firstLetter = item.name[0].toLowerCase();
        if (acc[firstLetter]) {
          acc[firstLetter] = [...acc[firstLetter], item];
        } else {
          acc[firstLetter] = [item];
        }
        return acc;
      }, {}),
    [filters.brands]
  );

  const handleSubmitByDebounce = useCallback(
    debounce((values) => onSubmit(values), 300),
    [onSubmit]
  );

  const values = watch();

  useEffect(() => {
    handleSubmitByDebounce(values);
  }, [
    values["brand-id"],
    values["category-id"],
    values._sort,
    values.condition,
  ]);

  if (isFallback) {
    return <div>Loading category...</div>;
  }

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
            <CatalogButton
              $isOpen={openedFilter === "condition"}
              onClick={() =>
                setOpenedFilter((prev) =>
                  prev === "condition" ? null : "condition"
                )
              }
            >
              Все <Arrow height="22" width="22" />
            </CatalogButton>
            <CatalogButton
              $isOpen={openedFilter === "category"}
              onClick={() =>
                setOpenedFilter((prev) =>
                  prev === "category" ? null : "category"
                )
              }
            >
              тип
              <Arrow height="22" width="22" />
            </CatalogButton>
            <CatalogButton
              $isOpen={openedFilter === "brand"}
              onClick={() =>
                setOpenedFilter((prev) => (prev === "brand" ? null : "brand"))
              }
            >
              бренд
              <Arrow height="22" width="22" />
            </CatalogButton>
            <CatalogButton
              $isOpen={openedFilter === "price"}
              onClick={() =>
                setOpenedFilter((prev) => (prev === "price" ? null : "price"))
              }
            >
              цена
              <Arrow height="22" width="22" />
            </CatalogButton>
            <SortBy
              $isOpen={openedFilter === "sort"}
              onClick={() =>
                setOpenedFilter((prev) => (prev === "sort" ? null : "sort"))
              }
            >
              <span>сортировать по:</span>
              {
                SORT_OPTIONS[
                  Array.isArray(values._sort) ? values._sort[0] : values._sort
                ]
              }
              <Arrow height="22" width="22" />
            </SortBy>
          </FiltersRow>
          {openedFilter && (
            <FiltersForm onSubmit={handleSubmit(onSubmit)}>
              {openedFilter === "condition" && (
                <CatalogFieldset>
                  <LabelCondition $selected={!values.condition}>
                    Все
                    <input value="" type="radio" {...register("condition")} />
                  </LabelCondition>
                  <LabelCondition $selected={values.condition === "ex"}>
                    (ex)
                    <input value="ex" type="radio" {...register("condition")} />
                  </LabelCondition>
                  <LabelCondition $selected={values.condition === "new"}>
                    new
                    <input
                      value="new"
                      type="radio"
                      {...register("condition")}
                    />
                  </LabelCondition>
                </CatalogFieldset>
              )}
              {openedFilter === "brand" && (
                <BrandsFilters>
                  {Object.keys(filtersByAlphabet).map((key) => (
                    <div key={key}>
                      <KeyTitle>{key}</KeyTitle>
                      <CatalogFieldset>
                        {filtersByAlphabet?.[key]?.map(({ name, id }) => (
                          <LabelCondition
                            key={id}
                            $selected={values["brand-id"] === "" + id}
                          >
                            {values["brand-id"] === "" + id && (
                              <Check height="22" width="22" />
                            )}
                            {name}
                            <input
                              value={id}
                              type="radio"
                              {...register("brand-id")}
                            />
                          </LabelCondition>
                        ))}
                      </CatalogFieldset>
                    </div>
                  ))}
                </BrandsFilters>
              )}
              {openedFilter === "category" && (
                <CatalogFieldset>
                  <LabelCondition $selected={!values["category-id"]}>
                    {!values["category-id"] && <Check height="22" width="22" />}
                    Все категории
                    <input value="" type="radio" {...register("category-id")} />
                  </LabelCondition>
                  {filters?.categories?.map(({ name, id }) => (
                    <LabelCondition
                      key={id}
                      $selected={values["category-id"] === "" + id}
                    >
                      {values["category-id"] === "" + id && (
                        <Check height="22" width="22" />
                      )}
                      {name}
                      <input
                        value={id}
                        type="radio"
                        {...register("category-id")}
                      />
                    </LabelCondition>
                  ))}
                </CatalogFieldset>
              )}
              {openedFilter === "price" && (
                <PriceRow>
                  <InputField>
                    От
                    <input
                      placeholder="35 000"
                      type="number"
                      {...register("price_gte")}
                    />
                  </InputField>
                  <InputField>
                    До
                    <input
                      placeholder="1 000 000"
                      type="number"
                      {...register("price_lte")}
                    />
                  </InputField>
                  <Button $size="s" type="submit">
                    показать
                  </Button>
                </PriceRow>
              )}
              {openedFilter === "sort" && (
                <SortFieldset>
                  {Object.keys(SORT_OPTIONS).map((key) => (
                    <LabelCondition key={key} $selected={values._sort === key}>
                      {values._sort === key && <Check height="22" width="22" />}
                      {SORT_OPTIONS[key]}
                      <input value={key} type="radio" {...register("_sort")} />
                    </LabelCondition>
                  ))}
                </SortFieldset>
              )}
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
                  <Close width="16" height="16" />
                </button>
              ) : null
            )}
            {values.condition && (
              <button onClick={() => setValue("condition", "")}>
                {values.condition}
                <Close width="16" height="16" />
              </button>
            )}
            {values.price_gte && values.price_lte && (
              <button
                onClick={() => {
                  onSubmit({ ...values, price_gte: null, price_lte: null });
                }}
              >
                {`${formatSum(+values.price_gte, "₽")} - ${formatSum(
                  +values.price_lte,
                  "₽"
                )}`}
                <Close width="16" height="16" />
              </button>
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
