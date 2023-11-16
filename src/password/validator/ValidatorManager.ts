import {Validator} from "./Validator.js";
import {PasswordValidator} from "./PasswordValidator.js";

export interface ValidatorManager extends Validator {

  register(...validators: PasswordValidator[]): void;

  validators(): PasswordValidator[];
}
