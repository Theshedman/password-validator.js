import { ValidationResult } from './ValidationResult.js';
import { PasswordValidator } from './PasswordValidator.js';
import { ValidatorCategory } from './ValidatorCategory.js';

export class DigitValidator extends PasswordValidator {

  constructor(passwordRule: number) {

    super(ValidatorCategory.LENGTH_EXPANDER, passwordRule);
  }

  public override validate(password: string): ValidationResult {

    if (this.numberOfDigitsIn(password) < this.passwordRule()) {

      const message = `must contains at least ${this.passwordRule()} digits.`;

      return new ValidationResult(false, Array.of(message));
    }

    return new ValidationResult(true, []);
  }

  private numberOfDigitsIn(password: string): number {

    return password.split('').filter(char => !isNaN(Number(char))).length;
  }
}
