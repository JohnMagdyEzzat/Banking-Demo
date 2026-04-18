export interface IFormItem {
  id: string;
  label: string;
  inputType: string;
  placeholder: string;
  formControlName: string;
  validationMessage?: string;
}

export interface IFilterItems {
  [key: string]: string | undefined;
  dateFrom?: string;
  dateTo?: string;
  typeFilter?: string;
  categoryFilter?: string;
  sortBy?: string;
}
