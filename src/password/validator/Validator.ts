import { ValidationResult } from "./ValidationResult.js";

export interface Validator {
  validate(password: string): ValidationResult;
}
