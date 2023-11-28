import { Validator } from "../../validator/Validator.js";
import { PasswordValidator } from "../../validator/PasswordValidator.js";

export interface ValidatorManager extends Validator {
  register(...validators: Array<PasswordValidator>): void;

  validators(): Array<PasswordValidator>;
}
