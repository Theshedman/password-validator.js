import { Validator } from "./Validator.js";
import { ValidationResult } from "./ValidationResult.js";
import { ValidatorCategory } from "./ValidatorCategory.js";

export abstract class PasswordValidator implements Validator {
  private readonly rule: number;
  private readonly validatorCategory: ValidatorCategory;

  protected constructor(category: ValidatorCategory, passwordRule: number) {
    this.rule = passwordRule;
    this.validatorCategory = category;
  }

  public passwordRule(): number {
    return this.rule;
  }

  public category(): ValidatorCategory {
    return this.validatorCategory;
  }

  public conflictsWith(validator: PasswordValidator): Array<string> {
    return Array.of();
  }

  public abstract validate(password: string): ValidationResult;
}
