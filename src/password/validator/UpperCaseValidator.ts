import {Util} from "./Util.js";
import {ValidationResult} from "./ValidationResult.js";
import {PasswordValidator} from "./PasswordValidator.js";
import {ValidatorCategory} from "./ValidatorCategory.js";

export class UpperCaseValidator extends PasswordValidator {

  constructor(passwordRule: number) {

    super(ValidatorCategory.LENGTH_EXPANDER, passwordRule);
  }

  public override validate(password: string): ValidationResult {

    if (this.numberOfUpperCaseLettersIn(password) < this.passwordRule()) {

      const message = `must contain at least ${this.passwordRule()} uppercase letters.`;

      return new ValidationResult(false, Array.of(message));
    }

    return new ValidationResult(true, Array.of());
  }

  private numberOfUpperCaseLettersIn(password: string): number {

    return Util.removeNonAlphabeticCharacterFrom(password)
      .split("")
      .filter(char => char.toUpperCase() === char)
      .length;
  }
}
