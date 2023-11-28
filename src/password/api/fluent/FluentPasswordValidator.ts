import { DigitValidator } from "../../validator/DigitValidator.js";
import { ValidatorManager } from "../../validator/ValidatorManager.js";
import { ValidationResult } from "../../validator/ValidationResult.js";
import { PasswordValidator } from "../../validator/PasswordValidator.js";
import { UpperCaseValidator } from "../../validator/UpperCaseValidator.js";
import { MinLengthValidator } from "../../validator/MinLengthValidator.js";
import { MaxLengthValidator } from "../../validator/MaxLengthValidator.js";
import { LowerCaseValidator } from "../../validator/LowerCaseValidator.js";
import { PasswordValidatorManager } from "../standard/PasswordValidatorManager.js";
import { NoSpaceCharacterValidator } from "../../validator/NoSpaceCharacterValidator.js";
import { SpecialCharacterValidator } from "../../validator/SpecialCharacterValidator.js";

export class FluentPasswordValidator {
  private digitValidator: DigitValidator | undefined;
  private lowerCaseValidator: LowerCaseValidator | undefined;
  private minLengthValidator: MinLengthValidator | undefined;
  private maxLengthValidator: MaxLengthValidator | undefined;
  private upperCaseValidator: UpperCaseValidator | undefined;
  private noSpaceCharacterValidator: NoSpaceCharacterValidator | undefined;
  private specialCharacterValidator: SpecialCharacterValidator | undefined;

  public min(passwordRule: number): this {
    this.minLengthValidator = new MinLengthValidator(passwordRule);

    return this;
  }

  public max(passwordRule: number): this {
    this.maxLengthValidator = new MaxLengthValidator(passwordRule);

    return this;
  }

  public lower(passwordRule: number): this {
    this.lowerCaseValidator = new LowerCaseValidator(passwordRule);

    return this;
  }

  public upper(passwordRule: number): this {
    this.upperCaseValidator = new UpperCaseValidator(passwordRule);

    return this;
  }

  public digit(passwordRule: number): this {
    this.digitValidator = new DigitValidator(passwordRule);

    return this;
  }

  public noSpace(): this {
    this.noSpaceCharacterValidator = new NoSpaceCharacterValidator();

    return this;
  }

  public specialCharacter(passwordRule: number): this {
    this.specialCharacterValidator = new SpecialCharacterValidator(
      passwordRule,
    );

    return this;
  }

  public validate(password: string): ValidationResult {
    const validators: Array<PasswordValidator> = [
      this.digitValidator as PasswordValidator,
      this.minLengthValidator as PasswordValidator,
      this.maxLengthValidator as PasswordValidator,
      this.lowerCaseValidator as PasswordValidator,
      this.upperCaseValidator as PasswordValidator,
      this.noSpaceCharacterValidator as PasswordValidator,
      this.specialCharacterValidator as PasswordValidator,
    ];

    const pm: ValidatorManager = PasswordValidatorManager.standard();

    for (const validator of validators) {
      if (!validator) {
        continue;
      }

      pm.register(validator);
    }

    return pm.validate(password);
  }
}
