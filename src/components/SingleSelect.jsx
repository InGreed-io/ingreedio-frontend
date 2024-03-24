import { Select } from "chakra-react-select";

export const SingleSelect = ({ options, controlProps, onChange, defaultValue, name }) => {
  return (
    <Select
      aria-label="Select"
      selectedOptionStyle="check"
      defaultValue={defaultValue}
      name={name}
      onChange={onChange}
      size="lg"
      options={options}
      chakraStyles={{
        control: (provided) => ({
          ...provided,
          ...controlProps
        }),
      }}
    />
  );
};
