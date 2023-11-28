## @password-validator/core

<div style="display:flex; gap:10px; flex-wrap:wrap">
  <a href="https://www.npmjs.com/package/@password-validator/core" style="text-decoration:none">
    <img src="https://img.shields.io/npm/v/@password-validator/core.svg"  />
  </a>

  <a href="https://www.npmjs.com/package/@password-validator/core" style="text-decoration:none">
    <img src="https://img.shields.io/npm/dt/@password-validator/core.svg" />
  </a>

  <a href="https://github.com/Theshedman/password-validator.js" style="text-decoration:none">
    <img src="https://img.shields.io/github/actions/workflow/status/Theshedman/password-validator.js/.github%2Fworkflows%2Frelease.yaml?branch=main" />
  </a>

  <a href="https://github.com/Theshedman/password-validator.js" style="text-decoration:none">
    <img src="https://img.shields.io/github/issues/Theshedman/password-validator.js"  />
  </a>

  <a href="https://github.com/Theshedman/password-validator.js" style="text-decoration:none">
    <img src="https://img.shields.io/github/issues-pr/Theshedman/password-validator.js"  />
  </a>

  <a href="https://github.com/Theshedman/password-validator.js" style="text-decoration:none">
    <img src="https://img.shields.io/npm/l/%40password-validator%2Fcore"  />
  </a>
</div>

---

A robust dependency-free, regex-free library for password validation! It lets you compose, combine and/or chain multiple validators to create a validation suite that meets your needs.

## Installation

```bash
npm install @password-validator/core
```

## Usage

Password validator exposes 2 APIs for validating passwords:

1. __`standard`__ - This allows you register multiple validator classes with the `PasswordValidatorManager` to build a validation suite.

```ts
import { LowerCaseValidator, MaxLengthValidator, MinLengthValidator, PasswordValidatorManager, SpecialCharacterValidator, UpperCaseValidator } from '@password-validator/core';

const pm = PasswordValidatorManager.standard(); // Create a password validator manager

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

2. __`fluent`__ - This allows you chain multiple validators together on the `PasswordValidatorManager` in a more functional programming style. This is useful when you want to validate a password without having to register the validators with the manager.
It still uses the same validators as the `standard` API but provides an interface for chaining them together.


```ts
import { PasswordValidatorManager } from '@password-validator/core';

const result = PasswordValidatorManager.fluent()
  .min(6) // Minimum length of 6 characters
  .digit(1) // At least 1 digit
  .specialCharacter(1) // At least 1 special character
  .validate("eihi2kd#"); // { valid: true, messages: [] } --> Password is valid

```

NB: Ensure to call the `validate` method with the `password` to be validated. Without this, the password validation will not be triggered.


## Validators

A validator is class that can validate a password and return a result. This is used by both the `Standard` and the `Fluent` APIs. The library comes with a number of validators (see table below) that can be used to build a validation suite.

Each validator receives a _`passwordRule` (number)_ argument, which defines the number of expected characters associated with the validator.
Consider the following example:

```ts
// Standard API
import { MinLengthValidator } from '@password-validator/core';

const pm = PasswordValidatorManager.standard();

const minLength = new MinLengthValidator(10);

pm.register(minLength)

const result = pm.validate("eihi2kd#");

// -----------OR---------------

// Fluent API
import { PasswordValidatorManager } from '@password-validator/core';

const result = PasswordValidatorManager.fluent()
  .min(10)
  .validate("eihi2kd#");

```

The `new MinLengthValidator(10)` or `PasswordValidatorManager.fluent().min(10)`  defined above means that the passowrd must be atleast __10 characters__ long to be considered valid.

NB: The only exception to this is the `NoSpaceCharacterValidator` (`PasswordValidatorManager.fluent().noSpace()`) which requires no arguments and simply ensures the password contains no spaces.

### Conflicting Validators

In a case of conflict validations, for example, a password must be __12 characters long minimum__, and also be __8 characters maximum__, we throw
a `PasswordValidatorConflictException` error. This is because minimum length cannot be greater than maximum length.

```ts
import { MinLengthValidator, MaxLengthValidator } from '@password-validator/core';

const pm = PasswordValidatorManager.standard(); // Create a password validator manager

const minLength = new MinLengthValidator(12);
const maxLength = new MaxLengthValidator(8);

pm.register(minLength, maxLength); // Throws PasswordValidatorConflictException --> `minLength cannot be greater than maxLength`

const result = pm.validate('MyPassword123!*')

```
---

### Summary Table

Supported Validators and Managers as of now are:

| Standard | Fluent   |Description|
|----------|----------|----------|
|**`PasswordValidatorManager.standard()`**|**`PasswordValidatorManager.fluent()`**|The base instance for validation|
|**`DigitValidator(passwordRule: number)`**|**`.digit(passwordRule: number)`**|specifies password must include passwordRule number of digits|
|**`LowerCaseValidator(passwordRule: number)`**|**`.lower(passwordRule: number)`**|specifies password must include at least passwordRule number of lowercase character(s)|
|**`UpperCaseValidator(passwordRule: number)`**|**`.upper(passwordRule: number)`**|specifies password must include at least passwordRule number of uppercase character(s)|
|**`MaxLengthValidator(passwordRule: number)`**|**`.max(passwordRule: number)`**|specifies password must not exceed passwordRule number of character(s)|
|**`MinLengthValidator(passwordRule: number)`**|**`.min(passwordRule: number)`**|specifies password must not be less than passwordRule number of character(s)|
|**`SpecialCharacterValidator(passwordRule: number)`**|**`.specialCharacter(passwordRule: number)`**|	specifies password must include at least passwordRule number of special character(s)|
|**`NoSpaceCharacterValidator()`**|**`.noSpace()`**|specifies password must not include spaces|

