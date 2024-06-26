import { Select } from "chakra-react-select";

export const MultiSelect = ({ placeholder, options, controlProps, onChange, value, defaultValue, name }) => {
  return (
    <Select
      placeholder={placeholder}
      size="lg"
      name={name}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      isMulti
      options={options}
      aria-label="Multi select"
      chakraStyles={{
        downChevron: (provided) => ({
          ...provided,
          display: "none",
        }),
        multiValue: (provided) => ({
          ...provided,
          borderRadius: "full",
          background: "brand.white",
        }),
        clearIndicator: (provided) => ({
          ...provided,
          display: "none",
        }),
        valueContainer: (provided) => ({
          ...provided,
        }),
        control: (provided) => ({
          ...provided,
          ...controlProps
        }),
      }}
    />
  );
};
