import { Util } from "./Util.js";
import { ValidationResult } from "./ValidationResult.js";
import { PasswordValidator } from "./PasswordValidator.js";
import { ValidatorCategory } from "./ValidatorCategory.js";

export class SpecialCharacterValidator extends PasswordValidator {
  constructor(passwordRule: number) {
    super(ValidatorCategory.LENGTH_EXPANDER, passwordRule);
  }

  public override validate(password: string): ValidationResult {
    if (this.numberOfSpecialCharactersIn(password) < this.passwordRule()) {
      const message = `must contain at least ${this.passwordRule()} special characters.`;

      return new ValidationResult(false, Array.of(message));
    }

    return new ValidationResult(true, Array.of());
  }

  private numberOfSpecialCharactersIn(password: string): number {
    return password
      .split("")
      .filter(char => Util.SPECIAL_CHARACTERS.includes(char)).length;
  }
}
