import { useCallback, useEffect, useMemo, useState } from "react";
import get from "lodash-es/get";
// import debounce from "lodash-es/debounce";
import { useDimensions } from "../../hooks/useDimensions";
import { size } from "../../styles/constants";
import {
  BrandsFilters,
  CatalogButton,
  CatalogFieldset,
  FilterButtons,
  FiltersForm,
  FiltersRoot,
  FiltersRow,
  InputField,
  KeyTitle,
  LabelCondition,
  LaptopSubmitButton,
  MobileSubmitButton,
  PriceRow,
  SelectedFilters,
  SortBy,
  SortFieldset,
} from "./Filters.styles";
import Arrow from "../icons/arrow-simple-right.svg";
import Check from "../icons/check-outline.svg";
import Close from "../icons/close.svg";
import { Button } from "../Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Filters } from "../../types/common";
import {
  ButtonBack,
  MobileMenuRoot,
  SubMenu,
} from "../MobileMenu/MobileMenu.styles";
import { MenuIcon } from "../MenuIcon";
import { MenuItem } from "../MobileMenu/components";
import pick from "lodash-es/pick";
import { formatSum } from "../../utils/formatters";

export interface FiltersProps {
  filters: Filters;
}

export type OpenedFilter =
  | "brand"
  | "category"
  | "condition"
  | "price"
  | "sort";

export const SORT_OPTIONS = {
  "created_at:DESC": "По новизне",
  "views:DESC": "По популярности",
  "price:ASC": "Цена по возрастанию",
  "price:DESC": "Цена по убыванию",
};

export interface FilterObjInterface {
  "brand-id"?: string | string[];
  "category-id"?: string | string[];
  condition: string | string[];
  price_gte?: string | string[];
  price_lte?: string | string[];
  _sort?: string | string[];
}

const QUERY_KEYS: Array<keyof FilterObjInterface> = [
  "brand-id",
  "category-id",
  "condition",
  "price_gte",
  "price_lte",
  "_sort",
];

export const FiltersMenu: React.FC<FiltersProps> = ({ filters }) => {
  const { width } = useDimensions();
  const { query, push } = useRouter();
  const [openedMenu, setOpenedMenu] = useState<"filters" | "sort">(null);
  const [openedFilter, setOpenedFilter] = useState<OpenedFilter>(null);
  const { register, handleSubmit, reset, watch, setValue } =
    useForm<FilterObjInterface>({
      shouldFocusError: false,
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
      setOpenedMenu(null);
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

  // const handleSubmitByDebounce = useCallback(
  //   debounce((values) => onSubmit(values), 300),
  //   [onSubmit]
  // );

  const values = watch();
  const isWideScreen = width > size.laptopL;

  // useEffect(() => {
  //   if (isWideScreen) {
  //     handleSubmitByDebounce(values);
  //   }
  // }, [
  //   values["brand-id"],
  //   values["category-id"],
  //   values._sort,
  //   values.condition,
  //   isWideScreen,
  // ]);

  const handleDeleteFilterClick = (item: keyof FilterObjInterface) => {
    onSubmit({ ...values, [item]: null });
  };

  useEffect(() => {
    if (!isWideScreen) {
      document.getElementById("layout").style.overflow = !!openedMenu
        ? "hidden"
        : "unset";
    }
  }, [isWideScreen, openedMenu]);

  return (
    <>
      <FiltersRoot>
        {isWideScreen ? (
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
        ) : (
          <FilterButtons>
            <Button
              type="button"
              onClick={() => setOpenedMenu("filters")}
              $size="s"
            >
              фильтры
            </Button>
            <Button
              type="button"
              onClick={() => setOpenedMenu("sort")}
              $size="s"
            >
              сортировка
            </Button>
          </FilterButtons>
        )}

        {(openedFilter || openedMenu) && (
          <FiltersForm onSubmit={handleSubmit(onSubmit)}>
            {isWideScreen ? (
              <>
                {openedFilter === "condition" && (
                  <CatalogFieldset>
                    <LabelCondition $selected={!values.condition}>
                      Все
                      <input value="" type="radio" {...register("condition")} />
                    </LabelCondition>
                    <LabelCondition $selected={values.condition === "ex"}>
                      (ex)
                      <input
                        value="ex"
                        type="radio"
                        {...register("condition")}
                      />
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
                      {!values["category-id"] && (
                        <Check height="22" width="22" />
                      )}
                      Все категории
                      <input
                        value=""
                        type="radio"
                        {...register("category-id")}
                      />
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
                      <LabelCondition
                        key={key}
                        $selected={values._sort === key}
                      >
                        {values._sort === key && (
                          <Check height="22" width="22" />
                        )}
                        {SORT_OPTIONS[key]}
                        <input
                          value={key}
                          type="radio"
                          {...register("_sort")}
                        />
                      </LabelCondition>
                    ))}
                  </SortFieldset>
                )}
              </>
            ) : (
              <>
                {openedMenu && (
                  <MenuIcon
                    isOpen={!!openedMenu}
                    onClick={() => setOpenedMenu(null)}
                    style={{ zIndex: 12, backgroundColor: "#fff" }}
                  />
                )}
                <MobileMenuRoot
                  $isOpen={!!openedMenu}
                  $screenWidth={width}
                  $isOpenSubMenu={!!openedFilter}
                >
                  <menu>
                    <div>
                      {openedMenu === "filters" && (
                        <>
                          <MenuItem
                            onClick={() => setOpenedFilter("condition")}
                          >
                            Все
                          </MenuItem>
                          <MenuItem onClick={() => setOpenedFilter("category")}>
                            Тип
                          </MenuItem>
                          <MenuItem onClick={() => setOpenedFilter("brand")}>
                            Бренд
                          </MenuItem>
                          <MenuItem onClick={() => setOpenedFilter("price")}>
                            Цена
                          </MenuItem>
                        </>
                      )}
                      {openedMenu === "sort" && (
                        <SortFieldset>
                          {Object.keys(SORT_OPTIONS).map((key) => (
                            <LabelCondition
                              key={key}
                              $selected={values._sort === key}
                            >
                              {values._sort === key && (
                                <Check height="22" width="22" />
                              )}
                              {SORT_OPTIONS[key]}
                              <input
                                value={key}
                                type="radio"
                                {...register("_sort")}
                              />
                            </LabelCondition>
                          ))}
                        </SortFieldset>
                      )}
                    </div>
                    <SubMenu
                      style={{
                        transform: `translateX(${openedFilter ? -width : 0}px)`,
                        display: "block",
                      }}
                    >
                      <ButtonBack
                        type="button"
                        onClick={() => setOpenedFilter(null)}
                      >
                        <Arrow />
                        Назад
                      </ButtonBack>

                      <div>
                        {openedFilter === "condition" && (
                          <CatalogFieldset>
                            <LabelCondition $selected={!values.condition}>
                              Все
                              <input
                                value=""
                                type="radio"
                                {...register("condition")}
                              />
                            </LabelCondition>
                            <LabelCondition
                              $selected={values.condition === "ex"}
                            >
                              (ex)
                              <input
                                value="ex"
                                type="radio"
                                {...register("condition")}
                              />
                            </LabelCondition>
                            <LabelCondition
                              $selected={values.condition === "new"}
                            >
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
                                  {filtersByAlphabet?.[key]?.map(
                                    ({ name, id }) => (
                                      <LabelCondition
                                        key={id}
                                        $selected={
                                          values["brand-id"] === "" + id
                                        }
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
                                    )
                                  )}
                                </CatalogFieldset>
                              </div>
                            ))}
                          </BrandsFilters>
                        )}
                        {openedFilter === "category" && (
                          <CatalogFieldset>
                            <LabelCondition $selected={!values["category-id"]}>
                              {!values["category-id"] && (
                                <Check height="22" width="22" />
                              )}
                              Все категории
                              <input
                                value=""
                                type="radio"
                                {...register("category-id")}
                              />
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
                          </PriceRow>
                        )}
                        {openedFilter === "sort" && (
                          <SortFieldset>
                            {Object.keys(SORT_OPTIONS).map((key) => (
                              <LabelCondition
                                key={key}
                                $selected={values._sort === key}
                              >
                                {values._sort === key && (
                                  <Check height="22" width="22" />
                                )}
                                {SORT_OPTIONS[key]}
                                <input
                                  value={key}
                                  type="radio"
                                  {...register("_sort")}
                                />
                              </LabelCondition>
                            ))}
                          </SortFieldset>
                        )}
                      </div>
                    </SubMenu>
                  </menu>
                </MobileMenuRoot>
                {(openedFilter || openedMenu === "sort") && (
                  <MobileSubmitButton $size="s" type="submit">
                    показать
                  </MobileSubmitButton>
                )}
              </>
            )}
            {openedFilter && openedFilter !== "price" && (
              <LaptopSubmitButton>
                <Button $size="s" type="submit">
                  показать
                </Button>
              </LaptopSubmitButton>
            )}
          </FiltersForm>
        )}
      </FiltersRoot>
      {!openedFilter && Object.keys(values).length > 0 && (
        <SelectedFilters>
          {Object.keys(pick(values, "brand-id", "category-id")).map((item) =>
            values[item] ? (
              <button
                onClick={() =>
                  handleDeleteFilterClick(item as keyof FilterObjInterface)
                }
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
            <button onClick={() => handleDeleteFilterClick("condition")}>
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
    </>
  );
};
