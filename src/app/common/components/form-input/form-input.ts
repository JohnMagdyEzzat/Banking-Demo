import { CommonModule } from '@angular/common';
import { Component, computed, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.html',
  styleUrl: './form-input.css',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormInput), multi: true },
  ],
  imports: [CommonModule],
})
export class FormInput implements ControlValueAccessor {
  value = '';

  id = input.required<string>();
  label = input.required<string>();
  inputType = input.required<string>();
  placeholder = input.required<string>();
  validationMessage = input<string>();

  capitalizedLabel = computed(() => this.label().charAt(0).toUpperCase() + this.label().slice(1));

  protected onChange = (value: any) => {};
  protected onTouched = () => {};

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
}
