import { FC, useState, ChangeEvent } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  initialValue?: string;
  onChange?: (newValue: string) => void;
  className?: string;
}

export const Select: FC<SelectProps> = ({
  options,
  placeholder,
  initialValue,
  onChange,
  className = "",
}) => {
  const initialSelectedValue =
    initialValue ?? (placeholder ? "" : options[0]?.value ?? "");
  const [selectedValue, setSelectedValue] =
    useState<string>(initialSelectedValue);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <select
      className={`form-select border-0 rounded-pill shadow w-auto ${className}`}
      value={selectedValue}
      onChange={handleChange}
      role="button"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
