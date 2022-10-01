import * as yup from "yup";
import { requiredNumberField } from "@/app/validation/schemas/defaultSchemaMethods";

export const addSignaToMinerSchema = yup
  .object({
    amount: requiredNumberField,
  })
  .required();

export const changeMinerIntensitySchema = yup
  .object({
    intensity: requiredNumberField.min(0.32),
    amount: requiredNumberField.min(0.5),
  })
  .required();
