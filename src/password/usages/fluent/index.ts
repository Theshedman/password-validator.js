import { ValidationResult } from "../../validator/ValidationResult.js";
import { PasswordValidatorManager } from "../../api/standard/PasswordValidatorManager.js";

const result: ValidationResult = PasswordValidatorManager.fluent()
  .min(6)
  .digit(1)
  .specialCharacter(1)
  .validate("eihi2kd#");

console.log({ result });
