import React from "react";
import { Input } from "../ui/input";

export function cpfMask(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export default function CpfInput({ placeholder, field }) {
  const handleCpf = (event) => {
    let input = event.target;
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
