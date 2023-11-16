import {ValidationResult} from "./ValidationResult.js";
import {PasswordValidator} from "./PasswordValidator.js";
import {ValidatorCategory} from "./ValidatorCategory.js";

export class MaxLengthValidator extends PasswordValidator {

  private maxCount: number = 0;

  constructor(passwordRule: number) {

    super(ValidatorCategory.TOTAL_LENGTH_LIMITER, passwordRule);
  }

  public override validate(password: string): ValidationResult {

    if (password.length > this.passwordRule()) {

      const message = `must not be greater than ${this.passwordRule()} maximum characters`;

      return new ValidationResult(false, Array.of(message));
    }

    return new ValidationResult(true, Array.of());
  }

  public override conflictsWith(validator: PasswordValidator): String[] {

    const conflictMsg: string[] = [];

    switch (validator.category()) {

      case ValidatorCategory.LENGTH_MINIMIZER:

        this.handleLengthMinimizerConflicts(validator, conflictMsg);

        break;

      case ValidatorCategory.LENGTH_EXPANDER:

        this.maxCount += validator.passwordRule();

        break;

      default:

        return Array.of();


    }

    this.validateLengthExpanderConflicts(conflictMsg);

    return conflictMsg;
  }

  private validateLengthExpanderConflicts(conflictMsg: string[]): void {

    if (this.maxCount > this.passwordRule()) {

      conflictMsg.push('cannot exceed password maxLength');
    }
  }

  private handleLengthMinimizerConflicts(
    validator: PasswordValidator,
    conflictMsg: string[]
  ): void {

    if (validator.passwordRule() > this.passwordRule()) {

      conflictMsg.push('maxLength cannot be less than minLength.');
    }
  }
}
