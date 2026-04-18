import { IFormValidations } from '../interfaces/common-interfaces';

export function getFormValidationMessage(
  formValidations: IFormValidations[],
  formControlName: string,
) {
  return formValidations.find((validation) => {
    return formControlName === validation.formControlName;
  })?.message;
}
