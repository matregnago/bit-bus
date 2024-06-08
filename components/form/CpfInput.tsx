import React from "react";
import { Input } from "../ui/input";

interface CPFInputProps {
  placeholder: string;
  field: any;
}

export function cpfMask(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export default function CpfInput({ placeholder, field }: CPFInputProps) {
  const handleCpf = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let input = event.target as HTMLInputElement;
    input.value = cpfMask(input.value);
  };
  return (
    <Input
      placeholder={placeholder}
      type="text"
      maxLength="14"
      onKeyUp={handleCpf}
      {...field}
    />
  );
}
