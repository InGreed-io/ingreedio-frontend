import { Select } from "chakra-react-select";

export const MultiSelect = ({ options, controlProps, onChange, defaultValue, name }) => {
  return (
    <Select placeholder='Ingredient'
      size="lg"
      name={name}
      defaultValue={defaultValue}
      onChange={onChange}
      isMulti
      options={options}
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
