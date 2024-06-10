import { FieldValues, UseFormReturn } from "react-hook-form";

export type AuthFormType = {
  errorMessage?: string;
  form: UseFormReturn<FieldValues>;
  onSubmit: (data: FieldValues) => void;
};

export type LoginType = {
  email: string;
  password: string;
};

export type UserType = {
  email: string;
};
