import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

export type InputVariant = "email" | "password" | "title" | "comment" | "date";

export const defaultValidate = (
  value: string,
  variant: InputVariant
): string => {
  if (variant === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hangulRegex = /[가-힣]/;
    if (value && hangulRegex.test(value)) return "이메일 형식으로 입력해주세요";
    if (value && !emailRegex.test(value)) return "이메일 형식으로 입력해주세요";
  } else if (variant === "password") {
    if (value.length < 8 || value.length > 16)
      return "비밀번호는 8~16자여야 합니다";
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (
      !(
        uppercaseRegex.test(value) &&
        lowercaseRegex.test(value) &&
        specialCharRegex.test(value)
      )
    ) {
      return "비밀번호는 소문자,대문자,특수기호를 포함해야합니다";
    }
  } else if (variant === "title") {
    if (value && (value.length < 2 || value.length > 12))
      return "2 ~ 12자의 제목을 지어주세요";
  } else if (variant === "comment") {
    if (value.length === 300) return "최대 300자 까지 입력 할 수 있습니다.";
  }
  return "";
};

export const useValidation = (
  value: string,
  variant: InputVariant,
  validate: (value: string, variant: InputVariant) => string = defaultValidate,
  delay: number = 100
): string => {
  const debouncedValue = useDebounce(value, delay);
  const [error, setError] = useState("");

  useEffect(() => {
    const validationResult = validate(debouncedValue, variant);
    setError(validationResult);
  }, [debouncedValue, variant, validate]);

  return error;
};
