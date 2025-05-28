import React from "react";
import type { GroupBase, StylesConfig } from "react-select";
import Select from "react-select";

type Options = {
  value: string;
  label: string;
};

type Props = {
  id: string;
  options: Options[];
  onChange?: (val: Options) => void;
  placeholder: string;
};

const selectorStyles: StylesConfig<Options, false, GroupBase<Options>> = {
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
  }),
  placeholder: base => ({
    ...base,
    fontSize: "14px",
  }),
  option: (base, state) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

    return {
      ...base,
      backgroundColor: !isMobile && state.isFocused ? "#0000002a" : "white",
      color: "black",
      cursor: "pointer",
      "&:active": {
        backgroundColor: isMobile ? "white" : "#0000002a",
      },
    };
  },
  singleValue: base => ({
    ...base,
    color: "black",
  }),
  menu: base => ({
    ...base,
    borderRadius: "8px",
    overflow: "hidden",
    zIndex: 100,
  }),
  menuPortal: base => ({
    ...base,
    zIndex: 100,
  }),
};

export const CustomSelector = ({ id, options, placeholder, onChange }: Props) => {
  const [selectedOption, setSelectedOption] = React.useState<Options | null>(null);

  return (
    <Select
      id={id}
      styles={selectorStyles}
      options={options}
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
      menuShouldBlockScroll
    />
  );
};
