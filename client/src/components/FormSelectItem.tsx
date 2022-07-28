import React from "react";
import Wrapper from "../assets/wrappers/FormItem";

interface FormSelectItemProps {
  options: string[];
  name: string;
  labelText?: string;
  dontLabel?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormSelectItem: React.FC<FormSelectItemProps> = ({
  name,
  labelText,
  onChange,
  options,
  value,
  dontLabel,
}) => {
  return (
    <Wrapper>
      <label htmlFor={name} className="formLabel">
        {dontLabel ? "" : labelText ? labelText : name}
      </label>
      <select
        name={name}
        id={name}
        className="formInput"
        onChange={onChange}
        value={value}
      >
        {options.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </Wrapper>
  );
};

export default FormSelectItem;
