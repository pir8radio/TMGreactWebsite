import * as yup from "yup";

export const transformNumber = (_: any, val: any) => (val ? Number(val) : null);

export const requiredNumberField = yup
  .number()
  .required("required")
  .positive("positive")
  .nullable()
  .transform(transformNumber);
