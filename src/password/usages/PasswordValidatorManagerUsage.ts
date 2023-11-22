import { LowerCaseValidator } from "../validator/LowerCaseValidator.js";
import { MinLengthValidator } from "../validator/MinLengthValidator.js";
import { PasswordValidatorManager } from "../validator/PasswordValidatorManager.js";
import { SpaceCharacterValidator } from "../validator/SpaceCharacterValidator.js";
import { SpecialCharacterValidator } from "../validator/SpecialCharacterValidator.js";
import { UpperCaseValidator } from "../validator/UpperCaseValidator.js";

const pm = new PasswordValidatorManager();

const minLength = new MinLengthValidator(6);
const specialChar = new SpecialCharacterValidator(1);
const uppercase = new UpperCaseValidator(1);
const lowercase = new LowerCaseValidator(1);
const space = new SpaceCharacterValidator();

pm.register(minLength, specialChar, uppercase, lowercase, space);

const results = pm.validate("a*bcUdsdfdsf");

console.log({ results });
