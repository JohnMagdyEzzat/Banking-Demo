export const loginValidationMessages = {
  requiredValidationMessage: (formControlName: string) => `${formControlName} is required`,
  emailValidationMessage: (formControlName: string) => `${formControlName} must be a valid E-mail`,
};

export const transactionCreationValidationMessages = {
  ...loginValidationMessages,
  numberBetween: (formControlName: string, minNumber: number, maxNumber: number) =>
    `${formControlName} must be between ${minNumber} and ${maxNumber}`,
  maxDecimals: (formControlName: string, decimalNumber: number) =>
    `${formControlName} must be max of ${decimalNumber} decimals`,
  notInFutureDate: (formControlName: string) => `${formControlName} must not be in future`,
  numberOfCharacters: (formControlName: string, minLength: number, maxLength: number) =>
    `${formControlName} must be from ${minLength} to ${maxLength} characters`,
  insufficientAmount: () => `Debit amount must not exceed account balance`,
};
