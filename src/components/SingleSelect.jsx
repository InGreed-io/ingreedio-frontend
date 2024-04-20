import { Select } from "chakra-react-select";

export const SingleSelect = ({ options, controlProps, onChange, value, defaultValue, name }) => {
  return (
    <Select
      aria-label="Select"
      selectedOptionStyle="check"
      defaultValue={defaultValue}
      value={value}
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
