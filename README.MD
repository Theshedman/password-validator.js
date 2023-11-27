### @password-validator/core

<div style="display:flex; gap:10px; flex-wrap:wrap">
  <a href="https://www.npmjs.com/package/@password-validator/core" style="text-decoration:none">
    <img src="https://img.shields.io/npm/v/@password-validator/core.svg"  />
  </a>

  <a href="https://www.npmjs.com/package/@password-validator/core" style="text-decoration:none">
    <img src="https://img.shields.io/npm/dt/@password-validator/core.svg" />
  </a>

  <a href="https://github.com/Theshedman/password-validator.js" style="text-decoration:none">
    <img src="https://img.shields.io/github/workflow/status/Theshedman/password-validator/build-ci?logo=github" />
  </a>

  <a href="https://github.com/Theshedman/password-validator.js" style="text-decoration:none">
    <img src="https://img.shields.io/github/languages/top/Theshedman/password-validator.js.svg"  />
  </a>
</div>

---

A zero dependency library for password validation that lets you compose and combine multiple rules to create a validator that suits your needs.

### Installation

```bash
npm install @password-validator/core
```

### Basic Usage

```ts
import { LowerCaseValidator, MaxLengthValidator, MinLengthValidator, PasswordValidatorManager, SpecialCharacterValidator, UpperCaseValidator } from '@password-validator/core';

const pm = new PasswordValidatorManager(); // Create a password validator manager

const minLength = new MinLengthValidator(8); // Minimum length of 8 characters
const maxLength = new MaxLengthValidator(16); // Maximum length of 16 characters
const uppercases = new UpperCaseValidator(2); // At least 2 uppercase characters
const lowercases = new LowerCaseValidator(2); // At least 2 lowercase characters
const specialCharacters = new SpecialCharacterValidator(2); // At least 2 special characters

// Register all the validators with the manager
pm.register(minLength, maxLength, uppercases, lowercases, specialCharacters);

// Use the manager to validate passwords
const result = pm.validate('MyPassword123!*') // { valid: true, messages: [] } --> Password is valid
const result = pm.validate('MyPassword123'); // { valid: false, messages: ['must contain at least 2 special characters.'] } --> Password is invalid

```

### Validators

A validator is class that can validate a password and return a result. Validators should typically be registered with the `PasswordValidatorManager` (as shown above). The library comes with a number of validators (see table below) that can be used to build a validation suite.

Each validator receives a `passwordRule` _(number)_ argument in its constructor which defines the number of expected characters associated with the validator. For example, the `const minLength = new MinLengthValidator(10)` defined above means that the passowrd must be atleast __10 characters__ long to be considered valid.

NB: The only exception to this is the `NoSpaceCharacterValidator` which requires no arguments and simply ensures the password contains no spaces.

### Conflicting Validators

In a case of conflict validations, for example, a password must be __12 characters long minimum__, and also be __8 characters maximum__, we throw a `PasswordValidatorConflictException` error. This is because minimum length cannot be greater than maximum length.

```ts
import { MinLengthValidator, MaxLengthValidator } from '@password-validator/core';

const pm = new PasswordValidatorManager(); // Create a password validator manager

const minLength = new MinLengthValidator(12);
const maxLength = new MaxLengthValidator(8);

pm.register(minLength, maxLength);

const result = pm.validate('MyPassword123!*') // Throws PasswordValidatorConflictException --> `minLength cannot be greater than maxLength`
```

### Validators & Managers Tables

Supported Validators and Managers as of now are:

|     Rules            |               Descriptions                                                                                                       |
|:---------------------|:---------------------------------------------------------------------------------------------------------------------------------|
| **Validations**                       |
|**DigitValidator(passwordRule: number)**   | specifies password must include _passwordRule_ number of digits                         |
|**LowerCaseValidator(passwordRule: number)**  | specifies password must include at least _passwordRule_ number of lowercase character(s)                     |
|**UpperCaseValidator(passwordRule: number)**| specifies password must include at least _passwordRule_ number of uppercase character(s)  |
|**MaxLengthValidator(passwordRule: number)**| specifies password must not exceed _passwordRule_ number of character(s)  |
|**MinLengthValidator(passwordRule: number)**  | specifies password must not be less than _passwordRule_ number of character(s)                      |
|**SpecialCharacterValidator(passwordRule: number)**          | specifies password must include at least _passwordRule_ number of special character(s)                                                                |
|**NoSpaceCharacterValidator()**   | specifies password must not include spaces                       |
| **Managers**                       |
|**PasswordValidatorManager().register(...validators: PasswordValidator[])**          | Register multiple validators at once to build a validation suite.                                                             |


