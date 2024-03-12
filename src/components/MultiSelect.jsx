import { Select } from "chakra-react-select";

export const MultiSelect = ({ options, controlProps }) => {
  return (
    <Select placeholder='Ingredient'
      size="lg"
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
