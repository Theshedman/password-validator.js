import { ValidatorManager } from "./ValidatorManager.js";
import { ValidationResult } from "./ValidationResult.js";
import { PasswordValidator } from "./PasswordValidator.js";
import { PasswordValidatorConflictException } from "./PasswordValidatorConflictException.js";

export class PasswordValidatorManager implements ValidatorManager {
  private readonly registeredValidators: Array<PasswordValidator>;

  constructor() {
    this.registeredValidators = Array.of();
  }

  public register(...validators: Array<PasswordValidator>): void {
    const conflictMessages: Array<string> = Array.of();

    this.verifyEachValidatorAgainstThemselves(validators, conflictMessages);

    for (const validator of validators) {
      this.verifyAgainstOtherValidators(validator, conflictMessages);

      this.registerValidatorWithNoConflict(conflictMessages, validator);
    }

    this.handleConflicts(conflictMessages);
  }

  private verifyEachValidatorAgainstThemselves(
    validators: Array<PasswordValidator>,
    conflictMessages: Array<string>,
  ): void {
    for (let i = 0; i < validators.length; i++) {
      for (let j = i + 1; j < validators.length; j++) {
        const conflictMsg = validators[i].conflictsWith(validators[j]);

        if (conflictMsg.length > 0) {
          conflictMessages.push(...conflictMsg);
        }
      }
    }
  }

  private verifyAgainstOtherValidators(
    validator: PasswordValidator,
    conflictMessages: Array<string>,
  ): void {
    for (const registeredValidator of this.registeredValidators) {
      const conflictMsg = validator.conflictsWith(registeredValidator);

      if (this.hasConflict(conflictMsg)) {
        conflictMessages.push(...conflictMsg);

        break;
      }
    }
  }

  private registerValidatorWithNoConflict(
    conflictMessages: Array<string>,
    validator: PasswordValidator,
  ): void {
    if (!this.hasConflict(conflictMessages)) {
      this.registeredValidators.push(validator);
    }
  }

  private handleConflicts(conflictMessages: Array<string>): void {
    if (this.hasConflict(conflictMessages)) {
      let message: string = "";
      let errorCount: number = 0;

      for (const conflictMessage of conflictMessages) {
        errorCount++;

        message += `${errorCount}: ${conflictMessage}\n`;
      }

      throw new PasswordValidatorConflictException(message);
    }
  }

  private hasConflict(conflictMsg: Array<string>): boolean {
    return conflictMsg.length > 0;
  }

  public validators(): Array<PasswordValidator> {
    return this.registeredValidators;
  }

  public validate(password: string): ValidationResult {
    const messages: Array<string> = Array.of();
    let isValid: boolean = true;

    for (const validator of this.registeredValidators) {
      const result = validator.validate(password);

      if (result.isValid()) {
        continue;
      }

      isValid = false;
      messages.push(...result.getMessages());
    }

    return new ValidationResult(isValid, messages);
  }
}
