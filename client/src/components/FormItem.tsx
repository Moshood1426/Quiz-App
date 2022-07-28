import React from "react";
import Wrapper from "../assets/wrappers/FormItem";

interface FormItemProps {
  name: string;
  placeholder: string;
  type: string;
  value: string;
  label?: boolean;
  labelText?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormItem: React.FC<FormItemProps> = ({
  label,
  labelText,
  name,
  placeholder,
  type,
  value,
  onChange,
}) => {
  return (
    <Wrapper>
      {label && (
        <label htmlFor={name} className="formLabel">
          {labelText ? labelText : name}
        </label>
      )}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className="formInput"
        placeholder={placeholder ? placeholder : name}
      />
    </Wrapper>
  );
};

export default FormItem;
