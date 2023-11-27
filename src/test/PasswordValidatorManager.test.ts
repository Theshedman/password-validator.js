import { DigitValidator } from "../password/validator/DigitValidator.js";
import { ValidationResult } from "../password/validator/ValidationResult.js";
import { ValidatorManager } from "../password/validator/ValidatorManager.js";
import { PasswordValidator } from "../password/validator/PasswordValidator.js";
import { MinLengthValidator } from "../password/validator/MinLengthValidator.js";
import { MaxLengthValidator } from "../password/validator/MaxLengthValidator.js";
import { LowerCaseValidator } from "../password/validator/LowerCaseValidator.js";
import { UpperCaseValidator } from "../password/validator/UpperCaseValidator.js";
import { NoSpaceCharacterValidator } from "../password/validator/NoSpaceCharacterValidator.js";
import { PasswordValidatorManager } from "../password/validator/PasswordValidatorManager.js";
import { SpecialCharacterValidator } from "../password/validator/SpecialCharacterValidator.js";
import { PasswordValidatorConflictException } from "../password/validator/PasswordValidatorConflictException.js";

it("should create a password validator manager", (): void => {
  const pm: ValidatorManager = new PasswordValidatorManager();

  expect(pm).toBeTruthy();
});

describe.each([
  { validators: [MinLengthValidator], expected: 1 },
  { validators: [MinLengthValidator, MaxLengthValidator], expected: 2 },
  {
    validators: [MinLengthValidator, MaxLengthValidator, DigitValidator],
    expected: 3,
  },
])("Password Validators Registration", ({ validators, expected }) =>
  it(`should be able to register ${expected} validator`, (): void => {
    const pm: ValidatorManager = new PasswordValidatorManager();

    const validatorInstances: Array<PasswordValidator> = Array.of();
    validators.forEach(Validator => validatorInstances.push(new Validator(1)));

    pm.register(...validatorInstances);
    expect(pm.validators()).toHaveLength(expected);
  }),
);

describe.each([
  {
    validators: [
      { validator: MinLengthValidator, rule: 6 },
      { validator: MaxLengthValidator, rule: 3 },
    ],
  },
  {
    validators: [
      { validator: MinLengthValidator, rule: 2 },
      { validator: MaxLengthValidator, rule: 3 },
      { validator: DigitValidator, rule: 4 },
    ],
  },
  {
    validators: [
      { validator: MinLengthValidator, rule: 6 },
      { validator: MaxLengthValidator, rule: 8 },
      { validator: DigitValidator, rule: 4 },
      { validator: SpecialCharacterValidator, rule: 2 },
      { validator: LowerCaseValidator, rule: 4 },
    ],
  },
])("Conflict Validation", ({ validators }): void => {
  it("should check for conflicts before registration", (): void => {
    const pm: ValidatorManager = new PasswordValidatorManager();

    const validatorInstances: Array<PasswordValidator> = Array.of();

    validators.forEach((Password): void => {
      validatorInstances.push(new Password.validator(Password.rule));
    });

    expect(() => pm.register(...validatorInstances)).toThrow(
      PasswordValidatorConflictException,
    );
  });
});

describe.each([
  { password: "Ilsd", rule: 3, expected: true },
  { password: "pass", rule: 5, expected: false },
  { password: "Id", rule: 3, expected: false },
  { password: "password", rule: 3, expected: true },
  { password: "dotnet", rule: 6, expected: true },
])("Minimum Length Validation", ({ password, rule, expected }): void => {
  it(`should validate minLength ${rule}`, (): void => {
    const pm: ValidatorManager = new PasswordValidatorManager();

    const minLength: PasswordValidator = new MinLengthValidator(rule);
    pm.register(minLength);

    const actual: ValidationResult = pm.validate(password);

    expect(actual.isValid()).toBe(expected);
  });
});

describe.each([
  { password: "Ilsd", rule: 4, expected: true },
  { password: "pass", rule: 5, expected: true },
  { password: "Id_consumer", rule: 6, expected: false },
  { password: "password", rule: 3, expected: false },
  { password: "dotnet", rule: 6, expected: true },
])("Maximum Length Validation", ({ password, rule, expected }): void => {
  it(`should validate maxLength ${rule}`, (): void => {
    const pm: ValidatorManager = new PasswordValidatorManager();

    const maxLengthValidator: PasswordValidator = new MaxLengthValidator(rule);
    pm.register(maxLengthValidator);

    const actual: ValidationResult = pm.validate(password);

    expect(actual.isValid()).toBe(expected);
  });
});

describe.each([
  { password: "Ilsd", minRule: 2, maxRule: 4, expected: true },
  { password: "ps", minRule: 3, maxRule: 4, expected: false },
  { password: "Id_consumer", minRule: 6, maxRule: 8, expected: false },
  { password: "passwd", minRule: 4, maxRule: 6, expected: true },
  { password: "dotnet", minRule: 5, maxRule: 10, expected: true },
])(
  "Minimum & Maximum Length Validation",
  ({ password, minRule, maxRule, expected }): void => {
    it(`should validate minimumLength ${minRule} maxLength ${maxRule}`, (): void => {
      const pm: ValidatorManager = new PasswordValidatorManager();

      const minLengthValidator: PasswordValidator = new MinLengthValidator(
        minRule,
      );
      const maxLengthValidator: PasswordValidator = new MaxLengthValidator(
        maxRule,
      );

      pm.register(minLengthValidator, maxLengthValidator);

      const actual: ValidationResult = pm.validate(password);

      expect(actual.isValid()).toBe(expected);
    });
  },
);

describe.each([
  { password: "Ilsd12", rule: 1, expected: true },
  { password: "pass1", rule: 2, expected: false },
  { password: "Id0_consume4r", rule: 3, expected: false },
  { password: "pa3sswor8d", rule: 4, expected: false },
  { password: "d2o34tne5tw3", rule: 5, expected: true },
])("Password Digit Validation", ({ password, rule, expected }): void => {
  it(`should validate minimum digit ${rule}`, (): void => {
    const pm: ValidatorManager = new PasswordValidatorManager();

    const digitValidator: PasswordValidator = new DigitValidator(rule);
    pm.register(digitValidator);

    const actual: ValidationResult = pm.validate(password);

    expect(actual.isValid()).toBe(expected);
  });
});

describe.each([
  { password: "LAJDEs3", rule: 1, expected: true },
  { password: "pASSEOK", rule: 2, expected: false },
  { password: "LKF(WKF", rule: 3, expected: false },
  { password: "kd (WKF", rule: 3, expected: false },
  { password: "kd!(WKF", rule: 3, expected: false },
  { password: "LKlsdF(WldkKF", rule: 6, expected: true },
  { password: "KFlsKFEIE", rule: 4, expected: false },
  { password: "d2o34tne5tw3", rule: 5, expected: true },
])("Lowercase Validation", ({ password, rule, expected }): void => {
  it(`should validate Lowercase ${rule}`, (): void => {
    const pm: ValidatorManager = new PasswordValidatorManager();

    const lowerCaseValidation: PasswordValidator = new LowerCaseValidator(rule);
    pm.register(lowerCaseValidation);

    const actual: ValidationResult = pm.validate(password);

    expect(actual.isValid()).toBe(expected);
  });
});

describe.each([
  { password: "kshdkcK", rule: 1, expected: true },
  { password: "adlLdkf", rule: 2, expected: false },
  { password: "LKfslkd", rule: 3, expected: false },
  { password: "LK dkdh", rule: 3, expected: false },
  { password: "LK#dkdh", rule: 3, expected: false },
  { password: "LKlsdF(WldkKF", rule: 6, expected: true },
  { password: "kdvAdk", rule: 4, expected: false },
  { password: "K,dslJGHDmdkL", rule: 5, expected: true },
])("Uppercase Validation", ({ password, rule, expected }): void => {
  it(`should validate Uppercase ${rule}`, (): void => {
    const pm: ValidatorManager = new PasswordValidatorManager();

    const upperCaseValidator: PasswordValidator = new UpperCaseValidator(rule);
    pm.register(upperCaseValidator);

    const actual: ValidationResult = pm.validate(password);

    expect(actual.isValid()).toBe(expected);
  });
});

describe.each([
  { password: "kshdkcK!", rule: 1, expected: true },
  { password: "amdka", rule: 2, expected: false },
  { password: "LKfslkd", rule: 3, expected: false },
  { password: "LKls)_@%=dF(WldkKF", rule: 6, expected: true },
  { password: "kdvAd!#k", rule: 4, expected: false },
  { password: "K,dslJG#<>HDmd.kL", rule: 5, expected: true },
])("Special Character Validation", ({ password, rule, expected }): void => {
  it(`should validate Special Characters ${rule}`, (): void => {
    const pm: ValidatorManager = new PasswordValidatorManager();

    const specialCharacterValidator: PasswordValidator =
      new SpecialCharacterValidator(rule);
    pm.register(specialCharacterValidator);

    const actual: ValidationResult = pm.validate(password);

    expect(actual.isValid()).toBe(expected);
  });
});

describe.each([
  { password: "kshdkcK!", expected: true },
  { password: "amdka ", expected: false },
  { password: "LKfs lkd", expected: false },
  { password: "WldkKF", expected: true },
  { password: "kdvAd! #k", rule: 4, expected: false },
  { password: "K,dslJG#<>HDmd.kL", rule: 5, expected: true },
])("No Space Character Validation", ({ password, expected }): void => {
  it(`should validate No Space Characters in: "${password}"`, (): void => {
    const pm: ValidatorManager = new PasswordValidatorManager();

    const noSpaceCharacterValidator: PasswordValidator =
      new NoSpaceCharacterValidator();
    pm.register(noSpaceCharacterValidator);

    const actual: ValidationResult = pm.validate(password);

    expect(actual.isValid()).toBe(expected);
  });
});

describe.each([
  {
    password: "sknds@ks0Lk",
    expected: true,
    validators: [
      { validator: MinLengthValidator, rule: 6 },
      { validator: MaxLengthValidator, rule: 15 },
      { validator: UpperCaseValidator, rule: 1 },
      { validator: SpecialCharacterValidator, rule: 1 },
      { validator: DigitValidator, rule: 1 },
    ],
  },
  {
    password: "ks0Lk",
    expected: false,
    validators: [
      { validator: MinLengthValidator, rule: 6 },
      { validator: MaxLengthValidator, rule: 15 },
      { validator: UpperCaseValidator, rule: 1 },
      { validator: SpecialCharacterValidator, rule: 1 },
      { validator: DigitValidator, rule: 1 },
    ],
  },
  {
    password: "Las,kdv@ks0lWf",
    expected: true,
    validators: [
      { validator: MinLengthValidator, rule: 3 },
      { validator: UpperCaseValidator, rule: 1 },
      { validator: SpecialCharacterValidator, rule: 1 },
      { validator: DigitValidator, rule: 1 },
    ],
  },
  {
    password: "bnskndk",
    expected: false,
    validators: [
      { validator: MinLengthValidator, rule: 8 },
      { validator: UpperCaseValidator, rule: 2 },
      { validator: SpecialCharacterValidator, rule: 1 },
      { validator: DigitValidator, rule: 5 },
    ],
  },
  {
    password: "abisola23MKka-2#",
    expected: true,
    validators: [
      { validator: UpperCaseValidator, rule: 2 },
      { validator: SpecialCharacterValidator, rule: 1 },
      { validator: DigitValidator, rule: 2 },
    ],
  },
])("Complex Validation", ({ password, validators, expected }) => {
  it(`should check for strong password "${password}"`, (): void => {
    const pm: ValidatorManager = new PasswordValidatorManager();
    const validatorInstances: Array<PasswordValidator> = Array.of();

    validators.forEach((Password): void => {
      validatorInstances.push(new Password.validator(Password.rule));
    });

    pm.register(...validatorInstances);

    const actual: ValidationResult = pm.validate(password);

    expect(actual.isValid()).toBe(expected);
  });
});
