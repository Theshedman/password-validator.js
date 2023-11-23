import { Util } from "./Util.js";
import { ValidationResult } from "./ValidationResult.js";
import { PasswordValidator } from "./PasswordValidator.js";
import { ValidatorCategory } from "./ValidatorCategory.js";

export class SpaceCharacterValidator extends PasswordValidator {
  constructor() {
    super(ValidatorCategory.PATTERN_MATCHER, 0);
  }

  public override validate(password: string): ValidationResult {
    if (this.containsSpaceCharacter(password)) {
      const message: string = "must not contain any space.";

      return new ValidationResult(false, Array.of(message));
    }

    return new ValidationResult(true, Array.of());
  }

  private containsSpaceCharacter(password: string): boolean {
    return password.split(Util.SPACE_CHARACTER).length > 1;
  }
}
