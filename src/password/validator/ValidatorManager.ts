import { Validator } from "./Validator.js";
import { PasswordValidator } from "./PasswordValidator.js";

export interface ValidatorManager extends Validator {
  register(...validators: Array<PasswordValidator>): void;

  validators(): Array<PasswordValidator>;
}
