import React, { forwardRef, ReactNode, useState } from "react";
import { SelectBlock, DropDownIcon } from "./Select.styles";
import ReactSelect, {
  Styles,
  IndicatorProps,
  components,
  Props,
} from "react-select";
import { THEME } from "../../styles/theme";

export interface SelectProps
  extends Props<{ value: string; label: string }, false, never> {
  error?: ReactNode;
}
const customStyles: Styles<any, false> = {
  control: (styles, state) => ({
    ...styles,
    border: "none",
    borderBottom: `1px solid ${THEME.colors.grey2}`,
    borderRadius: 0,
    height: "6.3rem",
    outline: "none",
    boxShadow: "none",
    borderColor: THEME.colors.grey2,

    "&:hover": {
      borderColor: THEME.colors.grey2,
    },
  }),
  option: (styles) => {
    return {
      ...styles,
      backgroundColor: "transparent",
      color: THEME.colors.black,
      fontSize: "18px",
    };
  },
  placeholder: (styles) => ({
    ...styles,
    border: "none",
    color: THEME.colors.grey2,
    fontWeight: 400,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: THEME.colors.black,
    border: "none",
  }),
  valueContainer: (styles) => ({
    ...styles,
    lineHeight: "27px",
    fontSize: "18px",
    paddingLeft: 0,
    paddingRight: 0,
  }),
  menu: (styles) => ({
    ...styles,
    border: `1px solid ${THEME.colors.grey2}`,
    boxShadow: "unset",
  }),
};

export const DropdownIndicator = (props: IndicatorProps<any, false>) => (
  <components.DropdownIndicator {...props}>
    <DropDownIcon $isOpen={props.innerProps.isFocusedArrow} />
  </components.DropdownIndicator>
);

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, label, ...props }, ref) => {
    const [isFocusedArrow, setIsFocusedArrow] = useState(false);
    return (
      <SelectBlock>
        {label && <label>{label}</label>}
        <ReactSelect
          styles={customStyles}
          components={{
            DropdownIndicator: (props) => (
              <DropdownIndicator
                {...props}
                innerProps={{
                  ...props.innerProps,
                  isFocusedArrow: isFocusedArrow,
                }}
              />
            ),
            IndicatorSeparator: null,
          }}
          isSearchable={false}
          blurInputOnSelect={true}
          onMenuClose={() => setIsFocusedArrow(false)}
          onMenuOpen={() => setIsFocusedArrow(true)}
          {...props}
        />
        {error && <div>{error}</div>}
      </SelectBlock>
    );
  }
);
