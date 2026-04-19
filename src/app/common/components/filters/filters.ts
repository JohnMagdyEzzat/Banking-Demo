import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IFilterItems } from '../../interfaces/common-interfaces';
import {
  TRANSACTIONCATEGORIESARRAY,
  TransactionType,
} from '../../../interfaces/transactionInterface';

@Component({
  selector: 'app-filters',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class Filters implements OnInit {
  private fb = inject(FormBuilder);

  filterFormGroup: FormGroup;
  sortFormGroup: FormGroup;

  filterChange = output<IFilterItems>();
  sort = output<string>();

  categories = TRANSACTIONCATEGORIESARRAY;
  types = TransactionType;

  typesArray: { code: string; label: string }[];

  constructor() {
    this.typesArray = this.types.code.map((val, i) => ({
      code: val,
      label: this.types.label[i],
    }));

    this.filterFormGroup = this.fb.group({
      dateFrom: [''],
      dateTo: [''],
      type: [''],
      category: [''],
    });
    this.sortFormGroup = this.fb.group({
      sortBy: [''],
    });
  }

  ngOnInit(): void {}

  resetForm() {
    this.filterFormGroup.patchValue({
      dateFrom: '',
      dateTo: '',
      type: '',
      category: '',
    });
  }

  onApplyFilters() {
    const activeFilters = Object.fromEntries(
      Object.entries(this.filterFormGroup.value).filter((entry) => entry[1] !== ''),
    ) as IFilterItems;

    this.filterChange.emit(activeFilters);
  }

  onSortBy() {
    const sortByValue = this.sortFormGroup.value.sortBy as string;
    this.sort.emit(sortByValue);
  }
}
