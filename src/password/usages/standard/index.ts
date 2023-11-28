import { LowerCaseValidator } from "../../validator/LowerCaseValidator.js";
import { MinLengthValidator } from "../../validator/MinLengthValidator.js";
import { UpperCaseValidator } from "../../validator/UpperCaseValidator.js";
import { NoSpaceCharacterValidator } from "../../validator/NoSpaceCharacterValidator.js";
import { SpecialCharacterValidator } from "../../validator/SpecialCharacterValidator.js";
import { PasswordValidatorManager } from "../../api/standard/PasswordValidatorManager.js";

const pm = PasswordValidatorManager.standard();

const minLength = new MinLengthValidator(6);
const specialChar = new SpecialCharacterValidator(1);
const uppercase = new UpperCaseValidator(1);
const lowercase = new LowerCaseValidator(1);
const noSpace = new NoSpaceCharacterValidator();

pm.register(minLength, specialChar, uppercase, lowercase, noSpace);

const results = pm.validate("a*bcUdsdfdsf");

console.log({ results });
