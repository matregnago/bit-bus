import React from "react";
import { Input } from "../ui/input";

interface CEPInputProps {
  placeholder: string;
  field: any;
}

export function cepMask(value: string) {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  return value;
}

export default function CepInput({ placeholder, field }: CEPInputProps) {
  const handleCep = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let input = event.target as HTMLInputElement;
    input.value = cepMask(input.value);
  };
  return (
    <Input
      placeholder={placeholder}
      type="text"
      maxLength="9"
      onKeyUp={handleCep}
      {...field}
    />
  );
}
