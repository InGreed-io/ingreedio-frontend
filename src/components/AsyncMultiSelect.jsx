import { AsyncSelect } from "chakra-react-select";

export const AsyncMultiSelect = ({ placeholder, controlProps, onChange, loadOptions, value, defaultValue, defaultOptions, name }) => {
  return (
    <AsyncSelect
      placeholder={placeholder}
      size="lg"
      name={name}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      isMulti
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
