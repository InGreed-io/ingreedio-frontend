import { Select } from "chakra-react-select";

export const SingleSelect = ({ options, controlProps }) => {
  return (
    <Select placeholder='Category'
      selectedOptionStyle="check"
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
