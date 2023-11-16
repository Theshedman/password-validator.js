import {ValidationResult} from "./ValidationResult.js";
import {PasswordValidator} from "./PasswordValidator.js";
import {ValidatorCategory} from "./ValidatorCategory.js";

export class MinLengthValidator extends PasswordValidator {

  constructor(passwordRule: number) {

    super(ValidatorCategory.LENGTH_MINIMIZER, passwordRule);
  }

  public override validate(password: string): ValidationResult {

    if (password.length < this.passwordRule()) {

      const validationMsg = `must not be less than ${this.passwordRule()} minimum characters.`;

      return new ValidationResult(false, Array.of(validationMsg));
    }

    return new ValidationResult(true, Array.of());
  }

  public override conflictsWith(validator: PasswordValidator): String[] {

    const conflictMsg: string[] = Array.of();

    switch (validator.category()) {

      case ValidatorCategory.TOTAL_LENGTH_LIMITER:

        if (validator.passwordRule() < this.passwordRule()) {

          conflictMsg.push('minLength cannot be greater than maxLength');
        }

        break;

      default:

        return Array.of();

    }

    return conflictMsg;
  }
}
