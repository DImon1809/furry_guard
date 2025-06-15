import React from "react";
import type { GroupBase, StylesConfig } from "react-select";
import Select from "react-select";

export type Option = {
  value: string;
  label: string;
};

type Props = {
  id?: string;
  options: Option[];
  onChange?: (val: Option) => void;
  placeholder?: string;
  defaultValue?: Option;
};

const selectorStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  control: (base, state) => ({
    ...base,
    borderRadius: "8px",
    borderColor: "#0000001a",
    boxShadow: state.isFocused
      ? "0 1px 2px 0 rgb(0 0 0 / 0.05), 0 0 0 2px rgba(164, 164, 175, 0.5), 0 0 0 3px rgba(164, 164, 175, 0.5)"
      : "0px 0px 2.5px 0px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      borderColor: "#0000001a",
    },
    minHeight: "40px",
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: "4px",
  }),
  indicatorSeparator: base => ({
    ...base,
    margin: "4px 0",
  }),
  valueContainer: base => ({
    ...base,
    padding: "0 8px",
  }),
  placeholder: base => ({
    ...base,
    fontSize: "14px",
    margin: 0,
  }),
  option: (base, state) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

    return {
      ...base,
      backgroundColor: !isMobile && state.isFocused ? "#0000002a" : "white",
      color: "black",
      cursor: "pointer",
      padding: "8px 12px",
      "&:active": {
        backgroundColor: isMobile ? "white" : "#0000002a",
      },
    };
  },
  singleValue: base => ({
    ...base,
    color: "black",
    margin: 0,
  }),
  menu: base => ({
    ...base,
    borderRadius: "8px",
    overflow: "hidden",
    zIndex: 100,
    marginTop: "8px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }),
  menuList: base => ({
    ...base,
    padding: 0,
  }),
  menuPortal: base => ({
    ...base,
    zIndex: 100,
  }),
};

export const CustomSelector = ({ id, options, placeholder, defaultValue, onChange }: Props) => {
  const [selectedOption, setSelectedOption] = React.useState<Option | null>(
    defaultValue ? defaultValue : null,
  );

  return (
    <Select
      id={id}
      styles={selectorStyles}
      options={options}
      defaultValue={defaultValue}
      value={selectedOption}
      onChange={event => {
        const newValue = {
          label: event?.label || "",
          value: event?.value || "",
        };
        setSelectedOption(newValue);
        if (onChange) onChange(newValue);
      }}
      placeholder={placeholder}
      menuPlacement="auto"
      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
      menuPosition="fixed"
      menuShouldScrollIntoView={false}
      components={{
        IndicatorsContainer: ({ children, ...props }) => (
          <div {...props.innerProps} style={{ padding: "0 8px" }}>
            {children}
          </div>
        ),
      }}
    />
  );
};
